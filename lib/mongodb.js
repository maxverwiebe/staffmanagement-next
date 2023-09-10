import { MongoClient } from 'mongodb';
import { createPool } from 'generic-pool';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const factory = {
  create: async () => {
    const client = new MongoClient(uri, options);
    await client.connect();
    return client;
  },
  destroy: (client) => {
    client.close();
  },
};

const pool = createPool(factory, { max: 10 }); // You can adjust the pool size as needed

export default pool;
