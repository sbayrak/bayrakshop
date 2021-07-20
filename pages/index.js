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
// @@@ MATERIAL-UI @@@

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();

  const getPagesFromDB = await db.collection('pages').find({}).toArray();
  const getPages = await JSON.parse(JSON.stringify(getPagesFromDB));

  const getHeroContent = getPages.filter((data) => data.section === 'hero');
  const getAboutContent = getPages.filter((data) => data.section === 'about');

  return {
    props: {
      getHeroContent,
      getAboutContent,
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
    borderLeft: '5px solid #5652de',
    borderRight: '5px solid #5652de',
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

export default function Home({ getHeroContent, getAboutContent }) {
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

  // @@@ SECTIONS @@@

  const mostSoldCardDesktop = (
    <div className={classes.MostSoldCardDesktop}>
      <Card className={classes.MostSoldCardRoot} elevation={1}>
        <CardActionArea>
          <Link href='#!'>
            <a
              target='_blank'
              rel='noreferrer noopener'
              className={classes.MostSoldCardLink}
            >
              <Image
                src={baklava}
                layout='responsive'
                alt='koslowshop-baklava'
                title='KoslowShop Baklava'
              ></Image>
              <CardContent style={{ paddingBottom: 0, marginBottom: 0 }}>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='h2'
                  color='textPrimary'
                >
                  Baklava - 1 kg
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  gutterBottom
                >
                  Delicious handmade baklava. Thinly rolled dough, pine nuts,
                  butter and sherbet.
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='textPrimary'
                  component='p'
                >
                  €39.00
                </Typography>
              </CardContent>
            </a>
          </Link>
        </CardActionArea>
        <CardContent className={classes.MostSoldQuantityWrapper}>
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
        </CardContent>
        <CardActions>
          <form style={{ width: '100%' }}>
            <Button
              size='small'
              variant='contained'
              fullWidth
              className={classes.MostSoldAddToCartForm}
            >
              ADD TO CART
            </Button>
          </form>
        </CardActions>
      </Card>
    </div>
  );
  const mostSoldCardMobile = (
    <div className={classes.MostSoldCardMoBile}>
      <Card className={classes.MostSoldCardRoot} elevation={1}>
        <CardActionArea>
          <Link href='#!'>
            <a
              target='_blank'
              rel='noreferrer noopener'
              className={classes.MostSoldCardLink}
            >
              <Image
                src={baklava}
                layout='responsive'
                alt='koslowshop-baklava'
                title='KoslowShop Baklava'
              ></Image>
              <CardContent style={{}}>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='h2'
                  color='textPrimary'
                  gutterBottom
                  paragraph
                  className={classes.MostSoldCardTypo1Mobile}
                >
                  Baklava - 1 kg
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  gutterBottom
                  className={classes.MostSoldCardDescription}
                >
                  Delicious handmade baklava. Thinly rolled dough, pine nuts,
                  butter and sherbet.
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='textPrimary'
                  component='p'
                  className={classes.MostSoldCardTypo2Mobile}
                >
                  €39.00
                </Typography>
              </CardContent>
            </a>
          </Link>
        </CardActionArea>
        <CardContent className={classes.MostSoldQuantityWrapperMobile}>
          <Grid item md={12} className={classes.MostSoldQuantityGrid}>
            <IconButton
              className={classes.MostSoldQuantityBtnMobile}
              onClick={() => setQuantity(quantity - 1)}
            >
              <RemoveIcon fontSize='small' color='primary' />
            </IconButton>
            <span>{quantity}</span>
            <IconButton
              className={classes.MostSoldQuantityBtnMobile}
              onClick={() => setQuantity(quantity + 1)}
            >
              <AddIcon fontSize='small' color='primary' />
            </IconButton>
          </Grid>
        </CardContent>
        <CardActions>
          <form style={{ width: '100%' }}>
            <Button
              size='small'
              variant='contained'
              fullWidth
              className={classes.MostSoldAddToCartForm}
            >
              ADD TO CART
            </Button>
          </form>
        </CardActions>
      </Card>
    </div>
  );
  const mostSold = (
    <Box component='div' className={classes.MostSoldRoot}>
      <Container className={classes.MostSoldRootContainer}>
        <Typography variant='h5' className={classes.MostSoldTypo1}>
          Most Wanted Desserts
        </Typography>
        <div className={classes.MostSoldSeperator}></div>
        <div className={classes.MostSoldTabRoot}>
          <Grid container spacing={3}>
            <Grid item md={3} xs={6}>
              {mostSoldCardDesktop}
              {mostSoldCardMobile}
            </Grid>
            <Grid item md={3} xs={6}>
              {mostSoldCardDesktop}
              {mostSoldCardMobile}
            </Grid>
            <Grid item md={3} xs={6}>
              {mostSoldCardDesktop}
              {mostSoldCardMobile}
            </Grid>
            <Grid item md={3} xs={6}>
              {mostSoldCardDesktop}
              {mostSoldCardMobile}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={3} xs={6}>
              {mostSoldCardDesktop}
              {mostSoldCardMobile}
            </Grid>
            <Grid item md={3} xs={6}>
              {mostSoldCardDesktop}
              {mostSoldCardMobile}
            </Grid>
            <Grid item md={3} xs={6}>
              {mostSoldCardDesktop}
              {mostSoldCardMobile}
            </Grid>
            <Grid item md={3} xs={6}>
              {mostSoldCardDesktop}
              {mostSoldCardMobile}
            </Grid>
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
