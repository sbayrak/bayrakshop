import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ErrorIcon from '@material-ui/icons/Error';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rootContainer: {
    height: '70vh',
    boxShadow: '3px 3px 15px -10px rgba(0,0,0,0.75)',

    [theme.breakpoints.down('sm')]: {
      height: '90vh',
      boxShadow: '3px 3px 15px -10px rgba(0,0,0,0)',
    },
  },
  gridItemLeft: {},
  leftDiv: {
    backgroundImage: 'url(/signin_left2.jpg)',
    minHeight: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
    backgroundSize: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
  },
  leftSubDiv: {
    paddingTop: theme.spacing(10),
  },
  LeftTypo: {
    color: '#f6f6f6',
  },
  here: {
    textDecoration: 'none',
    color: '#f6f6f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  Typo1: {
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.up('sm')]: {
      fontSize: '36px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '24px',
    },
  },
  Typo2: {
    textAlign: 'right',
    fontWeight: theme.typography.fontWeightRegular,
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  form: {
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '3px 3px 15px -10px rgba(0,0,0,0.75)',
    border: '10px solid',
    borderImageSlice: 1,
    borderWidth: '15px',
    borderImageSource:
      'linear-gradient(236deg, rgba(5,221,250,0.5102415966386555) 0%, rgba(86,82,222,0.48503151260504207) 83%)',
    [theme.breakpoints.down('sm')]: {
      height: '65vh',
      borderWidth: '10px',
    },
  },
  formContainer: {
    width: '70%',
    padding: theme.spacing(5),
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
      width: '90%',
    },
  },
  Typo3: {
    color: '#5652de',
    fontWeight: theme.typography.fontWeightMedium,
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px',
      textAlign: 'center',
    },
  },

  gridRightItem: {
    padding: theme.spacing(0.75),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(0),
    },
  },
  txtField: {
    '& label.Mui-focused': {
      color: '#5652de',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#5652de',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5652de',
      },
      '&:hover fieldset': {
        borderColor: '#5652de',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#5652de',
      },
    },
  },
  submitBtn: {
    backgroundColor: '#5652de',
    color: '#f6f6f6',
    '&:hover': {
      backgroundColor: '#6788f5',
    },
  },
  forgotPw: {
    textDecoration: 'none',
    color: '#5652de',
  },
  signupLink: {
    color: '#5652de',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  signupSubLink: {
    textDecoration: 'none',
    color: '#5652de',
    fontWeight: theme.typography.fontWeightBold,
  },
  formBottomItems: {
    padding: 0,
    paddingLeft: theme.spacing(1),
  },
  item: {
    marginTop: theme.spacing(4),
  },
  errorMsg: {
    paddingLeft: theme.spacing(1),
    padding: theme.spacing(1),
    color: '#F44336',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      padding: theme.spacing(1),
    },
  },
}));

export default function SignUp() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const router = useRouter();
  const classes = useStyles();

  const signUpHandler = async (e) => {
    e.preventDefault();
    const submitData = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/profile/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      }
    );
    const result = await submitData.json();
    if (result.msg === 'exists') {
      console.log(result.msg);
    } else if (result) {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/profile/signup/email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: result[0].firstname,
          lastname: result[0].lastname,
          email: result[0].email,
          token: result[0].token,
        }),
      });
      router.push(result[0].callbackUrl);
    }
  };

  return (
    <>
      <Box component='div' className={classes.root}>
        <Container maxWidth='lg'>
          <Grid container className={classes.rootContainer}>
            <Grid item xs={12} md={7} className={classes.gridRightContainer}>
              <form className={classes.form} onSubmit={signUpHandler}>
                <Container className={classes.formContainer}>
                  <Grid container>
                    <Grid item xs={12} md={12}>
                      <Typography
                        variant='h4'
                        gutterBottom
                        paragraph
                        className={classes.Typo3}
                      >
                        Sign Up
                      </Typography>
                    </Grid>

                    <Grid item xs={6} md={6} className={classes.gridRightItem}>
                      <TextField
                        variant='outlined'
                        type='text'
                        name='firstname'
                        label='Firstname'
                        className={classes.txtField}
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item xs={6} md={6} className={classes.gridRightItem}>
                      <TextField
                        variant='outlined'
                        type='text'
                        name='lastname'
                        label='Lastname'
                        className={classes.txtField}
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      ></TextField>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={classes.gridRightItem}
                    >
                      <TextField
                        variant='outlined'
                        type='email'
                        name='email'
                        label='E-mail'
                        fullWidth
                        className={classes.txtField}
                        error={errorEmail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={classes.gridRightItem}
                    >
                      <TextField
                        variant='outlined'
                        type='password'
                        name='password'
                        label='Password'
                        error={errorPassword}
                        fullWidth
                        className={classes.txtField}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      {signInError && (
                        <Typography
                          variant='body2'
                          className={classes.errorMsg}
                        >
                          <ErrorIcon /> &nbsp; Please check your e-mail or
                          password again.
                        </Typography>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={classes.gridRightItem}
                    >
                      <Button
                        variant='contained'
                        type='submit'
                        fullWidth
                        className={classes.submitBtn}
                      >
                        Sign Up
                      </Button>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={`${classes.gridRightItem} ${classes.formBottomItems} ${classes.item}`}
                    >
                      <Typography
                        className={classes.signupLink}
                        variant='body2'
                      >
                        Already have an account ? &nbsp;
                        <Link href='/auth/signin'>
                          <a className={classes.signupSubLink}>Sign In</a>
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={`${classes.gridRightItem} ${classes.formBottomItems}`}
                    >
                      <Typography variant='body2'>or</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={`${classes.gridRightItem} ${classes.formBottomItems}`}
                    >
                      <Link href='/auth/password-reset'>
                        <a className={classes.forgotPw}>
                          Forgot your password ?
                        </a>
                      </Link>
                    </Grid>
                  </Grid>
                </Container>
              </form>
            </Grid>
            <Grid item xs={12} md={5} className={classes.gridItemLeft}>
              <div className={classes.leftDiv}>
                <div className={classes.leftSubDiv}>
                  <Typography
                    variant='h4'
                    className={`${classes.LeftTypo} ${classes.Typo1}`}
                    gutterBottom
                    paragraph
                  >
                    Discover handmade desserts
                  </Typography>
                  <Typography
                    variant='h6'
                    className={`${classes.LeftTypo} ${classes.Typo2}`}
                  >
                    <Link href='/'>
                      <a className={classes.here}>
                        <ArrowForwardIcon /> Start shopping now
                      </a>
                    </Link>
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
