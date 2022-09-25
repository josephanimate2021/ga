const fs = require('fs');
const fUtil = require("../fileUtil");
const get = require("../req/get");
const themes = {};

function addTheme(id, buffer) {
	const beg = buffer.indexOf(`theme_id="`) + 10;
	const end = buffer.indexOf(`"`, beg);
	const theme = buffer.subarray(beg, end).toString();
	return (themes[id] = theme);
}

module.exports = {
	getTheme(id) {
		if (themes[id]) return themes[id];
		else {
			this.loadCharacter(id).then(b => {
				return addTheme(id, b);
			}).catch(e => console.log(e));
		}
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
				if (!theme || theme == this.getTheme(id)) {
					table.unshift({id: id, theme: theme, title: meta.name, tags: meta.tag, copyable: meta.state});
				}
			}
		});
		return table;
	},
	saveMovie(data) {
		var thumb;
		const body = Buffer.from(data.body_zip, "base64");
		if (data.save_thumbnail) thumb = Buffer.from(data.thumbnail_large, "base64");
		else thumb = this.generateThumbFromUrl();
		const id = !data.movieId ? fUtil.makeid(12) : data.movieId;
		fs.writeFileSync(process.env.MOVIE_FOLDER + `/${id}.zip`, body);
		fs.writeFileSync(process.env.MOVIE_FOLDER + `/${id}.png`, thumb);
		return id;
	},
	generateThumbFromUrl() {
		return new Promise((res, rej) => {
			get('https://raw.githubusercontent.com/GoAnimate-Wrapper/GoAnimate-Thumbnails/master/thumbnails/257666432.jpg').then(v => {
				res(v);
			}).catch(e => {
				rej(e);
			});
		});
	},
	saveStarter(data) {
		const body = Buffer.from(data.body_zip, "base64");
		const thmb = Buffer.from(data.thumbnail, "base64");
		const id = !data.movieId ? fUtil.makeid(12) : data.movieId;
		fs.writeFileSync(process.env.STARTER_FOLDER + `/${id}.zip`, body);
		fs.writeFileSync(process.env.STARTER_FOLDER + `/${id}.png`, thmb);
		return id;
	},
	upload(ptype, buffer, name) {
		const id = fUtil.makeid(12);
		const dot = name.lastIndexOf('.');
		const endExt = name.substr(dot + 1);
		var ext;
		if (endExt == "PNG") ext = "png";
		else ext = endExt;
		fs.writeFileSync(process.env.PROPS_FOLDER + `/${id}.${ext}`, buffer);
		// database stuff
		var meta = {
			otherProp: "1",
			handheld: "0",
			hat: "0",
			wear: "0"
		};
		switch (ptype) {
			case "wearable": {
				meta.wear = "1";
				fs.writeFileSync(process.env.DATABASES_FOLDER + `/${id}.json`, JSON.stringify(meta));
				fs.writeFileSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`, name);
				break;
			} case "holdable": {
				meta.handheld = "1";
				fs.writeFileSync(process.env.DATABASES_FOLDER + `/${id}.json`, JSON.stringify(meta));
				fs.writeFileSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`, name);
				break;
			} case "headable": {
				meta.hat = "1";
				fs.writeFileSync(process.env.DATABASES_FOLDER + `/${id}.json`, JSON.stringify(meta));
				fs.writeFileSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`, name);
				break;
			} case "placeable": {
				fs.writeFileSync(process.env.DATABASES_FOLDER + `/${id}.json`, JSON.stringify(meta));
				fs.writeFileSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`, name);
				break;
			}
		}
	},
	getProps() {
		const table = [];
		fs.readdirSync(process.env.PROPS_FOLDER).forEach(file => {
			const id = file.slice(0, -4);
			const dot = file.lastIndexOf('.');
			const ext = file.substr(dot + 1);
			if (!fs.existsSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`)) return;
			const name = fs.readFileSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`);
			const meta = require('.' + process.env.DATABASES_FOLDER + `/${id}.json`);
			const { otherProp, handheld, hat, wear } = meta;	
			table.unshift({id: `${id}.${ext}`, title: name, holdable: handheld, wearable: wear, headable: hat, placeable: otherProp});
		});
		return table;
	},
	saveCharacter(data) {
		const id = fUtil.makeid(12);
		const thumb = Buffer.from(data.thumbdata, "base64");
		fs.writeFileSync(process.env.CHARS_FOLDER + `/${id}.xml`, data.body);
		fs.writeFileSync(process.env.CHARS_FOLDER + `/${id}.png`, thumb);
		addTheme(id, data.body);
		return id;
	},
	loadCharacter(id) {
		return new Promise((res, rej) => {
			try {
				try {
					fs.readFile(fUtil.fileString(process.env.CHARS_FOLDER + `/${id}.xml`), (e, b) => {
						if (e) rej(e);
						else res(b);
					});
				} catch (e) {
					const nId = (id.slice(0, -3) + "000").padStart(9, 0);
					const baseUrl = process.env.CHAR_BASE_URL;
					get(`${baseUrl}/${nId}.txt`).then(chars => {
						var line = chars.toString("utf8").split("\n").find(v => v.substring(0, 3) == id.slice(-3));
						if (line) res(Buffer.from(line.substring(3)));
						else rej("Error: Your Character Has Failed To Load. Please Try Again Later.");
					}).catch(e => rej(e));
				}
			} catch (e) {
				rej(e);
			}
		});
	},
	saveCharacterThumb(thumbdata, id) {
		const thumb = Buffer.from(thumbdata, "base64");
		if (fUtil.exists(process.env.CHARS_FOLDER + `/${id}.png`)) fs.writeFileSync(process.env.CHARS_FOLDER + `/${id.slice(0, -3) + "000"}.png`, thumb);
		else fs.writeFileSync(process.env.CHARS_FOLDER + `/${id}.png`, thumb);
	},
	getXmls(data) {
		return new Promise((res) => {
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
					xml = `<ugc more="0">${files.map(v => `<char id="${v.id}" name="${v.title}" cc_theme_id="${v.theme}" thumbnail_url="/assets/${v.id}.png" copyable="${v.copyable}"><tags>${v.tags || ""}</tags></char>`).join('')}</ugc>`;
					break;
				} case "prop": {
					files = this.getProps();
					xml = `<ugc more="0">${files.map(
						v => `<prop subtype="0" id="${v.id}" name="${
							v.title
						}" enable="Y" holdable="${
							v.holdable
						}" headable="${v.headable}" placeable="${
							v.placeable
						}" wearable="${v.wearable}" facing="left" width="0" height="0" asset_url="/assets/${v.id}"/>`).join('')
					}</ugc>`;
					break;
				} default: {
					xml = `<ugc more="0"></ugc>`;
					break;
				}
			}
			res(xml);
		});
	}
};
