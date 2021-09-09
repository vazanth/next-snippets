import type { NextApiRequest, NextApiResponse } from 'next';
import { getSnippetById, updateSnippet } from '@/utils/Fauna';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

const handler = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getSession(req, res);
    const userId = session.user.sub; // sub is the userid

    if (req.method !== 'PUT') {
      return res.status(405).json({ msg: 'Method not allowed' });
    }

    const { id, code, language, description, name } = req.body;

    const existingRecord = await getSnippetById(id);

    if (!existingRecord || existingRecord.data.userId !== userId) {
      return res.status(404).json({ msg: 'Record not found' });
    }

    try {
      const updatedSnippet = await updateSnippet(
        id,
        code,
        language.toLowerCase(),
        description,
        name
      );
      res.status(200).json(updatedSnippet);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Something went wrong.' });
    }
  }
);

export default handler;
