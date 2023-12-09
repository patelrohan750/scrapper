require('dotenv').config();
const axios = require("axios")
const fs = require("fs");
const path = require("path");

const createPost = async (article) =>{
    const {id,question,excerpt,answer} = article;
    const html = `<h2 class="problem">Problem:</h2>${excerpt}<h2 class="solution">Solution:</h2>${answer}`;
    const imageId = await uploadFeatureImage(id,question);
    if(!imageId){
        console.log("NOT FOUND IMAGE FOR POST: ",id);
        return false;
    }

    const post = {
        title: `Javascript - ${question}`,
        content: html,
        status: 'publish',
        categories:[2],
        featured_media: imageId,
    }
    const token = await authentication();
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

const uploadFeatureImage = async (postId,title) => {
    //Find image from the thmbnail folder based on postId
    const imagePath = await findThumbnail(postId);
    if(!imagePath){
        console.log("NO IMAGE FOUND FOR POST ID: ",postId);
        return false;
    }
    
    //Upload in wordpress Media
    const imageData = fs.readFileSync(imagePath);
    const imageName = path.basename(imagePath);
    
    const token = await authentication();
    try{
        
        const response = await axios.post(
            process.env.WP_URL + '/wp/v2/media',
            imageData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Disposition': `attachment; filename=${imageName}`,

                }
            }
        )
        // Set Image Alt text
        if(response.data.id){
            await axios.post(
                process.env.WP_URL + `/wp/v2/media/${response.data.id}`,
                {
                    'alt_text': title,
                    'caption':'',
                    'description':title,
                    'title':title
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,    
                    }
                }
            )
        }
        return response.data.id;

    }catch(error){
        console.log("Error occur during upload image");
        console.log(error)
        return false;
    }
}

/**
 * Find Thumbnail based on post id.
 * @param id 
*/
const findThumbnail = (id) => {
    const thumbnailsPath = "./thumbnails";

    try {
        const files = fs.readdirSync(thumbnailsPath);        
        const foundImage = files.find(file => file == `${id}.png`);
        
        if (foundImage) {
            const imagePath = path.join(thumbnailsPath, foundImage);
            return imagePath;
        } else {
            return null;
        }
        
    } catch (error) {
        throw(error);
    }

}

const recentPosts = async (num) =>{
    try {
        const response = await axios.get(process.env.WP_URL + `/wp/v2/posts?per_page=${num}&status=publish`);
    
        const posts = response.data;
        const postURLs = posts.map((post) => post.link);
    
        return postURLs;
      } catch (error) {
        console.error('Error fetching recent posts:', error.response.data);
        return [];
      }
}

module.exports = {
    createPost,
    recentPosts,
};