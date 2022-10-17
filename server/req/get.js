const https = require("https");
const http = require("https");
/**
 * @param {import("url").UrlWithParsedQuery} url
 * @param {CredentialRequestOptions} [options]
 * @returns {Promise<Buffer>}
 */
module.exports = function (url, options = {}) {
	var data = [];
	return new Promise((res, rej) => {
		try {
			https.get(url, options, (o) => o.on("data", (v) => data.push(v)).on("end", () => res(Buffer.concat(data))).on("error", rej));
		} catch (e) {
			http.get(url, options, (o) => o.on("data", (v) => data.push(v)).on("end", () => res(Buffer.concat(data))).on("error", rej));
		}
	});
};
