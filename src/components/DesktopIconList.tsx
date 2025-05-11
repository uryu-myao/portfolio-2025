import DesktopIcon from './DesktopIcon';

import '@/styles/main.scss';
import '@/styles/components/desktop-icon-list.scss';

interface IconItem {
  id: string;
  icon: string;
  label: string;
  onOpen: () => void;
}

interface IconListProps {
  icons: IconItem[];
}

const IconList: React.FC<IconListProps> = ({ icons }) => {
  return (
    <div className="desktop-icon-list">
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          icon={icon.icon}
          label={icon.label}
          onOpen={icon.onOpen}
        />
      ))}
    </div>
  );
};

export default IconList;
