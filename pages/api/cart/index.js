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

    const isCartExists = await db.collection('cart').findOne({
      customerId: ObjectId('60cf00e07b18ce43bce11880'),
    });

    if (isCartExists) {
      let currentCart = isCartExists.cartItem;
      currentCart.push(product);

      const updateCart = await db.collection('cart').updateOne(
        {
          customerId: ObjectId('60cf00e07b18ce43bce11880'),
        },
        {
          $set: {
            cartItem: currentCart,
          },
        }
      );
      const result = await JSON.parse(updateCart);
      res.status(200).json(result.modifiedCount);
    } else if (!isCartExists) {
      let cartItemToBeSaved = [];
      cartItemToBeSaved.push(product);

      const saveCartToDB = await db.collection('cart').insertOne({
        customerId: ObjectId('60cf00e07b18ce43bce11880'),
        cartItem: cartItemToBeSaved,
      });

      const result = await JSON.parse(saveCartToDB);
      res.status(200).json(result.ops[0]);
    }
  } else if (req.method === 'GET') {
    const custId = req.query.owner;

    const getCart = await db.collection('cart').findOne({
      customerId: ObjectId(custId),
    });

    res.status(200).json(getCart);
  }
};
