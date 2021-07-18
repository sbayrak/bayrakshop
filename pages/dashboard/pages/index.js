// @@@ MATERIAL-UI @@@
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Snackbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import DashboardLeft from '../../../components/dashboard/DashboardLeft';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { connectToDatabase } from '../../../util/mongodb';
// @@@ nextjs @@@

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();

  const getPagesFromDB = await db.collection('pages').find({}).toArray();
  const getPages = await JSON.parse(JSON.stringify(getPagesFromDB));

  // @@@ HERO CONTENT @@@
  const fillHeroContent = getPages.filter(
    (pageItem) => pageItem.section === 'hero'
  );
  const heroContent = fillHeroContent[0];
  // @@@ HERO CONTENT @@@

  return {
    props: {
      heroContent,
    },
  };
};

const useStyles = makeStyles((theme) => ({
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: '5px',
    padding: theme.spacing(2),
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
  gridFormItem: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  activeTypo: {
    marginRight: theme.spacing(5),
  },
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
}));

const Dashboard = ({ heroContent }) => {
  const classes = useStyles();
  const [imageState, setImageState] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [errorUploadedImages, setErrorUploadedImages] = useState(false);
  const [heroTitle, setHeroTitle] = useState('');
  const [errorHeroTitle, setErrorHeroTitle] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [successHero, setSuccessHero] = useState(false);
  const [snackbar, setSnackbar] = useState(true);

  useEffect(() => {
    if (heroContent) {
      setHeroTitle(heroContent.title);
      setUploadedImages(heroContent.image);
    }
  }, []);

  useEffect(() => {
    if (heroTitle) {
      setErrorHeroTitle(false);
    }
    if (!heroTitle) {
      setErrorHeroTitle(true);
    }
    if (uploadedImages.length < 1) {
      setErrorUploadedImages(true);
    }
    if (uploadedImages.length > 0) {
      setErrorUploadedImages(false);
    }
  }, [uploadedImages, heroTitle]);

  const removeUploadedImageHandler = (e) => {
    e.preventDefault();

    const filteredImage = uploadedImages.filter(
      (img) => img.asset_id !== e.currentTarget.dataset.id
    );

    setUploadedImages(filteredImage);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(false);
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

  const heroSubmitHandler = async (e) => {
    e.preventDefault();

    if (!heroTitle) {
      setErrorHeroTitle(true);
    }
    if (uploadedImages.length < 1) {
      setErrorUploadedImages(true);
    } else {
      const submitHero = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/pages?section=hero`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: uploadedImages,
            title: heroTitle,
          }),
        }
      );

      const result = await submitHero.json();
      if (result.result.n === 1) {
        setSuccessHero(true);
      }
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
            {successHero && (
              <Snackbar
                open={snackbar}
                autoHideDuration={2000}
                className={classes.snackbar}
                onClose={handleSnackbarClose}
              >
                <Typography
                  variant='body2'
                  color='secondary'
                  className={classes.snackbarTypo}
                >
                  <CheckCircleOutlineIcon
                    color='secondary'
                    style={{ marginRight: '10px' }}
                  />
                  Success! The hero page has been saved.
                </Typography>
              </Snackbar>
            )}
            <Grid container item xs={12} className={classes.gridContainer}>
              <Grid item md={12} className={`${classes.gridFormItem}  `}>
                <Typography variant='h4' gutterBottom paragraph>
                  Edit Pages
                </Typography>
              </Grid>
              <Grid item md={12} className={`${classes.gridFormItem}  `}>
                <Typography variant='h5' gutterBottom>
                  Hero Section
                </Typography>{' '}
                <Grid item md={6}></Grid>
                <Grid item md={6} xs={12} className={classes.gridFormItem}>
                  <Typography variant='h6' className={classes.activeTypo}>
                    Image
                  </Typography>
                  {uploadedImages &&
                    uploadedImages.map((img) => (
                      <div
                        data-id={`${img.asset_id}`}
                        className={classes.imgWrapper}
                        key={img.asset_id}
                      >
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
                <Grid
                  item
                  md={6}
                  xs={12}
                  className={`${classes.gridFormItem} ${classes.imageWrapper}`}
                  style={{
                    border: `${
                      errorUploadedImages
                        ? `1px solid rgba(222,0,0,1)`
                        : `1px solid rgba(0,0,0,0.2)`
                    }`,
                  }}
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
                            disabled={uploadedImages.length > 0 ? true : false}
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
                        disabled={uploadedImages.length > 0 ? true : false}
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
                    {uploadedImages.length > 0 && (
                      <Typography variant='caption'>
                        *You can only upload 1 photo.
                      </Typography>
                    )}
                  </div>
                </Grid>
                <form onSubmit={heroSubmitHandler}>
                  <Grid item md={6} className={classes.gridFormItem}>
                    <Typography variant='h6'>Title</Typography>
                    <TextField
                      variant='outlined'
                      fullWidth
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      error={errorHeroTitle}
                    ></TextField>
                  </Grid>
                  <Grid item md={6}>
                    <Button
                      type='submit'
                      variant='contained'
                      fullWidth
                      color='primary'
                      disabled={
                        uploadedImages.length <= 0 || !heroTitle ? true : false
                      }
                    >
                      update
                    </Button>
                    {uploadedImages.length <= 0 && (
                      <Typography variant='caption'>
                        *Please upload at least 1 photo.
                      </Typography>
                    )}
                  </Grid>
                </form>
                <Grid item md={6}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
