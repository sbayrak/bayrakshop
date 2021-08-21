/* eslint-disable */
// eslint-disable-next-line no-use-before-define
/* eslint-disable no-alert, no-console */

import baklava from '../../public/signin_left2.jpg';
// @@@ MATERIAL-UI @@@
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Badge,
  IconButton,
  SwipeableDrawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputBase,
  Menu,
  MenuItem,
  Box,
  Divider,
  Button,
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import StorefrontIcon from '@material-ui/icons/Storefront';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import DeleteIcon from '@material-ui/icons/Delete';
// @@@ MATERIAL-UI @@@

// @@@ NEXTJS @@@
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import CartContext from '../../context/cart/CartContext';
import { useSession, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SideShoppingCart from './SideShoppingCart';
// @@@ NEXTJS @@@

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#f6f6f6',
    boxShadow: '3px 3px 15px -10px rgba(0,0,0,0.75)',
    borderBottom: '5px solid',
    borderImageSlice: 1,
    borderWidth: '10px',
    borderImageSource:
      'linear-gradient(236deg, rgba(5,221,250,0.5102415966386555) 0%, rgba(86,82,222,0.48503151260504207) 83%)',
    [theme.breakpoints.down('xs')]: {
      borderWidth: '2px',
    },
  },
  root: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobileRoot: {
    width: '100%',
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'inline',
    },
  },
  gridContainerRoot: {},
  gridContainerTop: {
    borderBottom: '1px solid rgba(196,196,196,0.5)',
    display: 'inline',
    transition: '0.5s ease',
  },
  wrapperTop: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topLeft: {
    width: '30%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    listStyle: 'none',
  },
  topRight: {
    width: '25%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    listStyle: 'none',
  },
  topLeftLi: {},
  topLeftLinks: {
    paddingLeft: theme.spacing(0.75),
    paddingRight: theme.spacing(0.75),
    textDecoration: 'none',
    color: theme.palette.grey[600],
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  socialWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  socialLinks: {},
  wrapperBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  bottomMidUl: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    listStyle: 'none',
  },
  bottomMidLi: {
    marginRight: theme.spacing(2),
  },
  bottomMidLinks: {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(1.5),
    paddingLeft: theme.spacing(1.5),
    marginRight: theme.spacing(4),
    textDecoration: 'none',
    color: '#5652de',
    fontSize: '18px',
    fontWeight: theme.typography.fontWeightBold,
  },
  logoWrapper: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  logoLink: {
    textDecoration: 'none',
    color: '#5652de',
    display: 'flex',
    alignItems: 'center',
  },
  shopName: {
    fontWeight: theme.typography.fontWeightLight,
  },
  mobile: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerWrapper: {
    border: '1px solid red',
    boxShadow: '3px 3px 15px -10px rgba(0,0,0,0.75)',
    borderBottom: '10px solid',
    borderImageSlice: 1,
    borderWidth: '20px',
    borderImageSource:
      'linear-gradient(236deg, rgba(5,221,250,0.5102415966386555) 0%, rgba(86,82,222,0.48503151260504207) 83%)',
    [theme.breakpoints.down('xs')]: {
      borderWidth: '2px',
    },
  },
  mobileInformationUl: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    listStyle: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '12px',
  },
  mobileInformationLinks: {
    textDecoration: 'none',
    color: theme.palette.grey[600],
    padding: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.75),
    paddingRight: theme.spacing(0.75),
  },
  accordionInfo: {
    backgroundColor: theme.palette.grey[100],
    flexDirection: 'column',
  },
  mobileInformationBottom: {
    display: 'flex',
    justifyContent: 'space-around',
    color: theme.palette.grey[600],
    padding: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.75),
    paddingRight: theme.spacing(0.75),
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '12px',
  },
  mobileProductsUl: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    listStyle: 'none',
    backgroundColor: theme.palette.grey[100],
  },
  mobileProductsLi: {
    marginBottom: theme.spacing(2),
  },
  mobileProductsLinks: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.grey[600],
    padding: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.75),
    paddingRight: theme.spacing(0.75),
    fontWeight: theme.typography.fontWeightRegular,
  },
  mobileToolsUl: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
  },

  mobileToolsProfile: {
    color: '#5652de',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(233,233,233,1)',
  },
  mobileToolsProfileTypo: {
    color: theme.palette.grey[600],
  },
  item: {
    marginBottom: theme.spacing(7),
  },
  toolLinks: {
    color: '#5652de',
  },
  inputRoot: {
    paddingLeft: theme.spacing(1),
  },
  menuItem: {
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  menu: {
    marginTop: theme.spacing(10),
  },
  shoppingCartContainer: {
    padding: theme.spacing(5),
    width: 450,
  },
  shoppingCartTypo1: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  shoppingCartTypo2: {
    color: theme.palette.grey[700],
    marginBottom: theme.spacing(5),
  },
  shoppingCartItems: {
    paddingBottom: theme.spacing(1),
  },
  shoppingCartLinks: {
    display: 'flex',
    flexDirection: 'column',
  },
  shoppingCartLink1: {
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
  shoppingCartLink2: {
    textDecoration: 'none',
    padding: theme.spacing(1),
    borderRadius: '5px',
    marginBottom: theme.spacing(1),
    backgroundColor: '#f6f6f6',
    border: '1px solid #5652de',
    color: '#5652de',
    textAlign: 'center',
    fontWeight: theme.typography.fontWeightMedium,
    transition: '0.3s ease',
    '&:hover': {
      backgroundColor: '#6788f5',
      color: '#f6f6f6',
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const router = useRouter();
  const cartContext = useContext(CartContext);
  const [cartItems, setCartItems] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openShoppingCartDrawer, setOpenShoppingCartDrawer] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDesktopProfileMenu, setOpenDesktopProfileMenu] = useState(false);
  const [topGrid, setTopGrid] = useState('inline');
  const [session, loading] = useSession();

  useEffect(() => {
    if (loading === false && session) {
      cartContext.getCart(session.user._id);
    }
  }, [session, loading]);

  const logoutHandler = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/' });
    router.push(data.url);
    cartContext.logoutAndEmptyCart();
  };

  var winY;
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 50) {
      setTopGrid('inline');
    } else {
      setTopGrid('inline');
    }
  };

  const handleMenuClick = (e) => {
    setOpenMenu(e.currentTarget);
  };
  const handleClose = () => {
    setOpenMenu(false);
  };
  const handleDesktopMenuClick = (e) => {
    setOpenDesktopProfileMenu(e.currentTarget);
  };
  const handleDesktopMenuClose = () => {
    setOpenDesktopProfileMenu(false);
  };

  const desktop = (
    <Container className={classes.root}>
      <Grid item className={classes.gridContainerRoot}>
        <Grid
          container
          item
          className={classes.gridContainerTop}
          style={{ display: `${topGrid}` }}
        >
          <div className={classes.wrapperTop}>
            <ul className={classes.topLeft}>
              <li className={classes.topLeftLi}>
                <Link href='tel:+491112223344'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className={classes.topLeftLinks}
                  >
                    <PhoneIcon style={{ color: '#5652de' }} fontSize='small' />
                    &nbsp; +49 111 222 33 44
                  </a>
                </Link>
              </li>
              <li className={classes.topLeftLi}>
                <Link href='mailto:info@koslowshop.com'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className={classes.topLeftLinks}
                  >
                    <MailIcon fontSize='small' style={{ color: '#5652de' }} />
                    &nbsp; info@koslowshop.com
                  </a>
                </Link>
              </li>
            </ul>
            <div className={classes.topRight}>
              <div>
                <Link href='/track-your-order'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className={classes.topLeftLinks}
                  >
                    Track Your Order
                  </a>
                </Link>
              </div>
              <div className={classes.socialWrapper}>
                <Link href='#!'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`${classes.topLeftLinks} ${classes.socialLinks}`}
                  >
                    <FacebookIcon fontSize='small' />
                  </a>
                </Link>

                <Link href='#!'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`${classes.topLeftLinks} ${classes.socialLinks}`}
                  >
                    <InstagramIcon fontSize='small' />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item className={classes.gridContainerBottom}>
          <div className={classes.wrapperBottom}>
            <div className={classes.logoWrapper}>
              <Typography variant='h5'>
                <Link href='/'>
                  <a className={classes.logoLink}>
                    <StorefrontIcon fontSize='large' /> &nbsp; Koslow
                    <span className={classes.shopName}>Shop</span>
                  </a>
                </Link>
              </Typography>
            </div>
            <div>
              <ul className={classes.bottomMidUl}>
                <li className={classes.bottomMidLi}>
                  <Link href='/products'>
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className={classes.bottomMidLinks}
                    >
                      Products
                    </a>
                  </Link>
                </li>
                <li className={classes.bottomMidLi}>
                  <Link href='#!'>
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className={classes.bottomMidLinks}
                    >
                      About
                    </a>
                  </Link>
                </li>
                <li className={classes.bottomMidLi}>
                  <Link href='#!'>
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className={classes.bottomMidLinks}
                    >
                      Contact
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className={classes.bottomMidUl}>
                <li className={classes.bottomMidLi}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon className={`  ${classes.toolLinks}`} />
                    </div>
                    <InputBase
                      placeholder='Search…'
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                    />
                  </div>
                </li>
                <li className={classes.bottomMidLi}>
                  {!session && (
                    <IconButton
                      onClick={handleDesktopMenuClick}
                      className={classes.mobileToolsProfile}
                    >
                      <PersonIcon fontSize='large' />
                      <span style={{ textAlign: 'left', fontSize: '12px' }}>
                        Login <br /> Register
                      </span>
                    </IconButton>
                  )}

                  {session ? (
                    <>
                      <IconButton
                        onClick={handleDesktopMenuClick}
                        className={classes.mobileToolsProfile}
                      >
                        <span style={{ textAlign: 'left', fontSize: '12px' }}>
                          <PersonIcon fontSize='large' />
                        </span>
                      </IconButton>

                      <Menu
                        anchorEl={openDesktopProfileMenu}
                        keepMounted
                        open={openDesktopProfileMenu}
                        onClose={handleDesktopMenuClose}
                        className={classes.menu}
                      >
                        <MenuItem
                          onClick={handleClose}
                          className={classes.menuItem}
                        >
                          <Link href='/auth/profile'>
                            <a className={classes.mobileProductsLinks}>
                              <ArrowRightIcon /> Profile
                            </a>
                          </Link>
                        </MenuItem>
                        <MenuItem
                          onClick={handleClose}
                          className={classes.menuItem}
                        >
                          <Link href='/auth/profile/orders'>
                            <a className={classes.mobileProductsLinks}>
                              <ArrowRightIcon /> Orders
                            </a>
                          </Link>
                        </MenuItem>
                        {session.user.isAdmin && (
                          <MenuItem
                            onClick={handleClose}
                            className={classes.menuItem}
                          >
                            <Link href='/dashboard'>
                              <a className={classes.mobileProductsLinks}>
                                <ArrowRightIcon /> Dashboard
                              </a>
                            </Link>
                          </MenuItem>
                        )}
                        <MenuItem
                          onClick={handleClose}
                          className={classes.menuItem}
                        >
                          <Button onClick={logoutHandler}>Logout</Button>
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Menu
                      anchorEl={openDesktopProfileMenu}
                      keepMounted
                      open={openDesktopProfileMenu}
                      onClose={handleDesktopMenuClose}
                      className={classes.menu}
                    >
                      <MenuItem
                        onClick={handleClose}
                        className={classes.menuItem}
                      >
                        <Link href='/auth/signin'>
                          <a className={classes.mobileProductsLinks}>
                            <ArrowRightIcon /> Login
                          </a>
                        </Link>
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        className={classes.menuItem}
                      >
                        <Link href='/auth/signup'>
                          <a className={classes.mobileProductsLinks}>
                            <ArrowRightIcon /> Register
                          </a>
                        </Link>
                      </MenuItem>
                    </Menu>
                  )}
                </li>
                <li className={classes.bottomMidLi}>
                  <IconButton
                    onClick={(e) =>
                      setOpenShoppingCartDrawer(!openShoppingCartDrawer)
                    }
                  >
                    <Badge
                      badgeContent={
                        !cartContext.cartItem
                          ? '...'
                          : cartContext.cartItem.length
                      }
                      color='error'
                    >
                      <ShoppingCartIcon color='primary' fontSize='large' />
                    </Badge>
                  </IconButton>
                  <SwipeableDrawer
                    anchor='right'
                    open={openShoppingCartDrawer}
                    onClose={(e) =>
                      setOpenShoppingCartDrawer(!openShoppingCartDrawer)
                    }
                    onOpen={(e) => console.log('')}
                  >
                    <Box component='div'>
                      <Grid container className={classes.shoppingCartContainer}>
                        <Grid item md={12}>
                          <Typography
                            variant='h5'
                            className={classes.shoppingCartTypo1}
                          >
                            SHOPPING CART
                          </Typography>
                        </Grid>
                        <Grid item md={12}>
                          <Typography
                            variant='body2'
                            gutterBottom
                            paragraph
                            className={classes.shoppingCartTypo2}
                          >
                            You have{' '}
                            {cartContext.cartItem
                              ? cartContext.cartItem.length
                              : '0'}{' '}
                            item in your cart.
                          </Typography>
                          <Divider />
                        </Grid>
                        <Grid
                          container
                          item
                          md={12}
                          className={classes.shoppingCartItems}
                        >
                          {/* CART ITEMS STARTS */}

                          <>
                            {cartContext.cartItem ? (
                              cartContext.cartItem.map((item) => (
                                <SideShoppingCart
                                  key={item.productId}
                                  item={item}
                                ></SideShoppingCart>
                              ))
                            ) : (
                              <Grid item md={12}>
                                <Typography>empty</Typography>
                              </Grid>
                            )}
                          </>
                          {/* CART ITEMS ENDS */}
                        </Grid>

                        <Divider></Divider>
                        <Grid item md={7}>
                          <Typography
                            variant='subtitle1'
                            className={classes.shoppingCartTypo1}
                          >
                            Total
                          </Typography>
                          <Typography
                            variant='subtitle2'
                            gutterBottom
                            paragraph
                          >
                            €
                            {!cartContext.cartItem
                              ? '0'
                              : cartContext.cartItem.reduce(
                                  (acc, currentVal) =>
                                    acc +
                                    currentVal.quantity *
                                      currentVal.productPrice,
                                  0
                                )}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          md={12}
                          className={classes.shoppingCartLinks}
                        >
                          <Link href='#!'>
                            <a className={classes.shoppingCartLink1}>
                              PROCEED TO CHECKOUT
                            </a>
                          </Link>

                          <Link href='/'>
                            <a
                              className={classes.shoppingCartLink2}
                              onClick={(e) =>
                                setOpenShoppingCartDrawer(
                                  !openShoppingCartDrawer
                                )
                              }
                            >
                              CONTINUE TO SHOPPING
                            </a>
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </SwipeableDrawer>
                </li>
              </ul>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );

  const mobile = (
    <div className={classes.mobileRoot}>
      <div className={classes.mobile}>
        <div className={classes.logoWrapper}>
          <Typography variant='h6'>
            <Link href='/'>
              <a className={classes.logoLink}>
                <StorefrontIcon /> &nbsp; Koslow
                <span className={classes.shopName}>Shop</span>
              </a>
            </Link>
          </Typography>
        </div>
        <div>
          <IconButton>
            <Badge
              badgeContent={
                cartContext.cartItem ? cartContext.cartItem.length : '0'
              }
              color='error'
            >
              <ShoppingCartIcon color='primary' />
            </Badge>
          </IconButton>

          <IconButton onClick={(e) => setOpenDrawer(!openDrawer)}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>
      <SwipeableDrawer
        open={openDrawer}
        onOpen={(e) => console.log('')}
        anchor='top'
        onClose={(e) => setOpenDrawer(!open)}
      >
        <div className={classes.drawerWrapper}>
          <div className={classes.item}>
            <ul className={classes.mobileToolsUl}>
              <li>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon
                      className={classes.mobileToolsProfile}
                      fontSize='large'
                    />
                  </div>
                  <InputBase
                    placeholder='Search…'
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
                </div>
              </li>

              <li>
                <IconButton>
                  <Badge badgeContent={1} color='error'>
                    <ShoppingCartIcon
                      className={classes.mobileToolsProfile}
                      fontSize='large'
                    />
                  </Badge>
                </IconButton>
              </li>
              {session ? (
                <li className={classes.mobileProductsLi}>
                  <Link href='/auth/profile'>
                    <a className={classes.mobileToolsProfile}>
                      <PersonIcon fontSize='large' />
                    </a>
                  </Link>
                </li>
              ) : (
                <li className={classes.mobileProductsLi}>
                  <IconButton
                    onClick={handleMenuClick}
                    className={classes.mobileToolsProfile}
                  >
                    <PersonIcon fontSize='large' />
                  </IconButton>
                  <Menu
                    anchorEl={openMenu}
                    keepMounted
                    open={openMenu}
                    onClose={handleClose}
                    className={classes.menu}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link href='#!'>
                        <a className={classes.mobileProductsLinks}>
                          <ArrowRightIcon /> Login
                        </a>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link href='#!'>
                        <a className={classes.mobileProductsLinks}>
                          <ArrowRightIcon /> Register
                        </a>
                      </Link>
                    </MenuItem>
                  </Menu>
                </li>
              )}
            </ul>
          </div>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>Profile</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ width: '100%' }}>
                <ul className={classes.mobileProductsUl}>
                  {session ? (
                    <>
                      <li className={classes.mobileProductsLi}>
                        <Link href='/auth/profile'>
                          <a className={classes.mobileToolsProfile}>
                            <PersonIcon fontSize='large' /> Profile
                          </a>
                        </Link>
                      </li>

                      <li className={classes.mobileProductsLi}>
                        <Link href='/auth/profile/orders'>
                          <a className={classes.mobileToolsProfile}>
                            <PersonIcon fontSize='large' /> Orders
                          </a>
                        </Link>
                      </li>
                      <li className={classes.mobileProductsLi}>
                        <Button onClick={logoutHandler}>Logout</Button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className={classes.mobileProductsLi}>
                        <Link href='#!'>
                          <a className={classes.mobileProductsLinks}>
                            <ArrowRightIcon /> Login
                          </a>
                        </Link>
                      </li>
                      <li className={classes.mobileProductsLi}>
                        <Link href='#!'>
                          <a className={classes.mobileProductsLinks}>
                            <ArrowRightIcon /> Register
                          </a>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>Products</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ width: '100%' }}>
                <ul className={classes.mobileProductsUl}>
                  <li className={classes.mobileProductsLi}>
                    <Link href='#!'>
                      <a
                        target='_blank'
                        rel='noreferrer noopener'
                        className={classes.mobileProductsLinks}
                      >
                        <ArrowRightIcon /> Baklava
                      </a>
                    </Link>
                  </li>
                  <li className={classes.mobileProductsLi}>
                    <Link href='#!'>
                      <a
                        target='_blank'
                        rel='noreferrer noopener'
                        className={classes.mobileProductsLinks}
                      >
                        <ArrowRightIcon /> Lokum
                      </a>
                    </Link>
                  </li>
                  <li className={classes.mobileProductsLi}>
                    <Link href='#!'>
                      <a
                        target='_blank'
                        rel='noreferrer noopener'
                        className={classes.mobileProductsLinks}
                      >
                        <ArrowRightIcon /> Cakes
                      </a>
                    </Link>
                  </li>
                  <li className={classes.mobileProductsLi}>
                    <Link href='#!'>
                      <a
                        target='_blank'
                        rel='noreferrer noopener'
                        className={classes.mobileProductsLinks}
                      >
                        <ArrowRightIcon /> Appetizers
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>More Information</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionInfo}>
              <ul className={classes.mobileInformationUl}>
                <li>
                  <Link href='/about-us'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className={classes.mobileInformationLinks}
                    >
                      About Us
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/privacy'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className={classes.mobileInformationLinks}
                    >
                      Privacy
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/careers'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className={classes.mobileInformationLinks}
                    >
                      Careers
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/contact'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className={classes.mobileInformationLinks}
                    >
                      Contact
                    </a>
                  </Link>
                </li>
              </ul>
              <div className={classes.mobileInformationBottom}>
                <div>
                  <Link href='/track-your-order'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className={classes.mobileInformationLinks}
                    >
                      Track Your Order
                    </a>
                  </Link>
                </div>
                <div className={classes.socialWrapper}>
                  <Link href='#!'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`${classes.topLeftLinks} ${classes.socialLinks}`}
                    >
                      <FacebookIcon fontSize='small' />
                    </a>
                  </Link>

                  <Link href='#!'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`${classes.topLeftLinks} ${classes.socialLinks}`}
                    >
                      <InstagramIcon fontSize='small' />
                    </a>
                  </Link>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </SwipeableDrawer>
    </div>
  );

  return (
    <>
      <AppBar position='fixed' elevation={1} className={classes.appbar}>
        <Toolbar>
          {desktop}
          {mobile}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
