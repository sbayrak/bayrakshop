import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const VerificationMessage = () => {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.root}>
        <Typography variant='h3' gutterBottom>
          Success!
        </Typography>
        <Typography variant='h5'>
          Please check your e-mail for verification
        </Typography>
      </Container>
    </>
  );
};

export default VerificationMessage;
