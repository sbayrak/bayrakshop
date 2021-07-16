// @@@ MATERIAL-UI @@@
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import DashboardLeft from '../../../components/dashboard/DashboardLeft';
// @@@ nextjs @@@

const Dashboard = () => {
  return (
    <>
      <Box component='div'>
        <Grid container>
          <Grid item md={3}>
            <DashboardLeft></DashboardLeft>
          </Grid>
          <Grid item md={9}>
            <div
              style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography variant='h3' gutterBottom paragraph>
                Welcome to your dashboard.
              </Typography>
              <Typography variant='h5' gutterBottom paragraph>
                Please choose any action you wish to make from navigation.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
