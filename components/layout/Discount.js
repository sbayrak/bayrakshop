// @@@ MATERIAL-UI @@@
import { Box, Container, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import hero from '../../public/hero.png';
// @@@ MATERIAL-UI @@@

// @@@ NEXTJS @@@
import { useState } from 'react';
import Link from 'next/link';
// @@@ NEXTJS @@@

const useStyles = makeStyles((theme) => ({
  DiscountRoot: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(15),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
    },
  },
  DiscountContainer: {
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    backgroundImage: `url(${hero.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: '5px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(7.5),
      paddingBottom: theme.spacing(7.5),
      alignItems: 'center',
    },
  },
  DiscountGridItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  DiscountGridItemLeft: {
    [theme.breakpoints.down('xs')]: {
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(5),
      },
    },
  },
  Typo1: {
    fontSize: '184px',
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.down('xs')]: {
      fontSize: '92px',
    },
  },
  Typo2: {
    fontWeight: theme.typography.fontWeightMedium,
    [theme.breakpoints.down('xs')]: {
      fontSize: '42px',
    },
  },
  DiscountMobileRightWrapper: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  DiscountBtn: {
    borderRadius: '5px',
    padding: 0,
  },
  DiscountBtnLink: {
    textDecoration: 'none',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontWeight: theme.typography.fontWeightBold,
    color: '#5652de',
  },
}));

const Discount = ({ getDiscountContent }) => {
  const [content, setContent] = useState(getDiscountContent);
  const classes = useStyles();
  return (
    <>
      <Box component='div' className={classes.DiscountRoot}>
        <Container
          className={classes.DiscountContainer}
          style={{
            backgroundImage: `url(${content[0].image[0].secure_url})`,
          }}
        >
          <Grid container>
            <Grid
              item
              md={5}
              xs={12}
              className={`${classes.DiscountGridItem} ${classes.DiscountGridItemLeft}`}
            >
              <div>
                <Typography
                  variant='h1'
                  className={classes.Typo1}
                  color='secondary'
                >
                  {content[0].discountParag1}
                </Typography>
                <Typography variant='caption' color='secondary'>
                  *For a limited time only!
                </Typography>
              </div>
            </Grid>
            <Grid item md={2}></Grid>
            <Grid item md={5} xs={12} className={classes.DiscountGridItem}>
              <div className={classes.DiscountMobileRightWrapper}>
                <Typography
                  variant='h2'
                  className={classes.Typo2}
                  gutterBottom
                  color='secondary'
                >
                  {content[0].discountParag2}
                </Typography>
                <Typography
                  variant='body2'
                  gutterBottom
                  paragraph
                  color='secondary'
                >
                  {content[0].discountParag3}
                </Typography>
                <Button
                  variant='contained'
                  color='secondary'
                  disableElevation
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  className={classes.DiscountBtn}
                >
                  <Link
                    href={`${process.env.NEXT_PUBLIC_URL}/products?discounted=true`}
                  >
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className={classes.DiscountBtnLink}
                    >
                      Shop Now
                    </a>
                  </Link>
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Discount;
