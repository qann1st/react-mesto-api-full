const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^(https?:\/\/)(www.)?[^\s]+(#?)$/i.test(v),
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: Object,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('cards', userSchema);
