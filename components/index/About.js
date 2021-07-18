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
  AboutRoot: {
    marginTop: theme.spacing(25),
    marginBottom: theme.spacing(25),
    backgroundColor: '#fafafa',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
    },
  },
  AboutRootLeftGrid: {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    borderLeft: '2px solid rgba(86,82,222,0.1)',
    borderTop: '2px solid rgba(86,82,222,0.1)',
  },
  AboutRootRightGrid: {},
  AboutLeftGridItem: {
    padding: theme.spacing(0.5),
    paddingBottom: theme.spacing(1),
  },
  AboutTitle1: {
    paddingBottom: 0,
  },
  AboutKoslowShop: {
    color: '#5652de',
    fontWeight: theme.typography.fontWeightLight,
  },
  AboutKoslowShop2: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  AboutWelcomeTo: {
    color: theme.palette.grey[800],
    [theme.breakpoints.down('xs')]: {
      fontSize: '24px',
    },
  },
  AboutSubTitle1: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.grey[800],
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },
  AboutSubTitle2: {
    fontSize: '14px',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
    },
  },
  AboutReadMore: {
    textDecoration: 'none',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: '5px',
    marginBottom: theme.spacing(1),
    // backgroundColor: '#4062bb',
    backgroundColor: '#4062bb',
    color: '#f6f6f6',
    textAlign: 'center',
    fontWeight: theme.typography.fontWeightMedium,
    transition: '0.3s ease',
    '&:hover': {
      backgroundColor: '#6788f5',
    },
  },
  AboutImgWrapper: {
    width: '100%',
    position: 'relative',
    padding: theme.spacing(1),
    transition: '0.5s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
    [theme.breakpoints.down('xs')]: {},
  },
  AboutImg: {
    borderRadius: '5px',
  },
  // MOBILE
  AboutWelcomerTitle: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
    },
  },
  AboutDesktop: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  AboutMobile: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'inline',
    },
  },
}));

const About = () => {
  const classes = useStyles();

  const AboutDesktop = (
    <div className={classes.AboutDesktop}>
      <Box component='div' className={classes.AboutRoot}>
        <Container>
          <Grid container>
            <Grid item md={6} className={classes.AboutRootLeftGrid}>
              <Grid
                item
                md={12}
                className={`${classes.AboutLeftGridItem} ${classes.AboutTitle1}`}
              >
                <Typography
                  variant='subtitle2'
                  color='textSecondary'
                  className={classes.AboutWelcomeTo}
                >
                  Baklava, Lokum and more...
                </Typography>
              </Grid>
              <Grid item md={12} className={classes.AboutLeftGridItem}>
                <Typography
                  variant='h4'
                  gutterBottom
                  className={classes.AboutWelcomeTo}
                >
                  Welcome to{' '}
                  <span className={classes.AboutKoslowShop}>
                    <span className={classes.AboutKoslowShop2}>Koslow</span>Shop
                  </span>
                </Typography>
              </Grid>
              <Grid item md={12} className={classes.AboutLeftGridItem}>
                <Typography
                  variant='subtitle1'
                  className={classes.AboutSubTitle1}
                >
                  Who are we ?
                </Typography>
                <Typography variant='body2' className={classes.AboutSubTitle2}>
                  Our business comes from family. Since 1975 we make our
                  products just like we started doing back then. Our business
                  comes from family. Since 1975 we make our products just like
                  we started doing back then. Our business comes from family.
                  Since 1975 we make our products just like we started doing
                  back then.
                </Typography>
              </Grid>
              <Grid item md={12} className={classes.AboutLeftGridItem}>
                <Typography
                  variant='subtitle1'
                  className={classes.AboutSubTitle1}
                >
                  How we do it ?
                </Typography>
                <Typography variant='body2' className={classes.AboutSubTitle2}>
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
              <Grid item md={12} className={classes.AboutLeftGridItem}>
                <Typography
                  variant='subtitle1'
                  className={classes.AboutSubTitle1}
                >
                  How can I order ?
                </Typography>
                <Typography
                  variant='body2'
                  className={classes.AboutSubTitle2}
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
              <Grid item md={12} className={classes.AboutLeftGridItem}>
                <Link href='#!'>
                  <a
                    target='_blank'
                    rel='noreferrer noopener'
                    className={classes.AboutReadMore}
                  >
                    Read More
                  </a>
                </Link>
              </Grid>
            </Grid>
            <Grid item md={6} className={classes.AboutRootRightGrid}>
              <Grid item md={12}>
                <div className={classes.AboutImgWrapper}>
                  <Image
                    src={chefs}
                    layout='responsive'
                    placeholder='blur'
                    className={classes.AboutImg}
                  />
                </div>
              </Grid>
              <Grid container item md={12}>
                <Grid item md={6}>
                  <div className={classes.AboutImgWrapper}>
                    <Image
                      src={baklava}
                      layout='responsive'
                      placeholder='blur'
                      className={classes.AboutImg}
                    />
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className={classes.AboutImgWrapper}>
                    <Image
                      src={shop}
                      layout='responsive'
                      className={classes.AboutImg}
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
  const AboutMobile = (
    <div className={classes.AboutMobile}>
      <Box component='div' className={classes.AboutRoot}>
        <Container>
          <Grid container>
            <Grid item md={6} className={classes.AboutRootLeftGrid}>
              <Grid
                item
                md={12}
                xs={12}
                className={`${classes.AboutLeftGridItem} ${classes.AboutTitle1}`}
              >
                <Typography
                  variant='subtitle2'
                  color='textSecondary'
                  className={`${classes.AboutWelcomeTo} ${classes.AboutWelcomerTitle}`}
                >
                  Baklava, Lokum and more...
                </Typography>
              </Grid>
              <Grid item md={12} xs={12} className={classes.AboutLeftGridItem}>
                <Typography
                  variant='h4'
                  gutterBottom
                  className={classes.AboutWelcomeTo}
                >
                  Welcome to{' '}
                  <span className={classes.AboutKoslowShop}>
                    <span className={classes.AboutKoslowShop2}>Koslow</span>Shop
                  </span>
                </Typography>
              </Grid>
              <Grid item md={12} xs={12} className={classes.AboutLeftGridItem}>
                <Typography
                  variant='subtitle1'
                  className={classes.AboutSubTitle1}
                >
                  Who are we ?
                </Typography>
                <Typography variant='body2' className={classes.AboutSubTitle2}>
                  Our business comes from family. Since 1975 we make our
                  products just like we started doing back then.
                </Typography>
              </Grid>
              <Grid item md={12} xs={12} className={classes.AboutLeftGridItem}>
                <Typography
                  variant='subtitle1'
                  className={classes.AboutSubTitle1}
                >
                  How we do it ?
                </Typography>
                <Typography variant='body2' className={classes.AboutSubTitle2}>
                  We buy natural products from the village. Then our master
                  chefs prepare dough and all other sweet things. All of our
                  products are handmade, and fresh.
                </Typography>
              </Grid>
              <Grid item md={12} xs={12} className={classes.AboutLeftGridItem}>
                <Typography
                  variant='subtitle1'
                  className={classes.AboutSubTitle1}
                >
                  How can I order ?
                </Typography>
                <Typography
                  variant='body2'
                  className={classes.AboutSubTitle2}
                  gutterBottom
                  paragraph
                >
                  Now, you can order and pay online! We deliver your order to
                  your door. Or you can grab it from our shop.
                </Typography>
              </Grid>
              <Grid item md={12} xs={12} className={classes.AboutLeftGridItem}>
                <Link href='#!'>
                  <a
                    target='_blank'
                    rel='noreferrer noopener'
                    className={classes.AboutReadMore}
                  >
                    Read More
                  </a>
                </Link>
              </Grid>
            </Grid>
            <Grid container item md={6} xs={12}>
              <Grid item md={12} xs={4}>
                <div className={classes.AboutImgWrapper}>
                  <Image
                    src={chefs}
                    layout='responsive'
                    placeholder='blur'
                    className={classes.AboutImg}
                  />
                </div>
              </Grid>

              <Grid item md={6} xs={4}>
                <div className={classes.AboutImgWrapper}>
                  <Image
                    src={baklava}
                    layout='responsive'
                    placeholder='blur'
                    className={classes.AboutImg}
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={4}>
                <div className={classes.AboutImgWrapper}>
                  <Image
                    src={shop}
                    layout='responsive'
                    className={classes.AboutImg}
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
      {AboutDesktop}
      {AboutMobile}
    </>
  );
};

export default About;
