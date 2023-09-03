// src/app.ts
import express, { Application } from 'express';
import CareerRoutes from './routes/CareerRoutes';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
// Access the PORT variable from the environment
const port: number = parseInt(process.env.PORT || '3000', 10);

// Middleware for parsing JSON
app.use(express.json());

// Use the example routes
app.use('/api', CareerRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
