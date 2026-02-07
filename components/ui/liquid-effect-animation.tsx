"use client"

import { useEffect, useRef } from "react"

export function LiquidEffectAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

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

        // Load the script dynamically
        const script = document.createElement("script")
        script.type = "module"
        script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';

      const canvas = document.getElementById('liquid-canvas');
      if (canvas) {
        const app = LiquidBackground(canvas);
        app.loadImage('${gradientDataUrl}');
        app.liquidPlane.material.metalness = 0.1;
        app.liquidPlane.material.roughness = 0.8;
        app.liquidPlane.uniforms.displacementScale.value = 8;
        app.setRain(false);
        window.__liquidApp = app;
      }
    `
        document.body.appendChild(script)

        return () => {
            if (window.__liquidApp && window.__liquidApp.dispose) {
                window.__liquidApp.dispose()
            }
            document.body.removeChild(script)
        }
    }, [])

    return (
        <div
            className="absolute inset-0 m-0 w-full h-full touch-none overflow-hidden z-0"
            style={{ fontFamily: '"Montserrat", serif' }}
        >
            <canvas ref={canvasRef} id="liquid-canvas" className="absolute inset-0 w-full h-full" />
        </div>
    )
}

declare global {
    interface Window {
        __liquidApp?: any
    }
}
