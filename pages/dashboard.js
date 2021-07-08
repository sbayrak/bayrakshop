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
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import DashboardLeft from '../components/dashboard/DashboardLeft';
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
            <div style={{ height: '100vh' }}></div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
