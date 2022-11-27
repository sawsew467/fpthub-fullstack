const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    console.log("BD connected successfully");
  } catch (err) {
    console.log("err");
    process.exit(1);
  }
};

module.exports = { connectDB };
