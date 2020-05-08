import {getUser} from "./getUser";

export const hasRole = (role) => {
    if (role === undefined) return true
    try {
        return getUser().role === role;
    } catch (e) {
        return false;
    }
}