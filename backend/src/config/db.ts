import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://himanilohani68_db_user:Test123@cluster0.tnowpgd.mongodb.net/leadzen?retryWrites=true&w=majority"
    );

    console.log("MongoDB Connected 🚀");
  } catch (error) {
    console.log("DB ERROR 👉", error);
    process.exit(1);
  }
};

export default connectDB;