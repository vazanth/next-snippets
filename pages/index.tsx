import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Snippet from '@/components/Snippet';
import Header from '@/components/Header';
import useSWR from 'swr';
import { getSnippets } from '@/utils/Fauna';

const Home: NextPage = ({ fallback: { preSnippets } }: any) => {
  //TODO: use swr to retrieve snippets
  const fetcher = (args) => fetch(args).then((res) => res.json());

  const { data: snippets } = useSWR('/api/snippets', fetcher, {
    fallbackData: preSnippets,
  });

  return (
    <div>
      <Head>
        <title>Next Snippets</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className=''>
        <div className='my-12'>
          <Header
            title='Everyday Code Snippet'
            subtitle='Create and browse snippets you use every day in Web Development!'
          />
        </div>
        {snippets &&
          snippets.map((snippet) => (
            <Snippet key={snippet.id} snippet={snippet} />
          ))}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const preSnippets = await getSnippets();

  return {
    props: {
      fallback: { preSnippets },
    },
  };
};

export default Home;
