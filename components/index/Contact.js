// @@@ MATERIAL-UI @@@@
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
// @@@ MATERIAL-UI @@@@

// @@@ nextjs @@@@
import Link from 'next/link';
import { useState } from 'react';
// @@@ nextjs @@@@

const useStyles = makeStyles((theme) => ({
  rootContact: {
    marginTop: theme.spacing(25),
    marginBottom: theme.spacing(25),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
    },
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  contactLeftGridItem: {
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2),
    },
  },
  contactLeftGridItemWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  contactIconWrapper: {
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5652de',
    padding: '5px',
    [theme.breakpoints.down('xs')]: {},
  },
  contactLeftGridItemLink: {
    textDecoration: 'none',
    // color: '#4062bb',
    color: theme.palette.grey[800],
  },
  contactLeftGridItemTypo: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },
  contactRightGrid: {
    border: '1px solid #4062bb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
  },
  contactLeftGridTypo: {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },

  contactTypo1: {
    color: theme.palette.grey[800],
    marginBottom: theme.spacing(7),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(4),
      fontSize: '24px',
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  contactTypo2: {
    color: '#5652de',
    fontWeight: theme.typography.fontWeightMedium,
  },
  ContactContainer: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    backgroundColor: '#fafafa',
    boxShadow: '0px 7px 15px -4px rgba(40,40,40,0.17)',
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  },
}));

const Contact = ({ getContactContent }) => {
  const classes = useStyles();
  const [tel, setTel] = useState(getContactContent[0].tel);
  const [email, setEmail] = useState(getContactContent[0].email);
  const [address, setAddress] = useState(getContactContent[0].address);
  const [maps, setMaps] = useState(getContactContent[0].maps);

  return (
    <>
      <Box component='div' className={classes.rootContact}>
        <Container className={classes.ContactContainer}>
          <Grid container>
            <Grid container item xs={12}>
              <Grid item md={6} xs={12} className={classes.contactLeftGridTypo}>
                <Grid item xs={12}>
                  <Typography
                    variant='h4'
                    className={classes.contactTypo1}
                    gutterBottom
                    paragraph
                  ></Typography>
                  <Typography
                    variant='h4'
                    gutterBottom
                    className={classes.contactTypo1}
                  >
                    How can you find{' '}
                    <span className={classes.contactTypo2}>us ?</span>
                  </Typography>
                </Grid>
                <Grid item md={12} className={classes.contactLeftGridItem}>
                  <Link href={`tel:+${tel}`}>
                    <a className={classes.contactLeftGridItemLink}>
                      <div className={classes.contactLeftGridItemWrapper}>
                        <div className={classes.contactIconWrapper}>
                          <PhoneIcon color='secondary' fontSize='small' />
                        </div>
                        <Typography
                          variant='subtitle1'
                          className={classes.contactLeftGridItemTypo}
                        >
                          +{tel.slice(0, 2)} {tel.slice(2, 5)} {tel.slice(5, 8)}{' '}
                          {tel.slice(8, 10)} {tel.slice(10, 12)}
                        </Typography>
                      </div>
                    </a>
                  </Link>
                </Grid>
                <Grid item md={12} className={classes.contactLeftGridItem}>
                  <Link href={`mailto:${email}`}>
                    <a className={classes.contactLeftGridItemLink}>
                      <div className={classes.contactLeftGridItemWrapper}>
                        <div className={classes.contactIconWrapper}>
                          <MailIcon color='secondary' fontSize='small' />
                        </div>
                        <Typography
                          variant='subtitle1'
                          className={classes.contactLeftGridItemTypo}
                        >
                          {email}
                        </Typography>
                      </div>
                    </a>
                  </Link>
                </Grid>
                <Grid item md={12} className={classes.contactLeftGridItem}>
                  <div className={classes.contactLeftGridItemWrapper}>
                    <div className={classes.contactIconWrapper}>
                      <LocationOnIcon color='secondary' fontSize='small' />
                    </div>
                    <Typography
                      variant='subtitle1'
                      className={classes.contactLeftGridItemTypo}
                    >
                      {address}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid item md={6} className={classes.contactRightGrid}>
                <div>
                  <Typography variant='h2'>Google Maps Here.</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Contact;
