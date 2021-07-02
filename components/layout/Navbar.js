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
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import StorefrontIcon from '@material-ui/icons/Storefront';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// @@@ MATERIAL-UI @@@

// @@@ NEXTJS @@@
import Link from 'next/link';
// @@@ NEXTJS @@@

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#f6f6f6',
    boxShadow: '3px 3px 15px -10px rgba(0,0,0,0.75)',
    borderBottom: '10px solid',
    borderImageSlice: 1,
    borderWidth: '20px',
    borderImageSource:
      'linear-gradient(236deg, rgba(5,221,250,0.5102415966386555) 0%, rgba(86,82,222,0.48503151260504207) 83%)',
  },
  root: {},
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
    fontSize: '16px',
    fontWeight: theme.typography.fontWeightMedium,
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
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position='static' elevation={1} className={classes.appbar}>
        <Toolbar>
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
                    </li>{' '}
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
                        <Link href='#!'>
                          <a className={classes.bottomMidLinks}>
                            <SearchIcon fontSize='large' />
                          </a>
                        </Link>
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
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
