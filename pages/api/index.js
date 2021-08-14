import { connectToDatabase } from '../../util/mongodb';

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

    const calcTotalFromDB = await db.collection('');
  }
};
