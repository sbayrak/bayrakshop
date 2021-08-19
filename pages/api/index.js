import { connectToDatabase } from '../../util/mongodb';
import { ObjectId } from 'mongodb';
import cloudinary from '../../util/cloudinary';

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
    // const { db } = await connectToDatabase();
    // const isCartExists = await db.collection('cart').findOne({
    //   customerId: ObjectId('60cf00e07b18ce43bce11880'),
    // });
    // let productName = 'Baklava';
    // const isItemExists = isCartExists.cartItem.filter(
    //   (item) => item.productName === productName
    // );
    // res.status(200).json(isItemExists);
  }
  if (req.method === 'DELETE') {
    const deleteImg = await cloudinary.uploader.destroy('baklava_nczgsd');

    const result = await deleteImg;

    console.log(result);
  }
};
