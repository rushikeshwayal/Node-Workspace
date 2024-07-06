const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./modules/blog');
require('dotenv').config();

// express app
const app = express();

// middleware
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// connect to the mongodb
const dbURI = 'mongodb+srv://rushikeshwayal6:Rushikeshwayal%40007@cluster0.yzfuvh9.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI)
  .then((res) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// Redirect to /blogs
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// Route to render the blog creation page
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create Blog' });
});

// Route to get all blogs
app.get('/blogs', (req, res) => {
  Blog.find().then((blogs) => {
    res.render('newIndex', { title: 'Home', blogs });
  }).catch((err) => {
    console.log(err);
  });
});

// Route to post a new blog
app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save().then((result) => {
    res.redirect('/blogs');
  }).catch((err) => {
    console.log(err);
  });
});

// Route to get a specific blog by ID
app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((result) => {
    res.render('details', { blog: result, title: 'Blog Detail' });
  }).catch((err) => {
    console.log(err);
  });
});

// Route to delete a specific blog by ID
app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => res.json({ redirect: '/blogs' }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Route for the About page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// 404 Error handling
app.use((req, res) => {
  res.status(404).render('404', { title: 'Error' });
});
