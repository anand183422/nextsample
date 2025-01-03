import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// Define the type for a Product
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Anand@183', // Replace with your MySQL password
      database: 'woodesy',
    });

    const [rows] = await db.query('SELECT * FROM items');
    res.status(200).json({ data: rows });
  } catch (error: any) {
    console.error('Database connection error:', error);
    res.status(500).json({
      message: 'Database connection error',
      error: error.message || 'Unknown error',
    });
  }
}
