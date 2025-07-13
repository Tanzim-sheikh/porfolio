import express from 'express';
import messageRoutes from './src/API/message.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json()); // middleware to parse JSON body

app.use('/api', messageRoutes); // Now POST to /api/message will work

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
