import type { SVGMotionProps } from 'motion/react';
import { motion as m } from 'motion/react';

type Props = SVGMotionProps<SVGSVGElement> & {
  isFullscreen: boolean;
};

const FullscreenIconSVG: React.FC<Props> = ({ isFullscreen, ...rest }) => {
  const brokenPath =
    'M5.667 1H1v4.667M15 5.667V1h-4.667M10.333 15H15v-4.667M5.667 15H1v-4.667';
  const fullPath = 'M2 2h12v12H2z';

  return (
    <m.svg xmlns="http://www.w3.org/2000/svg" fill="none" {...rest}>
      <m.path
        fill="#4DA2FF"
        animate={{
          scale: isFullscreen ? 1.6 : 1,
        }}
        d="M4 4h8v8H4z"
      />
      <m.path
        stroke="var(--text-primary-clr)"
        strokeWidth={2}
        animate={isFullscreen ? { d: fullPath } : { d: brokenPath }}
        d={brokenPath}
      />
    </m.svg>
  );
};

export default FullscreenIconSVG;
