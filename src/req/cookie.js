/**
 * Cookie Manager for the Zimmertwins Recreation Project
 */
export default class CookieManager {
    constructor(data = 'HttpOnly; path=/') {
        this.cookieData = data;
    }
    set(res, data) { // sends a user cookie to the server
        try {
            const array = [];
            for (const i in data) array.push(`${i}=${
                typeof data[i] == "object" ? JSON.stringify(data[i]) : data[i]
            }; max-age=${Math.round(31619000 * 31619000)}; ${this.cookieData}`);
            res.setHeader("Set-Cookie", array);
        } catch (e) {
            throw e;
        }
    }
    get(req) { // parses a user's cookies from the server
        const data = {};
        if (req.headers.cookie) for (const i of req.headers.cookie.split("; ")) data[i.split("=")[0]] = i.split("=")[1];
        return data;
    }
    remove(res, data) { // removes a user cookie from the server.
        try {
            const array = [];
            for (const i in data) array.push(`${i}=${data[i]}; expires=Thu, 01 Jan 1970 00:00:00 GMT; ${this.cookieData}`);
            res.setHeader("Set-Cookie", array);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}