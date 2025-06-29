import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import type { WindowProps } from '@/types';

import CloseIcon from '@/assets/icon-close.svg';
import FullscreenIcon from '@/assets/icon-zoom.svg';

import '@/styles/components/window.scss';

const Window: React.FC<WindowProps> = ({
  title,
  onClose,
  children,
  initialX,
  initialY,
  width,
  height,
  isFocused = false,
}) => {
  const defaultWidth = 700;
  const defaultHeight = 500;

  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const positionRef = useRef({ x: initialX, y: initialY });

  useLayoutEffect(() => {
    if (windowRef.current) {
      windowRef.current.style.transform = `translate(${initialX}px, ${initialY}px)`;
    }
  }, [initialX, initialY]);

  useEffect(() => {
    const el = windowRef.current;
    const header = headerRef.current;
    if (!el || !header) return;

    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    let isDragging = false;

    const onPointerDown = (e: PointerEvent) => {
      if (isFullscreen) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;

      const transform = el.style.transform;
      const match = /translate\(([^p]+)px,\s*([^p]+)px\)/.exec(transform);
      if (match) {
        startLeft = parseFloat(match[1]);
        startTop = parseFloat(match[2]);
      }

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const newX = startLeft + dx;
      const newY = startTop + dy;

      el.style.transform = `translate(${newX}px, ${newY}px)`;
      positionRef.current = { x: newX, y: newY };
    };

    const onPointerUp = () => {
      isDragging = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    header.addEventListener('pointerdown', onPointerDown);

    return () => {
      header.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isFullscreen]);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => onClose(), 200);
  };

  return (
    <div
      ref={windowRef}
      className={`window-inner ${isFullscreen ? 'fullscreen' : ''} ${
        animateOut ? 'animate-out' : ''
      } ${isFocused ? 'focused' : ''}`}
      style={{
        width: isFullscreen ? '100vw' : width || defaultWidth,
        height: isFullscreen ? '100vh' : height || defaultHeight,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999,
      }}>
      <header className="window-header" ref={headerRef}>
        <h4 className="window-header__ttl">{title}</h4>
        <div className="window-header__buttons">
          <button className="window-header__close" onClick={handleClose}>
            <img src={CloseIcon} alt="Close" />
          </button>
          <button
            className="window-header__full"
            onClick={() => setIsFullscreen(!isFullscreen)}>
            <img src={FullscreenIcon} alt="Toggle Fullscreen" />
          </button>
        </div>
      </header>
      <div className="window-body">{children}</div>
    </div>
  );
};

export default Window;
