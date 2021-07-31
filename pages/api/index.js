import { connectToDatabase } from '../../util/mongodb';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { db } = await connectToDatabase();

    const products = await db
      .collection('products')
      .aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();
    res.status(200).json(products);
  }
};
