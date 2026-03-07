import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function cleanupBio(rawBio: string, name: string, headline: string): Promise<string> {
  if (!rawBio || rawBio.trim().length < 10) {
    return rawBio;
  }

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 300,
    messages: [
      {
        role: 'user',
        content: `You are helping ${name}, a ${headline}, improve their personal website bio.

Here is their raw LinkedIn summary:
"""
${rawBio}
"""

Rewrite this as a clean, compelling 2-3 sentence bio in first person. 
- Remove bullet points, jargon, and corporate speak
- Keep it authentic and human
- Focus on what makes them unique
- Do NOT add information that wasn't in the original
- Return ONLY the rewritten bio, no explanation`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    return rawBio;
  }

  return content.text.trim();
}
