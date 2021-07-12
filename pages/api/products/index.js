import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const { name, description, price, active, quantity, image } = req.body;

    if (!name || !description || !price || !quantity) {
      res.status(201).json({ msg: 'missing' });
    } else if (name && description && price && quantity) {
      const newProduct = await db.collection('products').insertOne({
        name,
        description,
        price,
        active,
        quantity,
        image: image,
        date: new Date(),
      });
      const newProductJSON = await newProduct.ops[0];

      res.status(201).json(newProductJSON);
    }
  }
  if (req.method === 'GET') {
    const { db } = await connectToDatabase();

    const getProducts = await db.collection('products').find().toArray();
    res.status(201).json(getProducts);
  }
  if (req.method === 'DELETE') {
    const { db } = await connectToDatabase();
    const product_Id_ToBe_Deleted = req.body;

    const findProductToBeDeleted = await db
      .collection('products')
      .deleteOne({ _id: ObjectId(product_Id_ToBe_Deleted.id) });

    if (findProductToBeDeleted.deletedCount === 1) {
      res.status(201).json({ msg: 'ok' });
    } else if (findProductToBeDeleted.deletedCount === 0) {
      res.status(201).json({ msg: 'fail' });
    }
  }
};
