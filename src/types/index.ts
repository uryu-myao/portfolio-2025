import { MouseEventHandler } from 'react';

export interface Card {}
export interface CloseButtonProps {
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}
