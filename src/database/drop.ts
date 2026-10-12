import mongoose from 'mongoose';

import { connectDatabase, disconnectDatabase } from '../config/database.js';

async function dropDatabase(): Promise<void> {
  await connectDatabase();
  await mongoose.connection.dropDatabase();
}

dropDatabase()
  .catch((error: unknown) => {
    console.error('Database drop failed', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });