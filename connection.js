import mongoose from "mongoose";

export const connectMongoDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connection Successfull");
  } catch (error) {
    console.log("Connection Erro", error);
  }
};
