import { Footer } from '@/components/footer';
import ApplicationForm from '@/components/forms/ApplicationForm';
import Header from '@/components/header';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header className="flex-none" />
      <main className="flex-1">
        <div className="flex justify-center space-y-4">
          <div className="grid grid-cols-[1.5fr_1fr] w-3/5 items-center py-16 gap-64">
            <div>
              <p className="font-bold text-3xl text-purple-800 mb-4">
                <span className="border-b-4">SLADKOEZHKOVO</span>
              </p>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates quibusdam obcaecati, ipsa numquam consequatur natus
                non quia ratione error iure quam aliquam pariatur blanditiis
                dolores mollitia velit id quae. Similique.
              </p>
            </div>
            <div>
              <Image
                src="/sladkoezhkovo.jpeg"
                width={200}
                height={200}
                alt="logo"
              />
            </div>
          </div>
        </div>
        <div id="join" className="flex justify-center mb-12">
          <ApplicationForm />
        </div>
      </main>
      <Footer className="flex-none" />
    </div>
  );
}
