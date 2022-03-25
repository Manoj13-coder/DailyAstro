const fetch = require('node-fetch');
const getApi = async() =>{
   try{
        const Data = await fetch('https://api.nasa.gov/planetary/apod?api_key=x6z02urCa3x5BbxDOoW2fPJPyLbpLbPbMfjdQG1J');
        const res = await Data.json();
        return res;
   }catch(err){
       console.log('Error');
       return;
   }
}
module.exports = {getApi};