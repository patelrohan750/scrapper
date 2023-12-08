require('dotenv').config();
const axios = require("axios")

const createPost = async (article) =>{
    const {id,question,excerpt,answer} = article;
    const html = `<h2 class="problem">Problem:</h2>${excerpt}<h2 class="solution">Solution:</h2>${answer}`;
    const post = {
        title: question,
        content: html,
        status: 'draft',
        categories:[2]
    }
    const token = await authentication();
    console.log("TOKEN: ",token);
    try{
        
        const postResponse = await axios.post(
            process.env.WP_URL + '/wp/v2/posts',
            post,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        console.log("postResponse");
        console.log(postResponse);
        return postResponse.data;

    }catch(error){
        console.log("Error occur during publish post");
        console.log(error)
        return false;
    }
    
}
const authentication = async () =>{
    try {
        const response = await axios.post(process.env.WP_URL + '/jwt-auth/v1/token',{
            username: process.env.WP_USER,
            password: process.env.WP_PASSWORD
        })
        return response.data.token;
    } catch (error) {
        res.status(500).json({ message: err });
    }
}
module.exports = {
    createPost,
};