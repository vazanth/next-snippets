import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { getSnippetsByUser } from '@/utils/Fauna';

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  const session = getSession(req, res);
  const userId = session.user.sub;

  try {
    const snippets = await getSnippetsByUser(userId);
    return res.status(200).json(snippets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong.' });
  }
});
