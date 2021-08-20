import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const {
      productId,
      productName,
      productPrice,
      productImg,
      quantity,
      customerId,
    } = req.body;

    let product = {
      productId: ObjectId(productId),
      productName,
      productPrice,
      productImg,
      quantity: Number(quantity),
      customerId,
    };

    let isCartExists = await db.collection('cart').findOne({
      customerId: ObjectId(customerId),
    });

    if (isCartExists) {
      let currentCart = [...isCartExists.cartItem];
      let isItemExists = false;
      currentCart.map((item) => {
        if (
          ObjectId(item.productId).toString() ===
          ObjectId(product.productId).toString()
        ) {
          item.quantity = item.quantity + product.quantity;
          isItemExists = true;
        }
      });

      if (isItemExists) {
        isCartExists.cartItem.length = 0;
        isCartExists.cartItem = currentCart;
        await db.collection('cart').updateOne(
          {
            customerId: ObjectId(customerId),
          },
          {
            $set: {
              cartItem: isCartExists.cartItem,
            },
          }
        );

        res.status(200).json({ msg: 'ok1' });
      } else if (!isItemExists) {
        isCartExists.cartItem.push(product);
        await db.collection('cart').updateOne(
          {
            customerId: ObjectId(customerId),
          },
          {
            $set: {
              cartItem: isCartExists.cartItem,
            },
          }
        );

        res.status(200).json({ msg: 'ok2' });
      }
    } else if (!isCartExists) {
      let cartItemToBeSaved = [];
      cartItemToBeSaved.push(product);

      const saveCartToDB = await db.collection('cart').insertOne({
        customerId: ObjectId(customerId),
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
  } else if (req.method === 'DELETE') {
    const customerId = req.body;

    const productIdToBeDeleted = req.query.delete;

    const deleteItem = await db.collection('cart').findOne({
      customerId: ObjectId(customerId),
    });

    const newCart = deleteItem.cartItem.filter(
      (item) =>
        ObjectId(item.productId).toString() !==
        ObjectId(productIdToBeDeleted).toString()
    );

    const saveNewCart = await db.collection('cart').updateOne(
      {
        customerId: ObjectId(customerId),
      },
      {
        $set: {
          cartItem: newCart,
        },
      }
    );

    res.status(200).json(saveNewCart);
  }
};
