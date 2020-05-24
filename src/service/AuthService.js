const SERVER_URL = process.env.REACT_APP_SERVER_URL
const LOGIN_URL = SERVER_URL + '/api/auth/login'
const REGISTER_URL = SERVER_URL + '/api/auth/register'
const FORGOT_PASSWORD_URL = SERVER_URL + '/api/auth/forgot-password'
const CONFIRM_RESET_URL = SERVER_URL + '/api/auth/confirm-reset'
const RESET_PASSWORD_URL = SERVER_URL + '/api/auth/reset-password'

export default class AuthService {
    static async login(login, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(LOGIN_URL, {
                    method: 'post', 
                    body: JSON.stringify({ login:login, password:password }),
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

    static async register(email, password,passwordConfirm,fullName,phoneNumber,birthDate,iin) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(REGISTER_URL, {
                    method: 'post', 
                    body: JSON.stringify({ email, password,passwordConfirm,fullName,phoneNumber,birthDate,iin }),
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

    static async forgotPassword(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(FORGOT_PASSWORD_URL, {
                    method: 'post',
                    body: JSON.stringify({ email }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                if (data.error != null) {
                    reject(data.error.message)
                } else {
                    resolve(data.data)
                }
            } catch (err) {
                reject(err.message)
            }
        })
    }

    static async confirmReset(resetToken) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(CONFIRM_RESET_URL + '?token=' + resetToken)
                const data = await response.json()
                if (data.error != null) {
                    reject(data.error.message)
                } else {
                    resolve(data.data.email)
                }
            } catch (err) {
                reject(err.message)
            }
        })
    }

    static async resetPassword(resetToken, password, passwordConfirmation) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(RESET_PASSWORD_URL, {
                    method: 'post',
                    body: JSON.stringify({ token: resetToken, password: password, confirmPassword: passwordConfirmation }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                if (data.error != null) {
                    reject(data.error.message)
                } else {
                    resolve(data.data.email)
                }
            } catch (err) {
                reject(err.message)
            }
        })
    }
}