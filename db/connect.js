const mongoose = require('mongoose');
const User = require('../models/user')

const connect = (url, callback) => {
  mongoose.connect("mongodb://localhost:27017/api-standard")
  console.log('ça marche patate')
};

module.exports = { connect };
