import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const { productId, productName, productPrice, quantity } = req.body;
    let product = {
      productId: ObjectId(productId),
      productName,
      productPrice,
      quantity,
    };

    const saveCartToDB = await db.collection('cart').insertOne({
      customerId: ObjectId('60cf00e07b18ce43bce11880'),
      cartItem: product,
    });

    const result = await JSON.parse(saveCartToDB);
    res.status(200).json(result.ops[0]);
  } else if (req.method === 'GET') {
    const custId = req.query.owner;

    const getCart = await db
      .collection('cart')
      .find({
        customerId: ObjectId(custId),
      })
      .toArray();

    res.status(200).json(getCart);
  }
};
