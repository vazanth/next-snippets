import Head from 'next/head';
import Snippet from '@/components/Snippet';
import Header from '@/components/Header';
import useSWR from 'swr';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { getSnippetsByUser } from '@/utils/Fauna';

function mysnippets({ fallback: { snippet } }: any) {
  const fetcher = (args) => fetch(args).then((res) => res.json());

  const { data: snippets } = useSWR('/api/mysnippets', fetcher, {
    fallbackData: snippet,
  });

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className=''>
        <div className='my-12'>
          <Header
            title='My Snippets'
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
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    try {
      const session = getSession(req, res);
      const userId = session.user.sub;
      const snippet = await getSnippetsByUser(userId);
      return {
        props: {
          fallback: { snippet },
        },
      };
    } catch (error) {
      console.error(error);
      return { props: {} };
    }
  },
});

export default mysnippets;
