import type { NextApiRequest, NextApiResponse } from 'next';
import { createSnippet } from '@/utils/Fauna';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

const handler = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getSession(req, res);
    const userId = session.user.sub; // sub is the userid
    const { code, language, description, name } = req.body;
    if (req.method !== 'POST') {
      return res.status(405).json({ msg: 'Method not allowed' });
    }
    try {
      const createdSnippet = await createSnippet(
        code,
        language.toLowerCase(),
        description,
        name,
        userId
      );
      return res.status(201).json(createdSnippet);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Something went wrong.' });
    }
  }
);

export default handler;
