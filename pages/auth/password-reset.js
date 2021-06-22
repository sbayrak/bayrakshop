import { Container, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
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
    <Container className={classes.root}>
      <form onSubmit={submitHandler}>
        <TextField
          variant='outlined'
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label='E-mail'
        ></TextField>
        <Button variant='outlined' type='submit'>
          Submit
        </Button>
      </form>
    </Container>
  );
}
