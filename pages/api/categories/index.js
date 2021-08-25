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
  if (req.method === 'DELETE') {
    const { db } = await connectToDatabase();

    const findCategoryToBeDeleted = await db
      .collection('categories')
      .deleteOne({
        _id: ObjectId(req.body.id),
      });

    if (findCategoryToBeDeleted.deletedCount === 1) {
      res.status(201).json({ msg: 'ok' });
    } else if (findCategoryToBeDeleted.deletedCount === 0) {
      res.status(201).json({ msg: 'fail' });
    }
  }

  if (req.method === 'GET') {
    const { db } = await connectToDatabase();

    const getCategoriesFromDB = await db
      .collection('categories')
      .find({})
      .toArray();

    res.status(200).json(getCategoriesFromDB);
  }
};
