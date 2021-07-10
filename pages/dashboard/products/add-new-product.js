// @@@ MATERIAL-UI @@@
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Switch,
  Button,
  InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
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
  },
  Typo1: {
    marginBottom: theme.spacing(4),
    color: theme.palette.grey[800],
  },
  gridFormItem: {
    marginBottom: theme.spacing(8),
  },
  gridFormItemTopLeft: {
    paddingRight: theme.spacing(4),
  },
  gridFormItemTopRight: {
    paddingLeft: theme.spacing(4),
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
}));

const AddNewProduct = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [switchState, setSwitchState] = useState(false);
  const [imageState, setImageState] = useState('');

  const handleChange = (event) => {
    setSwitchState(!switchState);
  };

  const newProductSubmitHandler = async (e) => {
    e.preventDefault();

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
    console.log(result);
  };

  return (
    <>
      <Box component='div'>
        <Grid container>
          <Grid item md={3}>
            <DashboardLeft></DashboardLeft>
          </Grid>
          <Grid item md={8}>
            <Grid container className={classes.gridContainer}>
              <Grid item md={12}>
                <Typography variant='h4' className={classes.Typo1}>
                  Add New Product
                </Typography>
              </Grid>
              <Grid container item md={12}>
                <form onSubmit={newProductSubmitHandler}>
                  <Grid container>
                    <Grid
                      item
                      md={6}
                      className={`${classes.gridFormItem} ${classes.gridFormItemTopLeft}`}
                    >
                      <Typography variant='h6'>Name</Typography>
                      <TextField
                        variant='outlined'
                        fullWidth
                        helperText='*Please enter name of the product'
                        color='primary'
                      ></TextField>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      className={`${classes.gridFormItem} ${classes.gridFormItemTopRight}`}
                    >
                      <Typography variant='h6'>Price</Typography>
                      <TextField
                        variant='outlined'
                        fullWidth
                        helperText='*Please enter price of the product'
                        color='primary'
                      ></TextField>
                    </Grid>
                    <Grid item md={12} className={classes.gridFormItem}>
                      <Typography variant='h6'>Description</Typography>
                      <TextField
                        variant='outlined'
                        multiline
                        fullWidth
                        color='primary'
                        rows={4}
                        helperText='*Please enter a relavant description of the product'
                      ></TextField>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      className={`${classes.gridFormItem} ${classes.gridFormItemTopLeft}`}
                    >
                      <Typography variant='h6'>Quantity</Typography>
                      <TextField
                        variant='outlined'
                        fullWidth
                        color='primary'
                        helperText='*Please enter the quantity of the product or leave it empty'
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
                        <Typography variant='h6' className={classes.activeTypo}>
                          Active
                        </Typography>
                        <Switch
                          checked={switchState}
                          onChange={handleChange}
                          size='medium'
                          color='primary'
                          name='switchState'
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </div>
                      <Typography variant='caption' color='textSecondary'>
                        *Turn it on if you want to make the product live
                      </Typography>
                    </Grid>
                    <Grid item md={6}></Grid>
                    <Grid
                      item
                      md={6}
                      className={`${classes.gridFormItem} ${classes.imageWrapper}`}
                    >
                      <Typography variant='h6' className={classes.activeTypo}>
                        Image
                      </Typography>
                      <div className={classes.root}>
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
                            Upload
                          </Button>
                        </label>
                      </div>
                    </Grid>
                    <Grid item md={6}></Grid>
                    <Grid
                      item
                      md={6}
                      className={`${classes.gridFormItem} ${classes.submitBtnWrapper}`}
                    >
                      <Button
                        variant='contained'
                        color='primary'
                        fullWidth
                        type='submit'
                      >
                        submit
                      </Button>
                    </Grid>
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
