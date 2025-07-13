import type { SVGProps } from 'react';

interface FolderIconSVGProps extends SVGProps<SVGSVGElement> {
  folderColor?: string;
  paperColor?: string;
}

const FolderIconSVG = ({
  folderColor = '#FFD639', // 默认黄色
  paperColor = '#EBE2D8', // 默认米色
  ...props
}: FolderIconSVGProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path
      fill="#00171F"
      d="M35.191 1a4 4 0 0 1 3.659 2.382L40.892 8H81a5 5 0 0 1 5 5v48a2 2 0 0 1-2 2H12C6.477 63 2 58.523 2 53V13c0-.49.07-.963.202-1.41.051-.353.15-.709.305-1.058l3.161-7.15A4 4 0 0 1 9.326 1h25.865Z"
    />
    <path
      fill={paperColor}
      stroke="#00171F"
      strokeWidth={2}
      d="M4.727 14.586 75.633 2.083l7.64 43.332-70.905 12.502z"
    />
    <path
      fill={folderColor}
      stroke="#00171F"
      strokeWidth={2}
      d="M2.002 20h83.964a1 1 0 0 1 1 .999l.032 40a1 1 0 0 1-1 1.001H2.034a1 1 0 0 1-1-.999l-.032-40a1 1 0 0 1 1-1.001Z"
    />
  </svg>
);
export default FolderIconSVG;
