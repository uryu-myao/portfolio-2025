import '@/styles/components/folder-icon.scss';
import type { FolderIconProps } from '@/types';
import FolderIconSVG from '@/components/svg/FolderIconSVG';
import LockIcon from '@/assets/icon-lock.svg';

const FolderIcon: React.FC<FolderIconProps> = ({
  id,
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

  const colorMap = {
    nuskin: {
      folderColor: '#FFD639',
      paperColor: '#F2F1E0',
    },
    stores: {
      folderColor: '#A1E8CC',
      paperColor: '#EEF1F1',
    },
    legacy: {
      folderColor: '#34F6F2',
      paperColor: '#EBEFEE',
    },
    personal: {
      folderColor: '#FFD639',
      paperColor: '#EBE2D8',
    },
  };

  const { folderColor, paperColor } = colorMap[variant] || colorMap.personal;

  return (
    <div
      className={`folder-icon-item folder-icon__${variant} folder-icon__${id}`}
      onClick={onOpen}>
      <div className="folder-icon__img">
        <FolderIconSVG
          folderColor={folderColor}
          paperColor={paperColor}
          width={88}
          height={63}
        />
        {isLocked && (
          <img src={LockIcon} className="folder-icon__lock" alt="Locked" />
        )}
        {tagLabel && (
          <p
            className={`folder-icon__tag folder-icon__tag--${tagLabel} text-theme`}>
            {tagLabel}
          </p>
        )}
      </div>
      <div className="folder-icon__info">
        <p className="folder-icon__label">
          <span>{label}</span>
        </p>
      </div>
    </div>
  );
};

export default FolderIcon;
