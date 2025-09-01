"use client";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useEffect } from "react";

// Type definition for shader uniforms
type GridUniforms = {
  uTime: number;
  uMouse: THREE.Vector2;
  uTargetMouse: THREE.Vector2;
  uResolution: THREE.Vector2;
  uPixelRatio: number;
};

// Custom shader material
const GridMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uTargetMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1920, 1080),
    uPixelRatio: 1.0,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
  uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uTargetMouse;
    uniform vec2 uResolution;
    uniform float uPixelRatio;
    varying vec2 vUv;

    // Easing function for smooth transitions
    float easeOutCubic(float t) {
      return 1.0 - pow(1.0 - t, 3.0);
    }

    // Noise function for organic movement
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      // Convert UV coordinates (0-1) to pixel coordinates
      vec2 pixelCoord = vUv * uResolution;
      
      // Define grid size in pixels (50px squares)
      float gridSizePx = 50.0;
      
      // Calculate grid position
      vec2 gridPos = pixelCoord / gridSizePx;
      vec2 grid = fract(gridPos);
      
      // Create grid lines with pixel-perfect thickness
      float lineThickness = 1.0; // 1 pixel thick lines
      float normalizedThickness = lineThickness / gridSizePx;
      
      float line = step(grid.x, normalizedThickness) + 
                   step(1.0 - grid.x, normalizedThickness) +
                   step(grid.y, normalizedThickness) + 
                   step(1.0 - grid.y, normalizedThickness);

      // Create animated glow center with organic movement
      vec2 animatedCenter = uMouse;
      
      // Add slow circular motion
      float slowTime = uTime * 0.3;
      animatedCenter.x += sin(slowTime) * 30.0;
      animatedCenter.y += cos(slowTime * 0.7) * 25.0;
      
      // Add subtle noise-based movement
      float noiseTime = uTime * 0.5;
      vec2 noiseOffset = vec2(
        noise(vec2(noiseTime, 0.0)) - 0.5,
        noise(vec2(0.0, noiseTime + 100.0)) - 0.5
      ) * 15.0;
      animatedCenter += noiseOffset;
      
      // Mouse interaction with smooth interpolation
      float mouseDistPx = distance(pixelCoord, animatedCenter);
      float glowRadius = 500.0;
      
      // Create multiple glow layers for smoother falloff
      float glow1 = smoothstep(glowRadius, 0.0, mouseDistPx);
      float glow2 = smoothstep(glowRadius * 0.7, 0.0, mouseDistPx);
      float glow3 = smoothstep(glowRadius * 0.4, 0.0, mouseDistPx);
      
      // Combine glows with different intensities
      float glow = glow1 * 0.3 + glow2 * 0.4 + glow3 * 0.8;
      
      // Apply cubic easing for smoother transitions
      glow = easeOutCubic(glow);
      
      // Add dynamic pulsing with varying frequency
      float pulse1 = sin(uTime * 2.0) * 0.05 + 0.95;
      float pulse2 = sin(uTime * 3.5 + 1.57) * 0.03 + 0.97; // Phase shifted
      float pulse = pulse1 * pulse2;
      glow *= pulse;
      
      // Add breathing effect based on distance from mouse
      float breathingSpeed = 1.5;
      float breathing = sin(uTime * breathingSpeed) * 0.1 + 0.9;
      float mouseInfluence = smoothstep(500.0, 0.0, distance(pixelCoord, uMouse));
      glow *= mix(1.0, breathing, mouseInfluence * 0.5);
      
      // Final color calculation
      vec3 gridColor = vec3(0.239, 0.592, 0.482);
      float intensity = line * glow;

      if (intensity < 0.01) {
        discard;
      }

      gl_FragColor = vec4(gridColor, intensity);
    }
  `
);

extend({ GridMaterial });

const GridBackground = () => {
  const material = useRef<THREE.ShaderMaterial & GridUniforms>(null!);
  const { size, viewport, gl } = useThree();
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const currentMouse = useRef(new THREE.Vector2(0, 0));

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uTime = clock.getElapsedTime();

      // Smooth mouse interpolation with easing
      const lerpFactor = 0.08; // Lower = smoother, higher = more responsive
      currentMouse.current.lerp(targetMouse.current, lerpFactor);

      // Update uniforms
      material.current.uMouse.copy(currentMouse.current);
      material.current.uTargetMouse.copy(targetMouse.current);
      material.current.uResolution.set(size.width, size.height);
      material.current.uPixelRatio = gl.getPixelRatio();
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (material.current) {
        // Update target mouse position
        targetMouse.current.set(e.clientX, size.height - e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 1, 1]} />
      <gridMaterial ref={material} transparent />
    </mesh>
  );
};

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 opacity-35 after:content-[''] after:bg-gradient-to-b after:from-transparent after:to-white after:absolute after:inset-0 after:z-10">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <GridBackground />
      </Canvas>
    </div>
  );
}
