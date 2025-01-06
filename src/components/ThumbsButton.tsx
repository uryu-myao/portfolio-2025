'use client';

const ThumbsButton = () => {
  return (
    <button
      className="p-2"
      disabled={false}
      type={'button'}
      onClick={() => alert('👍')}>
      <span role="img" aria-label="thumbs up">
        👍
      </span>
    </button>
  );
};

export default ThumbsButton;
