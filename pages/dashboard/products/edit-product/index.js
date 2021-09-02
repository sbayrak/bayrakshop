// @@@ MATERIAL-UI @@@
import {
  Box,
  Grid,
  Typography,
  TextField,
  Switch,
  Button,
  IconButton,
  CircularProgress,
  Snackbar,
  Select,
  MenuItem,
  Modal,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DashboardLeft from '../../../../components/dashboard/DashboardLeft';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { connectToDatabase } from '../../../../util/mongodb';
import { ObjectId } from 'mongodb';

// @@@ nextjs @@@

export const getServerSideProps = async (context) => {
  const urlQuery = context.query;
  const { db } = await connectToDatabase();
  let resultProduct;
  let noProduct = false;
  let noCategory = false;
  let categoryResult;

  if (!urlQuery.id) {
    resultProduct = {
      name: '',
      price: '',
      description: '',
      quantity: '',
      image: [],
    };
    categoryResult = {
      name: '',
      _id: '',
    };
    noCategory = false;
    noProduct = true;
  } else if (urlQuery.id.length < 24) {
    resultProduct = {
      name: '',
      price: '',
      description: '',
      quantity: '',
      image: [],
    };
    categoryResult = {
      name: '',
      _id: '',
    };
    noCategory = false;
    noProduct = true;
  } else {
    const getCategories = await db.collection('categories').find({}).toArray();

    categoryResult = await JSON.parse(JSON.stringify(getCategories));
    const getProduct = await db
      .collection('products')
      .findOne({ _id: ObjectId(urlQuery.id) });
    resultProduct = await JSON.parse(JSON.stringify(getProduct)); // JSONify the object is required for serialize
  }

  if (!resultProduct) {
    resultProduct = {
      name: '',
      price: '',
      description: '',
      quantity: '',
      image: [],
    };
    categoryResult = {
      name: '',
      _id: '',
    };
    noCategory = false;
    noProduct = true;
  }
  return {
    props: {
      noProduct,
      noCategory,
      urlQuery,
      resultProduct,
      categoryResult,
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
    marginBottom: theme.spacing(3),
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

const EditProduct = ({
  resultProduct,
  urlQuery,
  noProduct,
  noCategory,
  categoryResult,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [price, setPrice] = useState('');
  const [errorPrice, setErrorPrice] = useState(false);
  const [description, setDescription] = useState('');
  const [errorDescription, setErrorDescription] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [errorCategory, setErrorCategory] = useState(false);
  const [switchState, setSwitchState] = useState(false);
  const [imageState, setImageState] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [successProduct, setSuccessProduct] = useState(false);
  const [snackbar, setSnackbar] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [productError, setProductError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteSpinner, setDeleteSpinner] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!urlQuery.id || noProduct || noCategory) {
      setProductError(true);
    }

    if (resultProduct) {
      setName(resultProduct.name);
      setPrice(resultProduct.price);
      setDescription(resultProduct.description);
      setQuantity(resultProduct.quantity);
      setCategory(resultProduct.category);
      setSwitchState(resultProduct.active);
      setUploadedImages(resultProduct.image);
    }
  }, []);
  useEffect(() => {
    if (name.length > 1) setErrorName(false);
    if (price.length > 1) setErrorPrice(false);
    if (description.length > 1) setErrorDescription(false);
  }, [name, price, description]);

  const handleChange = (event) => {
    setSwitchState(!switchState);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(false);
  };

  const removeUploadedImageHandler = (e) => {
    e.preventDefault();

    const filteredImage = uploadedImages.filter(
      (img) => img.asset_id !== e.currentTarget.dataset.id
    );

    setUploadedImages(filteredImage);
  };

  const editProductHandler = async (e) => {
    e.preventDefault();

    if (!name) {
      setErrorName(true);
    }
    if (!price) {
      setErrorPrice(true);
    }
    if (!description) {
      setErrorDescription(true);
    }
    if (!category) {
      setErrorCategory(true);
    } else {
      const updateProduct = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/products/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: resultProduct._id,
            name,
            price,
            description,
            quantity,
            category: category,
            active: switchState,
            image: uploadedImages,
          }),
        }
      );

      const result = await updateProduct.json();
      if (result) {
        setSuccessProduct(true);
        setTimeout(() => {
          router.push(`${process.env.NEXT_PUBLIC_URL}/dashboard/products`);
        }, 2000);
      }

      // @@@ TODO ROUTE TO THE SINGLE PRODUCT PAGE
    }
  };

  const newImageUploadHandler = async (e) => {
    e.preventDefault();
    setSpinner(true);

    const formData = new FormData();
    formData.append('file', imageState);
    formData.append(
      'upload_preset',
      `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`
    );

    const submitData = await fetch(
      ` https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await submitData.json();
    if (result) {
      setSpinner(false);
    }
    setUploadedImages([...uploadedImages, result]); // ADD NEW UPLOADED IMG TO uploadedImages STATE
  };

  const deleteProductHandler = async (e) => {
    e.preventDefault();
    setDeleteSpinner(true);

    const deleteProduct = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: resultProduct._id }),
      }
    );

    const result = await deleteProduct.json();
    if (result.msg === 'ok') {
      setTimeout(() => {
        setDeleteSpinner(false);
        router.push(`${process.env.NEXT_PUBLIC_URL}/dashboard/products`);
      }, 1000);
    }
  };

  const editProductContainer = (
    <Grid container item md={12} xs={12}>
      <form onSubmit={editProductHandler}>
        <Grid container>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errorName}
            ></TextField>
          </Grid>
          <Grid
            item
            md={6}
            xs={11}
            className={`${classes.gridFormItem} ${classes.gridFormItemTopRight}`}
          >
            <Typography variant='h6' className={classes.formItemTypo}>
              Price
            </Typography>
            <TextField
              variant='outlined'
              fullWidth
              color='primary'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={errorPrice}
            ></TextField>
          </Grid>
          <Grid item md={12} className={classes.gridFormItem}>
            <Typography variant='h6' className={classes.formItemTypo}>
              Description
            </Typography>
            <TextField
              variant='outlined'
              multiline
              fullWidth
              color='primary'
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={errorDescription}
            ></TextField>
          </Grid>
          <Grid
            item
            md={6}
            className={`${classes.gridFormItem} ${classes.gridFormItemTopLeft}`}
          >
            <Typography variant='h6' className={classes.formItemTypo}>
              Quantity
            </Typography>
            <TextField
              variant='outlined'
              fullWidth
              color='primary'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item md={6}></Grid>
          <Grid
            item
            md={6}
            className={`${classes.gridFormItem} ${classes.gridFormItemTopLeft}`}
          >
            <Typography variant='h6' className={classes.formItemTypo}>
              Category
            </Typography>
            <Select
              labelId='demo-simple-select-filled-label'
              id='demo-simple-select-filled'
              value={category}
              fullWidth
              onChange={(e) => setCategory(e.target.value)}
              error={errorCategory}
              variant='outlined'
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {categoryResult.name !== '' &&
                categoryResult.map((categoryItem) => (
                  <MenuItem key={categoryItem._id} value={categoryItem.name}>
                    {categoryItem.name}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
          <Grid item md={6}></Grid>

          <Grid
            item
            md={6}
            className={`${classes.gridFormItem} ${classes.switchWrapper}`}
          >
            <div
              style={{
                display: 'flex',
                marginBottom: '10px',
              }}
            >
              <Typography
                variant='h6'
                className={`${classes.activeTypo} ${classes.formItemTypo}`}
              >
                Active
              </Typography>
              <Switch
                checked={switchState}
                onChange={handleChange}
                size='medium'
                color='primary'
                name='switchState'
                inputProps={{
                  'aria-label': 'primary checkbox',
                }}
              />
            </div>
          </Grid>
          <Grid item md={6}></Grid>

          <Grid
            item
            md={6}
            xs={11}
            className={`${classes.gridFormItem} ${classes.submitBtnWrapper}`}
          >
            <Button
              variant='contained'
              color='primary'
              fullWidth
              disableElevation
              disabled={uploadedImages.length > 0 ? false : true}
              type='submit'
            >
              submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid
        item
        md={6}
        xs={12}
        className={`${classes.gridFormItem} ${classes.imageWrapper}`}
      >
        <Typography variant='h6' className={classes.activeTypo}>
          Image
        </Typography>
        <div className={classes.root}>
          <form
            onSubmit={newImageUploadHandler}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ marginRight: '20px' }}>
              <input
                accept='image/*'
                className={classes.input}
                id='contained-button-file'
                multiple
                type='file'
                onChange={(e) => setImageState(e.target.files[0])}
              />
              <label htmlFor='contained-button-file'>
                <Button
                  variant='contained'
                  color='primary'
                  component='span'
                  disableElevation
                  onChange={(e) => setImageState(e.target.files[0])}
                >
                  Select
                </Button>
              </label>
            </div>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              type='submit'
              disableElevation
              startIcon={<CloudUploadIcon />}
            >
              {spinner ? (
                <CircularProgress color='secondary' fontSize='small' />
              ) : (
                'Upload'
              )}
            </Button>
          </form>
        </div>
      </Grid>
      <Grid item md={6}></Grid>
      <Grid item md={6} xs={12}>
        {uploadedImages &&
          uploadedImages.map((img) => (
            <div data-id={`${img.asset_id}`} className={classes.imgWrapper}>
              <Image
                src={img.secure_url}
                width={300}
                height={200}
                key={img.asset_id}
              />{' '}
              <IconButton
                data-id={`${img.asset_id}`}
                onClick={removeUploadedImageHandler}
              >
                <CancelIcon style={{ color: '#F44336' }} />
              </IconButton>
            </div>
          ))}
      </Grid>
      <Grid item md={6}></Grid>
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
                      You are about to delete this product
                    </Typography>
                  </Grid>
                  <Grid item md={12} className={classes.modalGridItem}>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      align='center'
                    >
                      Do you really would like to delete this product ? <br />{' '}
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
                    <form onSubmit={deleteProductHandler}>
                      <Button
                        disableElevation
                        variant='contained'
                        type='submit'
                        className={`${classes.modalBtn} ${classes.modalDelete}`}
                        data-id={`${resultProduct._id}`}
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
          DELETE PRODUCT
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
                  Success! The product has been updated.
                </Typography>
              </Snackbar>
            )}
            <Grid container className={classes.gridContainer} xs={12}>
              <Grid item md={12}>
                <Typography variant='h4' className={classes.Typo1}>
                  Edit Product
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
                      Error! The product you wish to edit could not find or does
                      not exist. Please go to{' '}
                      <Link href='/dashboard/products'>
                        <a className={classes.productErrorLink}>products</a>
                      </Link>{' '}
                      page then click on edit button which product you wish to
                      edit.
                    </Typography>
                  </Box>
                  <Box component='div' style={{ height: '30vh' }}></Box>
                </Grid>
              ) : (
                editProductContainer
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EditProduct;
