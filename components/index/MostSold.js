// @@@ MATERIAL-UI @@@
import {
  Box,
  Container,
  Grid,
  Typography,
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
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
  root: {
    border: '1px solid red',
    marginTop: theme.spacing(15),
  },
  tabRoot: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid red',
  },
  rootContainer: {
    padding: theme.spacing(1),
  },
  Typo1: {
    border: '1px solid red',
    fontWeight: theme.typography.fontWeightRegular,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3),
    borderLeft: '5px solid #5652de',
    borderRight: '5px solid #5652de',
  },
  tabs: {
    border: '1px solid red',
    backgroundColor: '#5652de',
  },
  tab: {
    padding: theme.spacing(2),
    color: '#fff',
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
      <Box component='div' className={classes.root}>
        <Container className={classes.rootContainer}>
          <Typography variant='h5' className={classes.Typo1}>
            Most Wanted Desserts
          </Typography>
          <div className={classes.tabRoot}>
            <AppBar position='static' color='default' elevation={1}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor='secondary'
                aria-label='scrollable force tabs example'
                className={classes.tabs}
                centered
              >
                <Tab
                  label='Baklava'
                  {...a11yProps(0)}
                  className={classes.tab}
                />
                <Tab label='Lokum' {...a11yProps(1)} className={classes.tab} />
                <Tab label='Cakes' {...a11yProps(2)} className={classes.tab} />
                <Tab
                  label='Appetizers'
                  {...a11yProps(3)}
                  className={classes.tab}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
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
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container spacing={3}>
                <Grid item md={3}>
                  <MostSoldCard />
                </Grid>
                <Grid item md={3}>
                  <MostSoldCard />
                </Grid>
                <Grid item md={3}>
                  <MostSoldCard />
                </Grid>
                <Grid item md={3}>
                  <MostSoldCard />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
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
            </TabPanel>
            <TabPanel value={value} index={3}>
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
            </TabPanel>
          </div>
        </Container>
      </Box>
    </>
  );
};

export default MostSold;
