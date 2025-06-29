import { useEffect, useRef } from 'react';

type ScrambleTextProps = {
  text: string;
  className?: string;
};

class TextScramble {
  el: HTMLElement;
  chars: string;
  queue: any[];
  frameRequest: number = 0;
  frame: number = 0;
  resolve: () => void = () => {};

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = '!<>-_/[]{}=+*^?)$#________';
    this.update = this.update.bind(this);
    this.queue = [];
  }

  setText(newText: string) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end, char: '' });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const ScrambleText = ({ text, className = '' }: ScrambleTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const scrambler = new TextScramble(ref.current);
    let active = true;

    const loop = () => {
      if (!active) return;
      scrambler.setText(text).then(() => {
        setTimeout(loop, (Math.floor(Math.random() * 3) + 2) * 1000);
      });
    };

    loop();

    return () => {
      active = false;
      cancelAnimationFrame(scrambler.frameRequest);
    };
  }, [text]);

  return <span ref={ref} className={className}></span>;
};

export default ScrambleText;
