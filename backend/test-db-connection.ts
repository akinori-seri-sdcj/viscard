import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    await client.connect();
    console.log('Successfully connected to the database!');
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    await client.end();
  }
}

testConnection();
