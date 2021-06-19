import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpHandler = async (e) => {
    e.preventDefault();
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
