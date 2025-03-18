// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   apiKey: { type: String, required: true, unique: true },
// });

// // ✅ Wait until `global.userDB` is set before defining the model
// const getUserModel = () => {
//   if (!global.userDB) {
//     throw new Error(
//       "❌ `userDB` is not initialized! Ensure MongoDB is connected before importing models."
//     );
//   }
//   return global.userDB.model("User", UserSchema);
// };

// // ✅ Export a function instead of a model reference
// export default getUserModel;
