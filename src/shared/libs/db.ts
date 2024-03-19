import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    // check if there's an existing connection
    if (mongoose.connection.readyState !== 0) {
      // if yes, disconnect the existing connection
      await mongoose.disconnect();
    }
    await mongoose.connect(process.env.MONGO_URL || "");
  } catch (error) {
    console.log("Error", error);
  }
};
