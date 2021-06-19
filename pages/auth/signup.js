import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const signUpHandler = async (e) => {
    e.preventDefault();
    const submitData = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/profile/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const result = await submitData.json();
    if (result.msg === 'exists') {
      router.push(`${result.callbackUrl}`);
    } else if (result) {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/profile/signup/email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: result[0].email,
          token: result[0].token,
        }),
      });
      router.push(result[0].callbackUrl);
    }
  };

  return (
    <>
      <Container>
        <form onSubmit={signUpHandler}>
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
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
}
