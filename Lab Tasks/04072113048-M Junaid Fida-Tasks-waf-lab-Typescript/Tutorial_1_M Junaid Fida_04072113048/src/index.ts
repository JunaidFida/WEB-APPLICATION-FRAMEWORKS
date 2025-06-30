import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple interface
interface Message {
  text: string;
  author: string;
}

// GET endpoint
app.get('/', (req: Request, res: Response) => {
  const message: Message = {
    text: 'Hello, TypeScript with Express!',
    author: 'Your Name',
  };
  res.json(message);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});