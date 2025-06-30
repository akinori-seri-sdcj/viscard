import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

console.log('Loaded .env file.');
console.log('DATABASE_URL from process.env:', process.env.DATABASE_URL);

const app = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/api/cards', async (req, res) => {
  try {
    const cards = await prisma.businessCard.findMany({
      include: {
        person: {
          include: {
            company: true,
          },
        },
      },
    });
    res.json(cards);
  } catch (error) {
    console.error('Error fetching business cards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});