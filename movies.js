const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {type: String, default: "Top Gun"},
  length: {type: Number, default: 115},
  rating: {type: String, default: "PG"}
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
