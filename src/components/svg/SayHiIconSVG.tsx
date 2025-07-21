import type { SVGMotionProps } from 'motion/react';
import { motion as m } from 'motion/react';

interface SayHiIconSVGProps extends SVGMotionProps<SVGSVGElement> {
  triggerAnimate?: boolean; // 外部控制是否触发动画
}

const SayHiIconSVG = ({
  triggerAnimate = false,
  ...props
}: SayHiIconSVGProps) => {
  return (
    <m.svg viewBox="-5 -5 30 30" xmlns="http://www.w3.org/2000/svg" {...props}>
      <m.path
        fill="#4DA2FF"
        stroke="var(--text-primary-clr)"
        strokeWidth={2}
        animate={triggerAnimate ? { scale: [1, 1.3, 1] } : undefined}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        d="m9.342 1 .27.014a2.744 2.744 0 0 1 1.661.78l.001.002c.524.52.847 1.209.909 1.944l.039.465.023.36c.038.84-.04 1.681-.231 2.501v.001l-.058.248h4.194c.213 0 .425.038.624.109l.197.083.185.104c.12.077.229.168.327.27l.14.162.12.177c.072.122.13.252.173.387l.052.208.027.212c.015.213-.007.428-.065.634l-2.279 8A1.843 1.843 0 0 1 13.873 19H2.849c-.488 0-.958-.192-1.305-.537A1.839 1.839 0 0 1 1 17.158V8.816c0-.332.09-.658.26-.943l.067-.104c.165-.238.384-.435.639-.573L4.79 5.668l.274-.161a4.475 4.475 0 0 0 1.503-1.589l1.128-2.015C8.01 1.343 8.602 1 9.24 1h.103Z"
      />
    </m.svg>
  );
};

export default SayHiIconSVG;
