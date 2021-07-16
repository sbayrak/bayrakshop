import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const {
      name,
      description,
      price,
      active,
      quantity,
      category,
      image,
    } = req.body;

    if (!name || !description || !price) {
      res.status(201).json({ msg: 'missing' });
    } else if (name && description && price) {
      const newProduct = await db.collection('products').insertOne({
        name,
        description,
        price,
        active,
        quantity: quantity ? quantity : 0,
        category: category,
        image: image,
        date: new Date(),
      });
      const newProductJSON = await newProduct.ops[0];

      res.status(201).json(newProductJSON);
    }
  }
  if (req.method === 'GET') {
    const { db } = await connectToDatabase();
    let queryId;

    if (!req.query.id) {
      const getProducts = await db.collection('products').find().toArray();
      res.status(201).json(getProducts);
    } else if (req.query.id) {
      queryId = req.query.id;

      const getProduct = await db
        .collection('products')
        .findOne({ _id: ObjectId(queryId) });
      res.status(201).json(getProduct);
    }
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
  if (req.method === 'PATCH') {
    const { db } = await connectToDatabase();

    const {
      id,
      name,
      price,
      description,
      quantity,
      category,
      active,
      image,
    } = req.body;

    const updatedProduct = await db.collection('products').updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          name,
          price: Number(price),
          description,
          quantity: Number(quantity),
          category: category,
          active,
          image,
        },
      }
    );

    const result = await updatedProduct;
    res.status(201).json(result);
  }
};
