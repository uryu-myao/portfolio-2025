import { CloseButtonProps } from '@/types';

const CloseButton = ({ handleClick }: CloseButtonProps) => {
  return (
    <button
      className="bg-white p-2"
      disabled={false}
      type={'button'}
      onClick={handleClick}>
      <span className="">x</span>
    </button>
  );
};

export default CloseButton;
