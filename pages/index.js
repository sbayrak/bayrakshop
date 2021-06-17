import Head from 'next/head';
import { Typography } from '@material-ui/core';
import { connectToDatabase } from '../util/mongodb';

export default function Home({ isConnected }) {
  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Typography variant='h3'>
        This is a boilerplate for NextJS, MongoDB and Material-UI stack!
      </Typography>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
