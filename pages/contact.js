// @@@ MATERIAL-UI @@@

import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';

import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core/styles';
// @@@ MATERIAL-UI @@@

// @@@ NEXTJS @@@
import { connectToDatabase } from '../util/mongodb';
import Link from 'next/link';
// @@@ NEXTJS @@@

const useStyles = makeStyles((theme) => ({
  ContactRoot: {
    marginTop: theme.spacing(25),
  },
  contactLeftGridItemLink: {
    textDecoration: 'none',
    // color: '#4062bb',
    color: theme.palette.grey[800],
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
    marginRight: theme.spacing(1.5),
    [theme.breakpoints.down('xs')]: {},
  },
  ContactGridContainer: {
    backgroundColor: '#fff',
    padding: theme.spacing(3),
  },
  ContactGridItem: {
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(3),
  },
  Typo1: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  Typo1span: {
    color: '#5652de',
  },
  gridContainerLeft: {},
  gridLeftItem: {
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  ContactFormContainer: {
    borderRadius: '5px',
  },
  ContactFormTop: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(5),
    backgroundColor: 'rgba(86, 82, 222,0.05)',
  },
  submitBtn: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  Map: {
    width: '100%',
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();

  // @@@ PAGES @@@
  const getPagesFromDB = await db.collection('pages').find({}).toArray();
  const getPages = await JSON.parse(JSON.stringify(getPagesFromDB));

  const getContactContent = getPages.filter(
    (data) => data.section === 'contact'
  );
  // @@@ PAGES @@@

  return {
    props: {
      getContactContent,
    },
    revalidate: 1,
  };
};

const Contact = ({ getContactContent }) => {
  const classes = useStyles();

  console.log(getContactContent);
  return (
    <Box component='div' className={classes.ContactRoot}>
      <Container>
        <Grid container className={classes.ContactGridContainer}>
          <Grid item md={12} className={classes.ContactGridItem}>
            <Typography variant='h5' className={classes.Typo1}>
              Contact <span className={classes.Typo1span}>Us</span>
            </Typography>
          </Grid>
          <Grid container item md={12}>
            <Grid item md={6} className={classes.gridContainerLeft}>
              <Grid item md={6} className={classes.gridLeftItem}>
                <Link href={`tel:+${getContactContent[0].tel}`}>
                  <a className={classes.contactLeftGridItemLink}>
                    <div className={classes.contactLeftGridItemWrapper}>
                      <div className={classes.contactIconWrapper}>
                        <PhoneIcon color='secondary' fontSize='small' />
                      </div>
                      <Typography
                        variant='subtitle1'
                        className={classes.contactLeftGridItemTypo}
                      >
                        +{getContactContent[0].tel.slice(0, 2)}{' '}
                        {getContactContent[0].tel.slice(2, 5)}{' '}
                        {getContactContent[0].tel.slice(5, 8)}{' '}
                        {getContactContent[0].tel.slice(8, 10)}{' '}
                        {getContactContent[0].tel.slice(10, 12)}
                      </Typography>
                    </div>
                  </a>
                </Link>
              </Grid>

              <Grid item md={6} className={classes.gridLeftItem}>
                <Link href={`mailto:${getContactContent[0].email}`}>
                  <a className={classes.contactLeftGridItemLink}>
                    <div className={classes.contactLeftGridItemWrapper}>
                      <div className={classes.contactIconWrapper}>
                        <MailIcon color='secondary' fontSize='small' />
                      </div>
                      <Typography
                        variant='subtitle1'
                        className={classes.contactLeftGridItemTypo}
                      >
                        {getContactContent[0].email}
                      </Typography>
                    </div>
                  </a>
                </Link>
              </Grid>
              <Grid item md={6} className={classes.gridLeftItem}>
                <div className={classes.contactLeftGridItemWrapper}>
                  <div className={classes.contactIconWrapper}>
                    <LocationOnIcon color='secondary' fontSize='small' />
                  </div>
                  <Typography
                    variant='subtitle1'
                    className={classes.contactLeftGridItemTypo}
                  >
                    {getContactContent[0].address}
                  </Typography>
                </div>
              </Grid>
            </Grid>

            {/* contact form starts */}
            <Grid
              container
              item
              md={6}
              className={classes.ContactFormContainer}
            >
              <form style={{ width: '100%' }}>
                <div className={classes.ContactFormTop}>
                  <TextField
                    variant='outlined'
                    label='Name'
                    color='primary'
                    fullWidth
                  ></TextField>
                  <div style={{ padding: '15px' }}></div>
                  <TextField
                    variant='outlined'
                    label='E-Mail'
                    color='primary'
                    fullWidth
                  ></TextField>
                </div>

                <div className={classes.ContactFormTop}>
                  <TextField
                    variant='outlined'
                    label='Message'
                    fullWidth
                    color='primary'
                    multiline={true}
                    rows={7}
                    rowsMax={7}
                  ></TextField>
                </div>

                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  className={classes.submitBtn}
                  disableElevation
                >
                  Submit
                </Button>
              </form>
            </Grid>
          </Grid>
          <Grid container item md={12}>
            <Box
              component='div'
              style={{ height: '40vh' }}
              className={classes.Map}
            >
              SHOP LOCATION ON MAP HERE
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
