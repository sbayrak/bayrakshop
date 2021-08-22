// @@@ MATERIAL-UI @@@
import { Typography, Button, Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import Image from 'next/image';
import Link from 'next/link';
import baklava from '../../public/baklava-about.jpg';
import { useState } from 'react';
// @@@ nextjs @@@

const useStyles = makeStyles((theme) => ({
  imgWrapper: {
    position: 'relative',
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.5),
    },
  },
  img: {
    borderRadius: '5px',
  },
  gridItem: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.5),
    },
  },
  productLink: {
    textDecoration: 'none',
    color: '#fafafa',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    transition: '0.5s ease',
    // backgroundColor: 'rgb(103,115,227)',
    background:
      'linear-gradient(236deg, rgba(103,115,227,0.51) 0%, rgba(86,82,222,0.5) 1%)',
    opacity: 0,
    '&:hover': {
      opacity: 1,
    },
  },
  productTypo: {
    zIndex: 99,
    fontWeight: theme.typography.fontWeightMedium,
    letterSpacing: 2,
    [theme.breakpoints.down('xs')]: {
      fontSize: '20px',
    },
  },
  productTypo1: {
    color: theme.palette.grey[800],
  },
  productTypo2: {
    color: '#5652de',
    fontWeight: theme.typography.fontWeightMedium,
  },
  imgRoot: {
    position: 'relative',
    height: 350,
    width: '100%',
  },
}));

const MoreProducts = ({ getCategories, getDiscoverContent }) => {
  const classes = useStyles();
  const [categoryContent, setCategoryContent] = useState(getCategories);
  const [discoverImageContent, setDiscoverContent] = useState(
    getDiscoverContent[0].image
  );

  console.log(getDiscoverContent);

  return (
    <>
      <Box component='div'>
        <Container>
          <Grid container>
            <Grid container item md={12}>
              <Typography
                variant='h4'
                gutterBottom
                className={classes.productTypo1}
              >
                Discover more{' '}
                <span className={classes.productTypo2}>desserts.</span>
              </Typography>
            </Grid>
            {/* {categoryContent.map((category) => (
              <Grid
                item
                md={6}
                className={classes.gridItem}
                xs={6}
                key={category._id}
              >
                <div className={classes.imgWrapper}>
                  <div className={classes.imgRoot}>
                    <Image
                      src={`${discoverImageContent[0].secure_url}`}
                      layout='fill'
                      objectFit='cover'
                      alt='koslowshop baklava'
                      className={classes.img}
                    ></Image>
                  </div>

                  <Link
                    href={`${process.env.NEXT_PUBLIC_URL}/products?category=${category.name}`}
                  >
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className={classes.productLink}
                    >
                      <Typography variant='h4' className={classes.productTypo}>
                        {category.name}
                      </Typography>
                    </a>
                  </Link>
                </div>
              </Grid>
            ))} */}
            {categoryContent.map((category, index) => (
              <Grid
                item
                md={6}
                className={classes.gridItem}
                xs={6}
                key={category._id}
              >
                <div className={classes.imgWrapper}>
                  <div className={classes.imgRoot}>
                    <Image
                      src={`${discoverImageContent[index].secure_url}`}
                      layout='fill'
                      objectFit='cover'
                      alt='koslowshop baklava'
                      className={classes.img}
                    ></Image>
                  </div>

                  <Link
                    href={`${process.env.NEXT_PUBLIC_URL}/products?show=${category.name}`}
                  >
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className={classes.productLink}
                    >
                      <Typography variant='h4' className={classes.productTypo}>
                        {category.name}
                      </Typography>
                    </a>
                  </Link>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default MoreProducts;
