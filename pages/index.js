// @@@ nextjs @@@
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import { connectToDatabase } from '../util/mongodb';
import { useState, useEffect } from 'react';
// @@@ nextjs @@@

// @@@ COMPONENT IMPORTS @@@
// import Hero from '../components/index/Hero';
import InformativeBanner from '../components/layout/InformativeBanner';
import Hero from '../components/index/Hero';
import Contact from '../components/index/Contact';
import MoreProducts from '../components/index/MoreProducts';
import baklava from '../public/baklava.jpg';
// @@@ COMPONENT IMPORTS @@@

// @@@ MATERIAL-UI @@@
import { Typography, Box, Grid, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import About from '../components/index/About';
import MostSoldCard from '../components/index/MostSoldCard';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// @@@ MATERIAL-UI @@@

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();

  // @@@ PAGES @@@
  const getPagesFromDB = await db.collection('pages').find({}).toArray();
  const getPages = await JSON.parse(JSON.stringify(getPagesFromDB));

  const getHeroContent = getPages.filter((data) => data.section === 'hero');
  const getAboutContent = getPages.filter((data) => data.section === 'about');
  const getDiscoverContent = getPages.filter(
    (data) => data.section === 'discover'
  );
  const getContactContent = getPages.filter(
    (data) => data.section === 'contact'
  );
  // @@@ PAGES @@@

  // @@@ PRODUCTS @@@
  const getMostLovedProductsFromDB = await db
    .collection('products')
    .find({})
    .limit(8)
    .toArray();
  const getMostLovedProductsContent = await JSON.parse(
    JSON.stringify(getMostLovedProductsFromDB)
  );

  // @@@ PRODUCTS @@@

  // @@@ CATEGORY @@@
  const getCategoriesFromDB = await db
    .collection('categories')
    .find({})
    .limit(4)
    .toArray();
  const getCategories = await JSON.parse(JSON.stringify(getCategoriesFromDB));

  // @@@ CATEGORY @@@

  return {
    props: {
      getHeroContent,
      getAboutContent,
      getMostLovedProductsContent,
      getContactContent,
      getCategories,
      getDiscoverContent,
    },
    revalidate: 1,
  };
};

const useStyles = makeStyles((theme) => ({
  // @@@ MOSTSOLD SECTION @@@
  MostSoldRoot: {
    marginTop: theme.spacing(15),
  },
  MostSoldTabRoot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(0.5),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  },
  MostSoldRootContainer: {
    padding: theme.spacing(1),
  },
  MostSoldTypo1: {
    fontWeight: theme.typography.fontWeightRegular,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    borderLeft: '5px solid #5652de',
    borderRight: '5px solid #5652de',
  },
  MostSoldTypo2: {
    color: '#5652de',
  },
  MostSoldSeperator: {
    height: '50px',
    backgroundColor: '#5652de',
  },
  MostSoldCardRoot: {
    maxWidth: 345,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  MostSoldAddToCartForm: {
    textDecoration: 'none',
    padding: theme.spacing(1),
    borderRadius: '5px',
    marginBottom: theme.spacing(1),
    backgroundColor: '#5652de',
    border: '1px solid #5652de',
    color: '#f6f6f6',
    textAlign: 'center',
    fontWeight: theme.typography.fontWeightMedium,
    transition: '0.3s ease',
    '&:hover': {
      backgroundColor: '#6788f5',
    },
  },
  MostSoldCardLink: {
    textDecoration: 'none',
  },
  MostSoldQuantityWrapper: {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  MostSoldQuantityGrid: {},
  MostSoldQuantityBtn: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  MostSoldCardDescription: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  MostSoldQuantityBtnMobile: {
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(0),
    },
  },
  MostSoldQuantityWrapperMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  MostSoldCardTypo1Mobile: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px',
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  MostSoldCardTypo2Mobile: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },
  MostSoldCardMoBile: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'inline',
    },
  },
  MostSoldCardDesktop: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  // @@@ MOSTSOLD SECTION @@@
  moreProductsRoot: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(5),
  },
  moreProductsBtn: {
    padding: theme.spacing(1),
    borderRadius: '5px',
    backgroundColor: '#5652de',
    color: '#f6f6f6',
    textAlign: 'center',
    fontWeight: theme.typography.fontWeightMedium,
    transition: '0.3s ease',
    '&:hover': {
      backgroundColor: '#6788f5',
    },
  },
  moreProductsLink: {
    textDecoration: 'none',
    color: '#f6f6f6',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    textTransform: 'none',
  },
}));

export default function Home({
  getHeroContent,
  getAboutContent,
  getContactContent,
  getMostLovedProductsContent,
  getCategories,
  getDiscoverContent,
}) {
  const classes = useStyles();
  const [session, loading] = useSession();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quantity <= 1) setQuantity(1);
  }, [quantity]);
  const customSignOut = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: `${window.location.origin}/`,
    });
    router.push(data.url);
  };

  const mostSold = (
    <Box component='div' className={classes.MostSoldRoot}>
      <Container className={classes.MostSoldRootContainer}>
        <Typography variant='h5' className={classes.MostSoldTypo1}>
          Most Wanted <span className={classes.MostSoldTypo2}>Desserts</span>
        </Typography>
        <div className={classes.MostSoldSeperator}></div>
        <div className={classes.MostSoldTabRoot}>
          <Grid container spacing={3}>
            {getMostLovedProductsContent.map((item) => (
              <Grid item md={3} xs={6} key={item._id}>
                <MostSoldCard item={item} key={item._id} />
              </Grid>
            ))}
          </Grid>
          <Grid item md={12} className={classes.moreProductsRoot}>
            <Button fullWidth className={classes.moreProductsBtn}>
              <Link href={`${process.env.NEXT_PUBLIC_URL}/products`}>
                <a className={classes.moreProductsLink}>
                  <span>All Products</span>{' '}
                  <ArrowDownwardIcon fontSize='small' />
                </a>
              </Link>
            </Button>
          </Grid>
        </div>
      </Container>
    </Box>
  );

  // @@@ SECTIONS @@@

  return (
    <>
      <Hero getHeroContent={getHeroContent}></Hero>
      {mostSold}
      <InformativeBanner></InformativeBanner>
      <MoreProducts
        getCategories={getCategories}
        getDiscoverContent={getDiscoverContent}
      ></MoreProducts>
      <About getAboutContent={getAboutContent}></About>
      <Contact getContactContent={getContactContent}></Contact>
    </>
  );
}
