import Image from 'next/image';
import Link from 'next/link';
import { PageHeader, Card } from '@/components';

export default function Home() {
  return (
    <div className="bg-gray-100 relative z-0">
      <div className="blur-3xl absolute w-11 h-11"></div>
      <div className="blur-3xl absolute w-11 h-11"></div>
      <div className="blur-3xl absolute w-11 h-11"></div>
      <div className="container mx-auto">
        <PageHeader />
        <main className="grid py-40">
          <div>
            <Card />
            <Card />
            <Card />
          </div>
        </main>
      </div>
    </div>
  );
}
