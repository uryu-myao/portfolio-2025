'use client';
import { useEffect, useRef } from 'react';

const CanvasGridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridSize = 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const dpr = window.devicePixelRatio || 1;

    let width = window.innerWidth;
    let height = window.innerHeight;

    let cols = Math.ceil(width / gridSize);
    let rows = Math.ceil(height / gridSize);

    const grid: { alpha: number; color: string | null }[][] = Array.from(
      { length: rows },
      () => Array.from({ length: cols }, () => ({ alpha: 0, color: null }))
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

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      cols = Math.ceil(width / gridSize);
      rows = Math.ceil(height / gridSize);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid lines
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

      const col = Math.floor(mouseX / gridSize);
      const row = Math.floor(mouseY / gridSize);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cell = grid[y][x];

          if (x === col && y === row) {
            cell.alpha = 1;
            if (!cell.color) {
              cell.color = getRandomColor();
            }
          } else if (cell.alpha > 0) {
            cell.alpha -= 0.02;
            if (cell.alpha < 0) {
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

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="canvas-grid"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default CanvasGridBackground;
