// @@@ MATERIAL-UI @@@
import {
  Box,
  Container,
  Grid,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Accordion,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import baklava from '../../public/baklava.jpg';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
// @@@ nextjs @@@

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  addToCartBtn: {
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
  cardLink: {
    textDecoration: 'none',
  },
  quantityWrapper: {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  quantityGrid: {},
  quantityBtn: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  descMobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  quantityBtnMobile: {
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(0),
    },
  },
  quantityWrapperMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  Typo1Mobile: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px',
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  Typo2Mobile: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },
  mobile: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'inline',
    },
  },
  desktop: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

const MostSoldCard = () => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quantity < 0) setQuantity(0);
  }, [quantity]);

  const desktop = (
    <div className={classes.desktop}>
      <Card className={classes.root} elevation={1}>
        <CardActionArea>
          <Link href='#!'>
            <a
              target='_blank'
              rel='noreferrer noopener'
              className={classes.cardLink}
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
        <CardContent className={classes.quantityWrapper}>
          <Grid item md={12} className={classes.quantityGrid}>
            <IconButton
              className={classes.quantityBtn}
              onClick={() => setQuantity(quantity - 1)}
            >
              <RemoveIcon fontSize='small' color='primary' />
            </IconButton>
            <span>{quantity}</span>
            <IconButton
              className={classes.quantityBtn}
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
              className={classes.addToCartBtn}
            >
              ADD TO CART
            </Button>
          </form>
        </CardActions>
      </Card>
    </div>
  );
  const mobile = (
    <div className={classes.mobile}>
      <Card className={classes.root} elevation={1}>
        <CardActionArea>
          <Link href='#!'>
            <a
              target='_blank'
              rel='noreferrer noopener'
              className={classes.cardLink}
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
                  className={classes.Typo1Mobile}
                >
                  Baklava - 1 kg
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  gutterBottom
                  className={classes.descMobile}
                >
                  Delicious handmade baklava. Thinly rolled dough, pine nuts,
                  butter and sherbet.
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='textPrimary'
                  component='p'
                  className={classes.Typo2Mobile}
                >
                  €39.00
                </Typography>
              </CardContent>
            </a>
          </Link>
        </CardActionArea>
        <CardContent className={classes.quantityWrapperMobile}>
          <Grid item md={12} className={classes.quantityGrid}>
            <IconButton
              className={classes.quantityBtnMobile}
              onClick={() => setQuantity(quantity - 1)}
            >
              <RemoveIcon fontSize='small' color='primary' />
            </IconButton>
            <span>{quantity}</span>
            <IconButton
              className={classes.quantityBtnMobile}
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
              className={classes.addToCartBtn}
            >
              ADD TO CART
            </Button>
          </form>
        </CardActions>
      </Card>
    </div>
  );

  return (
    <>
      {desktop}
      {mobile}
    </>
  );
};

export default MostSoldCard;
