import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import guestBookRoute from "./routes/guestBook.route.js";
import guestListRoute from "./routes/guestList.route.js";

const app = express();
dotenv.config();

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to mongoDB");
  } catch (err) {
    console.log(err);
  }
};

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json({ extended: false }));
app.use(cookieParser());

app.use("/api/guestbook", guestBookRoute);
app.use("/api/guestlist", guestListRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});
