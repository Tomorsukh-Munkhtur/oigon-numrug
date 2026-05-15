"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Building3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a2a3a);
    
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create a building
    const buildingGroup = new THREE.Group();

    // Main building body
    const buildingGeometry = new THREE.BoxGeometry(2, 4, 1.5);
    const buildingMaterial = new THREE.MeshPhongMaterial({
      color: 0x2c3e50,
      emissive: 0x1a5f7a,
      shininess: 100,
    });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.castShadow = true;
    building.receiveShadow = true;
    buildingGroup.add(building);

    // Windows
    const windowGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.05);
    const windowMaterial = new THREE.MeshPhongMaterial({
      color: 0xffd700,
      emissive: 0xffa500,
      shininess: 80,
    });

    const rows = 5;
    const cols = 4;
    const spacing = 0.35;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const window = new THREE.Mesh(windowGeometry, windowMaterial);
        window.position.set(
          -0.75 + j * spacing,
          1.5 - i * spacing,
          0.76
        );
        window.castShadow = true;
        buildingGroup.add(window);
      }
    }

    // Roof
    const roofGeometry = new THREE.ConeGeometry(1.2, 0.8, 4);
    const roofMaterial = new THREE.MeshPhongMaterial({
      color: 0x8b4513,
      shininess: 60,
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 2.4;
    roof.castShadow = true;
    roof.receiveShadow = true;
    buildingGroup.add(roof);

    // Door
    const doorGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.05);
    const doorMaterial = new THREE.MeshPhongMaterial({
      color: 0xa0522d,
      shininess: 40,
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, -1.6, 0.76);
    door.castShadow = true;
    buildingGroup.add(door);

    scene.add(buildingGroup);

    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Slow rotation
      buildingGroup.rotation.y += 0.005;
      
      // Window flickering animation
      const windowMeshes = buildingGroup.children.filter(
        (child) =>
          child instanceof THREE.Mesh &&
          child.geometry instanceof THREE.BoxGeometry &&
          (child.material as THREE.MeshPhongMaterial).emissive?.getHex() === 0xffa500
      ) as THREE.Mesh[];

      windowMeshes.forEach((window, index) => {
        const time = Date.now() * 0.001;
        const flicker = Math.sin(time * 2 + index * 0.5) * 0.3 + 0.7;
        (window.material as THREE.MeshPhongMaterial).emissiveIntensity = flicker;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "12px",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1a2a3a 0%, #2c3e50 100%)",
      }}
    />
  );
}
