const fs = require('fs');
const fUtil = require("../fileUtil");
const get = require("../req/get");
const nodezip = require('node-zip');
  
module.exports = {
	getFolders(type) {
		return new Promise((res) => {
			switch (type) {
				case "bg": {
					res(process.env.BG_FOLDER);
					break;
				} case "prop": {
					res(process.env.PROPS_FOLDER);
					break;
				} case "movie": {
					res(process.env.STARTERS_FOLDER);
					break;
				} case "sound": {
					res(process.env.SOUNDS_FOLDER);
					break;
				}
			}
		});
	},
	getIds(folder) {
		return new Promise((res) => {
			fs.readdirSync(folder).forEach(file => {
				res(file.slice(0, -4));
			});
		});
	},
	getChars(theme) {
		const table = [];
		fs.readdirSync(process.env.CHARS_FOLDER).forEach(file => {
			const dot = file.lastIndexOf(".");
			const ext = file.substr(dot + 1);
			if (ext == "png") return;
			const id = file.slice(0, -4);
			const xml = fUtil.exists(process.env.CHARS_FOLDER + `/${id}.xml`);
			const thumb = fUtil.exists(process.env.CHARS_FOLDER + `/${id}.png`);
			if (xml && thumb) {
				const buffer = fs.readFileSync(process.env.CHARS_FOLDER + `/${id}.xml`);
				const beg = buffer.indexOf(`theme_id="`) + 10;
				const end = buffer.indexOf(`"`, beg);
				theme ||= buffer.subarray(beg, end).toString();
				const meta = {
					name: fs.readFileSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`),
					tag: fs.readFileSync(process.env.DATABASES_FOLDER + `/tags/${id}.txt`),
					state: fs.readFileSync(process.env.DATABASES_FOLDER + `/states/${id}.txt`)
				};
				table.unshift({id: id, theme: theme, title: meta.name, tags: meta.tag, copyable: meta.state});
			}
		});
		return table;
	},
	saveCharacter(data) {
		const id = fUtil.makeid(12);
		const thumb = Buffer.from(data.thumbdata, "base64");
		fs.writeFileSync(process.env.CHARS_FOLDER + `/${id}.xml`, data.body);
		fs.writeFileSync(process.env.CHARS_FOLDER + `/${id}.png`, thumb);
		return id;
	},
	loadCharacter(id) {
		return new Promise((res, rej) => {
			try {
				fs.readFile(fUtil.fileString(process.env.CHARS_FOLDER + `/${id}.xml`), (e, b) => {
					if (e) rej(e);
					else res(b);
				});
			} catch (e) {
				res(this.loadCharacterFromUrl(id));
			}
		});
	},
	loadCharacterFromUrl(id) {
		const aId = id.slice(0, -3) + "000";
		get(`${process.env.CHAR_BASE_URL}/${aId}.txt`).then(chars => {
			var line = chars.toString("utf8").split("\n").find(v => v.substring(0, 3) == aId);
			if (line) return Buffer.from(line.substring(3));
		}).catch(e => console.log(e));
	},
	saveCharacterThumb(thumbdata, id) {
		const thumb = Buffer.from(thumbdata, "base64");
		if (fUtil.exists(process.env.CHARS_FOLDER + `/${id}.png`)) fs.writeFileSync(process.env.CHARS_FOLDER + `/${id.slice(0, -3) + "000"}.png`, thumb);
		else fs.writeFileSync(process.env.CHARS_FOLDER + `/${id}.png`, thumb);
	},
	async getXmls(data, makeZip = false) {
		return new Promise((res, rej) => {
			var files, xml, tId;
			switch (data.type) {
				case "char": {
					switch (data.themeId) {
						case "custom": {
							tId = "family";
							break;
						}
					}
					files = this.getChars(tId);
					xml = `<ugc more="0">${files.map(v => `<char id="${v.id}" name="${v.title}" cc_theme_id="${v.theme}" thumbnail_url="/assets/${v.id}" copyable="${v.copyable}"><tags>${v.tags || ""}</tags></char>`).join('')}</ugc>`;
					break;
				} default: {
					xml = `<ugc more="0"></ugc>`;
					break;
				}
			}
			if (makeZip) {
				const zip = nodezip.create();
				fUtil.addToZip(zip, "desc.xml", Buffer.from(xml));
				const folder = this.getFolders(data.type);
				const id = this.getIds(folder);
				const buffer = fs.readFileSync(`${folder}/${id}`);
				fUtil.addToZip(zip, `${data.type}/${id}`, buffer);
				res(await zip.zip());
			} else res(xml);
		});
	}
};
