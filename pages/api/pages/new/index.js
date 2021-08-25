import { connectToDatabase } from '../../../../util/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    if (req.query.section === 'hero') {
      const { image, title } = req.body;

      const saveHero = await db.collection('pages').insertOne({
        section: 'hero',
        image,
        title,
      });

      const result = await saveHero;
      res.status(201).json(result.ops[0]);
    } else if (req.query.section === 'about') {
      const { paragraph, image } = req.body;

      const saveAbout = await db.collection('pages').insertOne({
        section: 'about',
        paragraph,
        image,
      });

      const result = await saveAbout;
      res.status(201).json(result.ops[0]);
    } else if (req.query.section === 'discover') {
      const { paragraph, image } = req.body;

      const saveDiscover = await db.collection('pages').insertOne({
        section: 'discover',
        paragraph,
        image,
      });

      const result = await saveDiscover;
      res.status(201).json(result.ops[0]);
    }
  }
};
