// @@@ MATERIAL-UI @@@
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import DashboardLeft from '../../../components/dashboard/DashboardLeft';
// @@@ nextjs @@@

const AddNewProduct = () => {
  return (
    <>
      <Box component='div'>
        <Grid container>
          <Grid item md={3}>
            <DashboardLeft></DashboardLeft>
          </Grid>
          <Grid item md={9}>
            <Typography>asd</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddNewProduct;
