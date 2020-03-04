const SERVER_URL = process.env.REACT_APP_SERVER_URL
const LOGIN_URL = SERVER_URL + '/api/auth/login'
const REGISTER_URL = SERVER_URL + '/api/auth/register'
const InstagramIdOfImagePosts_URL = 'https://graph.instagram.com/me/media?fields=id,caption&access_token=IGQVJVbXRqeWVqeU44elBsa1p5bWhYUTI1emNiREpscDh1akNmWTYtc3hobUhpMVRqdVVkYXNJYnpvbkF1YXJiYmVoalV3MUxEQXJFUy1RbzVUbVlfUmRSLWYtekkxdUpTNVJ5WGFpeERpNTZAmYjB5NQZDZD'
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
                for(var i = 0;i < data.data.length && i < 5;i++) {
                    const response_image = await fetch('https://graph.instagram.com/'+data.data[i].id+'?fields=media_url,timestamp&access_token=IGQVJVbXRqeWVqeU44elBsa1p5bWhYUTI1emNiREpscDh1akNmWTYtc3hobUhpMVRqdVVkYXNJYnpvbkF1YXJiYmVoalV3MUxEQXJFUy1RbzVUbVlfUmRSLWYtekkxdUpTNVJ5WGFpeERpNTZAmYjB5NQZDZD', {
                        method: 'get', 
                    });
                    var img_json = await response_image.json();
                    var img_url = img_json.media_url;
                    var post = {img_url:img_url,caption:data.data[i].caption};
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