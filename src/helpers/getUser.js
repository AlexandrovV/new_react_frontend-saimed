export const getUser = () => {
    try {
        let token = localStorage.getItem('token')
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}