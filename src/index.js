import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
import server from './server';
const { PORT, DB_URI } = process.env;

const createServer = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    console.log('DB Connected');
  } catch (error) {
    console.log(error);
  }
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(bodyParser.json());

  // Rest Endpoint Here

  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

createServer();
