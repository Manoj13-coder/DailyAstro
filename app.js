const express = require('express');
const path = require('path');
const {getApi} = require('./manage/apiCall');
const {getAuthor,getRecommAuthors,authorCollection} = require('./manage/authors');
const {AddPost,getPost,getBookByAuthor,getRecommBooks} = require('./manage/collection');
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
app.use(express.static(path.join(__dirname,'./styles')));
app.use(express.urlencoded());
app.get('/index',async(req,res)=>{
    return res.status(200).render('index');
})
app.get('/home',async(req,res)=>{
    const result = await getApi();
    if(!result.copyright){
        result.copyright = 'No Copyright'
    }if(!result.hdurl){
        result.hdurl = 'Not Available'
    }if(!result.title){
        result.title = 'Not Available'
    }if(!result.explanation){
        result.explanation = 'Not Available'
    }if(!result.url){
        result.url = 'Not Available'
    }if(!result.media_type){
        result.media_type = 'Not Available'
    }await AddPost(result);
    return res.status(200).render('Home',{
        copyright : result.copyright,
        date : result.date,
        description : result.explanation,
        hdurl : result.hdurl,
        title : result.title,
        url : result.url,
        typeUrl : result.media_type
    });
})
app.get('/collection',async(req,res)=>{
    const result = await getPost();
    return res.status(200).render('Books',{
        Posts : result
    });
})
app.get('/inventors',async(req,res)=>{
    const authors = await getAuthor();
    return res.status(200).render('Inventors',{
        authors : authors
    });
})
app.get('/authorrecommendations',async(req,res)=>{
    const result = await getRecommAuthors(req.query.name);
    return res.status(200).render('SearchAuthor',{
        authors : result
    });
})
app.get('/booksrec',async(req,res)=>{
    const result = await getRecommBooks(req.query.name);
    return res.status(200).render('SearchResBook',{
        Posts : result
    });
})
app.get('/getBookByAuthor',async(req,res)=>{
    const result = await getBookByAuthor(req.query.id);
    return res.status(200).render('BookIndex',{
        copyright : result.copyright,
        date : result.date,
        description : result.explanation,
        hdurl : result.hdurl,
        title : result.title,
        url : result.url,
        typeUrl : result.typeUrl
    });
})
app.get('/authorCollection',async(req,res)=>{
    const result = await authorCollection(req.query.name);
    return res.status(200).render('AuthorCollection',{
        Posts : result
    });
})
app.get('*',(req,res)=>{
    return res.status(200).render('index');
})
app.listen(PORT,()=>{
    console.log('Server Online');
})