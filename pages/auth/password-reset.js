import {
  Container,
  Button,
  TextField,
  Box,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    boxShadow: '3px 3px 15px -10px rgba(0,0,0,0.75)',
    border: '10px solid',
    borderImageSlice: 1,
    borderWidth: '10px',
    borderImageSource:
      'linear-gradient(236deg, rgba(5,221,250,0.5102415966386555) 0%, rgba(86,82,222,0.48503151260504207) 83%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(5),
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
  formItem: {
    marginBottom: theme.spacing(2),
  },
  Typo1: {
    marginBottom: theme.spacing(5),
  },
  submitBtn: {
    backgroundColor: '#5652de',
    color: '#f6f6f6',
    '&:hover': {
      backgroundColor: '#6788f5',
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
}));

export default function PasswordReset() {
  const classes = useStyles();
  const router = useRouter();
  const [email, setEmail] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/profile/password-reset`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (data.msg === 'notexists') {
      router.push(data.callbackUrl);
    } else if (data) {
      await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/profile/password-reset/email/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, token: data.token }),
        }
      );
      router.push(data.callbackUrl);
    }
  };

  return (
    <>
      <Box component='div' className={classes.root}>
        <Container className={classes.container}>
          <form onSubmit={submitHandler} className={classes.form}>
            <Typography
              variant='h4'
              className={`${classes.formItem} ${classes.Typo1}`}
              gutterBottom
              paragraph
            >
              Password Reset
            </Typography>
            <TextField
              variant='outlined'
              type='email'
              name='email'
              label='E-mail'
              fullWidth
              className={`${classes.formItem} ${classes.txtField}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <Button
              type='submit'
              variant='contained'
              fullWidth
              className={`${classes.formItem} ${classes.submitBtn}`}
            >
              submit
            </Button>
          </form>
        </Container>
      </Box>
    </>
  );
}
