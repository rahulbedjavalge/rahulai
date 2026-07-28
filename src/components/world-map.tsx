"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const regions = [
  { name: "Germany", lat: 51.1657, lng: 10.4515 },
  { name: "Netherlands", lat: 52.1326, lng: 5.2913 },
  { name: "Sweden", lat: 60.1282, lng: 18.6435 },
  { name: "Norway", lat: 60.472, lng: 8.4689 },
  { name: "UK", lat: 55.3781, lng: -3.436 },
  { name: "USA", lat: 37.0902, lng: -95.7129 },
  { name: "Canada", lat: 56.1304, lng: -106.3468 },
  { name: "UAE", lat: 23.4241, lng: 53.8478 },
  { name: "Saudi Arabia", lat: 23.8859, lng: 45.0792 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Australia", lat: -25.2744, lng: 133.7751 },
  { name: "India", lat: 20.5937, lng: 78.9629 },
];

function toVector3(lat: number, lng: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export function WorldMap() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050608, 3, 10);

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const globeGeometry = new THREE.SphereGeometry(1.45, 48, 48);
    const globeMaterial = new THREE.MeshStandardMaterial({
      color: 0x0b0f19,
      metalness: 0.35,
      roughness: 0.45,
      emissive: 0x07111f,
      emissiveIntensity: 0.35,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globe);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.55, 48, 48),
      new THREE.MeshBasicMaterial({
        color: 0x1d9fff,
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide,
      }),
    );
    globeGroup.add(atmosphere);

    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(1.45, 18, 18)),
      new THREE.LineBasicMaterial({ color: 0x3cc4ff, transparent: true, opacity: 0.14 }),
    );
    globeGroup.add(wireframe);

    const pins = new THREE.Group();
    globeGroup.add(pins);

    const pinMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.65,
      roughness: 0.3,
      metalness: 0.2,
    });

    regions.forEach((region, index) => {
      const position = toVector3(region.lat, region.lng, 1.47);
      const pin = new THREE.Mesh(new THREE.SphereGeometry(0.03, 16, 16), pinMaterial.clone());
      pin.position.copy(position);
      pins.add(pin);

      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.055, 0.09, 32),
        new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.38, side: THREE.DoubleSide }),
      );
      halo.position.copy(position.clone().multiplyScalar(1.005));
      halo.lookAt(new THREE.Vector3(0, 0, 0));
      pins.add(halo);

      const connector = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), position.clone().multiplyScalar(1.03)]),
        new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.18 }),
      );
      pins.add(connector);

      pin.userData = { offset: index * 0.2 };
      halo.userData = { offset: index * 0.16 };
    });

    const ambient = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x8b5cf6, 1.9);
    keyLight.position.set(4, 4, 6);
    scene.add(keyLight);

    const accentLight = new THREE.PointLight(0x22d3ee, 2.4, 14);
    accentLight.position.set(-4, -1, 5);
    scene.add(accentLight);

    let frame = 0;
    const animate = () => {
      frame += 0.01;
      globeGroup.rotation.y = frame * 0.5;
      globeGroup.rotation.x = Math.sin(frame * 0.18) * 0.08;
      pins.children.forEach((child) => {
        const object = child as THREE.Object3D & { userData: { offset?: number } };
        const offset = object.userData.offset ?? 0;
        object.scale.setScalar(1 + Math.sin(frame * 3 + offset) * 0.08);
      });
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const nextWidth = mount.clientWidth;
      const nextHeight = mount.clientHeight;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      globeGeometry.dispose();
      wireframe.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="map-shadow h-full w-full" aria-hidden="true" />;
}