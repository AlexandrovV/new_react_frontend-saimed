const SERVER_URL = process.env.REACT_APP_SERVER_URL
const GET_ALL_MKB_URL = SERVER_URL + '/api/mkb/getMkbs'
const CREATE_MKB_URL = SERVER_URL + '/api/mkb/saveMkb'
const UPDATE_MKB_URL = SERVER_URL + '/api/mkb/updateMkb'
const DELETE_MKB_URL = SERVER_URL + '/api/mkb/deleteMkb'

export default class MkbService {
    static async getMkbList(code, name) {
        return new Promise(async (resolve, reject) => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(GET_ALL_MKB_URL, {
                    method: 'get',
                    headers: {
                        'Authorization': 'Bearer ' + token
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

    static async saveMkb(code, name) {
        return new Promise(async (resolve, reject) => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(CREATE_MKB_URL, {
                    method: 'post',
                    body: JSON.stringify({
                        code: code,
                        name: name
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
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

    static async updateMkb(mkbId, code, name) {
        return new Promise(async (resolve, reject) => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(UPDATE_MKB_URL + '/' + mkbId, {
                    method: 'put',
                    body: JSON.stringify({
                        code: code,
                        name: name
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
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

    static async deleteMkb(mkbId) {
        return new Promise(async (resolve, reject) => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(DELETE_MKB_URL + '/' + mkbId, {
                    method: 'delete',
                    headers: {
                        'Authorization': 'Bearer ' + token
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
}