// @@@ MATERIAL-UI @@@
import {
  Container,
  Box,
  Grid,
  Breadcrumbs,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import ErrorIcon from '@material-ui/icons/Error';
import baklava2 from '../../public/baklava2.png';
// @@@ MATERIAL-UI @@@

// @@@ NEXT JS @@@
import { useState, useEffect, useContext } from 'react';
import { connectToDatabase } from '../../util/mongodb';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import CartContext from '../../context/cart/CartContext';
import { useSession } from 'next-auth/client';

// @@@ NEXT JS @@@

export const getStaticProps = async (context) => {
  const { db } = await connectToDatabase();
  const name = context.params.name;

  if (name.includes('-')) {
    const fetchProduct = await db.collection('products').findOne({
      productUrl: name,
    });
    let product = await JSON.parse(JSON.stringify(fetchProduct));

    return {
      props: {
        product,
      },
    };
  } else if (!name.includes('-')) {
    const fetchProduct = await db.collection('products').findOne({
      name: name.slice(0, 1).toUpperCase() + name.slice(1),
    });
    const product = await JSON.parse(JSON.stringify(fetchProduct));
    return {
      props: {
        product,
      },
    };
  }
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

const useStyles = makeStyles((theme) => ({
  MostSoldQuantityBtn: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
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
  gridRootContainer: {
    marginTop: theme.spacing(25),
  },
  breadCrumbsLink: {
    textDecoration: 'none',
    color: '#5652de',
  },
  breadCrumbsLinkCurrent: {
    fontWeight: theme.typography.fontWeightBold,
  },
  productGridContainer: {
    marginTop: theme.spacing(5),
  },
  imgGrid: {
    boxShadow: '0px 2px 10px -4px rgba(40,40,40,0.35)',
  },
  imgBottomWrapper: {
    display: 'flex',
  },
  Typo: {
    marginBottom: theme.spacing(5),
  },
  Typo1: {
    marginBottom: theme.spacing(3),
  },
  Typo3: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  ProductDesc: {
    boxShadow: '0px 2px 10px -4px rgba(40,40,40,0.35)',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    borderRadius: '5px',
  },
  quantityBtn: {
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
}));

const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const classes = useStyles();
  const cartContext = useContext(CartContext);
  const [session, loading] = useSession();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();
  // console.log(product);

  useEffect(() => {
    if (quantity <= 1) {
      const defaultQuantity = 1;
      setQuantity(defaultQuantity);
    }
  }, [quantity]);

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

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Box className={classes.gridRootContainer}>
      <Container>
        <Grid container>
          <Grid item md={12}>
            <Breadcrumbs separator='>'>
              <Link href={`${process.env.NEXT_PUBLIC_URL}/`}>
                <a className={classes.breadCrumbsLink}>Home</a>
              </Link>
              <Link href={`${process.env.NEXT_PUBLIC_URL}/products`}>
                <a className={classes.breadCrumbsLink}>Products</a>
              </Link>
              <Link
                href={`${process.env.NEXT_PUBLIC_URL}/products/${product.productUrl}`}
              >
                <a
                  className={`${classes.breadCrumbsLink} ${classes.breadCrumbsLinkCurrent}`}
                >
                  Home
                </a>
              </Link>
            </Breadcrumbs>
          </Grid>
          <Grid
            container
            item
            md={12}
            className={classes.productGridContainer}
            spacing={5}
          >
            <Grid
              item
              md={6}
              style={{
                boxShadow: '0px 2px 10px -4px rgba(40,40,40,0.35)',
              }}
              className={classes.imgGrid}
            >
              <div>
                <Image src={baklava2} />
              </div>
              <Divider />
              <div className={classes.imgBottomWrapper}>
                <Button disableElevation>
                  <div className={classes.imgBottomItem}>
                    <Image src={baklava2} />
                  </div>
                </Button>
                <Button disableElevation>
                  <div className={classes.imgBottomItem}>
                    <Image src={baklava2} />
                  </div>
                </Button>
                <Button disableElevation>
                  <div className={classes.imgBottomItem}>
                    <Image src={baklava2} />
                  </div>
                </Button>
              </div>
            </Grid>
            <Grid container item md={6}>
              <Grid item md={12} className={classes.ProductDesc}>
                <Typography
                  variant='h5'
                  className={`${classes.Typo} ${classes.Typo1}`}
                >
                  1kg - Baklava
                </Typography>
                <Typography
                  variant='body2'
                  className={`${classes.Typo} ${classes.Typo2}`}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit, doloribus!
                </Typography>
                <Typography
                  variant='h6'
                  className={`${classes.Typo} ${classes.Typo3}`}
                  color='primary'
                >
                  €39.00
                </Typography>
              </Grid>
              <Grid item md={12} className={classes.ProductDesc}>
                <div style={{}} className={classes.quantityBtn}>
                  <div>
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
                  </div>
                </div>
                <div>
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
                    {product.active ? (
                      <>
                        <AddShoppingCartIcon fontSize='small' />
                        &nbsp;&nbsp;
                        <span className={classes.productCardBtnWrapper}>
                          Add to Cart
                        </span>
                      </>
                    ) : (
                      <>
                        <RemoveShoppingCartIcon fontSize='small' /> &nbsp;&nbsp;
                        <span className={classes.productCardBtnWrapper}>
                          Out of Stock
                        </span>
                      </>
                    )}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item md={12}>
            {/* <Grid item md={12}>
              <Typography>You Might Like</Typography>
            </Grid> */}
          {/* <Grid item md={12}>
                RENDER 6 PRODUCTS
            </Grid>
          </Grid> */}
        </Grid>
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
      </Container>
    </Box>
  );
};

export default Product;
