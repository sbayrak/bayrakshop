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
  const fillAboutContent = getPages.filter(
    (pageItem) => pageItem.section === 'about'
  );
  const fillContactContent = getPages.filter(
    (pageItem) => pageItem.section === 'contact'
  );

  const heroContent = fillHeroContent[0];
  const aboutContent = fillAboutContent[0];
  const contactContent = fillContactContent[0];
  // @@@ HERO CONTENT @@@

  return {
    props: {
      heroContent,
      aboutContent,
      contactContent,
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
  aboutImgWrapper: {
    marginRight: theme.spacing(1),
  },
  aboutParagTxt: {
    marginBottom: theme.spacing(2),
    overflow: 'hidden',
  },
  heroSection: {
    marginBottom: theme.spacing(20),
  },
  contactItem: {
    marginBottom: theme.spacing(2),
  },
}));

const Dashboard = ({ heroContent, aboutContent, contactContent }) => {
  const classes = useStyles();
  const [imageState, setImageState] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [errorUploadedImages, setErrorUploadedImages] = useState(false);
  const [errorAboutUploadedImages, setErrorAboutUploadedImages] = useState(
    false
  );
  const [aboutUploadedImages, setAboutUploadedImages] = useState([]);
  const [aboutImageState, setAboutImageState] = useState('');
  const [parag1, setParag1] = useState('');
  const [parag2, setParag2] = useState('');
  const [parag3, setParag3] = useState('');
  const [errorParag1, setErrorParag1] = useState(false);
  const [errorParag2, setErrorParag2] = useState(false);
  const [errorParag3, setErrorParag3] = useState(false);

  const [heroTitle, setHeroTitle] = useState('');
  const [errorHeroTitle, setErrorHeroTitle] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [successHero, setSuccessHero] = useState(false);
  const [snackbar, setSnackbar] = useState(true);

  const [contactTel, setContactTel] = useState('');
  const [errorContactTel, setErrorContactTel] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [errorContactEmail, setErrorContactEmail] = useState(false);
  const [contactAddress, setContactAddress] = useState('');
  const [errorContactAddress, setErrorContactAddress] = useState(false);
  const [contactMaps, setContactMaps] = useState('');

  console.log(contactContent);

  useEffect(() => {
    if (heroContent) {
      setHeroTitle(heroContent.title);
      setUploadedImages(heroContent.image);
    }
    if (aboutContent) {
      setAboutUploadedImages(aboutContent.image);
      setParag1(aboutContent.paragraph.parag1);
      setParag2(aboutContent.paragraph.parag2);
      setParag3(aboutContent.paragraph.parag3);
    }
    if (contactContent) {
      setContactTel(contactContent.tel);
      setContactEmail(contactContent.email);
      setContactAddress(contactContent.address);
      setContactMaps(contactContent.maps);
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
    if (aboutUploadedImages.length >= 3) {
      setErrorAboutUploadedImages(false);
    }
    if (!parag1) {
      setErrorParag1(true);
    }
    if (parag1.length >= 1) {
      setErrorParag1(false);
    }
    if (!parag2) {
      setErrorParag2(true);
    }
    if (parag2.length >= 1) {
      setErrorParag2(false);
    }
    if (!parag3) {
      setErrorParag3(true);
    }
    if (parag3.length >= 1) {
      setErrorParag3(false);
    }
    if (!contactTel) {
      setErrorContactTel(true);
    }
    if (!contactEmail) {
      setErrorContactEmail(true);
    }
    if (!contactAddress) {
      setErrorContactAddress(true);
    }
    if (contactTel.length > 1) {
      setErrorContactTel(false);
    }
    if (contactEmail.length > 1) {
      setErrorContactEmail(false);
    }
    if (contactAddress.length > 1) {
      setErrorContactAddress(false);
    }
  }, [
    uploadedImages,
    heroTitle,
    aboutUploadedImages,
    parag1,
    parag2,
    parag3,
    contactTel,
    contactAddress,
    contactEmail,
  ]);

  const removeUploadedImageHandler = (e) => {
    e.preventDefault();

    const filteredImage = uploadedImages.filter(
      (img) => img.asset_id !== e.currentTarget.dataset.id
    );

    setUploadedImages(filteredImage);
  };
  const aboutRemoveUploadedImageHandler = (e) => {
    e.preventDefault();

    const filteredImage = aboutUploadedImages.filter(
      (img) => img.asset_id !== e.currentTarget.dataset.id
    );

    setAboutUploadedImages(filteredImage);
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
  const aboutNewImageUploadHandler = async (e) => {
    e.preventDefault();
    setSpinner(true);

    const formData = new FormData();
    formData.append('file', aboutImageState);
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
    setAboutUploadedImages([...aboutUploadedImages, result]); // ADD NEW UPLOADED IMG TO uploadedImages STATE
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

  const aboutSubmitHandler = async (e) => {
    e.preventDefault();
    let parags = {};

    if (aboutUploadedImages.length !== 3) {
      setErrorAboutUploadedImages(true);
    } else if (!parag1) {
      setErrorParag1(true);
    } else if (!parag2) {
      setErrorParag2(true);
    } else if (!parag3) {
      setErrorParag3(true);
    } else {
      parags = {
        parag1: parag1,
        parag2: parag2,
        parag3: parag3,
      };
      const submitData = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/pages?section=about`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: aboutUploadedImages,
            paragraph: parags,
          }),
        }
      );

      const result = await submitData.json();
      if (result.result.n === 1) {
        setSuccessHero(true);
      }
    }
  };

  const contactSubmitHandler = async (e) => {
    e.preventDefault();

    if (!contactTel) {
      setContactTel(true);
    }
    if (!contactEmail) {
      setContactEmail(true);
    }
    if (!contactAddress) {
      setContactAddress(true);
    } else {
      const submitData = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/pages?section=contact`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tel: contactTel,
            email: contactEmail,
            address: contactAddress,
            maps: contactMaps,
          }),
        }
      );

      const result = await submitData.json();

      if (result.result) {
        setSuccessHero(true);
      }
    }
  };

  const heroSection = (
    <Grid
      item
      md={12}
      className={`${classes.gridFormItem} ${classes.heroSection} `}
    >
      <Typography variant='h4' gutterBottom>
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
                width={350}
                height={150}
                key={img.asset_id}
                alt={`${process.env.NEXT_PUBLIC_URL} image`}
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
                <CircularProgress color='secondary' fontSize='small' />
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
            disabled={uploadedImages.length <= 0 || !heroTitle ? true : false}
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
  );
  const aboutSection = (
    <Grid
      item
      md={12}
      className={`${classes.gridFormItem} ${classes.heroSection} `}
    >
      <Typography variant='h4' gutterBottom>
        About Section
      </Typography>
      <Grid item md={6}></Grid>
      <Grid item md={6} xs={12} className={classes.gridFormItem}>
        <Typography variant='h6' className={classes.activeTypo}>
          Image Section
        </Typography>
        <div style={{ display: 'flex' }}>
          {aboutUploadedImages &&
            aboutUploadedImages.map((img) => (
              <div
                data-id={`${img.asset_id}`}
                className={`${classes.imgWrapper} ${classes.aboutImgWrapper}  `}
                key={img.asset_id}
              >
                <Image
                  src={img.secure_url}
                  width={350}
                  height={200}
                  key={img.asset_id}
                  alt={`${process.env.NEXT_PUBLIC_URL} image`}
                />
                <IconButton
                  data-id={`${img.asset_id}`}
                  onClick={aboutRemoveUploadedImageHandler}
                >
                  <CancelIcon style={{ color: '#F44336' }} />
                </IconButton>
              </div>
            ))}
        </div>
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
        className={`${classes.gridFormItem} ${classes.imageWrapper}`}
        style={{
          border: `${
            errorAboutUploadedImages
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
            onSubmit={aboutNewImageUploadHandler}
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
                id='contained-button-file22'
                multiple
                type='file'
                onChange={(e) => setAboutImageState(e.target.files[0])}
              />
              <label htmlFor='contained-button-file22'>
                <Button
                  variant='contained'
                  color='primary'
                  component='span'
                  disableElevation
                  onChange={(e) => setAboutImageState(e.target.files[0])}
                  disabled={aboutUploadedImages.length > 2 ? true : false}
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
              disabled={aboutUploadedImages.length > 2 ? true : false}
            >
              {spinner ? (
                <CircularProgress color='secondary' fontSize='small' />
              ) : (
                'Upload'
              )}
            </Button>
          </form>
          {aboutUploadedImages.length > 2 && (
            <Typography variant='caption'>
              *You can only upload 3 photo.
            </Typography>
          )}
        </div>
      </Grid>
      <form onSubmit={aboutSubmitHandler}>
        <Grid item md={6} className={classes.gridFormItem}>
          <Typography variant='h6'>Paragraphs</Typography>
          <TextField
            variant='outlined'
            fullWidth
            value={parag1}
            onChange={(e) => setParag1(e.target.value)}
            error={errorParag1}
            className={classes.aboutParagTxt}
            multiline
            rows={4}
            placeholder='Please type relative answer of question of "Who are we ?" '
          ></TextField>
          <TextField
            variant='outlined'
            fullWidth
            value={parag2}
            onChange={(e) => setParag2(e.target.value)}
            error={errorParag2}
            className={classes.aboutParagTxt}
            multiline
            rows={4}
            placeholder='Please type relative answer of question of "How we do it ?" '
          ></TextField>
          <TextField
            variant='outlined'
            fullWidth
            value={parag3}
            onChange={(e) => setParag3(e.target.value)}
            error={errorParag3}
            className={classes.aboutParagTxt}
            multiline
            rows={4}
            placeholder='Please type relative answer of question of "How can I order ?" '
          ></TextField>
        </Grid>
        <Grid item md={6}>
          <Button
            type='submit'
            variant='contained'
            fullWidth
            color='primary'
            disabled={uploadedImages.length <= 0 || !heroTitle ? true : false}
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
  );

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
                  Success! The page has been updated.
                </Typography>
              </Snackbar>
            )}
            <Grid container item xs={12} className={classes.gridContainer}>
              <Grid item md={12} className={`${classes.gridFormItem}  `}>
                <Typography variant='h3' gutterBottom paragraph>
                  Edit Pages
                </Typography>
              </Grid>
              {heroSection}
              {aboutSection}

              <Grid
                item
                md={12}
                className={`${classes.gridFormItem} ${classes.heroSection} `}
              >
                <Typography variant='h4' gutterBottom paragraph>
                  Contact Section
                </Typography>
                <Grid item md={6}></Grid>

                <form onSubmit={contactSubmitHandler}>
                  <Grid item md={6} className={classes.gridFormItem}>
                    <div className={classes.contactItem}>
                      <Typography variant='h6'>Telephone Number</Typography>
                      <TextField
                        variant='outlined'
                        fullWidth
                        value={contactTel}
                        onChange={(e) => setContactTel(e.target.value)}
                        error={errorContactTel}
                        className={classes.aboutParagTxt}
                        placeholder='Please type telephone number of your shop.'
                        helperText='e.g. 491112223344'
                      ></TextField>
                    </div>

                    <div className={classes.contactItem}>
                      <Typography variant='h6'>E-Mail</Typography>
                      <TextField
                        variant='outlined'
                        fullWidth
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        error={errorContactEmail}
                        className={classes.aboutParagTxt}
                        placeholder='Please type e-mail of your shop.'
                      ></TextField>
                    </div>

                    <div className={classes.contactItem}>
                      <Typography variant='h6'>Address</Typography>
                      <TextField
                        variant='outlined'
                        fullWidth
                        value={contactAddress}
                        onChange={(e) => setContactAddress(e.target.value)}
                        error={errorContactAddress}
                        className={classes.aboutParagTxt}
                        placeholder='Please type address of your shop.'
                      ></TextField>
                    </div>
                    <div className={classes.contactItem}>
                      <Typography variant='h6'>Google Maps</Typography>
                      <TextField
                        variant='outlined'
                        fullWidth
                        value={contactMaps}
                        onChange={(e) => setContactMaps(e.target.value)}
                        className={classes.aboutParagTxt}
                        placeholder='Please type link of Google Maps of your shop.'
                      ></TextField>
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <Button
                      type='submit'
                      variant='contained'
                      fullWidth
                      color='primary'
                      disabled={
                        !contactTel || !contactEmail || !contactAddress
                          ? true
                          : false
                      }
                    >
                      update
                    </Button>
                    {(!contactTel || !contactEmail || !contactAddress) && (
                      <Typography variant='caption'>
                        *Please fill all fields.
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
