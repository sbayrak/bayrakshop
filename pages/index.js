// @@@ nextjs @@@
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import { connectToDatabase } from '../util/mongodb';
// @@@ nextjs @@@

// @@@ COMPONENT IMPORTS @@@
import Hero from '../components/index/Hero';
import MostSold from '../components/index/MostSold';
import InformativeBanner from '../components/layout/InformativeBanner';
import About from '../components/index/About';
import Contact from '../components/index/Contact';
import MoreProducts from '../components/index/MoreProducts';
// @@@ COMPONENT IMPORTS @@@

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();

  const getPagesFromDB = await db.collection('pages').find({}).toArray();
  const getPages = await JSON.parse(JSON.stringify(getPagesFromDB));

  const getHeroContent = getPages.filter((data) => data.section === 'hero');

  return {
    props: {
      getHeroContent,
    },
    revalidate: 1,
  };
};

export default function Home({ getHeroContent }) {
  const [session, loading] = useSession();
  const router = useRouter();

  const customSignOut = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: `${window.location.origin}/`,
    });
    router.push(data.url);
  };
  return (
    <>
      <Hero getHeroContent={getHeroContent}></Hero>
      <MostSold></MostSold>
      <InformativeBanner></InformativeBanner>
      <About></About>
      <MoreProducts></MoreProducts>
      <Contact></Contact>
    </>
  );
}
