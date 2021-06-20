import { connectToDatabase } from '../../../../util/mongodb';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(201).json(null);
    } else {
      const user = await db.collection('users').findOne({
        email,
      });
      console.log(user);

      const hashedPassword = await bcrypt.compare(password, user.password);

      if (!hashedPassword) {
        res.status(201).json(null);
      }
      res.status(201).json(user);
    }
  }
};
