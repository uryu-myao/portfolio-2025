import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/logo.png';
import ThemeButton from './ThemeButton';
import ThumbsButton from './ThumbsButton';

const PageHeader = () => {
  return (
    <header className="w-full pt-5">
      <div className="container mx-auto flex justify-between items-center rounded-full bg-white p-4">
        <Link href={'/'}>
          <Image src={logo} width={80} height={20} className="h-6" alt="Logo" />
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li className="">
              <Link href="">works</Link>
            </li>
            <li className="">
              <Link href="">contact</Link>
            </li>
          </ul>
        </nav>
        <ThemeButton />
        <ThumbsButton />
      </div>
    </header>
  );
};

export default PageHeader;
