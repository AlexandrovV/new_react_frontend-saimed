import dateFormat from 'dateformat'

const SERVER_URL = process.env.REACT_APP_SERVER_URL
const GENERATE_APPOINTMENTS_URL = SERVER_URL + '/api/doctor/generateAppointments'
const TODAY_APPOINTMENTS_URL = SERVER_URL + '/api/doctor/todayAppointments'
const CANCEL_APPOINTMENT_URL = SERVER_URL + '/api/doctor/cancelAppointment'
const APPOINTMENT_DETAILS_URL = SERVER_URL + '/api/doctor/appointmentDetails'
const ADD_MEDICAL_REPORT_URL = SERVER_URL + '/api/doctor/addMedicalReport'
const GET_APPOINTMENTS_BY_DATE_URL = SERVER_URL + '/api/doctor/appointmentsByDate'
const GET_MEDICAL_REPORT_URL = SERVER_URL + '/api/doctor/getMedicalReport'
const GET_USERS_URL =SERVER_URL + '/api/doctor/getUsers'
const DOWNLOAD_MEDICAL_REPORT_URL = SERVER_URL + '/api/patient/downloadMedicalReport/'
const GET_MKB_URL = SERVER_URL + '/api/doctor/mkb'
const GET_MEDICAL_USERS_URL = SERVER_URL + '/api/doctor/getUsers'
const MAKE_APPOINTMENT_USER =  SERVER_URL + '/api/doctor/assignPatient'
const BLOCK_APPOINTMENT =  SERVER_URL + '/api/doctor/blockAppointment'
const UNBLOCK_APPOINTMENT =  SERVER_URL + '/api/doctor/unblockAppointment'
const BLOCK_USER =  SERVER_URL + '/api/doctor/blockUser'
const UNBLOCK_USER =  SERVER_URL + '/api/doctor/unblockUser'

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
                if (data.error != null && response.status === 401) {
                    localStorage.removeItem('token')
                    reject(data.error.message)
                } else if (data.error != null) {
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
                if (data.error != null && response.status === 401) {
                    localStorage.removeItem('token')
                    reject(data.error.message)
                } else if (data.error != null) {
                    reject(data.error.message)
                } else {
                    resolve(data.data)
                }
            } catch (err) {
                reject(err.message)
            }
        })
    }

    static async getAppointmentsByDate(date){
        return new Promise(async (resolve, reject) => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(GET_APPOINTMENTS_BY_DATE_URL, {
                    method: 'post',
                    body: JSON.stringify({date: dateFormat(date, 'yyyy-mm-dd')}),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                const data = await response.json()
                console.log(data)

                if (data.error != null && response.status === 401) {
                    localStorage.removeItem('token')
                    reject(data.error.message)
                } else if (data.error != null) {
                    reject(data.error.message)
                } else {
                    resolve(data.data)
                }
            } catch (err) {
                console.log(err)
                reject(err.message)
            }
        })
    }

    static async GetUsers(){
        return new Promise(async (resolve, reject) => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(GET_USERS_URL, {
                    method: 'get',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                const data = await response.json()
                if (data.error != null && response.status === 401) {
                    localStorage.removeItem('token')
                    reject(data.error.message)
                } else if (data.error != null) {
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
                        patientFullName: medicalReport.patientName,
                        patientPhoneNumber: medicalReport.patientPhoneNumber,
                        patientBirthDate: medicalReport.patientBirthDate,
                        appointmentId: medicalReport.appointmentId,
                        complaints: medicalReport.complaints,
                        anamnesMorbi: medicalReport.anamnesMorbi,
                        recommendations: medicalReport.recommendations,
                        mkbDiagnosisId: medicalReport.mkbDiagnosisId,
                        ObjectiveMonitoring:medicalReport.ObjectiveMonitoring,
                        Date_next_coming:medicalReport.Date_next_coming
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                const data = await response.json()
                if (data.error != null && response.status === 401) {
                    localStorage.removeItem('token')
                    reject(data.error.message)
                } else if (data.error != null) {
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
                if (data.error != null && response.status === 401) {
                    localStorage.removeItem('token')
                    reject(data.error.message)
                } else if (data.error != null) {
                    reject(data.error.message)
                } else {
                    resolve(data.data)
                }
            } catch (err) {
                reject(err.message)
            }
        })
    }

    static async makeAppointmentByDoctor(appointmentId,userId){
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(MAKE_APPOINTMENT_USER, {
                    method: 'post',
                    body: JSON.stringify({appointmentId: appointmentId,userId:userId}),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                const data = await response.json()
                if (data.error != null && response.status === 401) {
                    localStorage.removeItem('token')
                    reject(data.error.message)
                } else if (data.error != null) {
                    reject(data.error.message)
                } else {
                    resolve(data.data)
                }
            } catch (err) {
                reject(err.message)
            }
        })
    }
    static async downloadMedicalReport(appointmentId) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(DOWNLOAD_MEDICAL_REPORT_URL + appointmentId, {
                    method: 'get',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })

                if (response.status === 401) {
                    localStorage.removeItem('token')
                    reject('Вы не авторизованы!')
                    return
                }

                const bytes = await response.arrayBuffer()
                const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
                const url = URL.createObjectURL(blob)

                let link = document.createElement("a")
                // link.style = "display: none"
                // document.body.appendChild(link)
                link.href = url
                link.download = "Медицинское_Заключение_Невропатолога.docx"
                link.click()
                URL.revokeObjectURL(url)
                // window.open(url)
                resolve()
            } catch (err) {
                reject('При скачивании медицинского заключения произошла ошибка')
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
                if (data.error != null && response.status === 401) {
                    localStorage.removeItem('token')
                    reject(data.error.message)
                } else if (data.error != null) {
                    reject(data.error.message)
                } else {
                    resolve(data.data)
                }
            } catch (err) {
                reject(err.message)
            }
        })
    }

    static async blockAppointment(appointmentId) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(BLOCK_APPOINTMENT, {
                    method: 'post',
                    body: JSON.stringify({appointmentId: appointmentId}),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                const data = await response.json()
                if (data.error != null && response.status === 401) {
                    localStorage.removeItem('token')
                    reject(data.error.message)
                } else if (data.error != null) {
                    reject(data.error.message)
                } else {
                    resolve(data.data)
                }
            } catch (err) {
                reject(err.message)
            }
        })
    }

    static async unblockAppointment(appointmentId) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(UNBLOCK_APPOINTMENT, {
                    method: 'post',
                    body: JSON.stringify({appointmentId: appointmentId}),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                const data = await response.json()
                if (data.error != null && response.status === 401) {
                    localStorage.removeItem('token')
                    reject(data.error.message)
                } else if (data.error != null) {
                    reject(data.error.message)
                } else {
                    resolve(data.data)
                }
            } catch (err) {
                reject(err.message)
            }
        })
    }

    static async blockUser(id) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(BLOCK_USER, {
                    method: 'post',
                    body: JSON.stringify({id: id}),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                const data = await response.json()
                if (data.error != null && response.status === 401) {
                    localStorage.removeItem('token')
                    reject(data.error.message)
                } else if (data.error != null) {
                    reject(data.error.message)
                } else {
                    resolve(data.data)
                }
            } catch (err) {
                reject(err.message)
            }
        })
    }

    static async unblockUser(id) {
        return new Promise(async (resolve, reject) => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(UNBLOCK_USER, {
                    method: 'post',
                    body: JSON.stringify({id: id}),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                const data = await response.json()
                if (data.error != null && response.status === 401) {
                    localStorage.removeItem('token')
                    reject(data.error.message)
                } else if (data.error != null) {
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
                if (data.error != null && response.status === 401) {
                    localStorage.removeItem('token')
                    reject(data.error.message)
                } else if (data.error != null) {
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