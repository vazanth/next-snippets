import type { NextApiRequest, NextApiResponse } from 'next';
import { getSnippets } from '@/utils/Fauna';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405);
  }

  try {
    const snippets = await getSnippets();
    return res.status(200).json(snippets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong.' });
  }
};

export default handler;
