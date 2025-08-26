import ExternalLinkIcon from '@/assets/icon-external-link.svg';
import '@/styles/components/CTAButton.scss';

interface CTAButtonProps {
  href: string;
  label: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ href, label }) => {
  return (
    <a
      className="btn-cta text-en"
      href={href}
      target="_blank"
      rel="noopener noreferrer">
      <img
        className="btn-cta-icon"
        src={ExternalLinkIcon}
        alt="External link"
      />
      <span>{label}</span>
    </a>
  );
};

export default CTAButton;
