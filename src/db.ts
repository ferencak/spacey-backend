import mongoose from "mongoose";
import { Config } from "./config";

mongoose
  .connect(Config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((_db) => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
