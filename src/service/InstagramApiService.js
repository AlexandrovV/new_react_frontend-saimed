const SERVER_URL = process.env.REACT_APP_SERVER_URL
const LOGIN_URL = SERVER_URL + '/api/auth/login'
const REGISTER_URL = SERVER_URL + '/api/auth/register'
const token = 'IGQVJVOG1zUU1oQUczWG05dXp4dU1yaTJUYTNnQXhZAMGpVVGNySFJqNkhUMXBESVFfWnBrVkdBczZA1NjRFNWRjamJkd05jb3JHX0FaZA1RzdWlyVFFOZAFp6Rnp3VkhWWjRZAaFA0X09wTm90N2dCNXZA6NAZDZD'
const InstagramIdOfImagePosts_URL = 'https://graph.instagram.com/me/media?fields=id,caption,permalink&access_token='+token
export default class InstagramApiService {
    static async GetPosts()
    {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch( InstagramIdOfImagePosts_URL, {
                    method: 'get', 
                });
                const data = await response.json()
                var response_images = []
                for(var i = 0;i < data.data.length && i < 6;i++) {
                    const response_image = 
                    await fetch('https://graph.instagram.com/'+data.data[i].id+'?fields=media_url,timestamp&access_token='+token, {
                        method: 'get', 
                    });
                    var img_json = await response_image.json();
                    var img_url = img_json.media_url;
                    var post = {img_url:img_url,caption:data.data[i].caption,link_for_post:data.data[i].permalink};
                    if(i == 2) post.isMain = true;
                    response_images[i] = post;
                }
                if (data.error != null) {
                    reject(response_images.error.message)
                } else {
                    resolve(response_images)
                }
            } catch (err) {
                reject(err.message)
            }
        })

    }


}