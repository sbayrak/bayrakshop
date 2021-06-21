import { connectToDatabase } from '../../../../util/mongodb';
import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const token = uuidv4();
  const { email } = req.body;
  const date = new Date();
  const callbackUrl = `${process.env.NEXTAUTH_URL}/auth/verification-message`;

  if (req.method === 'POST') {
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      res.status(201).json({ msg: 'exists', status: true });
    } else if (user) {
      const saveRequest = await db
        .collection('verificationRequests')
        .insertOne({ email, token, callbackUrl, madeAt: date.toString() });

      res.status(201).json(saveRequest.ops[0]);
    }
  }
};
