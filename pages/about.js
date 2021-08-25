import About from '../components/index/About';
import { connectToDatabase } from '../util/mongodb';

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();

  // @@@ PAGES @@@
  const getPagesFromDB = await db.collection('pages').find({}).toArray();
  const getPages = await JSON.parse(JSON.stringify(getPagesFromDB));

  const getAboutContent = getPages.filter((data) => data.section === 'about');

  return {
    props: {
      getAboutContent,
    },
    revalidate: 1,
  };
};

const AboutPage = ({ getAboutContent }) => {
  return (
    <>
      <About getAboutContent={getAboutContent}></About>
    </>
  );
};

export default AboutPage;
