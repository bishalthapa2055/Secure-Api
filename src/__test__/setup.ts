import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

// jest.setTimeout(10000000000);

let mongoServer: any;

beforeAll(async () => {
  jest.setTimeout(900000000);
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
