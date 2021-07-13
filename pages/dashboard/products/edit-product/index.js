// @@@ MATERIAL-UI @@@
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Switch,
  Button,
  IconButton,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DashboardLeft from '../../../../components/dashboard/DashboardLeft';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CancelIcon from '@material-ui/icons/Cancel';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { connectToDatabase } from '../../../../util/mongodb';
import { ObjectId } from 'mongodb';

// @@@ nextjs @@@

export const getServerSideProps = async (context) => {
  const urlQuery = context.query;
  const { db } = await connectToDatabase();
  let resultProduct;
  let noProduct = false;

  if (!urlQuery.id) {
    resultProduct = {
      name: '',
      price: '',
      description: '',
      quantity: '',
      image: [],
    };
    noProduct = true;
  } else if (urlQuery.id.length < 24) {
    resultProduct = {
      name: '',
      price: '',
      description: '',
      quantity: '',
      image: [],
    };
    noProduct = true;
  } else {
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
    noProduct = true;
  }
  return {
    props: {
      noProduct,
      urlQuery,
      resultProduct,
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
}));

const EditProduct = ({ resultProduct, urlQuery, noProduct }) => {
  const classes = useStyles();
  const router = useRouter();
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [price, setPrice] = useState('');
  const [errorPrice, setErrorPrice] = useState(false);
  const [description, setDescription] = useState('');
  const [errorDescription, setErrorDescription] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [switchState, setSwitchState] = useState(false);
  const [imageState, setImageState] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [successProduct, setSuccessProduct] = useState(false);
  const [snackbar, setSnackbar] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [productError, setProductError] = useState(false);

  useEffect(() => {
    if (!urlQuery.id || noProduct) {
      setProductError(true);
    }
    if (resultProduct) {
      setName(resultProduct.name);
      setPrice(resultProduct.price);
      setDescription(resultProduct.description);
      setQuantity(resultProduct.quantity);
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
            active: switchState,
            image: uploadedImages,
          }),
        }
      );

      const result = await updateProduct.json();
      if (result) {
        setSuccessProduct(true);
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
                width={256}
                height={56}
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
