const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255
  },
  password: {
    type: String,
    required: true,
    unique: true,
    max: 500,
    min: 6
  },
  createdTodo: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
