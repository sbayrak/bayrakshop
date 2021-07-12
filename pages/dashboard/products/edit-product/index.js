// @@@ MATERIAL-UI @@@
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Switch,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import DashboardLeft from '../../../../components/dashboard/DashboardLeft';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// @@@ nextjs @@@

export const getServerSideProps = async (context) => {
  const urlQuery = context.query;
  console.log(urlQuery);
  return {
    props: {
      urlQuery,
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
}));

const EditProduct = ({ urlQuery }) => {
  const classes = useStyles();
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

  const handleChange = (event) => {
    setSwitchState(!switchState);
  };

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
              <Grid container item md={12} xs={12}>
                <form>
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
                          <CircularProgress
                            color='secondary'
                            fontSize='small'
                          />
                        ) : (
                          'Upload'
                        )}
                      </Button>
                    </form>
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  {uploadedImages &&
                    uploadedImages.map((img) => (
                      <Image
                        src={img.secure_url}
                        width={256}
                        height={56}
                        key={img.asset_id}
                      />
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EditProduct;
