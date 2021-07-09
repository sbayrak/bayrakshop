// @@@ MATERIAL-UI @@@
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
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
  { field: 'product_id', headerName: 'Product_ID', type: 'number', width: 150 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'description', headerName: 'Description', width: 150 },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 150,
  },
  { field: 'active', headerName: 'Active', width: 150 },
  { field: 'quantity', headerName: 'Quantity', width: 150, type: 'number' },
];

const rows = [
  {
    id: 1,
    description: 'Snow',
    name: 'Jon',
    price: 35,
    active: true,
    quantity: 1,
    product_id: 1,
  },

  {
    id: 2,
    description: 'Lannister',
    name: 'Cersei',
    price: 42,
    active: true,
    quantity: 1,
    product_id: 1,
  },
  {
    id: 3,
    description: 'Lannister',
    name: 'Jaime',
    price: 45,
    active: true,
    quantity: 1,
    product_id: 1,
  },
  {
    id: 4,
    description: 'Stark',
    name: 'Arya',
    price: 16,
    active: true,
    quantity: 1,
    product_id: 1,
  },
  {
    id: 5,
    description: 'Targaryen',
    name: 'Daenerys',
    price: null,
    active: true,
    product_id: 1,
  },
  {
    id: 6,
    description: 'Melisandre',
    name: null,
    price: 150,
    active: true,
    product_id: 1,
  },
  {
    id: 7,
    description: 'Clifford',
    name: 'Ferrara',
    price: 44,
    active: true,
    product_id: 1,
  },
  {
    id: 8,
    description: 'Frances',
    name: 'Rossini',
    price: 36,
    active: true,
    product_id: 1,
  },
  {
    id: 9,
    description: 'Roxie',
    name: 'Harvey',
    price: 65,
    active: true,
    product_id: 1,
  },
];

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    border: '1px solid red',
  },
  dataGridWrapper: {
    height: 400,
    width: '100%',
    border: '1px solid red',
    marginTop: theme.spacing(15),
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
        id: products[x]._id,
        product_id: products[x]._id,
        name: products[x].name,
        description: products[x].description,
        price: products[x].price,
        active: products[x].active,
        quantity: products[x].quantity,
        image: products[x].image,
      };
      dataGridRows.push(newProductRow);
    }
    for (let x in products[0]) {
      x === '_id' &&
        dataGridColumns.push({ field: 'id', headerName: 'ID', width: 90 });
      x === '_id' &&
        dataGridColumns.push({
          field: 'product_id',
          headerName: 'Product_ID',
          type: 'number',
          width: 150,
        });
      x === 'name' &&
        dataGridColumns.push({ field: 'name', headerName: 'Name', width: 150 });
      x === 'description' &&
        dataGridColumns.push({
          field: 'description',
          headerName: 'Description',
          width: 150,
        });
      x === 'price' &&
        dataGridColumns.push({
          field: 'price',
          headerName: 'Price',
          type: 'number',
          width: 150,
        });
      x === 'active' &&
        dataGridColumns.push({
          field: 'active',
          headerName: 'Active',
          width: 150,
        });

      x === 'quantity' &&
        dataGridColumns.push({
          field: 'quantity',
          headerName: 'Quantity',
          width: 150,
          type: 'number',
        });
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
                columns={dataGridColumns}
                pageSize={5}
                checkboxSelection
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Products;
