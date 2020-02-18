import dateFormat from 'dateformat'

const SERVER_URL = process.env.REACT_APP_SERVER_URL
const GET_MY_APPOINTMENTS_URL = SERVER_URL + '/api/patient/myAppointments'
const GET_APPOINTMENTS_BY_DATE_URL = SERVER_URL + '/api/patient/appointmentsByDate'
const MAKE_APPOINTMENT_URL = SERVER_URL + '/api/patient/makeAppointment'
const CANCEL_APPOINTMENT_URL = SERVER_URL + '/api/patient/cancelAppointment'
const GET_MEDICAL_REPORT_URL = SERVER_URL + '/api/patient/getMedicalReport'

export default class PatientService {
    static async getMyAppointments() {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(GET_MY_APPOINTMENTS_URL, {
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

    static async getAppointmentsByDate(date) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(GET_APPOINTMENTS_BY_DATE_URL, {
                    method: 'post',
                    body: JSON.stringify({date: dateFormat(date, 'yyyy-mm-dd')}),
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

    static async makeAppointment(appointmentId) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(MAKE_APPOINTMENT_URL, {
                    method: 'post',
                    body: JSON.stringify({appointmentId: appointmentId}),
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

    static async getMedicalReport(appointmentId) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(GET_MEDICAL_REPORT_URL, {
                    method: 'post',
                    body: JSON.stringify({ appointmentId }),
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

    static async cancelAppointment(appointmentId) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(CANCEL_APPOINTMENT_URL, {
                    method: 'post',
                    body: JSON.stringify({appointmentId: appointmentId}),
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
}