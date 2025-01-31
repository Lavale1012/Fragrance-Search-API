import mongoose from "mongoose";

const fragranceSchema = new mongoose.Schema({
  name: String,
  brand: String,
  notes: {
    top: [String],
    middle: [String],
    base: [String],
  },
  price: Number,
  size: String,
  description: String,
  gender: String,
  concentration: String,
  season: [String],
  imagesUrl: {
    image1: String,
    image2: String,
    image3: String,
  },
  purchaseLink: String,
  favorite: Boolean,
});

const Fragrance = mongoose.model("Fragrance", fragranceSchema, "fragrance-db");
export default Fragrance;
