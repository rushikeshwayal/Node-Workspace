const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const Blog = require('./modules/blog')

// express app
const app = express();

// connect to the mongodb
const dbURI = 'mongodb+srv://rushikeshwayal6:Rushikeshwayal%40007@cluster0.yzfuvh9.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI)
.then((res)=>app.listen(3000))
.catch((err)=>console.log(err));
//register view engine

app.set('view engine','ejs')

//listen to express

   

// app.use((req,res,next)=>{
//     console.log('new request made');
//     console.log('hostname :', req.hostname);
//     console.log('path :', req.path);
//     console.log('method :', req.method);
//     next();
// })
//midleware static file
app.use(express.static('public'));
app.use(morgan('dev'));


app.get('/' , (req,res)=>{
    
res.redirect('/blogs');

});

// app.use((req,res,next)=>{
//     console.log('new request made');
//     next();
// });

app.get('/about' , (req,res)=>{
    res.render('about',{title:'About'});
});
//blog routes

app.get('/blogs',(req,res)=>{
    Blog.find().sort({createsAt:-1})
    .then((result)=>{
        res.render('newindex',{title:'Home',blogs:result})
    })
    .catch((err)=>console.log(err))

})

app.get('/blogs/create' , (req,res)=>{
    res.render('create',{title:'Create Blog'});
}) ;

//redirect
// app.get('./about-us',(req,res)=>{
//     res.redirect('/about.html')
// })

// 404
app.use((req,res)=>{
    res.status(404).render('404',{title:'Error'})
});

