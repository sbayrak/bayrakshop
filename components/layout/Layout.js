import Navbar from './Navbar';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(10),
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Box component='div' className={classes.root}>
        <Navbar></Navbar>
      </Box>
      {children}
    </>
  );
};

export default Layout;
