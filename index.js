import express from "express";
import { connectMongoDB } from "./connection.js";
import { router as urlRouter } from "./routes/url.js";

const app = express();

connectMongoDB(
  "mongodb+srv://prashantpeeyush123:faizal1bro@cluster0.9nkpwwf.mongodb.net/"
);
app.use(express.json());
app.use("/url", urlRouter);

app.listen(8000, () => console.log("Server started"));
