'use client';
import { useEffect, useRef } from 'react';

const CanvasGridBackground = () => {
  const staticCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const dynamicCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const staticCanvas = staticCanvasRef.current;
    const dynamicCanvas = dynamicCanvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const gridSize = window.innerWidth < 768 ? 16 : 32;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let cols = Math.ceil(width / gridSize);
    let rows = Math.ceil(height / gridSize);

    // Draw static grid lines once
    if (staticCanvas) {
      const ctx = staticCanvas.getContext('2d');
      if (ctx) {
        staticCanvas.width = width * dpr;
        staticCanvas.height = height * dpr;
        staticCanvas.style.width = `${width}px`;
        staticCanvas.style.height = `${height}px`;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.lineWidth = 1;
        for (let x = 0; x <= width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y <= height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }
    }

    // Interactive animation on dynamic canvas
    if (!dynamicCanvas) return;
    const ctx = dynamicCanvas.getContext('2d');
    if (!ctx) return;

    const grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        alpha: 0,
        color: null as string | null,
      }))
    );

    let mouseX = -1;
    let mouseY = -1;
    const getRandomColor = (alpha = 1) => {
      const colors = [
        `rgba(100, 200, 255, ${alpha})`,
        `rgba(160, 255, 200, ${alpha})`,
        `rgba(160, 160, 255, ${alpha})`,
        `rgba(255, 255, 200, ${alpha})`,
        `rgba(200, 220, 255, ${alpha})`,
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    let lastDraw = 0;
    const draw = (timestamp: number) => {
      if (timestamp - lastDraw < 1000 / 30) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      lastDraw = timestamp;

      ctx.clearRect(0, 0, width, height);

      const col = Math.floor(mouseX / gridSize);
      const row = Math.floor(mouseY / gridSize);

      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        const cell = grid[row][col];
        cell.alpha = 1;
        if (!cell.color) cell.color = getRandomColor();
      }

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cell = grid[y][x];
          if (cell.alpha > 0) {
            cell.alpha -= 0.02;
            if (cell.alpha <= 0) {
              cell.alpha = 0;
              cell.color = null;
            }
          }

          if (cell.alpha > 0 && cell.color) {
            const rgba = cell.color.replace(
              /[\d.]+\)$/g,
              `${cell.alpha.toFixed(2)})`
            );
            ctx.fillStyle = rgba;
            ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    dynamicCanvas.width = width * dpr;
    dynamicCanvas.height = height * dpr;
    dynamicCanvas.style.width = `${width}px`;
    dynamicCanvas.style.height = `${height}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <canvas
        ref={staticCanvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          backgroundColor: '#f8f8f8',
          zIndex: -2,
        }}
      />
      <canvas
        ref={dynamicCanvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
    </>
  );
};

export default CanvasGridBackground;
