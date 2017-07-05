const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const parseurl = require('parseurl');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache')
// app.set('layout', 'layout');
app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Movies = require('./movies.js');
mongoose.connect('mongodb://localhost:27017/moviecollection');

// let movies = Movie;


app.get('/', function(req, res) {
  Movies.find().then(function(movie) {

    res.render('index', {movies:movie});
  })
});

app.post('/', function(req, res) {
  const name = req.body.name;
  const length = req.body.length;
  const rating = req.body.rating;
  const movie = new Movies({name: name, length: length, rating: rating});
movie.save()
  .then(function () {
    console.log("a new movie has been added to the database")
  })
  .catch(function () {
    console.log("no movies for you D:")
  })
  res.redirect('/');
})


// var movie = new Movie({});
//
// movie.save().then(function(){
//   console.log("a new movie has been added to the database")
// }).catch(function(){
//   console.log("no movies for you D:")
// });




app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
