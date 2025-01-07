import Image from 'next/image';
import { Copyright } from '@/components';

const Card = () => {
  return (
    <article className="bg-white p-4 rounded-3xl">
      <div className="">
        <p>card</p>
        <Copyright />
      </div>
    </article>
  );
};

export default Card;
