const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackedSchema = new Schema({

  title: { type: String, required: true },
  price: {type: Number, required: true},
  image: { type: String }
});

const Tracked = mongoose.model("Tracked", trackedSchema);

module.exports = Tracked;