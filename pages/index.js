import Head from 'next/head';
import { Typography, Button } from '@material-ui/core';
import { connectToDatabase } from '../util/mongodb';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home({ isConnected }) {
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
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Typography variant='h3'>
        This is a boilerplate for NextJS, MongoDB and Material-UI stack!
      </Typography>
      <Link href='/auth/signup'>
        <a>Sign Up</a>
      </Link>
      <Button onClick={() => signIn()}>Sign In</Button>
      <br /> <br />
      {session && ` welcome! ${session.user.email}`}
      <br /> <br />
      {session && <Button onClick={customSignOut}>Sign Out</Button>}
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
