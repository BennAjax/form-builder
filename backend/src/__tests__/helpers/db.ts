import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI as string;

beforeAll(async () => {
  if (mongoose.connection.readyState !== 1) await mongoose.connect(mongoUri, { dbName: 'testDB' });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

export function findAllInCollection(collection: string) {
  return mongoose.connection.collection(collection).find({}).toArray();
}

export function truncateCollection(collectionName: string) {
  return mongoose.connection.collection(collectionName).deleteMany({});
}

export async function insertInCollection(collectionName: string, documents: any[]) {
  const collection = mongoose.connection.collection(collectionName);
  return collection.insertMany(documents);
}

export function countDocumentsInCollection(collectionName: string): Promise<number> {
  return mongoose.connection.collection(collectionName).countDocuments({});
}

export function findOne<T>(collectionName: string, filter: Record<string, unknown>): Promise<unknown | T> {
  return mongoose.connection.collection(collectionName).findOne(filter);
}
