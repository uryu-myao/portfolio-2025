import '@/styles/components/info-icon.scss';

const InfoIcon = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <div className="info-icon" onClick={onOpen}>
      <div className="info-icon__circle">i</div>
    </div>
  );
};

export default InfoIcon;
