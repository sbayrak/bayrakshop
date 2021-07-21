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
  MostSoldCardRoot: {
    maxWidth: 345,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    border: '1px inset rgba(86,82,222,0.2)',
  },
  MostSoldAddToCartForm: {
    textDecoration: 'none',
    padding: theme.spacing(1),
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
  imgWrapper: {
    width: '100%',
    height: '200px',
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
}));

const MostSoldCard = ({ item }) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);

  console.log(item.name);

  useEffect(() => {
    if (quantity <= 1) setQuantity(1);
  }, [quantity]);

  const MostSoldCardDesktop = (
    <div className={classes.MostSoldCardDesktop}>
      <Card className={classes.MostSoldCardRoot} elevation={1}>
        <CardActionArea>
          <Link href='#!'>
            <a
              target='_blank'
              rel='noreferrer noopener'
              className={classes.MostSoldCardLink}
            >
              <div
                className={classes.imgWrapper}
                // style={{ height: `${item.image[0].height}px` }}
              >
                <Image
                  src={item.image[0].secure_url}
                  blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2MIC7r3HwAFDgKGo2ZBBwAAAABJRU5ErkJggg=='
                  layout='fill'
                  objectFit='cover'
                  alt={`KoslowShop ${item.name}`}
                  className={classes.AboutImg}
                />
              </div>

              <CardContent style={{ paddingBottom: 0, marginBottom: 0 }}>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='h2'
                  color='textPrimary'
                >
                  {item.name}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  gutterBottom
                >
                  {item.description}
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='textPrimary'
                  component='p'
                >
                  €{item.price}.00
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
  const mobile = (
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
                src={item.image[0].secure_url}
                layout='fill'
                alt={`KoslowShop - ${item.name}`}
                title={`KoslowShop - ${item.name}`}
              ></Image>
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='h2'
                  color='textPrimary'
                  gutterBottom
                  paragraph
                  className={classes.MostSoldCardTypo1Mobile}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  gutterBottom
                  className={classes.MostSoldCardDescription}
                >
                  {item.description}
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='textPrimary'
                  component='p'
                  className={classes.MostSoldCardTypo2Mobile}
                >
                  €{item.price}
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

  return (
    <>
      {MostSoldCardDesktop}
      {mobile}
    </>
  );
};

export default MostSoldCard;
