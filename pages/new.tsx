import Head from 'next/head';
import { GetServerSideProps } from 'next';
import SnippetForm from '@/components/SnippetForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next Snippet</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='max-w-lg mx-auto'>
        <h1 className='text-red-100 text-2xl mb-4'>New Snippet</h1>
        <SnippetForm snippet={null} />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();
