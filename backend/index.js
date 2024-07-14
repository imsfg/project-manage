// app.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from "cors"
import userRouter from './Router/userRoutes.js';
import'dotenv/config'
import homeRouter from './Router/homeRoutes.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoDB = 'mongodb://127.0.0.1/project_management';
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use("/api/user",userRouter)
app.use("/api/v1",homeRouter)



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
