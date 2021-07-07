// @@@ MATERIAL-UI @@@@
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PaymentIcon from '@material-ui/icons/Payment';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
// @@@ MATERIAL-UI @@@@

// @@@ nextjs @@@@

// @@@ nextjs @@@@

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: theme.shadows[1],
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    backgroundColor: '#fff',
  },
  rootContainer: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: '5px',
    },
  },
  gridItem: {
    borderRight: '2px solid rgba(86,82,222,0.1)',
    borderRadius: '5px',
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      padding: '5px',
    },
  },
  gridItemMostRight: {
    border: 'none',
  },
  typoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      padding: '5px',
      alignItems: 'center',
    },
  },
  typoWrapperRoot: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      //   textAlign: 'left',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
  },
  iconWrapper: {
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#5652de',
    [theme.breakpoints.down('xs')]: {},
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

const InformativeBanner = () => {
  const classes = useStyles();

  const desktop = (
    <div className={classes.desktop}>
      <Box component='div' className={classes.root}>
        <Container className={classes.rootContainer}>
          <Grid container>
            <Grid item md={3} className={classes.gridItem} sm={6}>
              <div className={classes.typoWrapper}>
                <div className={classes.iconWrapper}>
                  <PaymentIcon color='secondary' fontSize='large' />
                </div>

                <div className={classes.typoWrapperRoot}>
                  <Typography variant='subtitle2'>Secure payment</Typography>
                  <Typography variant='caption'>
                    Usage of 256bit SSL and Paypal, you can safely pay.
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item md={3} className={classes.gridItem} sm={6}>
              <div className={classes.typoWrapper}>
                <div className={classes.iconWrapper}>
                  <CheckCircleIcon color='secondary' fontSize='large' />
                </div>

                <div className={classes.typoWrapperRoot}>
                  <Typography variant='subtitle2'>Faster Delivery</Typography>
                  <Typography variant='caption'>
                    Shipment on the same day for orders before 15:00
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item md={3} className={classes.gridItem} sm={6}>
              <div className={classes.typoWrapper}>
                <div className={classes.iconWrapper}>
                  <LocalShippingIcon color='secondary' fontSize='large' />
                </div>

                <div className={classes.typoWrapperRoot}>
                  <Typography variant='subtitle2'>
                    Cargo to All Over Germany
                  </Typography>
                  <Typography variant='caption'>
                    We can ship to anywhere you live in Germany.
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid
              item
              md={3}
              className={`${classes.gridItem} ${classes.gridItemMostRight}`}
              sm={6}
            >
              <div className={classes.typoWrapper}>
                <div className={classes.iconWrapper}>
                  <EmojiEmotionsIcon color='secondary' fontSize='large' />
                </div>

                <div className={classes.typoWrapperRoot}>
                  <Typography variant='subtitle1'>Happy Customers</Typography>
                  <Typography variant='caption'>
                    Most of our customers are satisfied with their order.
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );

  const mobile = (
    <div className={classes.mobile}>
      <Box component='div' className={classes.root}>
        <Container className={classes.rootContainer}>
          <Grid container>
            <Grid item md={3} className={classes.gridItem} xs={6}>
              <div className={classes.typoWrapper}>
                <div className={classes.iconWrapper}>
                  <PaymentIcon color='secondary' fontSize='small' />
                </div>

                <div className={classes.typoWrapperRoot}>
                  <Typography variant='subtitle2'>Secure payment</Typography>
                </div>
              </div>
            </Grid>
            <Grid item md={3} className={classes.gridItem} xs={6}>
              <div className={classes.typoWrapper}>
                <div className={classes.iconWrapper}>
                  <CheckCircleIcon color='secondary' fontSize='small' />
                </div>

                <div className={classes.typoWrapperRoot}>
                  <Typography variant='subtitle2'>Faster Delivery</Typography>
                </div>
              </div>
            </Grid>
            <Grid item md={3} className={classes.gridItem} xs={6}>
              <div className={classes.typoWrapper}>
                <div className={classes.iconWrapper}>
                  <LocalShippingIcon color='secondary' fontSize='small' />
                </div>

                <div className={classes.typoWrapperRoot}>
                  <Typography variant='subtitle2'>
                    Cargo to All Over Germany
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid
              item
              md={3}
              className={`${classes.gridItem} ${classes.gridItemMostRight}`}
              xs={6}
            >
              <div className={classes.typoWrapper}>
                <div className={classes.iconWrapper}>
                  <EmojiEmotionsIcon color='secondary' fontSize='small' />
                </div>

                <div className={classes.typoWrapperRoot}>
                  <Typography variant='subtitle2'>Happy Customers</Typography>
                </div>
              </div>
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

export default InformativeBanner;
