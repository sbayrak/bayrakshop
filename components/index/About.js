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
import chefdeneme from '../../public/about_top_SIZE.jpg';
import baklava from '../../public/baklava.jpg';
import { useState, useEffect } from 'react';
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
  AboutRootRightGrid: {
    marginTop: theme.spacing(5),
  },
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
    height: '100%',
    position: 'relative',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    transition: '0.5s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
    [theme.breakpoints.down('xs')]: {
      height: '75px',
    },
  },
  aboutBottomImgWrapperGrid: {
    // paddingLeft: theme.spacing(1),
    // paddingRight: theme.spacing(1),
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

const About = ({ getAboutContent }) => {
  const classes = useStyles();
  const [paragraph, setParagraph] = useState(getAboutContent[0].paragraph);
  const [image, setImage] = useState(getAboutContent[0].image);

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
                  {paragraph.parag1}
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
                  {paragraph.parag2}
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
                  {paragraph.parag3}
                </Typography>
              </Grid>
              <Grid item md={12} className={classes.AboutLeftGridItem}>
                <Link href='/about'>
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
                <div
                  className={classes.AboutImgWrapper}
                  style={{ height: `${image[0].height + 50}px` }}
                >
                  <Image
                    src={image[0].secure_url}
                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2MIC7r3HwAFDgKGo2ZBBwAAAABJRU5ErkJggg=='
                    layout='fill'
                    objectFit='cover'
                    alt='koslowshop-baklava'
                    className={classes.AboutImg}
                  />
                </div>
              </Grid>
              <Grid container item md={12}>
                <Grid
                  item
                  md={6}
                  className={classes.aboutBottomImgWrapperGrid}
                  style={{
                    paddingRight: '10px',
                  }}
                >
                  <div
                    className={classes.AboutImgWrapper}
                    style={{
                      height: image[0].height,
                    }}
                  >
                    <Image
                      src={image[1].secure_url}
                      blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2MIC7r3HwAFDgKGo2ZBBwAAAABJRU5ErkJggg=='
                      layout='fill'
                      objectFit='cover'
                      alt='koslowshop-baklava'
                      className={classes.AboutImg}
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  md={6}
                  className={classes.aboutBottomImgWrapperGrid}
                  style={{
                    paddingLeft: '10px',
                  }}
                >
                  <div
                    className={classes.AboutImgWrapper}
                    style={{
                      height: image[0].height,
                    }}
                  >
                    <Image
                      src={image[2].secure_url}
                      blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2MIC7r3HwAFDgKGo2ZBBwAAAABJRU5ErkJggg=='
                      layout='fill'
                      objectFit='cover'
                      alt='koslowshop-baklava'
                      className={classes.AboutImg}
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
                  {paragraph.parag1}
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
                  {paragraph.parag2}
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
                  {paragraph.parag3}
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
            <Grid container item md={6} xs={12} spacing={2}>
              <Grid item md={12} xs={12}>
                <div className={classes.AboutImgWrapper}>
                  <Image
                    src={image[0].secure_url}
                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2MIC7r3HwAFDgKGo2ZBBwAAAABJRU5ErkJggg=='
                    layout='fill'
                    objectFit='cover'
                    alt='koslowshop-baklava'
                    className={classes.AboutImg}
                  />
                </div>
              </Grid>

              <Grid item md={6} xs={6}>
                <div className={classes.AboutImgWrapper}>
                  <Image
                    src={image[1].secure_url}
                    layout='fill'
                    objectFit='cover'
                    alt='koslowshop-baklava'
                    className={classes.AboutImg}
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={6}>
                <div className={classes.AboutImgWrapper}>
                  <Image
                    src={image[2].secure_url}
                    layout='fill'
                    objectFit='cover'
                    alt='koslowshop-baklava'
                    className={classes.AboutImg}
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
