import React, { useEffect, useRef } from "react";

// Lightweight canvas background with moving connecting lines
export default function ContactStripBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // Floating tech nodes (dots)
    const nodeCount = 22;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: 1.5 + Math.random() * 1.5
    }));

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      const t = time * 0.0005;

      // Update and draw tech nodes (dots with glow)
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // node glow
        const pulse = 0.6 + 0.4 * Math.sin(t * 6 + n.x * 0.04 + n.y * 0.02);
        const radius = n.r * (0.7 + pulse * 0.5);

        const gradient = ctx.createRadialGradient(
          n.x,
          n.y,
          0,
          n.x,
          n.y,
          radius * 2
        );
        gradient.addColorStop(0, "rgba(255,255,255,0.95)");
        gradient.addColorStop(0.4, "rgba(255,255,255,0.55)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connect all dots with visible lines (tech network look)
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Fade with distance so near lines are stronger but everything is visible
          const maxVisible = Math.min(width, height) * 0.8;
          const alpha = Math.max(0.15, 1 - dist / maxVisible);

          ctx.strokeStyle = `rgba(230,240,255,${0.6 * alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
    />
  );
}


