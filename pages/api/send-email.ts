import { sendMail_mdlr } from '@/utils/Email';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  const { to, code } = req.body;

  const html = `
  <p>Hi ${to}</p>
  <p>Welcome to next-snippets, we're glad that you have used our site 🎉🙏</p>
  <p>Below is the code you requested</p>
  <pre>${code}</pre>
  `;

  try {
    await sendMail_mdlr({
      html,
      subject: 'Code from next-snippets',
      to,
    });
    res.status(200).json({
      status: 'success',
      message: 'Mail sent successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong.' });
  }
};
export default handler;
