import { User } from '../types';

// Global singleton for in-memory database simulation
const globalForDb = global as unknown as {
  db: {
    users: User[];
  }
};

export const db = globalForDb.db || {
  users: [],
};

if (process.env.NODE_ENV !== 'production') globalForDb.db = db;
