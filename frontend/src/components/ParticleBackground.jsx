import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    const particleCount = 30;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = 3 + Math.random() * 2;
        this.color = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.3})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
          this.vx *= -1;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
          this.vy *= -1;
        }

        // Keep particles in bounds
        this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      // Check collision with another particle
      checkCollision(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = this.radius + other.radius;

        if (distance < minDistance) {
          // Calculate collision response
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          // Rotate velocities
          const vx1 = this.vx * cos + this.vy * sin;
          const vy1 = this.vy * cos - this.vx * sin;
          const vx2 = other.vx * cos + other.vy * sin;
          const vy2 = other.vy * cos - other.vx * sin;

          // Swap velocities (elastic collision)
          const finalVx1 = vx2;
          const finalVx2 = vx1;

          // Rotate back
          this.vx = finalVx1 * cos - vy1 * sin;
          this.vy = vy1 * cos + finalVx1 * sin;
          other.vx = finalVx2 * cos - vy2 * sin;
          other.vy = vy2 * cos + finalVx2 * sin;

          // Separate particles to prevent overlap
          const overlap = minDistance - distance;
          const separationX = (dx / distance) * overlap * 0.5;
          const separationY = (dy / distance) * overlap * 0.5;
          this.x -= separationX;
          this.y -= separationY;
          other.x += separationX;
          other.y += separationY;
        }
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw connections between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particles[i].x;
          const dy = particles[j].y - particles[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 120;

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Check collisions
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          particles[i].checkCollision(particles[j]);
        }
      }

      // Draw connections
      drawConnections();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

