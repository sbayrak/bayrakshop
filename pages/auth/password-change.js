import { Container, TextField, Typography, Button } from '@material-ui/core';
import { useState } from 'react';
import Link from 'next/link';

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
          <form onSubmit={submitHandler}>
            <TextField
              variant='outlined'
              type='password'
              label='New Password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <Button variant='outlined' type='submit'>
              Submit
            </Button>
          </form>
        )
      ) : (
        <Typography variant='h3'>Oops! Something went wrong.</Typography>
      )}
    </Container>
  );
}

export default PasswordChange;
