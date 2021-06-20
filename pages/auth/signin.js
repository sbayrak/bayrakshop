import { Container, Typography, Button, TextField } from '@material-ui/core';
import { signIn } from 'next-auth/client';
import { useState } from 'react';
import { useRouter } from 'next/router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    signIn('credentials', {
      redirect: false,
      callbackUrl: `${window.location.origin}/`,
      email: email,
      password: password,
    }).then(function (data) {
      if (data.error) {
        setSignInError(data.error);
      } else if (data.status === 200 && data.ok === true) {
        router.push(data.url);
      }
    });
  };

  return (
    <>
      <Container>
        <form onSubmit={submitHandler}>
          <TextField
            variant='outlined'
            type='email'
            name='email'
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <TextField
            variant='outlined'
            type='password'
            name='password'
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
          <Button variant='outlined' type='submit'>
            Sign In
          </Button>
        </form>
        {signInError && <Typography>Oops! something went wrong</Typography>}
      </Container>
    </>
  );
};

export default SignIn;
