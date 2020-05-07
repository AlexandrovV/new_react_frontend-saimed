export const hasRole = (role) => {
    if (role === undefined) return true
    try {
        let token = localStorage.getItem('token')
        return JSON.parse(atob(token.split('.')[1])).role === role;
    } catch (e) {
        return false;
    }
}