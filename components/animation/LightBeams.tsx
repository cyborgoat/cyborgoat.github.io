"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type LightBeamsProps = {
  className?: string;
  sizePercent?: number; // 0-100, controls canvas size relative to parent
  mobileSizePercent?: number; // 0-100, mobile override
  beamsCount?: number; // number of beams
  themeMode?: "light" | "dark";
};

function Beam({ index, themeMode = "dark", isMobile = false }: { index: number; themeMode?: "light" | "dark"; isMobile?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    // Palette per theme
    const isLight = themeMode === "light";
    const uOpacity = isLight ? 0.75 : 0.6;
    const uDispersion = isLight ? 0.06 : 0.08;
    const colorA = isLight ? new THREE.Color(0.65, 0.82, 1.0) : new THREE.Color(0.18, 0.5, 0.9);
    const colorB = isLight ? new THREE.Color(0.6, 0.9, 1.0) : new THREE.Color(0.22, 0.6, 0.88);
    const baseColor = isLight ? new THREE.Color(0.86, 0.92, 1.0) : new THREE.Color(0.04, 0.09, 0.18);

    const uniforms = {
      uTime: { value: 0 },
      uOpacity: { value: uOpacity },
      uColorA: { value: colorA },
      uColorB: { value: colorB },
      uBaseColor: { value: baseColor },
      uDispersion: { value: uDispersion },
    } as Record<string, THREE.IUniform>;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uOpacity;
      uniform float uDispersion;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform vec3 uBaseColor;

      float roundedMask(vec2 uv) {
        float x = abs(uv.x - 0.5);
        float core = smoothstep(0.55, 0.0, x);
        float soft = smoothstep(0.70, 0.0, x);
        float radial = mix(core * core, soft, 0.6);
        float top = smoothstep(0.00, 0.18, uv.y);
        float bottom = 1.0 - smoothstep(0.82, 1.00, uv.y);
        return radial * top * bottom;
      }

      float wave(float x) { return 0.5 + 0.5 * sin(x); }

      void main() {
        vec2 uv = vUv;
        float t = uTime * 1.6;

        uv.x += 0.035 * sin(uv.y * 9.0 + t * 2.4);
        uv.x += 0.015 * sin(uv.y * 18.0 - t * 3.2);

        float rCh = roundedMask(vec2(uv.x + uDispersion * sin(t + 0.0), uv.y));
        float gCh = roundedMask(vec2(uv.x + uDispersion * sin(t + 2.1), uv.y));
        float bCh = roundedMask(vec2(uv.x + uDispersion * sin(t + 4.2), uv.y));

        vec3 spectral = vec3(rCh, gCh, bCh);
        vec3 watery = mix(uColorA, uColorB, smoothstep(0.0, 1.0, uv.y));

        vec3 mixed = mix(watery * 0.8, spectral * watery, 0.35);

        float intensity = 0.5 + 0.5 * smoothstep(0.0, 1.0, uv.y);
        intensity *= 0.92 + 0.08 * wave(t * 6.0 + uv.y * 12.0);

        float x = abs(uv.x - 0.5);
        float centerFalloff = mix(1.0, 0.7, smoothstep(0.0, 0.12, 0.12 - x));
        float edgeFalloff = mix(1.0, 0.8, smoothstep(0.45, 0.55, x));

        vec3 color = mixed * intensity * 1.2;
        color *= centerFalloff * edgeFalloff;

        color = mix(uBaseColor, color, 0.65);

        float alpha = clamp((rCh + gCh + bCh) / 3.0, 0.0, 1.0) * uOpacity;
        gl_FragColor = vec4(color, alpha);
      }
    `;

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    return mat;
  }, [themeMode]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const elapsed = state.clock.getElapsedTime();
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = elapsed + index * 4;
    meshRef.current.rotation.z = Math.sin(elapsed * 0.6 + index) * 0.16;
    meshRef.current.rotation.y = Math.sin(elapsed * 0.5 + index * 0.5) * 0.12;
    const baseScale = 1 + 0.08 * Math.sin(elapsed * 1.8 + index);
    meshRef.current.scale.set(baseScale, 1.0, 1.0);
  });

  const planeSize: [number, number] = isMobile ? [6, 9] : [8, 12];

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} renderOrder={index}>
      <planeGeometry args={[planeSize[0], planeSize[1], 1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function BeamsGroup({ themeMode, isMobile, count }: { themeMode?: "light" | "dark"; isMobile: boolean; count: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.08;
    groupRef.current.rotation.x = Math.cos(t * 0.18) * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {[...Array(count)].map((_, i) => (
        <group key={i} rotation={[0, 0, (i / count) * Math.PI * 2]} position={[0, 0, -i * 0.02]}>
          <Beam index={i} themeMode={themeMode} isMobile={isMobile} />
        </group>
      ))}
    </group>
  );
}

export default function LightBeams({ className, sizePercent = 80, mobileSizePercent = 90, beamsCount = 10, themeMode = "dark" }: LightBeamsProps) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const clamped = Math.max(10, Math.min(150, isMobile ? mobileSizePercent : sizePercent));
  const dpr: [number, number] = isMobile ? [1, 1.25] : [1, 2];
  const count = isMobile ? Math.min(6, beamsCount) : beamsCount;

  return (
    <div
      className={className}
      style={{
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={dpr}
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: `${clamped}%`, height: `${clamped}%` }}
      >
        <BeamsGroup themeMode={themeMode} isMobile={isMobile} count={count} />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
}


