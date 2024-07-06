const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const Blog = require('./modules/blog')

// express app
const app = express();

//midleware static file
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true }));

// connect to the mongodb
const dbURI = 'mongodb+srv://rushikeshwayal6:Rushikeshwayal%40007@cluster0.yzfuvh9.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI)
.then((res)=>app.listen(3000))
.catch((err)=>console.log(err));

//register view engine

app.set('view engine','ejs')


   



app.get('/',(rq,res)=>{
    // const blogs = [
    //     {title:'hello',snippet:'hello this is me'},
    //     {title:'hello',snippet:'hello this is me'},
    //     {title:'hello',snippet:'hello this is me'},
    // ]
    // res.render('newIndex',{title:'Home',blogs});
    res.redirect('/blogs')
})

app.get('/blogs',(req,res)=>{
Blog.find().then((blogs)=>{
    res.render('newIndex',{title:'Home',blogs})
})
})

app.post('/blogs',(req,res)=>{
// console.log(req.body);
const blog = new Blog(req.body);

blog.save().then((result)=>{
    // res.send(alert("blog submitted"));
    res.redirect('/blogs');

})
})
// route parameter
app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id);
    Blog.findById(id).then((result)=>{
        // console.log(result);
        res.render('details',{blog:result,title:'Blog Detail'})

    }).catch( (err)=>{
        console.log(err);
    }  )

})

app.get('/about' , (req,res)=>{
    res.render('about',{title:'About'});
});

//blog routes

// app.get('/blogs',(req,res)=>{
//     Blog.find().sort({createsAt:-1})
//     .then((result)=>{
//         res.render('newindex',{title:'Home',blogs:result})
//     })
//     .catch((err)=>console.log(err))

// })



app.get('/blog/add',(req,res)=>{
    const blog = new Blog({
        title:'master Blog 2',
        snippet:'master blog snippet 2',
        body:'master blog snippet body 2',
    })
    blog.save().then((result)=>res.send(result)).catch((err)=>console.log(err));
})
app.get('/allBlogs',(req,res)=>{
    
    Blog.find().then((result)=>res.send(result)).catch((err)=>console.log(err));
})
app.get('/single-id',(req,res)=>{
    Blog.findById('6688f188574dadf8bb7e8087').then((result)=>res.send(result)).catch((err)=>console.log(err))
})


app.get('/blogs/create' , (req,res)=>{
    res.render('create',{title:'Create Blog'});
}) ;

// 404
app.use((req,res)=>{
    res.status(404).render('404',{title:'Error'})
});

