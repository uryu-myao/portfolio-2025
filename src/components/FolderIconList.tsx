import FolderIcon from './FolderIcon';
import '@/styles/components/folder-icon-list.scss';

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
    <div className="folder-icon-list">
      {icons.map((icon) => (
        <FolderIcon
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
