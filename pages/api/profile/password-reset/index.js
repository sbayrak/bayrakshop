import { connectToDatabase } from '../../../../util/mongodb';
import { v4 as uuidv4 } from 'uuid';
import bcryptjs from 'bcryptjs';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const date = new Date();
  const callbackUrl = `${process.env.NEXTAUTH_URL}/auth/verification-message`;

  if (req.method === 'POST') {
    const token = uuidv4();
    const { email } = req.body;
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      res.status(201).json({ msg: 'notexists', callbackUrl, status: true });
    } else if (user) {
      const saveRequest = await db
        .collection('verificationRequests')
        .insertOne({ email, token, callbackUrl, madeAt: date.toString() });

      res.status(201).json(saveRequest.ops[0]);
    }
  } else if (req.method === 'GET') {
    const { email, token } = req.query;

    const compareTokens = await db.collection('verificationRequests').findOne({
      email,
      token,
    });

    if (!compareTokens) {
      res.status(201).json({ msg: 'notexists', status: false });
    } else if (compareTokens) {
      res.status(201).json({ msg: 'ok', status: true });
      await db.collection('verificationRequests').deleteOne({ email, token });
    }
  } else if (req.method === 'PATCH') {
    const { password } = req.body;
    const { email } = req.query;

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await db.collection('users').findOne({ email });

    const updatePassword = await db.collection('users').updateOne(
      {
        _id: user._id,
      },
      {
        $set: { password: hashedPassword },
      }
    );

    if (!updatePassword) {
      res.status(201).json({ msg: 'notupdated', success: false });
    } else if (updatePassword) {
      res.status(201).json({
        msg: 'updated',
        success: true,
      });
    }
  }
};
