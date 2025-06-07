import '@/styles/components/folder.scss';

interface FolderIconProps {
  icon: string; // 图标路径
  label: string; // 图标下的文字
  onOpen: () => void; // 点击时的回调
  variant?: 'nuskin' | 'stores' | 'personal';
}

const FolderIcon: React.FC<FolderIconProps> = ({
  icon,
  label,
  onOpen,
  variant = 'personal',
}) => {
  return (
    <div className={`folder-icon folder-icon--${variant}`} onClick={onOpen}>
      <img src={icon} alt={label} className="folder-icon__img" />
      <div className="folder-icon__label">{label}</div>
    </div>
  );
};

export default FolderIcon;
