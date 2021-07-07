// @@@ MATERIAL-UI @@@@
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StorefrontIcon from '@material-ui/icons/Storefront';
// @@@ MATERIAL-UI @@@@

// @@@ nextjs @@@@
import Image from 'next/image';
import Link from 'next/link';
import shop from '../../public/shop.jpg';
import chefs from '../../public/chefs.jpg';
import baklava from '../../public/baklava.jpg';
// @@@ nextjs @@@@

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid red',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(10),
  },
  rootLeftGrid: {
    border: '1px solid red',
    padding: theme.spacing(1),
    paddingRight: theme.spacing(3),
  },
  leftGridItem: {
    padding: theme.spacing(0.5),
    paddingBottom: theme.spacing(1),
  },
  title1: {
    paddingBottom: 0,
  },
  koslowshop: {
    color: '#5652de',
    fontWeight: theme.typography.fontWeightLight,
  },
  koslowshop2: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  welcomeTo: {
    color: theme.palette.grey[800],
    [theme.breakpoints.down('xs')]: {
      fontSize: '24px',
    },
  },
  subTitle1: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.grey[800],
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },
  subTitle2: {
    fontSize: '14px',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
    },
  },
  readMore: {
    textDecoration: 'none',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: '5px',
    marginBottom: theme.spacing(1),
    backgroundColor: '#5652de',
    color: '#f6f6f6',
    textAlign: 'center',
    fontWeight: theme.typography.fontWeightMedium,
    transition: '0.3s ease',
    '&:hover': {
      backgroundColor: '#6788f5',
    },
  },
  imgWrapper: {
    width: '100%',
    position: 'relative',
    padding: theme.spacing(1),
    transition: '0.5s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
    [theme.breakpoints.down('xs')]: {},
  },
  img: {
    borderRadius: '5px',
  },
  // MOBILE
  welcomerTitle: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
    },
  },
  desktop: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  mobile: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'inline',
    },
  },
}));

const About = () => {
  const classes = useStyles();

  const desktop = (
    <div className={classes.desktop}>
      <Box component='div' className={classes.root}>
        <Container>
          <Grid container>
            <Grid item md={6} className={classes.rootLeftGrid}>
              <Grid
                item
                md={12}
                className={`${classes.leftGridItem} ${classes.title1}`}
              >
                <Typography
                  variant='subtitle2'
                  color='textSecondary'
                  className={classes.welcomeTo}
                >
                  Baklava, Lokum and more...
                </Typography>
              </Grid>
              <Grid item md={12} className={classes.leftGridItem}>
                <Typography
                  variant='h4'
                  gutterBottom
                  className={classes.welcomeTo}
                >
                  Welcome to{' '}
                  <span className={classes.koslowshop}>
                    <span className={classes.koslowshop2}>Koslow</span>Shop
                  </span>
                </Typography>
              </Grid>
              <Grid item md={12} className={classes.leftGridItem}>
                <Typography variant='subtitle1' className={classes.subTitle1}>
                  Who are we ?
                </Typography>
                <Typography variant='body2' className={classes.subTitle2}>
                  Our business comes from family. Since 1975 we make our
                  products just like we started doing back then. Our business
                  comes from family. Since 1975 we make our products just like
                  we started doing back then. Our business comes from family.
                  Since 1975 we make our products just like we started doing
                  back then.
                </Typography>
              </Grid>
              <Grid item md={12} className={classes.leftGridItem}>
                <Typography variant='subtitle1' className={classes.subTitle1}>
                  How we do it ?
                </Typography>
                <Typography variant='body2' className={classes.subTitle2}>
                  We buy natural products from the village. Then our master
                  chefs prepare dough and all other sweet things. All of our
                  products are handmade, and fresh. We buy natural products from
                  the village. Then our master chefs prepare dough and all other
                  sweet things. All of our products are handmade, and fresh. We
                  buy natural products from the village. Then our master chefs
                  prepare dough and all other sweet things. All of our products
                  are handmade, and fresh.
                </Typography>
              </Grid>
              <Grid item md={12} className={classes.leftGridItem}>
                <Typography variant='subtitle1' className={classes.subTitle1}>
                  How can I order ?
                </Typography>
                <Typography
                  variant='body2'
                  className={classes.subTitle2}
                  gutterBottom
                  paragraph
                >
                  Now, you can order and pay online! We deliver your order to
                  your door. Or you can grab it from our shop. Now, you can
                  order and pay online! We deliver your order to your door. Or
                  you can grab it from our shop. Now, you can order and pay
                  online! We deliver your order to your door. Or you can grab it
                  from our shop.
                </Typography>
              </Grid>
              <Grid item md={12} className={classes.leftGridItem}>
                <Link href='#!'>
                  <a
                    target='_blank'
                    rel='noreferrer noopener'
                    className={classes.readMore}
                  >
                    Read More
                  </a>
                </Link>
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Grid item md={12}>
                <div className={classes.imgWrapper}>
                  <Image
                    src={chefs}
                    layout='responsive'
                    placeholder='blur'
                    className={classes.img}
                  />
                </div>
              </Grid>
              <Grid container item md={12}>
                <Grid item md={6}>
                  <div className={classes.imgWrapper}>
                    <Image
                      src={baklava}
                      layout='responsive'
                      placeholder='blur'
                      className={classes.img}
                    />
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className={classes.imgWrapper}>
                    <Image
                      src={shop}
                      layout='responsive'
                      className={classes.img}
                      placeholder='blur'
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
  const mobile = (
    <div className={classes.mobile}>
      <Box component='div' className={classes.root}>
        <Container>
          <Grid container>
            <Grid item md={6} className={classes.rootLeftGrid}>
              <Grid
                item
                md={12}
                xs={12}
                className={`${classes.leftGridItem} ${classes.title1}`}
              >
                <Typography
                  variant='subtitle2'
                  color='textSecondary'
                  className={`${classes.welcomeTo} ${classes.welcomerTitle}`}
                >
                  Baklava, Lokum and more...
                </Typography>
              </Grid>
              <Grid item md={12} xs={12} className={classes.leftGridItem}>
                <Typography
                  variant='h4'
                  gutterBottom
                  className={classes.welcomeTo}
                >
                  Welcome to{' '}
                  <span className={classes.koslowshop}>
                    <span className={classes.koslowshop2}>Koslow</span>Shop
                  </span>
                </Typography>
              </Grid>
              <Grid item md={12} xs={12} className={classes.leftGridItem}>
                <Typography variant='subtitle1' className={classes.subTitle1}>
                  Who are we ?
                </Typography>
                <Typography variant='body2' className={classes.subTitle2}>
                  Our business comes from family. Since 1975 we make our
                  products just like we started doing back then.
                </Typography>
              </Grid>
              <Grid item md={12} xs={12} className={classes.leftGridItem}>
                <Typography variant='subtitle1' className={classes.subTitle1}>
                  How we do it ?
                </Typography>
                <Typography variant='body2' className={classes.subTitle2}>
                  We buy natural products from the village. Then our master
                  chefs prepare dough and all other sweet things. All of our
                  products are handmade, and fresh.
                </Typography>
              </Grid>
              <Grid item md={12} xs={12} className={classes.leftGridItem}>
                <Typography variant='subtitle1' className={classes.subTitle1}>
                  How can I order ?
                </Typography>
                <Typography
                  variant='body2'
                  className={classes.subTitle2}
                  gutterBottom
                  paragraph
                >
                  Now, you can order and pay online! We deliver your order to
                  your door. Or you can grab it from our shop.
                </Typography>
              </Grid>
              <Grid item md={12} xs={12} className={classes.leftGridItem}>
                <Link href='#!'>
                  <a
                    target='_blank'
                    rel='noreferrer noopener'
                    className={classes.readMore}
                  >
                    Read More
                  </a>
                </Link>
              </Grid>
            </Grid>
            <Grid container item md={6} xs={12}>
              <Grid item md={12} xs={4}>
                <div className={classes.imgWrapper}>
                  <Image
                    src={chefs}
                    layout='responsive'
                    placeholder='blur'
                    className={classes.img}
                  />
                </div>
              </Grid>

              <Grid item md={6} xs={4}>
                <div className={classes.imgWrapper}>
                  <Image
                    src={baklava}
                    layout='responsive'
                    placeholder='blur'
                    className={classes.img}
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={4}>
                <div className={classes.imgWrapper}>
                  <Image
                    src={shop}
                    layout='responsive'
                    className={classes.img}
                    placeholder='blur'
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );

  return (
    <>
      {desktop}
      {mobile}
    </>
  );
};

export default About;
