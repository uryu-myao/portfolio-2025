import '@/styles/components/folder-icon.scss';
import type { FolderIconProps } from '@/types';
import LockIcon from '@/assets/icon-lock.svg';

const FolderIcon: React.FC<FolderIconProps> = ({
  id,
  icon,
  label,
  onOpen,
  variant = 'personal', // Default variant
  isLocked = false,
}) => {
  const tagLabel =
    variant === 'nuskin'
      ? 'nuskin'
      : variant === 'stores'
      ? 'stores'
      : id.startsWith('legacy')
      ? 'legacy'
      : '';

  return (
    <div
      className={`folder-icon-item folder-icon__${variant} folder-icon__${id}`}
      onClick={onOpen}>
      <div className="folder-icon__img">
        <img src={icon} alt={label} />
        {isLocked && (
          <img src={LockIcon} className="folder-icon__lock" alt="Locked" />
        )}
      </div>
      <div className="folder-icon__info">
        {tagLabel && (
          <p
            className={`folder-icon__tag folder-icon__tag--${tagLabel} text-theme`}>
            {tagLabel}
          </p>
        )}
        <p className="folder-icon__label">
          <span>{label}</span>
        </p>
      </div>
    </div>
  );
};

export default FolderIcon;
