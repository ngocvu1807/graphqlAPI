const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  isDone: Boolean,
  name: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});
mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('Todo', todoSchema);
