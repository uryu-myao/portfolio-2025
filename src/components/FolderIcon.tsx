import '@/styles/components/folder-icon.scss';

interface FolderIconProps {
  icon: string; // 图标路径
  label: string; // 图标下的文字
  onOpen: () => void; // 点击时的回调
}

const FolderIcon: React.FC<FolderIconProps> = ({ icon, label, onOpen }) => {
  return (
    <div className="folder-icon" onClick={onOpen}>
      <img src={icon} alt={label} className="folder-icon__img" />
      <div className="folder-icon__label">{label}</div>
    </div>
  );
};

export default FolderIcon;
