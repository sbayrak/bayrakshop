// @@@ MATERIAL-UI @@@
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
  Modal,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DashboardLeft from '../../../../components/dashboard/DashboardLeft';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DeleteIcon from '@material-ui/icons/Delete';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { connectToDatabase } from '../../../../util/mongodb';
import { ObjectId } from 'mongodb';

// @@@ nextjs @@@

export const getServerSideProps = async (context) => {
  const urlQuery = context.query;
  const { db } = await connectToDatabase();
  let resultCategory;
  let noCategory = false;

  if (!urlQuery.id) {
    resultCategory = {
      name: '',
      price: '',
      description: '',
      quantity: '',
      image: [],
    };
    noCategory = true;
  } else if (urlQuery.id.length < 24) {
    resultCategory = {
      name: '',
      price: '',
      description: '',
      quantity: '',
      image: [],
    };
    noCategory = true;
  } else {
    const getCategory = await db
      .collection('categories')
      .findOne({ _id: ObjectId(urlQuery.id) });
    resultCategory = await JSON.parse(JSON.stringify(getCategory)); // JSONify the object is required for serialize
  }

  if (!resultCategory) {
    resultCategory = {
      name: '',
      price: '',
      description: '',
      quantity: '',
      image: [],
    };
    noCategory = true;
  }
  return {
    props: {
      noCategory,
      urlQuery,
      resultCategory,
    },
  };
};

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
  gridFormItem: {
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  gridFormItemTopLeft: {
    paddingRight: theme.spacing(4),
  },
  gridFormItemTopRight: {
    paddingLeft: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(0),
    },
  },
  switchWrapper: {
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: '5px',
    padding: theme.spacing(2),
  },
  activeTypo: {
    marginRight: theme.spacing(5),
  },
  imageWrapper: {
    display: 'flex',
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: '5px',
    padding: theme.spacing(2),
  },
  submitBtnWrapper: {
    marginTop: theme.spacing(5),
  },
  snackbar: {
    borderRadius: '5px',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    backgroundColor: '#4caf50',
  },
  snackbarTypo: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  formItemTypo: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px',
    },
  },
  imgWrapper: {
    border: '1px solid rgba(0,0,0,0.2)',
    paddingTop: theme.spacing(1),
    borderRadius: '5px',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productErrorWrapper: {
    border: '1px solid red',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
    borderRadius: '5px',
    backgroundColor: 'rgba(244,67,54,0.85)',
  },
  productErrorTypo: {
    marginLeft: theme.spacing(1),
  },
  productErrorLink: {
    color: '#f6f6f6',
    textDecoration: 'none',
    fontWeight: theme.typography.fontWeightBold,
    paddingBottom: '1px',
    borderBottom: '1px solid #f6f6f6',
  },
  form: {
    width: '100%',
  },
  deleteBtn: {
    color: 'rgba(244,67,54,0.85)',
    backgroundColor: '#f6f6f6',
    '&:hover': {
      color: '#f6f6f6',
      backgroundColor: 'rgba(244,67,54,0.85)',
    },
  },
  categoryErrorWrapper: {
    border: '1px solid red',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
    borderRadius: '5px',
    backgroundColor: 'rgba(244,67,54,0.85)',
  },
  productErrorTypo: {
    marginLeft: theme.spacing(1),
  },
  modalBox: {
    position: 'fixed',
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(33,33,33,0.3)',
    zIndex: 99,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    backgroundColor: '#fafafa',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    boxShadow: '2px 2px 10px 1px rgba(0,0,0,0.5)',
  },
  modalItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  modalGridItem: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  modalBtnWrapper: {
    display: 'flex',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  modalBtn: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  modalCancel: {
    marginRight: theme.spacing(3),
  },
  modalDelete: {
    backgroundColor: '#F44336',
    color: '#f6f6f6',
    '&:hover': {
      backgroundColor: '#F11336',
      color: '#f6f6f6',
    },
  },
  modalRoot: {
    marginTop: theme.spacing(10),
  },
}));

const EditCategory = ({ resultCategory, urlQuery, noCategory }) => {
  const classes = useStyles();
  const router = useRouter();
  const [name, setName] = useState('');
  const [categoryUrl, setCategoryUrl] = useState('');
  const [errorCategoryURL, setErrorCategoryURL] = useState(false);
  const [categoryDelete, setCategoryDelete] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [successProduct, setSuccessProduct] = useState(false);
  const [snackbar, setSnackbar] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [productError, setProductError] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [deleteSpinner, setDeleteSpinner] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!urlQuery.id || noCategory) {
      setProductError(true);
    }
    if (resultCategory) {
      setName(resultCategory.name);
    }
    if (resultCategory) {
      setCategoryUrl(resultCategory.category_url);
    }
  }, []);
  useEffect(() => {
    if (name.length > 1) {
      setErrorName(false);
      setErrorCategoryURL(false);
    }
  }, [name, categoryUrl]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(false);
  };

  const editCategoryHandler = async (e) => {
    e.preventDefault();

    if (!name) {
      setErrorName(true);
    }
    if (!categoryUrl) {
      setErrorCategoryURL(true);
    } else {
      const updateProduct = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/categories/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: resultCategory._id,
            name,
            category_url: categoryUrl,
          }),
        }
      );

      const result = await updateProduct.json();
      if (result) {
        setSuccessProduct(true);
        setTimeout(() => {
          router.push(`${process.env.NEXT_PUBLIC_URL}/dashboard/categories`);
        }, 2000);
      }
    }
  };
  const deleteCategoryHandler = async (e) => {
    e.preventDefault();
    setDeleteSpinner(true);

    const deleteCategory = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/categories`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: resultCategory._id }),
      }
    );

    const result = await deleteCategory.json();
    if (result.msg === 'ok') {
      setTimeout(() => {
        setDeleteSpinner(false);
        router.push(`${process.env.NEXT_PUBLIC_URL}/dashboard/categories`);
      }, 1000);
    }
  };

  const editCategoryContainer = (
    <Grid container item md={12} xs={12}>
      <form onSubmit={editCategoryHandler} className={classes.form}>
        <Grid container item xs={12}>
          <Grid
            item
            md={6}
            xs={12}
            className={`${classes.gridFormItem} ${classes.gridFormItemTopLeft}`}
          >
            <Typography variant='h6' className={classes.formItemTypo}>
              Name
            </Typography>
            <TextField
              variant='outlined'
              fullWidth
              color='primary'
              helperText='*Please enter new category name or leave as it is.'
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errorName}
            ></TextField>
          </Grid>
          <Grid item md={6}></Grid>
          <Grid
            item
            md={6}
            xs={12}
            className={`${classes.gridFormItem} ${classes.gridFormItemTopLeft}`}
          >
            <Typography variant='h6' className={classes.formItemTypo}>
              Category Url
            </Typography>
            <TextField
              variant='outlined'
              fullWidth
              color='primary'
              helperText='*Please enter new Url or leave as it is. e.g. www.yourdomain.com/baklavas'
              value={categoryUrl}
              onChange={(e) => setCategoryUrl(e.target.value)}
              error={errorCategoryURL}
            ></TextField>
          </Grid>
          <Grid item md={6}></Grid>
          <Grid
            item
            md={6}
            xs={12}
            className={`${classes.gridFormItem} ${classes.submitBtnWrapper}`}
          >
            <Button variant='contained' color='primary' fullWidth type='submit'>
              submit
            </Button>
          </Grid>
          <Grid item md={6}></Grid>
        </Grid>
      </form>

      <Grid item md={6}>
        <div ref={rootRef} className={classes.modalRoot}>
          <Modal
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open={openModal}
            aria-labelledby='server-modal-title'
            aria-describedby='server-modal-description'
            className={classes.modal}
            container={() => rootRef.current}
          >
            <Box component='div' className={classes.modalBox}>
              <Box component='div' className={classes.modalWrapper}>
                <div className={classes.modalItemContainer}>
                  <Grid item md={12} className={classes.modalGridItem}>
                    <DeleteIcon
                      fontSize='large'
                      style={{ color: '#F44336', fontSize: '60px' }}
                    />
                  </Grid>
                  <Grid item md={12} className={classes.modalGridItem}>
                    <Typography variant='h5' color='textPrimary'>
                      You are about to delete this category
                    </Typography>
                  </Grid>
                  <Grid item md={12} className={classes.modalGridItem}>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      align='center'
                    >
                      Do you really would like to delete this category ? <br />{' '}
                      This cannot be undone.
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    className={`${classes.modalGridItem} ${classes.modalBtnWrapper}`}
                  >
                    <Button
                      disableElevation
                      variant='contained'
                      className={`${classes.modalBtn} ${classes.modalCancel}`}
                      onClick={(e) => setOpenModal(false)}
                    >
                      CANCEL
                    </Button>
                    <form onSubmit={deleteCategoryHandler}>
                      <Button
                        disableElevation
                        variant='contained'
                        type='submit'
                        className={`${classes.modalBtn} ${classes.modalDelete}`}
                        data-id={`${resultCategory._id}`}
                      >
                        {deleteSpinner ? (
                          <CircularProgress color='secondary' size='2em' />
                        ) : (
                          'DELETE'
                        )}
                      </Button>
                    </form>
                  </Grid>
                </div>
              </Box>
            </Box>
          </Modal>
        </div>
        <Button
          variant='contained'
          fullWidth
          onClick={(e) => setOpenModal(!openModal)}
          style={{ color: '#f6f6f6', backgroundColor: '#f44336' }}
        >
          DELETE CATEGORY
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Box component='div'>
        <Grid container>
          <Grid item md={3}>
            <DashboardLeft></DashboardLeft>
          </Grid>
          <Grid item md={8}>
            {successProduct && (
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
                  Success! The category has been updated.
                </Typography>
              </Snackbar>
            )}
            <Grid container className={classes.gridContainer} xs={12}>
              <Grid item md={12}>
                <Typography variant='h4' className={classes.Typo1}>
                  Edit Category
                </Typography>
              </Grid>
              {productError ? (
                <Grid item md={12}>
                  <Box component='div' className={classes.productErrorWrapper}>
                    <ErrorOutlineIcon color='secondary' />
                    <Typography
                      variant='body2'
                      className={classes.productErrorTypo}
                      color='secondary'
                    >
                      Error! The category you wish to edit could not find or
                      does not exist. Please go to{' '}
                      <Link href='/dashboard/categories'>
                        <a className={classes.productErrorLink}>categories</a>
                      </Link>{' '}
                      page then click on edit button which category you wish to
                      edit.
                    </Typography>
                  </Box>
                  <Box component='div' style={{ height: '30vh' }}></Box>
                </Grid>
              ) : (
                editCategoryContainer
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EditCategory;
