import { MongoClient } from 'mongodb';

const uri = 'process.env.MONGODB_URI';
const options = {};

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

export default async function handler(req, res) {
    try {
        const mongoClient = await (new MongoClient (uri, options)).connect();
        console.log('connected to mongodb');
        const db = mongoClient.db('creative-spaces');
        const collection = db.collection('group-spaces');
        const results = await collection.find({}).toArray();
        res.json(results);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}
