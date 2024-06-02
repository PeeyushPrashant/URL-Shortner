import express from "express";
import cookieParser from "cookie-parser";
import { connectMongoDB } from "./connection.js";
import { router as urlRouter } from "./routes/url.js";
import { userRouter } from "./routes/user.js";
import { Url } from "./models/url.js";
import { checkAuthentication } from "./middlewares/auth.js";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

connectMongoDB(
  "mongodb+srv://prashantpeeyush123:faizal1bro@cluster0.9nkpwwf.mongodb.net/"
);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", checkAuthentication, async (req, res) => {
  const allUrls = await Url.findOne({ userId: req.user.id });
  if (allUrls === null) return res.send([]);

  return res.send([allUrls]);
});
app.use("/url", checkAuthentication, urlRouter);
app.use("/user", userRouter);

app.listen(8000, () => console.log("Server started"));
