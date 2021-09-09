import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteSnippet, getSnippetById } from '@/utils/Fauna';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

const handler = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'DELETE') {
      return res.status(405).json({ msg: 'Method not allowed' });
    }

    const session = getSession(req, res);
    const userId = session.user.sub;

    const { id } = req.body;
    const existingRecord = await getSnippetById(id);

    if (!existingRecord || existingRecord.data.userId !== userId) {
      return res.status(404).json({ msg: 'Record not found' });
    }

    try {
      const { id } = req.body;
      await deleteSnippet(id);
      res.status(204).json({ msg: 'deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Something went wrong.' });
    }
  }
);

export default handler;
