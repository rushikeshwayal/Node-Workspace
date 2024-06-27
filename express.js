const express = require('express');
const morgan = require('morgan');


// express app
const app = express();

//register view engine
app.set('view engine','ejs')

//listen to express

app.listen(3000);   

// app.use((req,res,next)=>{
//     console.log('new request made');
//     console.log('hostname :', req.hostname);
//     console.log('path :', req.path);
//     console.log('method :', req.method);
//     next();
// })

app.use(morgan('dev'));

//midleware static file
app.use(express.static('public'));
app.get('/' , (req,res)=>{
    const blogs = [
        {title:'Ram wants apple', snippet :'lorem adeir nerirt'},
        {title:'Good things around', snippet :'cozy corner café, a young woman'},
        {title:'The day wore on', snippet :'n a world where magic was thought'},
    ]
res.render('newIndex',{title:'Home',blogs})

});

// app.use((req,res,next)=>{
//     console.log('new request made');
//     next();
// });

app.get('/about' , (req,res)=>{
    res.render('about',{title:'About'});
});

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

