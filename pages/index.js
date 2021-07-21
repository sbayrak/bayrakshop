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
import {
  Typography,
  Box,
  Grid,
  Button,
  Container,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  IconButton,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import About from '../components/index/About';
import MostSoldCard from '../components/index/MostSoldCard';
// @@@ MATERIAL-UI @@@

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();

  // @@@ PAGES @@@
  const getPagesFromDB = await db.collection('pages').find({}).toArray();
  const getPages = await JSON.parse(JSON.stringify(getPagesFromDB));

  const getHeroContent = getPages.filter((data) => data.section === 'hero');
  const getAboutContent = getPages.filter((data) => data.section === 'about');
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

  return {
    props: {
      getHeroContent,
      getAboutContent,
      getMostLovedProductsContent,
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
}));

export default function Home({
  getHeroContent,
  getAboutContent,
  getMostLovedProductsContent,
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
            {/* <Grid item md={3} xs={6}>
              <MostSoldCard></MostSoldCard>
            </Grid>
            <Grid item md={3} xs={6}>
              <MostSoldCard></MostSoldCard>
            </Grid>
            <Grid item md={3} xs={6}>
              <MostSoldCard></MostSoldCard>
            </Grid>
            <Grid item md={3} xs={6}>
              <MostSoldCard></MostSoldCard>
            </Grid>
            <Grid item md={3} xs={6}>
              <MostSoldCard></MostSoldCard>
            </Grid>
            <Grid item md={3} xs={6}>
              <MostSoldCard></MostSoldCard>
            </Grid>
            <Grid item md={3} xs={6}>
              <MostSoldCard></MostSoldCard>
            </Grid>
            <Grid item md={3} xs={6}>
              <MostSoldCard></MostSoldCard>
            </Grid> */}
            {getMostLovedProductsContent.map((item) => (
              <Grid item md={3} xs={6} key={item._id}>
                <MostSoldCard item={item} key={item._id} />
              </Grid>
            ))}
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
      <About getAboutContent={getAboutContent}></About>
      <MoreProducts></MoreProducts>
      <Contact></Contact>
    </>
  );
}
