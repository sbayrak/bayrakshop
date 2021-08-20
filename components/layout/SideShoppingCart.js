import baklava from '../../public/signin_left2.jpg';
import { Grid, Typography, IconButton, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import Image from 'next/image';
import CartContext from '../../context/cart/CartContext';
import { useContext } from 'react';

const useStyles = makeStyles((theme) => ({
  shoppingCartTypo1: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  shoppingCartTypo2: {
    color: theme.palette.grey[700],
    marginBottom: theme.spacing(5),
  },
  shoppingCartItem: {
    marginTop: theme.spacing(1.5),
  },
}));

const SideShoppingCart = ({ item }) => {
  const classes = useStyles();
  const cartContext = useContext(CartContext);

  const deleteProduct = (e) => {
    const productIdToBeDeleted = e.currentTarget.dataset.productid;

    cartContext.deleteItemFromCart(item.customerId, productIdToBeDeleted);
  };

  return (
    <>
      <Grid item container md={12} className={classes.shoppingCartItem}>
        <Grid item md={3}>
          <Image src={item.productImg} width={75} height={75} />
        </Grid>
        <Grid item md={8}>
          <Typography variant='subtitle1' className={classes.shoppingCartTypo1}>
            {item.productName}
          </Typography>
          <Typography variant='body2' className={classes.shoppingCartTypo2}>
            {item.quantity} Piece - €{item.quantity * item.productPrice}
          </Typography>
        </Grid>
        <Grid item md={1}>
          <IconButton data-productid={item.productId} onClick={deleteProduct}>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Grid>
        <Grid item md={12}>
          <Divider />
        </Grid>
      </Grid>
    </>
  );
};

export default SideShoppingCart;
