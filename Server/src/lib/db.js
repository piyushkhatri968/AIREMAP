import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database connected to: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error in connecting to mongodb:", error);
    process.exit(1);
  }
};
