import type { SVGMotionProps } from 'motion/react';
import { motion as m } from 'motion/react';
import { useTheme } from '@/hooks/useTheme';

const moonPath =
  'M17.963 12.956c.181-.432-.337-.8-.772-.608a6.845 6.845 0 0 1-2.756.576c-3.72 0-6.735-2.955-6.735-6.6 0-1.231.349-2.436 1.008-3.476.252-.398-.051-.95-.513-.832C4.63 2.926 2 6.1 2 9.877 2 14.364 5.711 18 10.29 18c3.467 0 6.436-2.084 7.673-5.044Z';
const starPath =
  'M13.723 3.082c-.42-.281-.922.22-.642.64l.5.751a1.85 1.85 0 0 1 0 2.054l-.5.75c-.28.42.222.922.643.641l.75-.5a1.849 1.849 0 0 1 2.053 0l.75.5c.42.281.922-.22.641-.64l-.5-.75a1.85 1.85 0 0 1 0-2.055l.5-.75c.281-.42-.22-.922-.642-.641l-.749.5a1.849 1.849 0 0 1-2.054 0l-.75-.5Z';

const ThemeIconSVG = (props: SVGMotionProps<SVGSVGElement>) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <m.svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <m.g animate={{ rotate: isDark ? 360 : 0 }}>
        <m.path
          d={moonPath}
          fill="#4DA2FF"
          initial={{ opacity: 0 }}
          animate={{ opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <m.circle
          cx="10"
          cy="10"
          r="5"
          fill="#FFD639"
          initial={{ opacity: 0 }}
          animate={{ opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </m.g>
      <m.g>
        {isDark ? (
          <m.path
            d={starPath}
            fill="#fff"
            initial={{ opacity: 0, scale: 0.1, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        ) : (
          <m.g
            id="rays"
            fill="var(--text-primary-clr)"
            stroke="var(--text-primary-clr)"
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}>
            <path d="M10.5 17.5V19.5H9.5V17.5H10.5Z" />
            <path d="M10.5 0.5V2.5H9.5V0.5H10.5Z" />
            <path d="M2.5 9.5V10.5H0.5V9.5H2.5Z" />
            <path d="M19.5 9.5V10.5H17.5V9.5H19.5Z" />
            <path d="M5.051 15.657L3.637 17.071L2.93 16.364L4.344 14.95L5.051 15.657Z" />
            <path d="M17.071 3.636L15.656 5.051L14.949 4.344L16.364 2.929L17.071 3.636Z" />
            <path d="M5.051 4.344L4.344 5.051L2.93 3.637L3.637 2.93L5.051 4.344Z" />
            <path d="M17.071 16.364L16.364 17.071L14.949 15.656L15.656 14.949L17.071 16.364Z" />
          </m.g>
        )}
      </m.g>
    </m.svg>
  );
};

export default ThemeIconSVG;
