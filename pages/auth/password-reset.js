import { Container, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

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

  const submitHandler = (e) => {
    e.preventDefault();

    const response = await fetch(`${process}`);
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
        ></TextField>
        <Button variant='outlined' type='submit'>
          Submit
        </Button>
      </form>
    </Container>
  );
}
