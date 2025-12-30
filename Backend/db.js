const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

module.exports = mongoose;

// mongoose.connection.once("open", async () => {
//   const collections = await mongoose.connection.db.listCollections().toArray();
//   console.log(
//     "Collections in DB:",
//     collections.map((c) => c.name)
//   );

//   const users = await mongoose.connection.db
//     .collection("users")
//     .find({})
//     .toArray();
//   console.log("Users documents:", users);

//   const products = await mongoose.connection.db
//     .collection("products")
//     .find({})
//     .toArray();
//   console.log("Products documents:", products);

//   const vendors = await mongoose.connection.db
//     .collection("vendors")
//     .find({})
//     .toArray();
//   console.log("Vendors documents:", vendors);
// });

module.exports = mongoose;
