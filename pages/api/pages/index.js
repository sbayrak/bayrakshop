import { connectToDatabase } from '../../../util/mongodb';

export default async (req, res) => {
  if (req.method === 'PATCH') {
    const { db } = await connectToDatabase();

    if (req.query.section === 'hero') {
      const { image, title } = req.body;

      const findSection = await db
        .collection('pages')
        .findOne({ section: req.query.section });

      const updateHeroSection = await db.collection('pages').updateOne(
        {
          _id: findSection._id,
        },
        {
          $set: {
            image,
            title,
          },
        }
      );

      res.status(201).json(updateHeroSection);
    } else if (req.query.section === 'about') {
      const { paragraph, image } = req.body;

      const findSection = await db
        .collection('pages')
        .findOne({ section: req.query.section });

      const updateAboutSection = await db.collection('pages').updateOne(
        {
          _id: findSection._id,
        },
        {
          $set: {
            paragraph,
            image,
          },
        }
      );

      res.status(201).json(updateAboutSection);
    }
  }
};
