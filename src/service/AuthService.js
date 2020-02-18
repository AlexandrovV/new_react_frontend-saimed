const SERVER_URL = process.env.REACT_APP_SERVER_URL
const LOGIN_URL = SERVER_URL + '/api/auth/login'
const REGISTER_URL = SERVER_URL + '/api/auth/register'

export default class AuthService {
    static async login(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(LOGIN_URL, {
                    method: 'post', 
                    body: JSON.stringify({ email, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(response)
                const data = await response.json()
                if (data.error != null) {
                    reject(data.error.message)
                } else {
                    resolve(data.data.token)
                }
            } catch (err) {
                reject(err.message)
            }
        })
    }

    static async register(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(REGISTER_URL, {
                    method: 'post', 
                    body: JSON.stringify({ email, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                if (data.error != null) {
                    reject(data.error.message)
                } else {
                    resolve(data.data.token)
                }
            } catch (err) {
                reject(err.message)
            }
        })
    }
}