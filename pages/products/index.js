// @@@ MATERIAL-UI @@@
import {
  Grid,
  Typography,
  Checkbox,
  Button,
  Snackbar,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import ErrorIcon from '@material-ui/icons/Error';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { connectToDatabase } from '../../util/mongodb';
import { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/client';
import CartContext from '../../context/cart/CartContext';
import { route } from 'next/dist/next-server/server/router';

// @@@ nextjs @@@

export const getServerSideProps = async (context) => {
  const { db } = await connectToDatabase();

  const getCategoriesFromDB = await db
    .collection('categories')
    .find({})
    .toArray();
  const getCategories = await JSON.parse(JSON.stringify(getCategoriesFromDB));

  if (context.query.show) {
    const showCategory = context.query.show;
    const getFilteredProducts = await db
      .collection('products')
      .find({
        category: showCategory,
      })
      .toArray();
    const getProducts = await JSON.parse(JSON.stringify(getFilteredProducts));
    return {
      props: {
        getCategories,
        getProducts,
      },
    };
  } else if (
    !(
      Object.keys(context.query).length === 0 &&
      context.query.constructor === Object
    )
  ) {
    const category = context.query.category;

    if (typeof context.query.category === 'string') {
      const getFilteredProducts = await db
        .collection('products')
        .find({
          category: category,
        })
        .toArray();
      const getProducts = await JSON.parse(JSON.stringify(getFilteredProducts));
      return {
        props: {
          getCategories,
          getProducts,
        },
      };
    } else if (
      typeof context.query.category === 'object' &&
      context.query.category.length > 1
    ) {
      let orArray = [];

      for (let i = 0; i < context.query.category.length; i++) {
        let categoryItem = {};
        let element = context.query.category[i];
        categoryItem = { category: element };

        orArray.push(categoryItem);
      }

      const filteredProducts = await db
        .collection('products')
        .aggregate([
          {
            $match: {
              $or: orArray,
            },
          },
        ])
        .toArray();
      const getProducts = await JSON.parse(JSON.stringify(filteredProducts));
      return {
        props: {
          getCategories,
          getProducts,
        },
      };
    }
  } else {
    const getProductsFromDB = await db
      .collection('products')
      .find({})
      .toArray();
    const getProducts = await JSON.parse(JSON.stringify(getProductsFromDB));
    return {
      props: {
        getCategories,
        getProducts,
      },
    };
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '85%',
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  gridContainer: {
    // backgroundColor: '#fff',
    paddingBottom: theme.spacing(5),
    marginTop: theme.spacing(35),
    minHeight: '100vh',
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing(1.5),
      paddingLeft: theme.spacing(1.5),
    },
  },
  filterGridContainer: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(2),
    borderRight: '1px solid rgba(0,0,0,0.05)',
  },
  filterTitle: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
      fontSize: '16px',
    },
  },
  filterTypo: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  filterCheckBoxWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(3),
    },
  },
  filterMobileCheckBoxWrapper: {
    [theme.breakpoints.down('xs')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    },
  },
  productsGridContainer: {
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  productCardWrapper: {
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      padding: `5px !important`,
    },
  },
  productCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    borderRadius: '5px',
    boxShadow: '1px 2px 5px 1px rgba(86,82,222,0.1)',
    backgroundColor: '#fff',
    border: '1px solid rgba(86,82,222,0.1)',
    transition: '0.5s ease',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 0,
      padding: 0,
      marginTop: theme.spacing(1),
    },
  },
  productCardTypo: {
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(2),
    color: theme.palette.grey[600],
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      marginTop: theme.spacing(0),
      paddingTop: theme.spacing(0.5),
    },
  },
  productCardTypo2: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      marginTop: theme.spacing(1),
      paddingTop: theme.spacing(0.5),
      marginBottom: theme.spacing(2),
    },
  },
  productCardBtn: {
    width: '100%',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
  },
  productLink: {
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    textDecoration: 'none',
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(0),
      paddingBottom: theme.spacing(1),
    },
  },
  productCardBtnWrapper: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px',
    },
  },
  productImageWrapper: {
    width: '100%',
  },
  snackbarWrapper: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F44336',
    padding: theme.spacing(2),
    borderRadius: '5px',
  },
  snackbarLink: {
    color: '#fff',
    fontWeight: theme.typography.fontWeightBold,
  },
  typoWrapper: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  MostSoldQuantityBtn: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  },
  itemDesc: {
    maxHeight: '15px',
    minHeight: '15px',
    // height: '25px',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  productName: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px',
    },
  },
  MostSoldQuantityGrid: {},
}));

const Products = ({ getCategories, getProducts }) => {
  const classes = useStyles();
  const cartContext = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);
  const [session, loading] = useSession();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.show) {
      router.push(
        `${process.env.NEXT_PUBLIC_URL}/products?show=${router.query.show}`
      );
    } else {
      if (categories.length === 0) {
        router.push(`${process.env.NEXT_PUBLIC_URL}/products`);
      } else if (categories.length === 1) {
        router.push(
          `${process.env.NEXT_PUBLIC_URL}/products?category=${categories[0]}`
        );
      } else if (categories.length > 1) {
        let pushURL = `${process.env.NEXT_PUBLIC_URL}/products?`;
        let queryString = [];

        for (let i = 0; i < categories.length; i++) {
          const category = categories[i];
          if (i > 0) {
            queryString.push(`&category=${category}`);
          } else {
            queryString.push(`category=${category}`);
          }
        }

        router.push(`${pushURL}${queryString.join('')}`);
      }
    }
  }, [categories]);
  // useEffect(() => {

  // }, [quantity])

  const addToFilter = (e) => {
    delete router.query.show;
    const categoryName = e.currentTarget.dataset.category;

    if (categories.length === 0) {
      setCategories((categories) => [...categories, categoryName]);
    } else if (categories.includes(categoryName)) {
      let copyArray = [...categories];
      copyArray.splice(copyArray.indexOf(categoryName), 1);

      setCategories(copyArray);
    } else if (!categories.includes(categoryName)) {
      setCategories((categories) => [...categories, categoryName]);
    }

    router.push(
      `${process.env.NEXT_PUBLIC_URL}/products?category=${categoryName}`
    );
  };

  const isChecked = (e) => {
    if (categories.includes(e.currentTarget.dataset.category)) {
      return true;
    } else {
      return false;
    }
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const addToCart = (e) => {
    if (!session) {
      setSnackbarOpen(true);
    } else if (session) {
      const product = {
        productId: e.currentTarget.dataset.productid,
        productName: e.currentTarget.dataset.productname,
        productPrice: e.currentTarget.dataset.productprice,
        productImg: e.currentTarget.dataset.productimg,
        quantity: quantity,
        customerId: session.user._id,
      };
      cartContext.addToCart(product);
    }
  };

  const categorySection = (
    <Grid item md={3} className={classes.filterGridContainer}>
      <div>
        <Typography
          variant='h6'
          color='primary'
          className={classes.filterTitle}
        >
          Filter By Category
        </Typography>
        <div className={classes.filterMobileCheckBoxWrapper}>
          {getCategories.map((category) => (
            <div
              className={classes.filterCheckBoxWrapper}
              data-category={category.name}
              key={category._id}
            >
              <Checkbox
                color='primary'
                data-category={category.name}
                onChange={(e) => isChecked(e)}
                onClick={(e) => addToFilter(e)}
              ></Checkbox>
              <Typography variant='subtitle1' className={classes.filterTypo}>
                {category.name}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </Grid>
  );
  const productSection = (
    <Grid
      item
      container
      md={9}
      spacing={3}
      className={classes.productsGridContainer}
    >
      {getProducts.map((product) => (
        <Grid
          item
          md={3}
          xs={6}
          className={classes.productCardWrapper}
          key={product._id}
        >
          <div className={classes.productCard}>
            <Link
              href={`${
                process.env.NEXT_PUBLIC_URL
              }/products/${product.name.toLowerCase().replace(' ', '-')}`}
            >
              <a className={classes.productLink}>
                <div className={classes.productImageWrapper}>
                  <Image
                    src={product.image[0].secure_url}
                    alt={`${process.env.NEXT_PUBLIC_URL} ${product.name}`}
                    height={250}
                    width={310}
                  />
                </div>
                <div className={classes.typoWrapper}>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component='h2'
                    color='textPrimary'
                    className={classes.productName}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    gutterBottom
                    paragraph
                    className={classes.itemDesc}
                  >
                    {product.description}
                  </Typography>
                </div>
              </a>
            </Link>
            <Typography
              variant='h6'
              style={{ color: '#5652de' }}
              className={classes.productCardTypo2}
            >
              €{product.price}
            </Typography>
            <Grid item md={12} className={classes.MostSoldQuantityGrid}>
              <IconButton
                className={classes.MostSoldQuantityBtn}
                onClick={() => setQuantity(quantity - 1)}
              >
                <RemoveIcon fontSize='small' color='primary' />
              </IconButton>
              <span>{quantity}</span>
              <IconButton
                className={classes.MostSoldQuantityBtn}
                onClick={() => setQuantity(quantity + 1)}
              >
                <AddIcon fontSize='small' color='primary' />
              </IconButton>
            </Grid>
            <div className={classes.productCardBtn}>
              {product.active ? (
                <Button
                  style={{
                    backgroundColor: `${!product.active && '#f6f6f6'}`,
                  }}
                  fullWidth
                  color='primary'
                  variant='contained'
                  disableRipple
                  disableFocusRipple
                  disableElevation
                  disableTouchRipple
                  disabled={false}
                  onClick={addToCart}
                  data-productid={product._id}
                  data-productname={product.name}
                  data-productprice={product.price}
                  data-productimg={product.image[0].secure_url}
                >
                  <>
                    <AddShoppingCartIcon fontSize='small' />
                    &nbsp;&nbsp;
                    <span className={classes.productCardBtnWrapper}>
                      Add to Cart
                    </span>
                  </>
                </Button>
              ) : (
                <Button
                  style={{
                    backgroundColor: `${!product.active && '#f6f6f6'}`,
                  }}
                  fullWidth
                  color='primary'
                  variant='contained'
                  disableRipple
                  disableFocusRipple
                  disableElevation
                  disableTouchRipple
                  disabled={true}
                >
                  <>
                    <RemoveShoppingCartIcon fontSize='small' /> &nbsp;&nbsp;
                    <span className={classes.productCardBtnWrapper}>
                      Out of Stock
                    </span>
                  </>
                </Button>
              )}
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      <div className={classes.root} id='root'>
        <Grid container className={classes.gridContainer}>
          {categorySection}
          {productSection}
          {/* {newCard} */}

          {snackbarOpen && (
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
              <div className={classes.snackbarWrapper}>
                <ErrorIcon color='secondary' />
                &nbsp;&nbsp;
                <Typography variant='body1' color='secondary'>
                  Please{' '}
                  <Link href='/auth/signin'>
                    <a className={classes.snackbarLink}>log in</a>
                  </Link>{' '}
                  first to add a product to your cart.
                </Typography>
              </div>
            </Snackbar>
          )}
        </Grid>
      </div>
    </>
  );
};

export default Products;
