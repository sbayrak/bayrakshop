// @@@ MATERIAL-UI @@@
import { Box, Container, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUp from '@material-ui/icons/ThumbUp';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import MostSoldCard from './MostSoldCard';
// @@@ nextjs @@@
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  MostSoldRoot: {
    marginTop: theme.spacing(15),
  },
  MostSoldTabRoot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  },
  MostSoldRootContainer: {
    padding: theme.spacing(1),
  },
  MostSoldTypo1: {
    fontWeight: theme.typography.fontWeightRegular,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3),
    borderLeft: '5px solid #5652de',
    borderRight: '5px solid #5652de',
  },
  MostSoldSeperator: {
    height: '50px',
    backgroundColor: '#5652de',
  },
}));

const MostSold = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box component='div' className={classes.MostSoldRoot}>
        <Container className={classes.MostSoldRootContainer}>
          <Typography variant='h5' className={classes.MostSoldTypo1}>
            Most Wanted Desserts
          </Typography>
          <div className={classes.MostSoldSeperator}></div>
          <div className={classes.MostSoldTabRoot}>
            <Grid container spacing={3}>
              <Grid item md={3} xs={6}>
                <MostSoldCard />
              </Grid>
              <Grid item md={3} xs={6}>
                <MostSoldCard />
              </Grid>
              <Grid item md={3} xs={6}>
                <MostSoldCard />
              </Grid>
              <Grid item md={3} xs={6}>
                <MostSoldCard />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={3} xs={6}>
                <MostSoldCard />
              </Grid>
              <Grid item md={3} xs={6}>
                <MostSoldCard />
              </Grid>
              <Grid item md={3} xs={6}>
                <MostSoldCard />
              </Grid>
              <Grid item md={3} xs={6}>
                <MostSoldCard />
              </Grid>
            </Grid>
          </div>
        </Container>
      </Box>
    </>
  );
};

export default MostSold;
