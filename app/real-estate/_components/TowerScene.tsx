"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

type Props = {
  /** Hero section; its inline `--p` (0–1, set by SkyHero) drives the camera. */
  trackRef: React.RefObject<HTMLElement | null>;
  /** Called once the first frame is on screen, so the static image can fade out. */
  /** Called once the first complete frame (roof logo included) has been drawn. */
  onReady: () => void;
  /** Called when WebGL cannot start — the static image stays. */
  onFail?: () => void;
};

// Tower proportions (world units ≈ metres / 1.3), modelled on project-garden.jpg.
const FLOOR = 2.3;
const FLOORS = 10;
const W = 8;
const D = 6;
const BODY_H = FLOOR * FLOORS;
const CANOPY_H = 2.8;
const H = BODY_H + CANOPY_H;
const FRONT = D / 2;

const smoothstep = (x: number) => x * x * (3 - 2 * x);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Deterministic pseudo-random so the greenery looks the same on every visit. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function buildTower(lowSpec: boolean) {
  const group = new THREE.Group();
  const disposables: { dispose: () => void }[] = [];

  const mat = {
    stone: new THREE.MeshStandardMaterial({ color: 0xd8d0c3, roughness: 0.9, envMapIntensity: 0.35 }),
    joint: new THREE.MeshStandardMaterial({ color: 0xb3aa9c, roughness: 0.95, envMapIntensity: 0.3 }),
    slab: new THREE.MeshStandardMaterial({ color: 0xcdc5b8, roughness: 0.88, envMapIntensity: 0.3 }),
    warm: new THREE.MeshStandardMaterial({ color: 0xb39a7a, roughness: 0.75, envMapIntensity: 0.3 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x2a2e32, roughness: 0.45, metalness: 0.35, envMapIntensity: 0.6 }),
    louver: new THREE.MeshStandardMaterial({ color: 0x3d3733, roughness: 0.6, metalness: 0.2, envMapIntensity: 0.4 }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0x3e5a73,
      roughness: 0.05,
      metalness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      envMapIntensity: 1.6,
    }),
    rail: new THREE.MeshPhysicalMaterial({
      color: 0xc4d8e8,
      roughness: 0.05,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    }),
  };
  disposables.push(...Object.values(mat));

  // Collect boxes per material, merge into one mesh each (≈10 draw calls total).
  const parts = new Map<THREE.Material, THREE.BufferGeometry[]>();
  const box = (w: number, h: number, d: number, m: THREE.Material, x: number, y: number, z: number) => {
    const geometry = new THREE.BoxGeometry(w, h, d);
    geometry.translate(x, y, z);
    if (!parts.has(m)) parts.set(m, []);
    parts.get(m)!.push(geometry);
  };

  const innerW = W - 1.4;

  // Side walls, roof canopy and parapet
  box(0.7, H, D, mat.stone, -(W / 2 - 0.35), H / 2, 0);
  box(0.7, H, D, mat.stone, W / 2 - 0.35, H / 2, 0);
  box(W, 0.7, D, mat.stone, 0, H - 0.35, 0);
  box(innerW, 0.06, D - 0.3, mat.warm, 0, H - 0.73, 0.1);
  box(W, 0.45, 0.25, mat.stone, 0, H + 0.22, FRONT - 0.12);
  box(W, 0.45, 0.25, mat.stone, 0, H + 0.22, -FRONT + 0.12);

  // Stone panel joints on the side walls
  for (const side of [-1, 1]) {
    const x = side * (W / 2 - 0.35);
    for (let y = 1.15; y < H - 0.8; y += 1.15) box(0.7, 0.025, 0.02, mat.joint, x, y, FRONT + 0.011);
    for (let z = -FRONT + 0.6; z < FRONT - 0.3; z += 0.9) box(0.02, H, 0.03, mat.joint, side * (W / 2 + 0.011), H / 2, z);
  }

  // Floor slabs (front edge flush with the frame)
  for (let i = 0; i <= FLOORS; i++) {
    box(innerW, 0.28, D - 0.2, mat.slab, 0, i * FLOOR + 0.14, 0.1);
  }

  // Recessed glass curtain wall + terrace glazing under the canopy
  box(innerW, BODY_H, 0.08, mat.glass, 0, BODY_H / 2, FRONT - 1.1);
  box(innerW, CANOPY_H - 0.75, 0.08, mat.glass, 0, BODY_H + (CANOPY_H - 0.75) / 2, FRONT - 1.6);

  // Mullions and transoms
  for (let x = -W / 2 + 0.7; x <= W / 2 - 0.7 + 0.01; x += 1.1) {
    box(0.06, BODY_H, 0.12, mat.dark, x, BODY_H / 2, FRONT - 1.04);
  }
  for (let i = 0; i < FLOORS; i++) {
    box(innerW, 0.07, 0.12, mat.dark, 0, i * FLOOR + 1.25, FRONT - 1.04);
  }

  // Warm lit windows (interior light seen through the glass); returned so the
  // render loop can fade them up as the sky darkens.
  const litMat = new THREE.MeshBasicMaterial({ color: 0xffc58a, transparent: true, opacity: 0.4, toneMapped: false });
  const litGeo = new THREE.PlaneGeometry(0.96, FLOOR - 0.45);
  const litRand = rng(5);
  const bays = [-2.75, -1.65, -0.55, 0.55, 1.65, 2.75];
  const litSpots: [number, number][] = [];
  for (let i = 0; i < FLOORS; i++) {
    for (const x of bays) if (litRand() < 0.42) litSpots.push([x, i * FLOOR + 0.28 + (FLOOR - 0.45) / 2]);
  }
  const lit = new THREE.InstancedMesh(litGeo, litMat, litSpots.length);
  const litTint = [new THREE.Color(0xffc58a), new THREE.Color(0xffd9a8), new THREE.Color(0xfff0d6)];
  const litDummy = new THREE.Object3D();
  litSpots.forEach(([x, y], k) => {
    litDummy.position.set(x, y, FRONT - 1.05);
    litDummy.updateMatrix();
    lit.setMatrixAt(k, litDummy.matrix);
    lit.setColorAt(k, litTint[Math.floor(litRand() * litTint.length)]);
  });
  group.add(lit);
  disposables.push(litMat, litGeo);

  // Two front columns running up to the canopy
  for (const x of [-1.05, 0.45]) {
    box(0.4, H - 0.7, 0.4, mat.stone, x, (H - 0.7) / 2, FRONT - 0.25);
  }

  // Vertical louvres on the left bay (two floors on, one off)
  for (let i = 0; i < FLOORS; i++) {
    if (i % 3 === 2) continue;
    for (let s = 0; s < 10; s++) {
      box(0.06, FLOOR - 0.35, 0.18, mat.louver, -3.55 + s * 0.13, i * FLOOR + 0.28 + (FLOOR - 0.35) / 2, FRONT - 0.7);
    }
  }

  // Cantilevered planter balconies (centre, staggered) and glass-railed balconies (right)
  const planters: { cx: number; w: number; top: number; front: number; vines: boolean }[] = [];
  for (let i = 1; i < FLOORS; i++) {
    const even = i % 2 === 0;
    const cx = even ? -1.6 : -0.25;
    const w = even ? 2.4 : 2.3;
    const y = i * FLOOR;
    box(w, 0.95, 2.2, mat.slab, cx, y + 0.47, FRONT + 0.5);
    planters.push({ cx, w, top: y + 0.95, front: FRONT + 1.6, vines: i % 2 === 1 || i === 8 });

    box(2.7, 0.22, 2.0, mat.slab, 2.25, y + 0.11, FRONT + 0.4);
    box(2.7, 0.95, 0.04, mat.rail, 2.25, y + 0.7, FRONT + 1.38);
    box(0.04, 0.95, 2.0, mat.rail, 0.92, y + 0.7, FRONT + 0.4);
    box(2.7, 0.04, 0.06, mat.dark, 2.25, y + 1.18, FRONT + 1.38);
  }

  // Plinth (mostly hidden by the mist)
  box(W + 1.2, 0.5, D + 2, mat.stone, 0, -0.25, 0.6);

  for (const [m, geometries] of parts) {
    const merged = mergeGeometries(geometries);
    geometries.forEach((g) => g.dispose());
    const mesh = new THREE.Mesh(merged, m);
    const transparent = m === mat.rail;
    mesh.castShadow = !transparent;
    mesh.receiveShadow = !transparent;
    group.add(mesh);
    disposables.push(merged);
  }

  // Greenery: dense faceted leaf clusters on the planters + hanging leaf curtains
  const rand = rng(11);
  const greens = [0x2f4a1f, 0x3f5d27, 0x557531, 0x6a8a3b, 0x82a04a].map((c) => new THREE.Color(c));
  const leafCount = lowSpec ? 55 : 120;
  const strands = lowSpec ? 14 : 26;
  const curtainPlanters = planters.filter((p) => p.vines);
  const leafGeo = new THREE.IcosahedronGeometry(0.2, 0);
  const leafMat = new THREE.MeshStandardMaterial({ roughness: 0.85, flatShading: true, envMapIntensity: 0.4 });
  const capacity = planters.length * leafCount + curtainPlanters.length * strands * 18;
  const leaves = new THREE.InstancedMesh(leafGeo, leafMat, capacity);
  const dummy = new THREE.Object3D();
  let n = 0;
  const addLeaf = (x: number, y: number, z: number, scale: number) => {
    if (n >= capacity) return;
    dummy.position.set(x, y, z);
    dummy.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    leaves.setMatrixAt(n, dummy.matrix);
    leaves.setColorAt(n, greens[Math.floor(rand() * greens.length)]);
    n++;
  };
  for (const p of planters) {
    for (let k = 0; k < leafCount; k++) {
      const depth = rand();
      addLeaf(
        p.cx + (rand() - 0.5) * (p.w - 0.15),
        p.top + 0.05 + rand() * (0.35 + 0.35 * depth),
        p.front - 0.1 - depth * 2.0,
        0.45 + rand() * 0.7
      );
    }
  }
  for (const p of curtainPlanters) {
    for (let k = 0; k < strands; k++) {
      const x = p.cx + (rand() - 0.5) * (p.w - 0.1);
      const length = 0.7 + rand() * 1.9;
      for (let t = 0; t < length; t += 0.15) {
        const taper = 1 - (t / length) * 0.55;
        addLeaf(x + (rand() - 0.5) * 0.12, p.top - 0.02 - t, p.front + 0.05 + rand() * 0.12, (0.32 + rand() * 0.3) * taper);
      }
    }
  }
  leaves.count = n;
  leaves.castShadow = true;
  leaves.receiveShadow = true;
  group.add(leaves);
  disposables.push(leafGeo, leafMat);

  return { group, disposables, litMat };
}

/** Soft sky gradient used only as the reflection environment for the glass. */
function skyEnvironment(renderer: THREE.WebGLRenderer) {
  const envScene = new THREE.Scene();
  const geometry = new THREE.SphereGeometry(50, 32, 16);
  const material = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: {
      top: { value: new THREE.Color(0x232b4f) },
      mid: { value: new THREE.Color(0xe08a5e) },
      bottom: { value: new THREE.Color(0x2a2230) },
    },
    vertexShader: `varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform vec3 top; uniform vec3 mid; uniform vec3 bottom; varying vec3 vDir;
      void main() { float h = vDir.y; vec3 c = h > 0.0 ? mix(mid, top, smoothstep(0.0, 0.55, h)) : mix(mid, bottom, smoothstep(0.0, 0.35, -h)); gl_FragColor = vec4(c, 1.0); }`,
  });
  envScene.add(new THREE.Mesh(geometry, material));
  const pmrem = new THREE.PMREMGenerator(renderer);
  const texture = pmrem.fromScene(envScene, 0.02).texture;
  pmrem.dispose();
  geometry.dispose();
  material.dispose();
  return texture;
}

export default function TowerScene({ trackRef, onReady, onFail }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);
  const onFailRef = useRef(onFail);
  useEffect(() => {
    onReadyRef.current = onReady;
    onFailRef.current = onFail;
  }, [onReady, onFail]);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      onFailRef.current?.(); // No WebGL — the static image stays.
      return;
    }

    const lowSpec = window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowSpec ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = false; // static scene: bake shadows once
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const envTexture = skyEnvironment(renderer);
    scene.environment = envTexture;

    // Sunset: low warm sun from the right (matches the sky glow), cool dusk fill
    scene.add(new THREE.HemisphereLight(0x7f86b8, 0x3a2a26, 0.6));
    const sun = new THREE.DirectionalLight(0xffc08f, 2.4);
    sun.position.set(24, 18, 18);
    sun.target.position.set(0, H / 2, 0);
    sun.castShadow = true;
    sun.shadow.mapSize.set(lowSpec ? 1024 : 2048, lowSpec ? 1024 : 2048);
    sun.shadow.camera.left = -18;
    sun.shadow.camera.right = 18;
    sun.shadow.camera.top = 18;
    sun.shadow.camera.bottom = -18;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 100;
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.02;
    scene.add(sun, sun.target);

    const { group, disposables, litMat } = buildTower(lowSpec);
    scene.add(group);

    // Brand sign on the roof crown: navy logo as stacked alpha-cut planes so the letters
    // read as raised metal when the camera orbits (front layer = true colour, back = shade).
    // "Ready" waits for the roof logo too, so the preloader never reveals a blank sign.
    let textureReady = false;
    const onTexture = () => {
      textureReady = true;
      dirty = true;
    };
    const logoTexture = new THREE.TextureLoader().load("/real-estate/hero/logo-navy.png", onTexture, undefined, onTexture);
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const logoH = 0.8;
    const logoGeo = new THREE.PlaneGeometry(logoH * (2048 / 520), logoH);
    disposables.push(logoTexture, logoGeo);
    const LOGO_LAYERS = 4;
    for (let i = 0; i < LOGO_LAYERS; i++) {
      const front = i === LOGO_LAYERS - 1;
      const material = new THREE.MeshStandardMaterial({
        map: logoTexture,
        alphaTest: 0.45,
        color: front ? 0xffffff : 0x3a4252,
        roughness: 0.35,
        metalness: 0.45,
        envMapIntensity: 0.7,
      });
      const sign = new THREE.Mesh(logoGeo, material);
      sign.position.set(0, H - 0.12, FRONT + 0.012 + i * 0.014);
      sign.receiveShadow = true;
      group.add(sign);
      disposables.push(material);
    }

    let dirty = true;
    const camera = new THREE.PerspectiveCamera(28, 1, 1, 400);
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    let width = 1;
    let height = 1;

    const resize = () => {
      width = Math.max(1, container.clientWidth);
      height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      dirty = true;
    };

    /**
     * Level camera (verticals stay vertical, like an architectural shift lens).
     * r = 0: tower top sits at 62% of the frame, front-on — matches the static image.
     * r = 1: camera has risen past the base, dollied in to the upper floors and orbited ~35°.
     */
    const place = (r: number, mx: number, my: number) => {
      const desiredPx = Math.min(width * (width < 768 ? 0.62 : 0.34), 500);
      const d0 = (W * width) / (2 * tanHalf * camera.aspect * desiredPx);
      const d = lerp(d0, d0 * 0.62, r);
      const cy0 = H + (2 * 0.62 - 1) * d0 * tanHalf;
      const cy = lerp(cy0, H * 0.64, r) + my * 0.8;
      const yaw = lerp(0, 0.72, r) + mx * 0.1;
      camera.position.set(Math.sin(yaw) * d, cy, Math.cos(yaw) * d);
      camera.lookAt(0, cy, 0);
    };

    /**
     * Logo phase: the canvas is masked by the logo, so frame a close-up of the facade
     * (glass, planters, balconies) and pan slowly down the floors as the user scrolls.
     */
    const placeWindow = (t: number, mx: number, my: number) => {
      const desiredPx = Math.min(width * (width < 768 ? 0.62 : 0.34), 500);
      const d0 = (W * width) / (2 * tanHalf * camera.aspect * desiredPx);
      const d = d0 * (width < 768 ? 0.55 : 0.48);
      const cy = lerp(H * 0.74, H * 0.4, t) + my * 0.5;
      // Mostly front-on and slightly right of centre: glass, planters and balconies fill the letters
      const yaw = lerp(0.2, 0.08, t) + mx * 0.08;
      const xc = 0.5;
      camera.position.set(xc + Math.sin(yaw) * d, cy, Math.cos(yaw) * d);
      camera.lookAt(xc, cy, 0);
    };

    // Gentle pointer parallax on devices with a real cursor
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const onPointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    if (hasHover) window.addEventListener("pointermove", onPointer, { passive: true });

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      dirty = true;
    });
    observer.observe(track);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let lastP = -1;
    let ready = false;
    let frame = 0;
    renderer.shadowMap.needsUpdate = true;
    resize();

    const loop = () => {
      frame = requestAnimationFrame(loop);
      // Off-screen (e.g. page opened at #contact) still draws the first frame so "ready" fires
      if (!visible && ready) return;

      const p = parseFloat(track.style.getPropertyValue("--p") || "0") || 0;
      eased.x += (pointer.x - eased.x) * 0.06;
      eased.y += (pointer.y - eased.y) * 0.06;
      const settling = Math.abs(pointer.x - eased.x) + Math.abs(pointer.y - eased.y) > 0.001;

      if (p === lastP && !settling && !dirty) return;
      lastP = p;
      dirty = false;

      // Tower phase until it has faded out (0.52), then the logo-window phase.
      const windowPhase = p >= 0.52;
      const phase = windowPhase ? "on" : "off";
      if (track.dataset.window !== phase) track.dataset.window = phase;
      if (p > 0.97 && ready) return; // fully covered by the mist — nothing to draw

      litMat.opacity = lerp(0.4, 1, clamp01(p / 0.5));
      if (windowPhase) placeWindow(clamp01((p - 0.52) / 0.44), eased.x, eased.y);
      else place(smoothstep(clamp01(p / 0.42)), eased.x, eased.y);
      renderer.render(scene, camera);

      if (!ready && textureReady) {
        ready = true;
        onReadyRef.current();
      }
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      if (hasHover) window.removeEventListener("pointermove", onPointer);
      disposables.forEach((item) => item.dispose());
      envTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [trackRef]);

  return <div ref={containerRef} className="re-sky__scene" aria-hidden="true" />;
}
