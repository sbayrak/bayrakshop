import { Container, TextField, Typography, Button } from '@material-ui/core';
import { useState } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

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

export async function getServerSideProps(context) {
  const urlQuery = context.query;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/profile/password-reset?email=${urlQuery.email}&token=${urlQuery.token}`,
    {
      method: 'GET',
    }
  );
  const data = await response.json();

  return {
    props: {
      urlQuery,
      data,
    },
  };
}

function PasswordChange({ data, urlQuery }) {
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const [result, setResult] = useState({ msg: '' });

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/profile/password-reset?email=${urlQuery.email}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password }),
      }
    );

    const resultOfUpdatePassword = await response.json();

    setResult(resultOfUpdatePassword);
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {data.status === true ? (
        result.msg === 'updated' ? (
          <>
            <Typography variant='h5'>
              Success! <br></br> Your password updated.
            </Typography>
            <Link href='/'>
              <a>Sign In</a>
            </Link>
          </>
        ) : (
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
                    Password Change
                  </Typography>
                  <TextField
                    fullWidth
                    className={`${classes.formItem} ${classes.txtField}`}
                    variant='outlined'
                    type='password'
                    label='New Password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
        )
      ) : (
        <Typography variant='h3'>Oops! Something went wrong.</Typography>
      )}
    </Container>
  );
}

export default PasswordChange;
