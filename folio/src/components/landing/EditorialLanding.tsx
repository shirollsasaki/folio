'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

export function EditorialLanding() {
  const router = useRouter();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [threeLoaded, setThreeLoaded] = useState(false);

  useEffect(() => {
    if (!threeLoaded || !canvasRef.current) return;

    const THREE = (window as unknown as { THREE: typeof import('three') }).THREE;
    if (!THREE) return;

    const container = canvasRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(2, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const radius = 6;
    const segments = 32;
    const sphereGeo = new THREE.SphereGeometry(radius, segments, segments);

    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x333333,
      transparent: true,
      opacity: 0.6,
    });

    const edges = new THREE.EdgesGeometry(sphereGeo);
    const sphere = new THREE.LineSegments(edges, wireframeMat);
    group.add(sphere);

    const hubs = {
      sanFrancisco: { lat: 37.7749, lon: -122.4194 },
      newYork: { lat: 40.7128, lon: -74.006 },
      london: { lat: 51.5074, lon: -0.1278 },
      singapore: { lat: 1.3521, lon: 103.8198 },
    };

    function getPos(lat: number, lon: number, r: number) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(r * Math.sin(phi) * Math.cos(theta)),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    }

    const markerGeo = new THREE.SphereGeometry(0.15, 8, 8);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0x00ff9d });

    const hubPoints: Record<string, THREE.Vector3> = {};
    for (const [name, coords] of Object.entries(hubs)) {
      const pos = getPos(coords.lat, coords.lon, radius);
      hubPoints[name] = pos;

      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.copy(pos);
      group.add(marker);
    }

    const arcs = [
      { start: hubPoints.sanFrancisco, end: hubPoints.newYork },
      { start: hubPoints.newYork, end: hubPoints.london },
      { start: hubPoints.london, end: hubPoints.singapore },
      { start: hubPoints.singapore, end: hubPoints.sanFrancisco },
    ];

    interface ArcLine extends THREE.Line {
      userData: {
        drawCount: number;
        maxPoints: number;
        speed: number;
      };
    }

    const arcLines: ArcLine[] = [];

    arcs.forEach((arc) => {
      const midPoint = new THREE.Vector3()
        .addVectors(arc.start, arc.end)
        .multiplyScalar(0.5);
      const distance = arc.start.distanceTo(arc.end);
      midPoint.normalize().multiplyScalar(radius + distance * 0.3);

      const curve = new THREE.QuadraticBezierCurve3(arc.start, midPoint, arc.end);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: 0x00ff9d,
        transparent: true,
        opacity: 0.8,
      });

      const line = new THREE.Line(geometry, material) as ArcLine;
      line.userData = {
        drawCount: 0,
        maxPoints: points.length,
        speed: Math.random() * 0.5 + 0.2,
      };
      line.geometry.setDrawRange(0, 0);

      group.add(line);
      arcLines.push(line);
    });

    group.rotation.x = 0.2;
    group.rotation.y = 1.0;

    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      group.rotation.y += 0.001;

      arcLines.forEach((line) => {
        line.userData.drawCount += line.userData.speed;
        if (line.userData.drawCount > line.userData.maxPoints + 20) {
          line.userData.drawCount = 0;
        }
        const end = Math.floor(line.userData.drawCount);
        const start = Math.max(0, end - 15);
        line.geometry.setDrawRange(start, end - start);
      });

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [threeLoaded]);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        onLoad={() => setThreeLoaded(true)}
      />

      <div className="editorial-layout">
        <div className="editorial-left">
          <div ref={canvasRef} className="editorial-webgl" />

          <div className="editorial-left-overlay">
            <div className="editorial-top-corners">
              <span>01</span>
              <span>FOLIO</span>
            </div>

            <h1 className="editorial-hero">
              Your LinkedIn,
              <br />
              deployed.
            </h1>

            <div>
              <div className="editorial-pills">
                <div className="editorial-pill-group">
                  <span className="editorial-pill editorial-pill-solid">FREE</span>
                  <span className="editorial-pill">AUTO-SYNC</span>
                  <span className="editorial-pill">SSL</span>
                  <span className="editorial-pill">CDN</span>
                </div>
                <span className="editorial-pill">PERSONAL WEBSITE BUILDER</span>
                <span className="editorial-pill">NO CODE REQUIRED</span>
              </div>

              <div className="editorial-footer-corners">
                <span>Import</span>
                <span>Deploy</span>
                <span>Done</span>
              </div>
            </div>
          </div>
        </div>

        <div className="editorial-right">
          <div className="editorial-right-header">
            <span>folio.site</span>
            <span>By After App</span>
            <button
              type="button"
              className="editorial-sign-in"
              onClick={() => router.push('/sign-in')}
            >
              Sign In
            </button>
          </div>

          <div className="editorial-right-content">
            <p className="editorial-lead">
              Turn your LinkedIn profile into a stunning personal website in minutes. 
              Import your experience, skills, and bio automatically. Choose a domain. 
              Go live instantly. Your site stays synced with LinkedIn forever.
            </p>

            <div className="editorial-data-grid">
              <div className="editorial-data-column">
                <div className="editorial-flow-item">
                  <div className="editorial-flow-marker">1</div>
                  <div className="editorial-flow-text">
                    <span className="editorial-flow-label">Connect LinkedIn</span>
                    Import your profile data in one click. Work history, skills, and 
                    experience flow directly into your site. No manual entry required.
                  </div>
                </div>

                <div className="editorial-flow-item">
                  <div className="editorial-flow-marker">2</div>
                  <div className="editorial-flow-text">
                    <span className="editorial-flow-label">Choose Your Domain</span>
                    Use your custom domain or get a free folio.site subdomain. 
                    SSL certificates are configured automatically.
                  </div>
                </div>

                <div className="editorial-flow-item">
                  <div className="editorial-flow-marker">3</div>
                  <div className="editorial-flow-text">
                    <span className="editorial-flow-label">Deploy Instantly</span>
                    Your site goes live on a global CDN. Updates to your LinkedIn 
                    sync automatically. Zero maintenance required.
                  </div>
                </div>
              </div>

              <div className="editorial-data-column">
                <div className="editorial-features">
                  <div className="editorial-feature">
                    <span className="editorial-feature-icon">↻</span>
                    <span>Auto-Sync</span>
                  </div>
                  <div className="editorial-feature">
                    <span className="editorial-feature-icon">⬡</span>
                    <span>Custom Domains</span>
                  </div>
                  <div className="editorial-feature">
                    <span className="editorial-feature-icon">⚡</span>
                    <span>Global CDN</span>
                  </div>
                  <div className="editorial-feature">
                    <span className="editorial-feature-icon">✦</span>
                    <span>Clean Templates</span>
                  </div>
                  <div className="editorial-feature">
                    <span className="editorial-feature-icon">↑</span>
                    <span>SEO Ready</span>
                  </div>
                  <div className="editorial-feature">
                    <span className="editorial-feature-icon">○</span>
                    <span>Zero Maintenance</span>
                  </div>
                </div>

                <div className="editorial-pricing">
                  <div className="editorial-price-card">
                    <div className="editorial-price-tier">Free</div>
                    <div className="editorial-price-amount">$0</div>
                    <div className="editorial-price-desc">folio.site subdomain</div>
                  </div>
                  <div className="editorial-price-card editorial-price-card-pro">
                    <div className="editorial-price-tier">Pro</div>
                    <div className="editorial-price-amount">$9/mo</div>
                    <div className="editorial-price-desc">Custom domain + analytics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="editorial-right-footer">
            <span>No credit card required</span>
            <button
              type="button"
              className="editorial-cta"
              onClick={() => router.push('/sign-up')}
            >
              Get Started Free →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
