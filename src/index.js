import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
import server from "./server";
const { PORT, DB_URI } = process.env;

const createServer = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(bodyParser.json());

  server.applyMiddleware({ app });

  // REST Endpoint
  // cloudinary config
  cloudinary.config({
    cloud_name: "dmxp0i0sh",
    api_key: "674244665279913",
    api_secret: "qyB-LXVOLK0xbl2u2DIEN3ni4Bs",
  });
  // remove image
  app.post("/removeImage", (req, res) => {
    let image_id = req.body.public_id;
    cloudinary.uploader.destroy(image_id, (error, result) => {
      if (error) return res.json({ success: false, error });
      res.send("ok");
    });
  });

  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

createServer();
