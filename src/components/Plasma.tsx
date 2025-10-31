"use client";
import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Transform, Camera } from "ogl";

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: "forward" | "reverse" | "pingpong";
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

/* -------------------------- SHADERS (GLSL 300 / 100) -------------------------- */

// WebGL2 (GLSL ES 300)
const vertex300 = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment300 = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;

  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);

  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;

  // 60 iters desktop; we lean on DPR=1 for mobile perf
  for (vec2 r = iResolution.xy, Q; ++i < 60.; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y));
    p.z -= 4.;
    S = p;
    d = p.y-T;
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05);
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T));
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4;
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  rgb = clamp(rgb, 0.0, 1.0);

  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));

  float alpha = length(rgb) * uOpacity;
  fragColor = vec4(finalColor, alpha);
}
`;

// WebGL1 (GLSL ES 100) — Safari-stable
const vertex100 = `
precision highp float;
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment100 = `
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
varying vec2 vUv;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;

  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);

  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;

  for (vec2 r = iResolution.xy, Q; ++i < 60.; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y));
    p.z -= 4.;
    S = p;
    d = p.y-T;
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05);
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T));
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4;
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  o.xyz = tanh(O/1e4);
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = clamp(o.rgb, 0.0, 1.0);

  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));

  float alpha = length(rgb) * uOpacity;
  gl_FragColor = vec4(finalColor, alpha);
}
`;

/* --------------------------------- Component -------------------------------- */

export const Plasma: React.FC<PlasmaProps> = ({
  color = "#ffffff",
  speed = 1,
  direction = "forward",
  scale = 1,
  opacity = 1,
  mouseInteractive = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer: Renderer | null = null;
    let raf = 0;
    let cleanupFn: (() => void) | null = null;
    let initialized = false;

    const init = () => {
      if (initialized || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width < 5 || rect.height < 5) {
        requestAnimationFrame(init);
        return;
      }
      initialized = true;

      const useCustomColor = color ? 1.0 : 0.0;
      const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];
      const directionMultiplier = direction === "reverse" ? -1.0 : 1.0;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );

      // Prefer WebGL2; fall back to 1 on Safari/older
      const wantWebGL2 =
        !isSafari && !!document.createElement("canvas").getContext("webgl2");
      renderer = new Renderer({
        webgl: wantWebGL2 ? 2 : 1,
        alpha: false, // opaque fixes Safari flicker
        antialias: false,
        dpr: isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2),
      });

      const gl = renderer.gl;
      const canvas = gl.canvas as HTMLCanvasElement;

      // Prevent Safari color-space conversion artifacts (guarded)
      // @ts-expect-error: constant not typed on WebGL2
      if (
        typeof (gl as any).UNPACK_COLORSPACE_CONVERSION_WEBGL !== "undefined"
      ) {
        // @ts-expect-error
        gl.pixelStorei(
          (gl as any).UNPACK_COLORSPACE_CONVERSION_WEBGL,
          (gl as any).NONE
        );
      }

      canvas.style.display = "block";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      containerRef.current.appendChild(canvas);

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: wantWebGL2 ? vertex300 : vertex100,
        fragment: wantWebGL2 ? fragment300 : fragment100,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new Float32Array([1, 1]) },
          uCustomColor: { value: new Float32Array(customColorRgb) },
          uUseCustomColor: { value: useCustomColor },
          uSpeed: { value: speed * 0.4 },
          uDirection: { value: directionMultiplier },
          uScale: { value: scale },
          uOpacity: { value: opacity },
          uMouse: { value: new Float32Array([0, 0]) },
          uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });

      // Proper scene graph + camera (stable across GL1/GL2)
      const scene = new Transform();
      mesh.setParent(scene);

      const camera = new Camera(gl);
      camera.position.z = 1;

      const setSize = () => {
        if (!renderer || !containerRef.current) return;
        const r = containerRef.current.getBoundingClientRect();
        renderer.setSize(r.width, r.height);
        const res = program.uniforms.iResolution.value as Float32Array;
        res[0] = gl.drawingBufferWidth;
        res[1] = gl.drawingBufferHeight;
      };

      const ro = new ResizeObserver(() => setSize());
      ro.observe(containerRef.current);
      setSize();

      const handleMouseMove = (e: MouseEvent) => {
        if (!mouseInteractive || !renderer || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mousePos.current.x = e.clientX - rect.left;
        mousePos.current.y = e.clientY - rect.top;
        const m = program.uniforms.uMouse.value as Float32Array;
        m[0] = mousePos.current.x;
        m[1] = mousePos.current.y;
      };

      if (mouseInteractive) {
        containerRef.current.addEventListener("mousemove", handleMouseMove);
      }

      const t0 = performance.now();
      const loop = (t: number) => {
        if (!renderer) return;

        // Clamp time to avoid Safari resume jumps
        const timeValueRaw = (t - t0) * 0.001;
        const timeValue = Math.max(0, Math.min(timeValueRaw, 1e6));

        if (direction === "pingpong") {
          const cycle = Math.sin(timeValue * 0.5) * directionMultiplier;
          (program.uniforms.uDirection as { value: number }).value = cycle;
        }
        (program.uniforms.iTime as { value: number }).value = timeValue;

        (renderer as any).render({
          scene,
          camera,
          target: null,
          update: true,
          sort: false,
          frustumCull: false,
          clear: true,
        });

        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      cleanupFn = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        if (mouseInteractive && containerRef.current) {
          containerRef.current.removeEventListener(
            "mousemove",
            handleMouseMove
          );
        }
        if (renderer) {
          const gl = renderer.gl;
          const canvas = gl.canvas as HTMLCanvasElement;
          gl.getExtension("WEBGL_lose_context")?.loseContext();
          if (canvas.parentElement) canvas.parentElement.removeChild(canvas);
          renderer = null;
        }
      };
    };

    const delay = setTimeout(() => init(), 60);

    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(raf);
      cleanupFn?.();
      renderer = null;
    };
  }, [color, speed, direction, scale, opacity, mouseInteractive]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-black will-change-transform"
      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
    />
  );
};

export default Plasma;
