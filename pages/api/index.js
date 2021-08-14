import { connectToDatabase } from '../../util/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  if (req.method === 'GET') {
    // const { db } = await connectToDatabase();

    // const filteredProducts = await db
    //   .collection('products')
    //   .aggregate([
    //     {
    //       $match: {
    //         $or: [{ category: 'Baklava' }, { category: 'Lokum' }],
    //       },
    //     },
    //   ])
    //   .toArray();

    // res.status(200).json(filteredProducts);

    const { db } = await connectToDatabase();

    const getCart = await db.collection('cart').findOne({
      _id: ObjectId('610e7179543909511488889d'),
    });

    res.status(200).json(getCart);
  }
};
