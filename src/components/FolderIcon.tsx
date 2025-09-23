import { useState } from 'react';
import '@/styles/components/folder-icon.scss';
import type { FolderIconProps } from '@/types';
import {
  paperContentNuskinGuideline,
  paperContentNuskinBranding,
  paperContentNuskinProducts,
  paperContentStores,
  paperContentLegacy,
} from '@/components/svg/paperContents';
import FolderIconSVG from '@/components/svg/FolderIconSVG';
import LockIcon from '@/assets/icon-lock.svg';

const paperContentMap: Record<string, React.ReactNode> = {
  'nuskin--guideline': paperContentNuskinGuideline,
  'nuskin--branding': paperContentNuskinBranding,
  'nuskin--products': paperContentNuskinProducts,
  'stores-all': paperContentStores,
  'legacy--2019': paperContentLegacy,
  'legacy--2017': paperContentLegacy,
};

const FolderIcon: React.FC<FolderIconProps> = ({
  id,
  label,
  onOpen,
  variant = 'personal', // Default variant
  isLocked = false,
}) => {
  const [hovered, setHovered] = useState(false);

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
    },
    stores: {
      folderColor: '#A1E8CC',
    },
    legacy: {
      folderColor: '#34F6F2',
    },
    personal: {
      folderColor: '#FFD639',
    },
  };

  const { folderColor } = colorMap[variant] || colorMap.personal;

  return (
    <div
      className={`folder-icon-item folder-icon__${variant} folder-icon__${id}`}
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="folder-icon__img">
        <FolderIconSVG
          folderColor={folderColor}
          isOpen={hovered}
          width={88}
          height={63}
          paperContent={paperContentMap[id]}
        />
        {!localStorage.getItem(`unlocked:${id}`) && isLocked && (
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
