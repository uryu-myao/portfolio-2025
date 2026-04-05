'use client';
import { useEffect, useRef } from 'react';

const CanvasGridBackground = () => {
  const staticCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const dynamicCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const staticCanvas = staticCanvasRef.current;
    const dynamicCanvas = dynamicCanvasRef.current;
    if (!staticCanvas || !dynamicCanvas) return;

    const dpr = window.devicePixelRatio || 1;
    let mouseX = -1;
    let mouseY = -1;
    let animationId: number;

    const getRandomColor = (alpha = 1) => {
      const colors = [
        `rgba(90, 177, 187, ${alpha})`, // blue
        `rgba(243, 146, 55, ${alpha})`, // orange
        `rgba(176, 65, 62, ${alpha})`, // red
        `rgba(97, 152, 142, ${alpha})`, // green
        `rgba(0, 117, 196, ${alpha})`, // dark blue
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const startDrag = () => {
      isDraggingRef.current = true;
    };
    const endDrag = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', startDrag);
    window.addEventListener('mouseup', endDrag);

    const init = () => {
      cancelAnimationFrame(animationId);

      const width = window.innerWidth;
      const height = window.innerHeight;
      const gridSize = width < 768 ? 16 : 32;
      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      const staticCtx = staticCanvas.getContext('2d');
      if (staticCtx) {
        staticCanvas.width = width * dpr;
        staticCanvas.height = height * dpr;
        staticCanvas.style.width = `${width}px`;
        staticCanvas.style.height = `${height}px`;
        staticCtx.setTransform(1, 0, 0, 1, 0, 0);
        staticCtx.scale(dpr, dpr);

        staticCtx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        staticCtx.lineWidth = 1;
        for (let x = 0; x <= width; x += gridSize) {
          staticCtx.beginPath();
          staticCtx.moveTo(x, 0);
          staticCtx.lineTo(x, height);
          staticCtx.stroke();
        }
        for (let y = 0; y <= height; y += gridSize) {
          staticCtx.beginPath();
          staticCtx.moveTo(0, y);
          staticCtx.lineTo(width, y);
          staticCtx.stroke();
        }

        staticCtx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        staticCtx.lineWidth = 1;
        const crossSize = 8;

        for (let y = 0; y <= height; y += gridSize) {
          for (let x = 0; x <= width; x += gridSize) {
            staticCtx.beginPath();
            staticCtx.moveTo(x, y - crossSize / 2);
            staticCtx.lineTo(x, y + crossSize / 2);
            staticCtx.stroke();

            staticCtx.beginPath();
            staticCtx.moveTo(x - crossSize / 2, y);
            staticCtx.lineTo(x + crossSize / 2, y);
            staticCtx.stroke();
          }
        }
      }

      const ctx = dynamicCanvas.getContext('2d');
      if (!ctx) return;

      dynamicCanvas.width = width * dpr;
      dynamicCanvas.height = height * dpr;
      dynamicCanvas.style.width = `${width}px`;
      dynamicCanvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          alpha: 0,
          color: null as string | null,
        }))
      );

      let lastDraw = 0;
      const draw = (timestamp: number) => {
        if (timestamp - lastDraw < 1000 / 24) {
          animationId = requestAnimationFrame(draw);
          return;
        }
        lastDraw = timestamp;

        ctx.clearRect(0, 0, width, height);

        const col = Math.floor(mouseX / gridSize);
        const row = Math.floor(mouseY / gridSize);

        if (
          !isDraggingRef.current &&
          row >= 0 &&
          row < rows &&
          col >= 0 &&
          col < cols
        ) {
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

      animationId = requestAnimationFrame(draw);
    };

    init();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 150);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', startDrag);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* <div className="home-blur"></div> */}
      <canvas
        ref={staticCanvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          backgroundColor: '#394246',
          zIndex: -3,
        }}
      />
      <canvas
        ref={dynamicCanvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: -2,
        }}
      />
    </>
  );
};

export default CanvasGridBackground;
