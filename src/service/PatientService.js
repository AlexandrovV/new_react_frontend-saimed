import dateFormat from 'dateformat'

const SERVER_URL = process.env.REACT_APP_SERVER_URL
const GET_MY_APPOINTMENTS_URL = SERVER_URL + '/api/patient/myAppointments'
const GET_APPOINTMENTS_BY_DATE_URL = SERVER_URL + '/api/patient/appointmentsByDate'
const MAKE_APPOINTMENT_URL = SERVER_URL + '/api/patient/makeAppointment'
const CANCEL_APPOINTMENT_URL = SERVER_URL + '/api/patient/cancelAppointment'
const GET_MEDICAL_REPORT_URL = SERVER_URL + '/api/patient/getMedicalReport'
const DOWNLOAD_MEDICAL_REPORT_URL = SERVER_URL + '/api/patient/downloadMedicalReport/'

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

    static async getAppointmentsByDate(date) {
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

                let link = document.createElement("a");
                // link.style = "display: none";
                // document.body.appendChild(link);
                link.href = url;
                link.download = "Медицинское_Заключение_Невропатолога.docx";
                link.click();
                URL.revokeObjectURL(url)
                // window.open(url)
                resolve()
            } catch (err) {
                reject('При скачивании медицинского заключения произошла ошибка')
            }
        })
    }
}