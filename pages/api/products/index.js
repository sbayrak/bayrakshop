import { connectToDatabase } from '../../../util/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const { name, description, price, active, quantity, image } = req.body;

    if (!name || !description || !price || !active || !quantity) {
      res.status(201).json({ msg: 'missing' });
    } else if (name && description && price && active && quantity) {
      const newProduct = await db.collection('products').insertOne({
        name,
        description,
        price,
        active,
        quantity,
        image: '',
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
};
