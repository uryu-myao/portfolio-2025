import type { SVGMotionProps } from 'motion/react';
import { motion as m } from 'motion/react';

interface FolderIconSVGProps extends SVGMotionProps<SVGSVGElement> {
  folderColor?: string;
  paperContent?: React.ReactNode;
  isOpen?: boolean;
}

const FolderIconSVG = ({
  folderColor = '#FFD639',
  isOpen = false,
  ...props
}: FolderIconSVGProps) => {
  const closedBackPath =
    'M35.191 1a4 4 0 0 1 3.659 2.382L40.892 8H81a5 5 0 0 1 5 5v48a2 2 0 0 1-2 2H12C6.477 63 2 58.523 2 53V13c0-.49.07-.963.202-1.41.051-.353.15-.709.305-1.058l3.161-7.15A4 4 0 0 1 9.326 1h25.865Z';
  const closedFrontPath =
    'M2.002 20h83.964a1 1 0 0 1 1 .999l.032 40a1 1 0 0 1-1 1.001H2.034a1 1 0 0 1-1-.999l-.032-40a1 1 0 0 1 1-1.001Z';

  const openedBackPath =
    'M35.191 18a4 4 0 0 1 3.659 2.382L40.892 25H81a5 5 0 0 1 5 5v30a2 2 0 0 1-2 2H12C6.477 62 2 57.523 2 52V30c0-.49.07-.963.202-1.41.051-.353.15-.709.305-1.058l3.161-7.15A4 4 0 0 1 9.326 18h25.865Z';
  const openedFrontPath =
    'M2.004 43h83.964a1 1 0 0 1 1 .998l.028 16a1 1 0 0 1-1 1.002H2.032a1 1 0 0 1-1-.998l-.028-16a1 1 0 0 1 1-1.002Z';

  return (
    <m.svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <m.path
        fill="#00171F"
        initial={false}
        animate={{ d: isOpen ? openedBackPath : closedBackPath }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      />
      <m.g
        style={{ transform: 'translate(7px, 0)' }}
        animate={{ x: 0, y: isOpen ? -7 : 0 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}>
        {props.paperContent}
      </m.g>
      <m.path
        fill={folderColor}
        stroke="#00171F"
        strokeWidth={2}
        initial={false}
        animate={{ d: isOpen ? openedFrontPath : closedFrontPath }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      />
    </m.svg>
  );
};
export default FolderIconSVG;
