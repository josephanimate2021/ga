import https from "https";
import http from "http";
/**
 * @param {import("url").UrlWithParsedQuery} url
 * @param {CredentialRequestOptions} [options]
 * @returns {Promise<Buffer>}
 */
export default (url, options = {}) => {
	var data = [];
	return new Promise((res, rej) => {
		try {
			https.get(url, options, (o) => o.on("data", (v) => data.push(v)).on("end", () => res(Buffer.concat(data))).on("error", rej));
		} catch (e) {
			http.get(url, options, (o) => o.on("data", (v) => data.push(v)).on("end", () => res(Buffer.concat(data))).on("error", rej));
		}
	});
};
