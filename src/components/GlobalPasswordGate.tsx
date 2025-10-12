import { useState } from 'react';
import '@/styles/components/password-popup.scss';
import ArrowIcon from '@/assets/icon-arrow.svg';

const PASSWORD = 'lovedesign';

const GlobalPasswordGate = ({ onUnlock }: { onUnlock: () => void }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (input === PASSWORD) {
      localStorage.setItem('global-unlocked', 'true');
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="window-password-wrapper">
      <div className="window-password-inner">
        <div className={`shake-wrapper ${shake ? 'shake' : ''}`}>
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
            <img src={ArrowIcon} alt="submit button" />
          </button>
        </div>
        {error && (
          <p className="password-error text-en">
            Hmm, that doesn’t look right.
          </p>
        )}
      </div>
      <div className="window-password-contact text-en">
        <p className="" style={{ color: '#5e5e5e' }}>
          Need access? Feel free to{' '}
          <a
            className=""
            href="mailto:myao.jpn@gmail.com"
            target="_blank"
            rel="noopener noreferrer">
            contact the author
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default GlobalPasswordGate;
