import fs from 'fs';

export default class FileUtil {
	static makeid(length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( 
			var i = 0; i < length; i++ 
		) result += characters.charAt(Math.floor(Math.random() * charactersLength));
		return result;
	}
	static exists(filepath) {
		return fs.existsSync(filepath);
	}
	static getFullFile(folder, nameContains) {
		return fs.readdirSync(folder).find(i => i.endsWith(nameContains)) || nameContains;
	}
}
