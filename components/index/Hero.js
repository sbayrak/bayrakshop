// @@@ MATERIAL-UI @@@
import { Typography, Button, Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import hero from '../../public/hero.png';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/client';
// @@@ nextjs @@@

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    border: '1px solid red',
    height: '80vh',
    marginTop: theme.spacing(15),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0),
      height: '20vh',
    },
  },
  hero: {
    position: 'relative',
  },
  imgWrapper: {
    position: 'relative',
    width: '100%',
    height: '700px',
    [theme.breakpoints.down('sm')]: {
      height: '400px',
    },
    [theme.breakpoints.down('xs')]: {
      height: '200px',
    },
  },
  img: {},
  heroTypos: {
    position: 'absolute',
    top: 250,
    right: 250,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      top: 150,
      right: 150,
    },
    [theme.breakpoints.down('xs')]: {
      top: 50,
      right: 0,
    },
  },
  Typo1: {
    fontWeight: theme.typography.fontWeightMedium,
    color: '#f6f6f6',
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
      marginBottom: theme.spacing(2),
    },
  },
  Typo2: {},
  Typo2Link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    borderRadius: '5px',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    backgroundColor: '#f6f6f6',
    color: '#5652de',
    textAlign: 'center',
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: theme.spacing(3),
    boxShadow: '1px 1px 10px 1px rgba(233,233,233,0.29)',
    transition: '0.3s ease',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#5652de',
      boxShadow: '1px 1px 11px 2px rgba(233,233,233,0.59)',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      padding: theme.spacing(0.5),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      marginBottom: theme.spacing(0),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
      padding: theme.spacing(0.5),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      marginBottom: theme.spacing(0),
    },
  },
  Typo2Icon: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
}));

const Hero = () => {
  const classes = useStyles();
  const [session, loading] = useSession();
  const router = useRouter();

  const customSignOut = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: `${window.location.origin}/`,
    });
    router.push(data.url);
  };
  console.log(session);
  return (
    <Box component='div' className={classes.root}>
      <div className={classes.hero}>
        <div className={classes.imgWrapper}>
          <Image
            src={hero}
            className={classes.img}
            alt='koslowshop'
            layout='fill'
            placeholder='blur'
            objectFit='cover'
          ></Image>
        </div>
        <div className={classes.heroTypos}>
          <Typography variant='h2' className={classes.Typo1}>
            Handmade desserts.
          </Typography>
          <Typography variant='h5' className={classes.Typo2}>
            <Link href='#!'>
              <a className={classes.Typo2Link}>
                Shop Now &nbsp;
                <ArrowForwardIosIcon className={classes.Typo2Icon} />
              </a>
            </Link>
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default Hero;
