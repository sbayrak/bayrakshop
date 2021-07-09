// @@@ MATERIAL-UI @@@
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
} from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// @@@ MATERIAL-UI @@@

// @@@ nextjs @@@
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import DashboardLeft from '../../../components/dashboard/DashboardLeft';
import { connectToDatabase } from '../../../util/mongodb';
// @@@ nextjs @@@

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();

  const getProducts = await db.collection('products').find().toArray();
  const products = await JSON.parse(JSON.stringify(getProducts));

  return {
    props: { products },
  };
};

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'product_id',
    headerName: 'Product_ID',
    type: 'number',
    width: 120,
  },
  {
    field: 'image',
    headerName: 'Image',
    width: 150,
    renderCell: (params) => (
      <div
        style={{ height: '45px', width: '45px', backgroundColor: '#000' }}
      ></div>
    ),
  },
  { field: 'name', headerName: 'Name', width: 150 },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 120,
  },
  {
    field: 'active',
    headerName: 'Active',
    width: 120,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 120,
    type: 'number',
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 150,
    renderCell: (params) => (
      <Link href={`/dashboard/products/${params.value}`}>
        <a>
          <IconButton>
            <EditIcon color='primary' />
          </IconButton>
        </a>
      </Link>
    ),
  },
  {
    field: 'delete',
    headerName: 'Delete',
    width: 150,
    renderCell: (params) => (
      <Link href='#!'>
        <a>
          <IconButton>
            <DeleteIcon style={{ color: '#F44336' }} />
          </IconButton>
        </a>
      </Link>
    ),
  },
];

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: '100vh',
  },
  dataGridWrapper: {
    height: 450,
    width: '100%',
    border: '1px solid rgba(86,82,222,0.2)',
    borderRadius: '5px',
    boxShadow: theme.shadows[1],
    marginTop: theme.spacing(25),
  },
}));

const Products = ({ products }) => {
  const classes = useStyles();
  console.log(products);

  let dataGridRows = [];
  let dataGridColumns = [];
  if (products) {
    for (let x in products) {
      console.log(products[x]);
      const newProductRow = {
        id: x,
        image: '',
        product_id: products[x]._id,
        name: products[x].name,
        description: products[x].description,
        price: products[x].price,
        active: products[x].active,
        quantity: products[x].quantity,
        image: products[x].image,
        edit: products[x]._id,
      };
      dataGridRows.push(newProductRow);
    }
  }
  return (
    <>
      <Box component='div'>
        <Grid container>
          <Grid item md={2}>
            <DashboardLeft></DashboardLeft>
          </Grid>
          <Grid item md={9} className={classes.gridContainer}>
            <div className={classes.dataGridWrapper}>
              <DataGrid
                rows={dataGridRows}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Products;
