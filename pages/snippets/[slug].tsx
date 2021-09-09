import Snippet from '@/components/Snippet';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import useSWR from 'swr';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { getSnippetsByLanguage } from '@/utils/Fauna';

const Language = ({ fallback: { snippet } }: any) => {
  const router = useRouter();
  const fetcher = (args) => fetch(args).then((res) => res.json());

  const { data: snippets } = useSWR(
    `/api/snippets/${router.query.slug}`,
    fetcher,
    {
      fallbackData: snippet,
    }
  );

  return (
    <div>
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
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps({ params }) {
    console.log('params', params.slug);

    try {
      const snippet = await getSnippetsByLanguage(params.slug);
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

export default Language;
