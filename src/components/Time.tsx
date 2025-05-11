import '@/styles/main.scss';
import '@/styles/components/time.scss';

const time = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  const formattedDate = date.toLocaleString('en-US', options);
  return <div className="time">{formattedDate}</div>;
};

export default time;
