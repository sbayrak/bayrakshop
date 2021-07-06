import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import paypal from '../../public/paypal-logo.png';

import Link from 'next/link';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: '1px solid red',
    position: 'static',
    bottom: 0,
    width: '100%',
    boxShadow: '3px 3px 15px -10px rgba(0,0,0,0.75)',
    borderBottom: '0px solid',
    borderImageSlice: 1,
    borderWidth: '10px',
    borderImageSource:
      'linear-gradient(236deg, rgba(5,221,250,0.5102415966386555) 0%, rgba(86,82,222,0.48503151260504207) 83%)',
    borderRight: '0px solid',
  },
  logo: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
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
  gridItem: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
    },
  },
  titles: {
    paddingBottom: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    color: '#5652de',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
    },
  },
  body: {
    fontSize: '12px',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    color: theme.palette.grey[700],
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
    },
  },
  itemUl: {
    listStyle: 'none',
  },
  itemLi: {
    paddingBottom: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
    },
  },
  itemLink: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.grey[800],
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.grey[800],
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5),
    },
  },
  bottomTypo: {
    textAlign: 'center',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5),
    },
  },
  suatbayrakLink: {
    textDecoration: 'none',
    fontWeight: theme.typography.fontWeightMedium,
    color: '#5652de',
  },
  desktop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobile: {
    width: '100%',
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'inline',
    },
  },
  paypalImg: {},
}));

const Footer = () => {
  const classes = useStyles();

  const desktop = (
    <Box component='div' className={`${classes.wrapper} ${classes.desktop}`}>
      <Container>
        <Grid container>
          <Grid item md={12} className={classes.logo} xs={12}>
            <Typography variant='h5' gutterBottom>
              <Link href='/'>
                <a className={classes.logoLink}>
                  {' '}
                  <StorefrontIcon fontSize='large' /> &nbsp; Koslow
                  <span className={classes.shopName}>Shop</span>
                </a>
              </Link>
            </Typography>
          </Grid>
          <Grid item md={12} xs={12}>
            <Divider />
          </Grid>

          <Grid item md={3} className={`${classes.gridItem}`} xs={12}>
            <Typography variant='subtitle1' className={classes.titles}>
              Why us ?
            </Typography>
            <Typography variant='body2' className={classes.body}>
              &nbsp; &nbsp; We use natural products coming from the village. All
              of our products are handmade and daily made by our master chefs.
              We also do deliver orders home.
            </Typography>
          </Grid>

          <Grid item md={3} className={`${classes.gridItem}`} xs={12}>
            <Typography variant='subtitle1' className={classes.titles}>
              Quick Links
            </Typography>
            <ul className={classes.itemUl}>
              <li className={classes.itemLi}>
                <Typography variant='body2'>
                  <Link href='/about'>
                    <a className={classes.itemLink}>
                      <ArrowRightIcon color='primary' />
                      &nbsp;About
                    </a>
                  </Link>
                </Typography>
              </li>
              <li className={classes.itemLi}>
                <Typography variant='body2'>
                  <Link href='/privacy'>
                    <a className={classes.itemLink}>
                      <ArrowRightIcon color='primary' />
                      &nbsp;Privacy
                    </a>
                  </Link>
                </Typography>
              </li>
              <li className={classes.itemLi}>
                <Typography variant='body2'>
                  <Link href='/careers'>
                    <a className={classes.itemLink}>
                      <ArrowRightIcon color='primary' />
                      &nbsp;Careers
                    </a>
                  </Link>
                </Typography>
              </li>
              <li className={classes.itemLi}>
                <Typography variant='body2'>
                  <Link href='/contact'>
                    <a className={classes.itemLink}>
                      <ArrowRightIcon color='primary' />
                      &nbsp;Contact
                    </a>
                  </Link>
                </Typography>
              </li>
            </ul>
          </Grid>

          <Grid item md={3} className={`${classes.gridItem}`} xs={12}>
            <Typography variant='subtitle1' className={classes.titles}>
              Products
            </Typography>
            <ul className={classes.itemUl}>
              <li className={classes.itemLi}>
                <Typography variant='body2'>
                  <Link href='#!'>
                    <a className={classes.itemLink}>
                      <ArrowRightIcon color='primary' />
                      &nbsp;Baklava
                    </a>
                  </Link>
                </Typography>
              </li>
              <li className={classes.itemLi}>
                <Typography variant='body2'>
                  <Link href='#!'>
                    <a className={classes.itemLink}>
                      <ArrowRightIcon color='primary' />
                      &nbsp;Lokum
                    </a>
                  </Link>
                </Typography>
              </li>
              <li className={classes.itemLi}>
                <Typography variant='body2'>
                  <Link href='#!'>
                    <a className={classes.itemLink}>
                      <ArrowRightIcon color='primary' />
                      &nbsp;Cakes
                    </a>
                  </Link>
                </Typography>
              </li>
              <li className={classes.itemLi}>
                <Typography variant='body2'>
                  <Link href='#!'>
                    <a className={classes.itemLink}>
                      <ArrowRightIcon color='primary' />
                      &nbsp;Appetizers
                    </a>
                  </Link>
                </Typography>
              </li>
            </ul>
          </Grid>
          <Grid item md={3} className={`${classes.gridItem}`} xs={12}>
            <Typography variant='subtitle1' className={classes.titles}>
              Contacts
            </Typography>
            <ul className={classes.itemUl}>
              <li className={classes.contactItem}>
                <LocationOnIcon color='primary' /> &nbsp; 12345 Copperhead st.
                Berlin, Germany, DE 12345
              </li>
              <li className={classes.contactItem}>
                <PhoneIcon color='primary' /> &nbsp; +49 111 222 33 44
              </li>
              <li className={classes.contactItem}>
                <MailIcon color='primary' /> &nbsp; info@koslowshop.com
              </li>
            </ul>
          </Grid>
          <Grid container item md={12}>
            <Grid item md={8}></Grid>
            <Grid
              item
              md={4}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '50%',
                  height: '50px',
                }}
              >
                <Image
                  src={paypal}
                  placeholder='blur'
                  layout='fill'
                  objectFit='cover'
                ></Image>
              </div>
            </Grid>
          </Grid>
          <Grid item md={12}>
            <Divider />
          </Grid>
          <Grid item md={12} xs={12}>
            <Typography
              variant='body2'
              className={`${classes.body} ${classes.bottomTypo}`}
            >
              Copyright &copy; 2021 KoslowShop. This website made by{' '}
              <Link href='https://www.suatbayrak.com'>
                <a
                  target='_blank'
                  rel='noreferrer noopener'
                  className={classes.suatbayrakLink}
                >
                  Suat Bayrak.
                </a>
              </Link>{' '}
              All rights reserved.{' '}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  const mobile = (
    <div className={classes.mobile}>
      <Box component='div' className={`${classes.wrapper} `}>
        <Container>
          <Grid container>
            <Grid item md={12} className={classes.logo} xs={12}>
              <Typography variant='h5' gutterBottom>
                <Link href='/'>
                  <a className={classes.logoLink}>
                    {' '}
                    <StorefrontIcon fontSize='large' /> &nbsp; Koslow
                    <span className={classes.shopName}>Shop</span>
                  </a>
                </Link>
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Divider />
            </Grid>

            <Grid item md={3} className={`${classes.gridItem}`} xs={12}>
              <Accordion elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='subtitle1' className={classes.titles}>
                    Why us ?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body2' className={classes.body}>
                    &nbsp; &nbsp; We use natural products coming from the
                    village. All of our products are handmade and daily made by
                    our master chefs. We also do deliver orders home.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item md={3} className={`${classes.gridItem}`} xs={12}>
              <Accordion elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='subtitle1' className={classes.titles}>
                    Quick Links
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className={classes.itemUl}>
                    <li className={classes.itemLi}>
                      <Typography variant='body2'>
                        <Link href='/about'>
                          <a className={classes.itemLink}>
                            <ArrowRightIcon color='primary' />
                            &nbsp;About
                          </a>
                        </Link>
                      </Typography>
                    </li>
                    <li className={classes.itemLi}>
                      <Typography variant='body2'>
                        <Link href='/privacy'>
                          <a className={classes.itemLink}>
                            <ArrowRightIcon color='primary' />
                            &nbsp;Privacy
                          </a>
                        </Link>
                      </Typography>
                    </li>
                    <li className={classes.itemLi}>
                      <Typography variant='body2'>
                        <Link href='/careers'>
                          <a className={classes.itemLink}>
                            <ArrowRightIcon color='primary' />
                            &nbsp;Careers
                          </a>
                        </Link>
                      </Typography>
                    </li>
                    <li className={classes.itemLi}>
                      <Typography variant='body2'>
                        <Link href='/contact'>
                          <a className={classes.itemLink}>
                            <ArrowRightIcon color='primary' />
                            &nbsp;Contact
                          </a>
                        </Link>
                      </Typography>
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item md={3} className={`${classes.gridItem}`} xs={12}>
              <Accordion elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='subtitle1' className={classes.titles}>
                    Products
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className={classes.itemUl}>
                    <li className={classes.itemLi}>
                      <Typography variant='body2'>
                        <Link href='#!'>
                          <a className={classes.itemLink}>
                            <ArrowRightIcon color='primary' />
                            &nbsp;Baklava
                          </a>
                        </Link>
                      </Typography>
                    </li>
                    <li className={classes.itemLi}>
                      <Typography variant='body2'>
                        <Link href='#!'>
                          <a className={classes.itemLink}>
                            <ArrowRightIcon color='primary' />
                            &nbsp;Lokum
                          </a>
                        </Link>
                      </Typography>
                    </li>
                    <li className={classes.itemLi}>
                      <Typography variant='body2'>
                        <Link href='#!'>
                          <a className={classes.itemLink}>
                            <ArrowRightIcon color='primary' />
                            &nbsp;Cakes
                          </a>
                        </Link>
                      </Typography>
                    </li>
                    <li className={classes.itemLi}>
                      <Typography variant='body2'>
                        <Link href='#!'>
                          <a className={classes.itemLink}>
                            <ArrowRightIcon color='primary' />
                            &nbsp;Appetizers
                          </a>
                        </Link>
                      </Typography>
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item md={3} className={`${classes.gridItem}`} xs={12}>
              <Typography variant='subtitle1' className={classes.titles}>
                Contacts
              </Typography>
              <ul className={classes.itemUl}>
                <li className={classes.contactItem}>
                  <LocationOnIcon color='primary' /> &nbsp; 12345 Copperhead st.
                  Berlin, Germany, DE 12345
                </li>
                <li className={classes.contactItem}>
                  <PhoneIcon color='primary' /> &nbsp; +49 111 222 33 44
                </li>
                <li className={classes.contactItem}>
                  <MailIcon color='primary' /> &nbsp; info@koslowshop.com
                </li>
              </ul>
            </Grid>
            <Grid xs={12}>
              <div
                style={{
                  position: 'relative',
                  width: '55%',
                  height: '50px',
                }}
              >
                <Image
                  src={paypal}
                  placeholder='blur'
                  layout='fill'
                  objectFit='cover'
                ></Image>
              </div>
            </Grid>
            <Grid item md={12}>
              <Divider />
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography
                variant='body2'
                className={`${classes.body} ${classes.bottomTypo}`}
              >
                Copyright &copy; 2021 KoslowShop. This website made by{' '}
                <Link href='https://www.suatbayrak.com'>
                  <a
                    target='_blank'
                    rel='noreferrer noopener'
                    className={classes.suatbayrakLink}
                  >
                    Suat Bayrak.
                  </a>
                </Link>{' '}
                All rights reserved.{' '}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );

  //   const mobile;
  return (
    <>
      {desktop}
      {mobile}
    </>
  );
};

export default Footer;
