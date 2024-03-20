const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("Cơ sở dữ liệu được kết nối thành công");
  } catch (error) {
    console.log("Lỗi cơ sở dữ liệu");
  }
};
module.exports = dbConnect;
