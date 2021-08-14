// @@@ MATERIAL-UI @@@
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useContext } from 'react';
import CartContext from '../../context/cart/CartContext';
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
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.5),
      fontSize: '10px',
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
      fontSize: '12px',
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
      height: '100px',
      marginBottom: theme.spacing(1),
    },
  },
  itemDesc: {
    maxHeight: '25px',
    minHeight: '25px',
    // height: '25px',
    marginBottom: theme.spacing(6),
  },
}));

const MostSoldCard = ({ item }) => {
  const classes = useStyles();
  const cartContext = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  console.log(cartContext);

  useEffect(() => {
    if (quantity <= 1) setQuantity(1);
  }, [quantity]);

  const addCart = (e) => {
    const product = {
      productId: item._id,
      productName: item.name,
      productPrice: item.price,
      quantity: quantity,
    };

    cartContext.addToCart(product);
  };

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
              <div className={classes.imgWrapper}>
                <Image
                  src={item.image[0].secure_url}
                  blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2MIC7r3HwAFDgKGo2ZBBwAAAABJRU5ErkJggg=='
                  layout='fill'
                  objectFit='cover'
                  alt={`KoslowShop ${item.name}`}
                  className={classes.AboutImg}
                />
              </div>

              <CardContent
                style={{
                  paddingBottom: 0,
                  marginBottom: 0,
                }}
              >
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
                  paragraph
                  className={classes.itemDesc}
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
          <Button
            size='small'
            variant='contained'
            fullWidth
            className={classes.MostSoldAddToCartForm}
            onClick={addCart}
          >
            ADD TO CART
          </Button>
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
              <div className={classes.imgWrapper}>
                <Image
                  src={item.image[0].secure_url}
                  blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2MIC7r3HwAFDgKGo2ZBBwAAAABJRU5ErkJggg=='
                  layout='fill'
                  objectFit='cover'
                  alt={`KoslowShop ${item.name}`}
                  className={classes.AboutImg}
                />
              </div>
              <CardContent style={{ paddingBottom: 10, paddingTop: 5 }}>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='h2'
                  color='textPrimary'
                  gutterBottom
                  className={classes.MostSoldCardTypo1Mobile}
                >
                  {item.name}
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
          <Button
            size='small'
            variant='contained'
            fullWidth
            className={classes.MostSoldAddToCartForm}
          >
            ADD TO CART
          </Button>
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
