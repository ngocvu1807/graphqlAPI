const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  isDone: Boolean,
  name: String
});
mongoose.set("useFindAndModify", false);
module.exports = mongoose.model("Todo", todoSchema);
