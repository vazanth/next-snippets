import type { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { getSnippetsByLanguage } from '@/utils/Fauna';

const handler = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
      return res.status(405).json({ msg: 'Method not allowed' });
    }

    try {
      const snippets = await getSnippetsByLanguage(req.query);
      return res.status(200).json(snippets);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Something went wrong.' });
    }
  }
);

export default handler;
