// @@@ MATERIAL-UI @@@
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import DashboardLeft from '../../../components/dashboard/DashboardLeft';
// @@@ nextjs @@@

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  gridContainer: {
    borderRadius: '5px',
    backgroundColor: '#fff',
    padding: theme.spacing(5),
    marginTop: theme.spacing(20),
    boxShadow: theme.shadows[1],
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      marginTop: theme.spacing(5),
    },
  },
  Typo1: {
    marginBottom: theme.spacing(4),
    color: theme.palette.grey[800],
    [theme.breakpoints.down('xs')]: {
      fontSize: '24px',
    },
  },
  snackbar: {
    borderRadius: '5px',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    backgroundColor: '#4caf50',
  },
  submitBtnWrapper: {
    marginTop: theme.spacing(5),
  },
  gridFormContainer: {},
  formWrapper: {
    width: '100%',
  },
  gridFormItem: {
    marginBottom: theme.spacing(5),
  },
}));

const AddNewProduct = () => {
  const classes = useStyles();
  const router = useRouter();
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [category_url, setCategory_url] = useState('');
  const [errorcategory_url, setErrorCategory_url] = useState(false);
  const [price, setPrice] = useState('');
  const [successCategory, setSuccessCategory] = useState(false);
  const [snackbar, setSnackbar] = useState(true);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (name.length > 1) setErrorName(false);
    if (category_url.length > 1) setErrorCategory_url(false);
  }, [name, category_url]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(false);
  };

  const newCategoryHandler = async (e) => {
    e.preventDefault();
    setSpinner(true);

    let sliced = name.slice(1);
    let firstLetter = name[0].toUpperCase();
    let turnedName = firstLetter + sliced;
    // TURNING NAME'S FIRST LETTER TO UPPERCASE, URL TO ALL LOWER JUST IN CASE IF USER TYPES DIFFERENT
    let slicedURL = category_url.slice(1);
    let firstLetterURL = category_url[0].toLowerCase();
    let turnedURL = firstLetterURL + slicedURL;

    const submitNewCategory = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/categories`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: turnedName, category_url: turnedURL }),
      }
    );

    const result = await submitNewCategory.json();

    if (result) {
      setSpinner(false);
      setSuccessCategory(true);
      setName('');
      setCategory_url('');
      setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_URL}/dashboard/categories`);
      }, 2000);
    }
  };

  return (
    <>
      <Box component='div'>
        <Grid container>
          <Grid item md={3}>
            <DashboardLeft></DashboardLeft>
          </Grid>
          <Grid item md={8}>
            {successCategory && (
              <Snackbar
                open={snackbar}
                autoHideDuration={2000}
                className={classes.snackbar}
                onClose={handleSnackbarClose}
              >
                <Typography
                  variant='body1'
                  color='secondary'
                  className={classes.snackbarTypo}
                >
                  <CheckCircleOutlineIcon
                    color='secondary'
                    style={{ marginRight: '10px' }}
                  />
                  Success! The category has been saved.
                </Typography>
              </Snackbar>
            )}
            <Grid container className={classes.gridContainer} xs={12}>
              <Grid item md={12}>
                <Typography variant='h4' className={classes.Typo1}>
                  Add New Category
                </Typography>
              </Grid>
              <Grid
                container
                item
                md={12}
                xs={12}
                className={classes.gridFormContainer}
              >
                <form
                  className={classes.formWrapper}
                  onSubmit={newCategoryHandler}
                >
                  <Grid item md={6} className={classes.gridFormItem}>
                    <Typography variant='h6'>Name</Typography>
                    <TextField
                      variant='outlined'
                      fullWidth
                      helperText='*Please enter name of the category'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={errorName}
                      className={classes.formTxt}
                    ></TextField>
                  </Grid>
                  <Grid item md={6}></Grid>
                  <Grid item md={6} className={classes.gridFormItem}>
                    <Typography variant='h6'>Category Url</Typography>
                    <TextField
                      variant='outlined'
                      fullWidth
                      helperText={`*Please enter category url e.g.  /baklavalar .`}
                      value={category_url}
                      onChange={(e) => setCategory_url(e.target.value)}
                      error={errorcategory_url}
                    ></TextField>
                  </Grid>
                  <Grid item md={6}></Grid>
                  <Grid item md={6}>
                    <Button
                      variant='contained'
                      fullWidth
                      disableElevation
                      color='primary'
                      type='submit'
                    >
                      {spinner ? (
                        <CircularProgress color='secondary' size='2em' />
                      ) : (
                        'submit'
                      )}
                    </Button>
                  </Grid>
                  <Grid item md={12}>
                    <Box component='div' style={{ height: '20vh' }}></Box>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddNewProduct;
