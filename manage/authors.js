const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://manojkumar:manojpriya@cluster0.yecqg.mongodb.net/DailyAstro?retryWrites=true&w=majority').then((res)=>{
    console.log('Success');
}).catch((err)=>{
    console.log('Failure'+err);
});
const Ps = new mongoose.Schema({
    author : {
        type: String,
        required: true
    },
    discoveries : [
        {
            date : String,
            title : String,
            url : String,
            typeUrl : String,
            uniqueId : String
        }
    ]
});
const Access = new mongoose.model('authors',Ps);
const addAuthor = async(post,uniqueId) =>{
    console.log('called');
    const {title,copyright,date,url,media_type} = post;
    try{
        const data = await Access.findOne({author : copyright});
        if(data){
            const arr = data.discoveries;
            arr.push({date : date , title : title , url : url , typeUrl : media_type , uniqueId : uniqueId});
            try{
                await Access.updateOne({author : copyright},{ $set : {discoveries : arr} });
                console.log('Updated');
                return;
            }catch(err){
                console.log('Failed'+err);
                return;
            }
        }else{
            try{
                const NewPost = new Access({
                    author : copyright,
                    discoveries : [{date : date , title : title , url : url , typeUrl : media_type , uniqueId : uniqueId}]
                });
                await NewPost.save();
                console.log('Success');
                return;
            }catch(err){
                console.log('Failed'+err);
                return;
            }
        }
    }catch(err){
        console.log('Failed');
        return;
    }
}
const getAuthor = async()=>{
    try{
        const data = await Access.find();
        console.log('Success');
        return data;
    }catch(err){
        console.log('Failed');
        return [];
    }
}
const getRecommAuthors = async(name)=>{
    try{
        const data = await Access.find({author : {'$regex': name,'$options': 'i'}});
        console.log('Success');
        return data;
    }catch(err){
        console.log(err);
        return [];
    }
}
const authorCollection = async(name) =>{
    try{
        const data = await Access.findOne({author : name});
        console.log('Success');
        return data;
    }catch(err){
        console.log(err);
        return [];
    }
}
module.exports = {addAuthor,getAuthor,getRecommAuthors,authorCollection};
