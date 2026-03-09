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

      <div className="ed-page">
        <nav className="ed-nav">
          <span className="ed-nav-logo">folio</span>
          <div className="ed-nav-links">
            <a href="#how">How It Works</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <button type="button" onClick={() => router.push('/sign-in')}>
              Sign In
            </button>
          </div>
        </nav>

        <section className="ed-hero">
          <div ref={canvasRef} className="ed-hero-canvas" />
          <div className="ed-hero-content">
            <div className="ed-hero-pills">
              <span className="ed-pill ed-pill-solid">FREE</span>
              <span className="ed-pill">AUTO-SYNC</span>
              <span className="ed-pill">NO CODE</span>
            </div>
            <h1 className="ed-hero-title">
              Your LinkedIn,<br />deployed.
            </h1>
            <p className="ed-hero-sub">
              Turn your LinkedIn profile into a stunning personal website in minutes.
            </p>
            <div className="ed-hero-cta">
              <button
                type="button"
                className="ed-btn-primary"
                onClick={() => router.push('/sign-up')}
              >
                Get Started Free →
              </button>
              <span className="ed-hero-note">No credit card required</span>
            </div>
          </div>
          <div className="ed-hero-scroll">
            <span>Scroll to explore</span>
            <div className="ed-scroll-line" />
          </div>
        </section>

        <section id="how" className="ed-section ed-section-green">
          <div className="ed-section-header">
            <span className="ed-section-num">01</span>
            <h2 className="ed-section-title">How It Works</h2>
          </div>
          <div className="ed-steps">
            <div className="ed-step">
              <div className="ed-step-num">1</div>
              <h3>Connect LinkedIn</h3>
              <p>Import your profile data in one click. Work history, skills, and experience flow directly into your site.</p>
            </div>
            <div className="ed-step">
              <div className="ed-step-num">2</div>
              <h3>Choose Your Domain</h3>
              <p>Use your custom domain or get a free folio.site subdomain. SSL certificates configured automatically.</p>
            </div>
            <div className="ed-step">
              <div className="ed-step-num">3</div>
              <h3>Deploy Instantly</h3>
              <p>Your site goes live on a global CDN. Updates to LinkedIn sync automatically. Zero maintenance.</p>
            </div>
          </div>
        </section>

        <section id="features" className="ed-section ed-section-dark">
          <div className="ed-section-header">
            <span className="ed-section-num">02</span>
            <h2 className="ed-section-title">Features</h2>
          </div>
          <div className="ed-features-grid">
            <div className="ed-feature-card">
              <span className="ed-feature-icon">↻</span>
              <h3>Auto-Sync</h3>
              <p>Website updates when LinkedIn changes. Set it once, forget it.</p>
            </div>
            <div className="ed-feature-card">
              <span className="ed-feature-icon">⬡</span>
              <h3>Custom Domains</h3>
              <p>Bring your own or use ours. SSL configured automatically.</p>
            </div>
            <div className="ed-feature-card">
              <span className="ed-feature-icon">⚡</span>
              <h3>Global CDN</h3>
              <p>Fast hosting worldwide. Loads in milliseconds.</p>
            </div>
            <div className="ed-feature-card">
              <span className="ed-feature-icon">✦</span>
              <h3>Clean Templates</h3>
              <p>Minimal designs. Your work front and center.</p>
            </div>
            <div className="ed-feature-card">
              <span className="ed-feature-icon">↑</span>
              <h3>SEO Ready</h3>
              <p>Meta tags, structured data, clean URLs. Built to rank.</p>
            </div>
            <div className="ed-feature-card">
              <span className="ed-feature-icon">○</span>
              <h3>Zero Maintenance</h3>
              <p>No CMS. No plugins. No server management.</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="ed-section ed-section-green">
          <div className="ed-section-header">
            <span className="ed-section-num">03</span>
            <h2 className="ed-section-title">Pricing</h2>
          </div>
          <div className="ed-pricing-grid">
            <div className="ed-price-card">
              <div className="ed-price-tier">Free</div>
              <div className="ed-price-amount">$0<span>/forever</span></div>
              <ul className="ed-price-features">
                <li>folio.site subdomain</li>
                <li>LinkedIn auto-sync</li>
                <li>SSL included</li>
                <li>Community support</li>
              </ul>
              <button
                type="button"
                className="ed-btn-secondary"
                onClick={() => router.push('/sign-up')}
              >
                Start Free
              </button>
            </div>
            <div className="ed-price-card ed-price-card-featured">
              <div className="ed-price-badge">Popular</div>
              <div className="ed-price-tier">Pro</div>
              <div className="ed-price-amount">$9<span>/month</span></div>
              <ul className="ed-price-features">
                <li>Custom domain</li>
                <li>Priority sync</li>
                <li>Analytics dashboard</li>
                <li>Email support</li>
              </ul>
              <button
                type="button"
                className="ed-btn-primary"
                onClick={() => router.push('/sign-up')}
              >
                Get Pro →
              </button>
            </div>
          </div>
        </section>

        <section className="ed-section ed-section-cta">
          <h2>Ready to launch your site?</h2>
          <p>Join thousands of professionals with their own personal website.</p>
          <button
            type="button"
            className="ed-btn-primary ed-btn-large"
            onClick={() => router.push('/sign-up')}
          >
            Get Started Free →
          </button>
        </section>

        <footer className="ed-footer">
          <div className="ed-footer-content">
            <span className="ed-footer-logo">folio</span>
            <span className="ed-footer-text">By After App Studios</span>
          </div>
        </footer>
      </div>
    </>
  );
}
