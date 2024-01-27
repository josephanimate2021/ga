/**
 * @summary A Request Body Parser For Zimmer Twins
 * @param {ReadableStream} req 
 * @returns {Promise}
 */
module.exports = req => {
	return new Promise((res, rej) => {
		// Variables
		var data = [];
		var pData;
		// Get all data for the pData variable
		req.on("data", v => data.push(v));
		// send the fetched data to the pData variable
		req.on("end", () => {
			try {
				pData = JSON.parse(Buffer.concat(data));
			} catch (e) {
				const params = new URLSearchParams(Buffer.concat(data).toString());
				pData = Object.fromEntries(params);
			}
			console.log(pData);
			res(pData);
		});
		// spit out an error if something goes wrong.
		req.on("error", rej);
	});
}
