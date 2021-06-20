import { connectToDatabase } from '../../../../util/mongodb';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

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
    const salt = await bcrypt.genSalt();

    const compareVerificationRequest = await db
      .collection('verificationRequests')
      .findOne({ email, token });

    if (!compareVerificationRequest) {
      res.status(201).json({ msg: false });
    } else if (compareVerificationRequest) {
      res.status(201).json({ msg: true });

      const hashedPassword = await bcrypt.hash(
        compareVerificationRequest.password,
        salt
      );
      await db.collection('verificationRequests').deleteOne({ email, token });
      const user = await db.collection('users').insertOne({
        email: email,
        password: hashedPassword,
        madeAt: compareVerificationRequest.madeAt,
        commercejs_id: '',
      });
      const newUser = await JSON.parse(user);

      const customer = await fetch(`${process.env.COMMERCEJS_API}/customers`, {
        method: 'POST',
        headers: {
          'X-Authorization': `${process.env.COMMERCEJS_PK}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: newUser.ops[0].email,
          password: newUser.ops[0].password,
          external_id: newUser.ops[0]._id,
        }),
      });
      const customerToJson = await customer.json();

      await db.collection('users').updateOne(
        {
          email: newUser.ops[0].email,
        },
        {
          $set: { commercejs_id: customerToJson.id },
        }
      );
    }
  }
};
