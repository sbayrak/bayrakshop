// @@@ MATERIAL-UI @@@
import { Grid, Typography, Checkbox, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { connectToDatabase } from '../../util/mongodb';
import { useState, useEffect } from 'react';

// @@@ nextjs @@@

export const getServerSideProps = async (context) => {
  const { db } = await connectToDatabase();

  const getCategoriesFromDB = await db
    .collection('categories')
    .find({})
    .toArray();
  const getCategories = await JSON.parse(JSON.stringify(getCategoriesFromDB));

  if (
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
    backgroundColor: '#fff',
    paddingBottom: theme.spacing(5),
    marginTop: theme.spacing(20),
    minHeight: '100vh',
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing(1.5),
      paddingLeft: theme.spacing(1.5),
    },
  },
  filterGridContainer: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
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
  productCardWrapper: {
    position: 'relative',
  },
  productsGridContainer: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  productCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(7),
    paddingBottom: theme.spacing(3),
    borderRadius: '5px',
    boxShadow: '1px 2px 5px 1px rgba(86,82,222,0.1)',
    backgroundColor: '#f6f6f6',
    border: '1px solid rgba(86,82,222,0.1)',
    transition: '0.5s ease',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 0,
      marginTop: theme.spacing(1),
    },
  },
  productCardTypo: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
    width: '100%',
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
  const router = useRouter();

  useEffect(() => {
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
  }, [categories]);

  const addToFilter = (e) => {
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

  const categorySection = (
    <Grid item md={2} className={classes.filterGridContainer}>
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
      md={10}
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
            </Typography>{' '}
            <div className={classes.productHoverWrapper}>
              <div className={classes.productHoverItem}>
                <Link
                  href={`${
                    process.env.NEXT_PUBLIC_URL
                  }/products/${product.name.toLowerCase().replace(' ', '-')}`}
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
                  disabled={product.active ? false : true}
                >
                  {product.active ? (
                    <>
                      <AddShoppingCartIcon />
                      &nbsp;&nbsp;<span>Add to Cart</span>
                    </>
                  ) : (
                    <>
                      <RemoveShoppingCartIcon /> &nbsp;&nbsp;
                      <span>Out of Stock</span>
                    </>
                  )}
                </Button>
              </div>
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
        </Grid>
      </div>
    </>
  );
};

export default Products;
