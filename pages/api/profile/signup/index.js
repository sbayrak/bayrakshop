import { connectToDatabase } from '../../../../util/mongodb';
import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const { email, password } = req.body;
    const token = uuidv4();
    const date = new Date();
    const callbackUrl = `${process.env.NEXTAUTH_URL}/auth/verification-message`;
    const isUserExists = await db.collection('users').findOne({ email });

    if (isUserExists) {
      const callbackUrl = `${process.env.NEXTAUTH_URL}/auth/verification-message`;

      res
        .status(201)
        .json({ msg: 'exists', callbackUrl, email: '', token: '' });
    } else if (!isUserExists) {
      const newVerificationRequest = await db
        .collection('verificationRequests')
        .insertOne({
          email: email,
          password: password,
          token,
          callbackUrl,
          madeAt: date.toString(),
        });

      res.status(201).json(newVerificationRequest.ops);
    }
  } else if (req.method === 'GET') {
    const { email, token } = req.query;

    const compareVerificationRequest = await db
      .collection('verificationRequests')
      .findOne({ email, token });

    if (!compareVerificationRequest) {
      res.status(201).json({ msg: false });
    } else if (compareVerificationRequest) {
      res.status(201).json({ msg: true });
      await db.collection('verificationRequests').deleteOne({ email, token });
      await db.collection('users').insertOne({
        email: email,
        password: compareVerificationRequest.password,
        madeAt: compareVerificationRequest.madeAt,
      });
    }
  }
};
