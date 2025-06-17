import { useEffect, useState } from 'react';
import type { PasswordPopupProps } from '@/types';
import '@/styles/components/password-popup.scss';

import CloseIcon from '@/assets/icon-close.svg';
import ArrowIcon from '@/assets/icon-arrow.svg';

const PASSWORD = 'lovedesign';

const PasswordPopup: React.FC<PasswordPopupProps> = ({
  folderId,
  onSuccess,
  onClose,
}) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const unlocked = localStorage.getItem(`unlocked:${folderId}`);
    if (unlocked === 'true') {
      onSuccess();
      onClose();
    }
  }, [folderId, onSuccess, onClose]);

  const handleSubmit = () => {
    if (input === PASSWORD) {
      localStorage.setItem(`unlocked:${folderId}`, 'true');
      onSuccess();
      onClose();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="window-password">
      <button className="window-password__close" onClick={onClose}>
        <img src={CloseIcon} alt="Close" />
      </button>
      <div className={`shake-wrapper ${shake ? 'shake' : ''}`}>
        <div className="window-password-inner">
          <label className="window-password__label" htmlFor="password-input">
            Password
          </label>
          <input
            id="password-input"
            className="window-password__input"
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
          <button className="window-password__button" onClick={handleSubmit}>
            <img src={ArrowIcon} alt="" />
          </button>
        </div>
      </div>
      {error && (
        <p className="password-error text-en">Hmm, that doesn’t look right.</p>
      )}
    </div>
  );
};

export default PasswordPopup;
