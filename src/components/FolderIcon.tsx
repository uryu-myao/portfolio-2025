import '@/styles/components/folder.scss';
import type { FolderIconProps } from '@/types';
import LockIcon from '@/assets/icon-lock.svg';

const FolderIcon: React.FC<FolderIconProps> = ({
  icon,
  label,
  onOpen,
  variant = 'personal',
  isLocked = false,
}) => {
  return (
    <div
      className={`folder-icon-item folder-icon__${variant}`}
      onClick={onOpen}>
      <div className="folder-icon__container">
        <img src={icon} alt={label} className="folder-icon__img" />
        {isLocked && (
          <img src={LockIcon} alt="Locked" className="folder-icon__lock" />
        )}
      </div>
      <div className="folder-icon__label">{label}</div>
    </div>
  );
};

export default FolderIcon;
