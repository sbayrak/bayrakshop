// @@@ nextjs @@@
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/client';
// @@@ nextjs @@@

// @@@ COMPONENT IMPORTS @@@
import Hero from '../components/index/Hero';
import MostSold from '../components/index/MostSold';
import InformativeBanner from '../components/layout/InformativeBanner';
import About from '../components/index/About';
import Contact from '../components/index/Contact';
import MoreProducts from '../components/index/MoreProducts';
// @@@ COMPONENT IMPORTS @@@

export default function Home() {
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
    <>
      <Hero></Hero>
      <MostSold></MostSold>
      <InformativeBanner></InformativeBanner>
      <About></About>
      <MoreProducts></MoreProducts>
      <Contact></Contact>
    </>
  );
}
