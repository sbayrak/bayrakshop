import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const getServerSideProps = async (context) => {
  const urlQuery = context.query;
  const compare = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/profile/signup?email=${urlQuery.email}&token=${urlQuery.token}`,
    {
      method: 'GET',
    }
  );

  const result = await compare.json();

  return {
    props: {
      result,
    },
  };
};

const VerifyEmail = ({ result }) => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      {result.msg === true ? (
        <>
          <Typography variant='h3' gutterBottom>
            Success!
          </Typography>
          <Typography variant='h5'>Your account has been verified.</Typography>
          <Link href='/'>
            <a>Sign In</a>
          </Link>
        </>
      ) : (
        <>
          <Typography variant='h3' gutterBottom>
            Fail!
          </Typography>
          <Typography variant='h5'>Something wrong happened.</Typography>
        </>
      )}
    </Container>
  );
};

export default VerifyEmail;
