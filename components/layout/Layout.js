import Navbar from './Navbar';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(25),
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
      <Footer></Footer>
    </>
  );
};

export default Layout;
