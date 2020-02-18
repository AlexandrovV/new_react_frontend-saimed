import dateFormat from 'dateformat'

const SERVER_URL = process.env.REACT_APP_SERVER_URL
const GENERATE_APPOINTMENTS_URL = SERVER_URL + '/api/doctor/generateAppointments'
const TODAY_APPOINTMENTS_URL = SERVER_URL + '/api/doctor/todayAppointments'
const CANCEL_APPOINTMENT_URL = SERVER_URL + '/api/doctor/cancelAppointment'
const APPOINTMENT_DETAILS_URL = SERVER_URL + '/api/doctor/appointmentDetails'
const ADD_MEDICAL_REPORT_URL = SERVER_URL + '/api/doctor/addMedicalReport'
const GET_MEDICAL_REPORT_URL = SERVER_URL + '/api/doctor/getMedicalReport'
const GET_MKB_URL = SERVER_URL + '/api/doctor/mkb'

export default class DoctorService {
    static async generateAppointments(fromDate, toDate) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(GENERATE_APPOINTMENTS_URL, {
                    method: 'post',
                    body: JSON.stringify({startDate: dateFormat(fromDate, 'yyyy-mm-dd'), endDate: dateFormat(toDate, 'yyyy-mm-dd')}),
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

    static async todayAppointments() {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(TODAY_APPOINTMENTS_URL, {
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

    static async addMedicalReport(medicalReport) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(ADD_MEDICAL_REPORT_URL, {
                    method: 'post',
                    body: JSON.stringify({
                        appointmentId: medicalReport.appointmentId,
                        anamnesMorbi: medicalReport.anamnesMorbi,
                        recommendations: medicalReport.recommendations,
                        mkbDiagnosisId: medicalReport.mkbDiagnosisId
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

    static async getMkbDiagnosis() {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(GET_MKB_URL, {
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
}