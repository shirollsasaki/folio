import React from 'react';
import type { ProfileData, TemplateProps } from '@/types';

const VERCEL_API = 'https://api.vercel.com';

function getVercelToken(): string {
  const token = process.env.VERCEL_API_TOKEN;
  if (!token) {
    throw new Error('VERCEL_API_TOKEN environment variable is not set');
  }
  return token;
}

const VERCEL_TOKEN = getVercelToken();
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID ?? '';

interface DeployResult {
  projectId: string;
  deploymentUrl: string;
}

function buildHtmlDocument(bodyHtml: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

async function vercelFetch(path: string, options: RequestInit): Promise<Response> {
  const url = new URL(path, VERCEL_API);
  if (VERCEL_TEAM_ID) {
    url.searchParams.set('teamId', VERCEL_TEAM_ID);
  }
  return fetch(url.toString(), {
    ...options,
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
}

export async function deployToVercel(
  projectName: string,
  htmlContent: string,
  existingProjectId?: string
): Promise<DeployResult> {
  // Step 1: Create or reuse project
  let projectId = existingProjectId;

  if (!projectId) {
    const projectRes = await vercelFetch('/v10/projects', {
      method: 'POST',
      body: JSON.stringify({
        name: projectName,
        framework: null,
      }),
    });

    if (!projectRes.ok) {
      const err = await projectRes.text();
      throw new Error(`Failed to create Vercel project: ${err}`);
    }

    const project = (await projectRes.json()) as { id: string };
    projectId = project.id;
  }

  // Step 2: Upload HTML file (SHA-based)
  const encoder = new TextEncoder();
  const fileBytes = encoder.encode(htmlContent);
  const sha = await computeSha1(htmlContent);

  const uploadRes = await vercelFetch('/v2/files', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html',
      'x-vercel-digest': sha,
    },
    body: fileBytes,
  });

  if (!uploadRes.ok && uploadRes.status !== 409) {
    const err = await uploadRes.text();
    throw new Error(`Failed to upload file to Vercel: ${err}`);
  }

  // Step 3: Create deployment
  const deployRes = await vercelFetch('/v13/deployments', {
    method: 'POST',
    body: JSON.stringify({
      name: projectName,
      project: projectId,
      files: [
        {
          file: 'index.html',
          sha,
          size: fileBytes.length,
        },
      ],
      projectSettings: {
        framework: null,
        buildCommand: null,
        outputDirectory: null,
      },
      target: 'production',
    }),
  });

  if (!deployRes.ok) {
    const err = await deployRes.text();
    throw new Error(`Failed to create Vercel deployment: ${err}`);
  }

  const deployment = (await deployRes.json()) as { url: string };
  const deploymentUrl = `https://${deployment.url}`;

  return { projectId, deploymentUrl };
}

async function computeSha1(content: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function renderTemplate(
  Component: React.ComponentType<TemplateProps>,
  profile: ProfileData,
  title: string
): Promise<string> {
  const { renderToStaticMarkup } = await import('react-dom/server');
  const bodyHtml = renderToStaticMarkup(React.createElement(Component, { profile }));
  return buildHtmlDocument(bodyHtml, title);
}
