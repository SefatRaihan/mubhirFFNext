"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export function LiquidEffectAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const scriptRef = useRef<HTMLScriptElement | null>(null)

    const handleLiquidReady = useCallback(() => {
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        // Listen for the liquid-ready event dispatched by the injected script
        window.addEventListener("liquid-ready", handleLiquidReady)
        return () => window.removeEventListener("liquid-ready", handleLiquidReady)
    }, [handleLiquidReady])

    useEffect(() => {
        if (!canvasRef.current) return

        // Generate a gradient image matching the brand colors
        const gradientCanvas = document.createElement("canvas")
        gradientCanvas.width = 1200
        gradientCanvas.height = 800
        const ctx = gradientCanvas.getContext("2d")
        if (ctx) {
            const gradient = ctx.createLinearGradient(0, gradientCanvas.height, gradientCanvas.width, 0)
            gradient.addColorStop(0, "#2A056D")
            gradient.addColorStop(1, "#6F0767")
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height)
        }
        const gradientDataUrl = gradientCanvas.toDataURL("image/png")

        // Remove any previously injected script to avoid duplicates
        if (scriptRef.current && document.body.contains(scriptRef.current)) {
            document.body.removeChild(scriptRef.current)
            scriptRef.current = null
        }

        // Inject the module script with retry logic for canvas readiness
        const script = document.createElement("script")
        script.type = "module"
        script.textContent = `
(async function() {
  try {
    const { default: LiquidBackground } = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js');

    // Poll for the canvas element (may not be in DOM yet during fast navigation)
    let canvas = null;
    for (let i = 0; i < 20; i++) {
      canvas = document.getElementById('liquid-canvas');
      if (canvas) break;
      await new Promise(r => setTimeout(r, 150));
    }

    if (!canvas) {
      console.warn('LiquidEffectAnimation: canvas not found after polling');
      return;
    }

    // Dispose previous instance if it exists (e.g. HMR or re-mount)
    if (window.__liquidApp && window.__liquidApp.dispose) {
      try { window.__liquidApp.dispose(); } catch(e) {}
    }

    const app = LiquidBackground(canvas);
    app.loadImage('${gradientDataUrl}');
    app.liquidPlane.material.metalness = 0.1;
    app.liquidPlane.material.roughness = 0.8;
    app.liquidPlane.uniforms.displacementScale.value = 8;
    app.setRain(false);
    window.__liquidApp = app;

    // Notify React that the liquid effect is ready
    window.dispatchEvent(new CustomEvent('liquid-ready'));
  } catch (err) {
    console.warn('LiquidEffectAnimation: init failed', err);
  }
})();
`
        document.body.appendChild(script)
        scriptRef.current = script

        return () => {
            if (window.__liquidApp && window.__liquidApp.dispose) {
                try { window.__liquidApp.dispose() } catch (e) { /* ignore */ }
            }
            window.__liquidApp = undefined
            if (scriptRef.current && document.body.contains(scriptRef.current)) {
                document.body.removeChild(scriptRef.current)
                scriptRef.current = null
            }
        }
    }, [])

    return (
        <div
            className="absolute inset-0 m-0 w-full h-full touch-none overflow-hidden z-0"
            style={{ fontFamily: '"Montserrat", serif' }}
        >
            {/* CSS gradient fallback — visible while the liquid effect loads, prevents black flash */}
            <div
                className="absolute inset-0 w-full h-full transition-opacity duration-700"
                style={{
                    background: "linear-gradient(to top right, #2A056D, #6F0767)",
                    opacity: isLoaded ? 0 : 1,
                    pointerEvents: "none",
                }}
            />
            <canvas ref={canvasRef} id="liquid-canvas" className="absolute inset-0 w-full h-full" />
        </div>
    )
}

declare global {
    interface Window {
        __liquidApp?: any
    }
}
