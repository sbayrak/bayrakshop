// @@@ MATERIAL-UI @@@
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Badge,
  IconButton,
  SwipeableDrawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  InputBase,
  Menu,
  MenuItem,
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
// @@@ MATERIAL-UI @@@

// @@@ NEXTJS @@@
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/client';
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
    padding: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.75),
    paddingRight: theme.spacing(0.75),
    textDecoration: 'none',
    color: theme.palette.grey[600],
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '12px',
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
}));

const Navbar = () => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [session, loading] = useSession();

  const handleMenuClick = (e) => {
    setOpenMenu(e.currentTarget);
  };
  const handleClose = () => {
    setOpenMenu(false);
  };

  const desktop = (
    <Container className={classes.root}>
      <Grid item className={classes.gridContainerRoot}>
        <Grid container item className={classes.gridContainerTop}>
          <div className={classes.wrapperTop}>
            <ul className={classes.topLeft}>
              <li className={classes.topLeftLi}>
                <Link href='/about-us'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className={classes.topLeftLinks}
                  >
                    About Us
                  </a>
                </Link>
              </li>
              <li className={classes.topLeftLi}>
                <Link href='/privacy'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className={classes.topLeftLinks}
                  >
                    Privacy
                  </a>
                </Link>
              </li>
              <li className={classes.topLeftLi}>
                <Link href='/careers'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className={classes.topLeftLinks}
                  >
                    Careers
                  </a>
                </Link>
              </li>
              <li className={classes.topLeftLi}>
                <Link href='/contact'>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className={classes.topLeftLinks}
                  >
                    Contact
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
                  <Link href='#!'>
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className={classes.bottomMidLinks}
                    >
                      Baklava
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
                      Lokum
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
                      Cakes
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
                      Appetizers
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
                  <Link href='#!'>
                    <a className={classes.bottomMidLinks}>
                      <PersonIcon fontSize='large' />
                    </a>
                  </Link>
                </li>
                <li className={classes.bottomMidLi}>
                  <Link href='#!'>
                    <a className={classes.bottomMidLinks}>
                      <Badge badgeContent={1} color='error'>
                        <ShoppingCartIcon fontSize='large' />
                      </Badge>
                    </a>
                  </Link>
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
            <Badge badgeContent={1} color='error'>
              <ShoppingCartIcon />
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
                  <Link href='#!'>
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
                    <li className={classes.mobileProductsLi}>
                      <Link href='#!'>
                        <a className={classes.mobileToolsProfile}>
                          <PersonIcon fontSize='large' />
                        </a>
                      </Link>
                    </li>
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
