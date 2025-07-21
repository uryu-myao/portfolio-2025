import type { SVGMotionProps } from 'motion/react';
import { motion as m } from 'motion/react';

interface FolderIconSVGProps extends SVGMotionProps<SVGSVGElement> {
  folderColor?: string;
  paperColor?: string;
  isOpen?: boolean;
}

const FolderIconSVG = ({
  folderColor = '#FFD639',
  paperColor = '#ffffff',
  isOpen = false,
  ...props
}: FolderIconSVGProps) => {
  const closedBackPath =
    'M35.191 1a4 4 0 0 1 3.659 2.382L40.892 8H81a5 5 0 0 1 5 5v48a2 2 0 0 1-2 2H12C6.477 63 2 58.523 2 53V13c0-.49.07-.963.202-1.41.051-.353.15-.709.305-1.058l3.161-7.15A4 4 0 0 1 9.326 1h25.865Z';
  const closedPaperPath =
    'M4.727 14.586 75.633 2.083l7.64 43.332-70.905 12.502z';
  const closedFrontPath =
    'M2.002 20h83.964a1 1 0 0 1 1 .999l.032 40a1 1 0 0 1-1 1.001H2.034a1 1 0 0 1-1-.999l-.032-40a1 1 0 0 1 1-1.001Z';

  const openedBackPath =
    'M35.191 18a4 4 0 0 1 3.659 2.382L40.892 25H81a5 5 0 0 1 5 5v30a2 2 0 0 1-2 2H12C6.477 62 2 57.523 2 52V30c0-.49.07-.963.202-1.41.051-.353.15-.709.305-1.058l3.161-7.15A4 4 0 0 1 9.326 18h25.865Z';
  const openedPaperPath = 'M8 1h72v44H8z';
  const openedFrontPath =
    'M2.003 37h83.964a1 1 0 0 1 1 .999l.03 22a1 1 0 0 1-1 1.001H2.033a1 1 0 0 1-1-.999l-.03-22a1 1 0 0 1 1-1.001Z';

  return (
    <m.svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <m.path
        fill="#00171F"
        initial={false}
        animate={{ d: isOpen ? openedBackPath : closedBackPath }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      />
      <m.path
        fill={paperColor}
        stroke="#00171F"
        strokeWidth={2}
        initial={false}
        animate={{ d: isOpen ? openedPaperPath : closedPaperPath }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      />
      <m.path
        fill={folderColor}
        stroke="#00171F"
        strokeWidth={2}
        initial={false}
        animate={{ d: isOpen ? openedFrontPath : closedFrontPath }}
        initial={false}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      />
    </m.svg>
  );
};
export default FolderIconSVG;
