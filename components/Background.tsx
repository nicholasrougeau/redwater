import React, { useEffect, useRef } from 'react';

export const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // Mouse tracking
    const mouse = { x: w / 2, y: h / 2 };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Move the large glow div
      if (glowRef.current) {
        glowRef.current.animate({
          left: `${e.clientX}px`,
          top: `${e.clientY}px`
        }, { duration: 2000, fill: "forwards" });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const particleCount = 40; // Reduced for better performance

    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 3 + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.maxLife = Math.random() * 200 + 100;
        this.life = Math.random() * this.maxLife;
        // Orange/Red/Yellow palette
        const colors = ['#fb923c', '#ea580c', '#ef4444', '#7c2d12'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Slight attraction to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 300) {
          this.vx += dx * 0.0001;
          this.vy += dy * 0.0001;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Friction to prevent infinite speedup
        this.vx *= 0.99;
        this.vy *= 0.99;

        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;

        this.life--;
        if (this.life <= 0) {
          this.life = this.maxLife;
          this.x = Math.random() * w;
          this.y = Math.random() * h;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = (this.life / this.maxLife) * 0.6;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleArray: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particleArray.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Draw grid
      ctx.strokeStyle = 'rgba(234, 88, 12, 0.05)'; // Subtle orange grid
      ctx.lineWidth = 1;
      const gridSize = 80;
      
      // Perspective grid effect
      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      particleArray.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      // Connect particles if close
      ctx.strokeStyle = 'rgba(251, 146, 60, 0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particleArray.length; i++) {
        for (let j = i; j < particleArray.length; j++) {
          const dx = particleArray[i].x - particleArray[j].x;
          const dy = particleArray[i].y - particleArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
             ctx.beginPath();
             ctx.moveTo(particleArray[i].x, particleArray[i].y);
             ctx.lineTo(particleArray[j].x, particleArray[j].y);
             ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Fixed background layer */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#050202]">
        {/* Static Ambient Glows - Warmer tones */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-900/15 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0c0502_90%)] pointer-events-none" />
      </div>

      {/* Dynamic Mouse Glow - Separate layer with higher z-index */}
      <div
        ref={glowRef}
        className="fixed w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 bg-accent-600/15 rounded-full blur-[140px] pointer-events-none z-[5]"
        style={{ top: '50%', left: '50%' }}
      />
    </>
  );
};