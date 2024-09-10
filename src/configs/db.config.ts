import mongoose from "mongoose";

const databaseConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "SMS",
    });
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default databaseConfig;
