import type { SVGProps } from 'react';

const MailIconSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 27 21" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="var(--text-primary-clr)"
      d="M2.991 20.783c-.731 0-1.358-.25-1.878-.749-.52-.499-.782-1.1-.783-1.801v-15.3c0-.702.261-1.302.783-1.8A2.626 2.626 0 0 1 2.99.382h21.287c.732 0 1.359.25 1.88.75.522.5.782 1.1.781 1.8v15.3c0 .7-.26 1.301-.78 1.801-.521.5-1.148.75-1.88.749H2.99ZM13.635 13l10.643-6.375V4.933l-10.643 6.375L2.99 4.933v1.692L13.635 13Z"
    />
  </svg>
);
export default MailIconSVG;
