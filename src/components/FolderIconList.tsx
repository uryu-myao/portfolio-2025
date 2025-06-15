import type { IconItem } from '@/types';
import FolderIcon from '@/components/FolderIcon';
import '@/styles/components/folder-icon.scss';
interface IconListProps {
  icons: IconItem[];
}

const IconList: React.FC<IconListProps> = ({ icons }) => {
  return (
    <div className="folder-icon-list">
      {icons.map((icon) => (
        <FolderIcon
          id={icon.id}
          key={icon.id}
          icon={icon.icon}
          label={icon.label}
          onOpen={icon.onOpen}
          variant={icon.variant}
          isLocked={icon.isLocked}
        />
      ))}
    </div>
  );
};

export default IconList;
