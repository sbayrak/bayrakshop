import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

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

  if (req.method === 'PATCH') {
    const { db } = await connectToDatabase();
    const { name, category_url, id } = req.body;

    const updateCategory = await db.collection('categories').updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          name: name,
          category_url: category_url,
        },
      }
    );

    const result = await updateCategory;

    res.status(201).json(result);
  }
};
