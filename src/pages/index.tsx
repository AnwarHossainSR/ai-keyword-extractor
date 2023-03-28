import { Head } from '@/components';
import { MainLayout } from '@/layouts';

export default function HomePage() {
  return (
    <>
      <Head />
      <MainLayout>
        <section className="p-8 flex flex-col h-full justify-center text-center">
          <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
        </section>
      </MainLayout>
    </>
  );
}
