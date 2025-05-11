import '@/styles/main.scss'; // 引入样式文件
import '@/styles/components/desktop-icon.scss'; // 引入样式文件

interface DesktopIconProps {
  icon: string; // 图标路径
  label: string; // 图标下的文字
  onOpen: () => void; // 点击时的回调
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onOpen }) => {
  return (
    <div className="desktop-icon" onClick={onOpen}>
      <img src={icon} alt={label} className="desktop-icon__img" />
      <div className="desktop-icon__label">{label}</div>
    </div>
  );
};

export default DesktopIcon;
