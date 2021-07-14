import { connectToDatabase } from '../../../util/mongodb';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase();
    const { name, category_url } = req.body;

    const addNewCategory = await db.collection('categories').insertOne({
      name,
      category_url,
      date: new Date(),
    });

    const result = await addNewCategory;

    res.status(201).json(result.ops[0]);
  }
};
