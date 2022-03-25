const mongoose = require('mongoose');
const {addAuthor} = require('./authors');
mongoose.connect('mongodb+srv://manojkumar:manojpriya@cluster0.yecqg.mongodb.net/DailyAstro?retryWrites=true&w=majority').then((res)=>{
    console.log('Success');
}).catch((err)=>{
    console.log('Failure'+err);
});
const Ps = new mongoose.Schema({
    copyright : {
        type: String,
        required: true
    },
    date : {
        type: String,
        required: true
    },
    explanation : {
        type: String,
        required: true
    },
    hdurl : {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    url : {
        type: String,
        required: true
    },
    typeUrl :{
        type: String,
        required: true
    }
});
const Access = new mongoose.model('discoveries',Ps);
const AddPost = async(post) =>{
    const {copyright,date,explanation,hdurl,title,url,media_type} = post;
    try{
        const data = await Access.findOne({date : date});
        if(data){
            console.log('Already Exist');
            return;
        }else{
            try{
                const NewPost = new Access({
                    copyright : copyright,
                    date : date,
                    explanation : explanation,
                    hdurl : hdurl,
                    title : title,
                    url : url,
                    typeUrl : media_type
                });
                await NewPost.save();
                const getId = await Access.findOne({date : date}); 
                await addAuthor(post,getId._id);
                console.log('Success');
                return;
            }catch(err){
                console.log('Failed'+err);
                return;
            }
        }
    }catch(err){
        console.log('Failed'+err);
    }
}
const getPost = async() =>{
    try{
        const data = await Access.find();
        return data;
    }catch(err){
        console.log(err);
        return;
    }
}
const getBookByAuthor = async(id) =>{
    try{
        const data = await Access.findOne({_id : id});
        return data;
    }catch(err){
        console.log(err);
        return [];
    }
}
const getRecommBooks = async(name)=>{
    try{
        const data = await Access.find({title : {'$regex': name,'$options': 'i'}});
        console.log('Success');
        return data;
    }catch(err){
        console.log(err);
        return [];
    }
}
module.exports = {AddPost,getPost,getBookByAuthor,getRecommBooks}
