import React, { useRef, useEffect } from 'react';
import '@/styles/components/HoverVideo.scss';
import ExternalLinkIcon from '@/assets/icon-external-link.svg';

interface HoverVideoLinkProps {
  href: string;
  text: string;
  tag: string;
  videoSrc: string;
}

const HoverVideoLink: React.FC<HoverVideoLinkProps> = ({
  href,
  text,
  tag,
  videoSrc,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (videoWrapperRef.current) {
        videoWrapperRef.current.style.left = `${e.clientX}px`;
        videoWrapperRef.current.style.top = `${e.clientY}px`;
        videoWrapperRef.current.style.transform = 'translate(-50%, -50%)';
      }
    };

    const handleMouseEnter = () => {
      if (videoRef.current) {
        videoRef.current.play();
      }
      if (videoWrapperRef.current) {
        videoWrapperRef.current.classList.add('visible');
      }
      document.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseLeave = () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      if (videoWrapperRef.current) {
        videoWrapperRef.current.classList.remove('visible');
      }
      document.removeEventListener('mousemove', handleMouseMove);
    };

    const linkEl =
      videoWrapperRef.current?.parentElement?.querySelector(
        '.hover-video-link'
      );
    if (linkEl) {
      linkEl.addEventListener('mouseenter', handleMouseEnter);
      linkEl.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (linkEl) {
        linkEl.removeEventListener('mouseenter', handleMouseEnter);
        linkEl.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <li className="hover-video-item">
      <a
        className="hover-video-link"
        href={href}
        target="_blank"
        rel="noopener noreferrer">
        {' '}
        <span className="hover-video-text">
          <img
            className="btn-cta-icon"
            src={ExternalLinkIcon}
            alt="External link"
          />
          {text}
        </span>
        <span className="hover-video-tag">{tag}</span>
      </a>
      <div className="hover-video-cont" ref={videoWrapperRef}>
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
    </li>
  );
};

export default HoverVideoLink;
