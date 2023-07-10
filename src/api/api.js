import axios from "axios";

const basicToken = process.env.REACT_APP_FRONTEND_SECRET_KEY;
// const authTokenKey = 'afyasasa_token';

const headerToken = window.localStorage.getItem("auth_token") ?
    `Token ${window.localStorage.getItem('auth_token')}` : basicToken;

const csrf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");


/*
    * An instance of axios with a base url and headers
 */
export default axios.create({
    baseURL: process.env.REACT_APP_URL,
    timeout: 10000,
    headers: {
        "Authorization": headerToken,
        "Content-Type": 'application/json',
        'X-CSRFToken': csrf_token,
    },
})
