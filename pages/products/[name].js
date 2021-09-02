// @@@ MATERIAL-UI @@@

// @@@ MATERIAL-UI @@@

// @@@ NEXT JS @@@
import { connectToDatabase } from '../../util/mongodb';

// @@@ NEXT JS @@@

export const getStaticProps = async (context) => {
  const { db } = await connectToDatabase();
  const name = context.params.name;

  const fetchProduct = await db.collection('products').findOne({
    name: name.slice(0, 1).toUpperCase() + name.slice(1),
  });
  const product = await JSON.parse(JSON.stringify(fetchProduct));

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths = async () => {
  const { db } = await connectToDatabase();

  const fetchProducts = await db.collection('products').find({}).toArray();
  const products = await JSON.parse(JSON.stringify(fetchProducts));

  const paths = products.map((product) => ({
    params: { name: product.name.toLowerCase().replace(' ', '-') },
  }));

  return {
    paths,
    fallback: false,
  };
};

const Product = ({ product }) => {
  console.log(product);
  return <div>Enter</div>;
};

export default Product;
