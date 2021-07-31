// @@@ MATERIAL-UI @@@
import { Grid, Typography, Checkbox, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import Link from 'next/link';
import Image from 'next/image';
import { connectToDatabase } from '../../util/mongodb';
import { useState, useEffect } from 'react';

// @@@ nextjs @@@

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();
  const getCategoriesFromDB = await db
    .collection('categories')
    .find({})
    .toArray();
  const getCategories = await JSON.parse(JSON.stringify(getCategoriesFromDB));

  const getProductsFromDB = await db.collection('products').find({}).toArray();
  const getProducts = await JSON.parse(JSON.stringify(getProductsFromDB));

  return {
    props: {
      getCategories,
      getProducts,
    },
  };
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
    backgroundColor: '#fff',
    paddingBottom: theme.spacing(5),
    marginTop: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing(1.5),
      paddingLeft: theme.spacing(1.5),
    },
  },
  filterGridContainer: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
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
  productCardWrapper: {
    position: 'relative',
  },
  productsGridContainer: {
    marginTop: theme.spacing(2),
  },
  productCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: theme.spacing(3),
    borderRadius: '5px',
    boxShadow: '1px 2px 5px 1px rgba(86,82,222,0.1)',
    backgroundColor: '#fff',
    border: '1px solid rgba(86,82,222,0.1)',
    transition: '0.5s ease',
    '&:hover': {
      filter: 'blur(15px)',
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 0,
    },
  },
  productCardTypo: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: theme.palette.grey[600],
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      marginTop: theme.spacing(0),
      paddingTop: theme.spacing(0.5),
    },
  },
  productHoverWrapper: {
    backgroundColor: 'rgba(86,82,222,0.85)',
    borderRadius: '5px',
    width: '95%',
    height: '100%',
    position: 'absolute',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    opacity: 0,
    transition: '0.5s ease',
    '&:hover': {
      opacity: 1,
    },
  },
  productHoverLink: {
    color: '#f6f6f6',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    fontSize: '18px',
    width: '100%',
    transition: '0.5s ease',
    '&:hover': {
      color: '#5652de',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  productAddToCart: {
    color: '#f6f6f6',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
    fontSize: '16px',
    textTransform: 'none',
    transition: '0.5s ease',
    '&:hover': {
      color: '#5652de',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  productHoverItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    transition: '0.5s ease',
    '&:hover': {
      backgroundColor: '#f6f6f6',
    },
  },
  productImageWrapper: {
    width: '100%',
  },
}));

const Products = ({ getCategories, getProducts }) => {
  const classes = useStyles();
  const [products, setProducts] = useState(getProducts);
  const [categories, setCategories] = useState([]);
  // @@@ TODO : Add infinite scroll.

  useEffect(() => {
    if (categories.length === 0) {
      setProducts(getProducts);
    } else if (categories.length > 0) {
      let filteredProducts = getProducts.filter((product) =>
        categories.includes(product.category)
      );
      setProducts(filteredProducts);
    }
  }, [categories]);

  const addToFilter = (e) => {
    const categoryName = e.currentTarget.dataset.category;

    if (categories.length === 0) {
      setCategories([...categories, categoryName]);
    } else if (categories.includes(categoryName)) {
      let copyArray = [...categories];
      copyArray.splice(copyArray.indexOf(categoryName), 1);

      setCategories(copyArray);
    } else if (!categories.includes(categoryName)) {
      setCategories([...categories, categoryName]);
    }
  };

  const isChecked = (e) => {
    if (categories.includes(e.currentTarget.dataset.category)) {
      return true;
    } else {
      return false;
    }
  };

  console.log(products);
  console.log(categories);
  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.gridContainer}>
          <Grid item md={3} className={classes.filterGridContainer}>
            <div>
              <Typography variant='h6' className={classes.filterTitle}>
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
                    <Typography
                      variant='subtitle1'
                      className={classes.filterTypo}
                    >
                      {category.name}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
          <Grid
            item
            container
            md={9}
            spacing={3}
            className={classes.productsGridContainer}
          >
            {products.map((product) => (
              <Grid
                item
                md={3}
                xs={6}
                className={classes.productCardWrapper}
                key={product._id}
              >
                <div className={classes.productCard}>
                  <div className={classes.productImageWrapper}>
                    <Image
                      src={product.image[0].secure_url}
                      alt={`${process.env.NEXT_PUBLIC_URL} ${product.name}`}
                      height={300}
                      width={450}
                    />
                  </div>
                  <Typography className={classes.productCardTypo}>
                    {product.name}
                  </Typography>
                  <Typography variant='h6' className={classes.productCardTypo}>
                    €{product.price}
                  </Typography>
                </div>
                <div className={classes.productHoverWrapper}>
                  <div className={classes.productHoverItem}>
                    <Link
                      href={`${
                        process.env.NEXT_PUBLIC_URL
                      }/products/${product.name
                        .toLowerCase()
                        .replace(' ', '-')}`}
                    >
                      <a className={classes.productHoverLink}>
                        <SearchIcon />
                        &nbsp;&nbsp;<span>Read Details</span>
                      </a>
                    </Link>
                  </div>
                  <div className={classes.productHoverItem}>
                    <Button
                      fullWidth
                      className={classes.productAddToCart}
                      disableRipple
                      disableFocusRipple
                      disableElevation
                      disableTouchRipple
                    >
                      <AddShoppingCartIcon />
                      &nbsp;&nbsp;<span>Add to Cart</span>
                    </Button>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Products;
