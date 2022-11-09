const fs = require('fs');
const fUtil = require("../fileUtil");
const get = require("../req/get");
const jszip = require('jszip');
const nodezip = require("node-zip");
const functions = require("../movie/main");
const unzipMovieForList = async (id) => {
	const fileContent = fs.readFileSync(process.env.MOVIE_FOLDER + `/${id}.zip`);
	const jszipInstance = new jszip();
	const result = await jszipInstance.loadAsync(fileContent);
	const keys = Object.keys(result.files);
	for (let key of keys) {
		const item = result.files[key];
		fs.writeFileSync(`${process.env.MOVIE_FOLDER}/xmls/${id}.xml`, Buffer.from(await item.async("arraybuffer")));
	}
};

function getTheme(id) {
	const buffer = fs.readFileSync(process.env.CHARS_FOLDER + `/${id}.xml`);
	const beg = buffer.indexOf(`theme_id="`) + 10;
	const end = buffer.indexOf(`"`, beg);
	const theme = buffer.subarray(beg, end).toString();
	return theme;
}

module.exports = {
	parse(buffer) {
		return new Promise(async (res) => res(await functions.packMovie(buffer)));
	},
	listMovies() {
		const table = [];
		fs.readdirSync(`${process.env.MOVIE_FOLDER}/xmls`).forEach(file => {
			const id = file.slice(0, -4);
			const xml = fUtil.exists(process.env.MOVIE_FOLDER + `/xmls/${id}.xml`);
			const zip = fUtil.exists(process.env.MOVIE_FOLDER + `/${id}.zip`);
			const png = fUtil.exists(process.env.MOVIE_FOLDER + `/${id}.png`);
			const buffer = fs.readFileSync(process.env.MOVIE_FOLDER + `/xmls/${id}.xml`);
			const begTitle = buffer.indexOf("<title>") + 16;
			const endTitle = buffer.indexOf("]]></title>");
			const title = buffer.slice(begTitle, endTitle).toString().trim();
			if (xml && zip && png) {
				table.unshift({html: `<center>${
					title || "Untitled Video"
				}<br><img src="/movies/${id}.png"/><br><a href="/studio?movieId=${id}">Edit</a> <a href="/movies/${id}.zip">Download</a></center><br>`});
			}
		});
		return table;
	},
	getChars(theme) {
		console.log(theme);
		const table = [];
		if (!fUtil.exists(process.env.CHARS_FOLDER + `/${theme}`)) return table;
		else fs.readdirSync(`${process.env.CHARS_FOLDER}/${theme}`).forEach(file => {
			const dot = file.lastIndexOf(".");
			const ext = file.substr(dot + 1);
			if (ext == "png") return;
			const id = file.slice(0, -4);
			const xml = fUtil.exists(`${process.env.CHARS_FOLDER}/${theme}/${id}.xml`);
			const thumb = fUtil.exists(`${process.env.CHARS_FOLDER}/${theme}/${id}.png`);
			if (xml && thumb) {
				const buffer = fs.readFileSync(`${process.env.CHARS_FOLDER}/${theme}/${id}.xml`);
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
		console.log(table);
		return table;
	},
	charHeads(theme) {
		const table = [];
		if (!fUtil.exists(process.env.ASSETS_FOLDER + `/charHeads/${theme}`)) return table;
		else {
			fs.readdirSync(process.env.ASSETS_FOLDER + `/charHeads/${theme}`).forEach(file => {
				const dot = file.lastIndexOf(".");
				const ext = file.substr(dot + 1);
				const id = file.slice(0, -4);
				const thumb = fUtil.exists(process.env.ASSETS_FOLDER + `/charHeads/${theme}/${id}.png`);
				if (thumb) table.unshift({id: id});
			});
		}
		console.log(JSON.stringify(table));
		return JSON.stringify(table);
	},
	saveMovie(data) {
		var thumb;
		const body = Buffer.from(data.body_zip, "base64");
		if (data.save_thumbnail) thumb = Buffer.from(data.thumbnail, "base64");
		else thumb = this.generateThumbFromUrl();
		const id = !data.movieId ? fUtil.makeid(12) : data.movieId;
		fs.writeFileSync(process.env.MOVIE_FOLDER + `/${id}.zip`, body);
		fs.writeFileSync(process.env.MOVIE_FOLDER + `/${id}.png`, thumb);
		unzipMovieForList(id);
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
	async saveStarter(data) {
		if (!fUtil.exists(process.env.STARTER_FOLDER + `/xmls`)) fs.mkdirSync(process.env.STARTER_FOLDER + `/xmls`);
		const body = Buffer.from(data.body_zip, "base64");
		const thmb = Buffer.from(data.thumbnail, "base64");
		const id = !data.movieId ? fUtil.makeid(12) : data.movieId;
		fs.writeFileSync(process.env.STARTER_FOLDER + `/${id}.zip`, body);
		fs.writeFileSync(process.env.STARTER_FOLDER + `/${id}.png`, thmb);
		const fileContent = fs.readFileSync(process.env.STARTER_FOLDER + `/${id}.zip`);
		const jszipInstance = new jszip();
		const result = await jszipInstance.loadAsync(fileContent);
		const keys = Object.keys(result.files);
		for (let key of keys) {
			const item = result.files[key];
			fs.writeFileSync(`${process.env.STARTER_FOLDER}/xmls/${id}.xml`, Buffer.from(await item.async("arraybuffer")));
			const buffer = fs.readFileSync(process.env.STARTER_FOLDER + `/xmls/${id}.xml`);
			const begTitle = buffer.indexOf("<title>") + 16;
			const endTitle = buffer.indexOf("]]></title>");
			const title = buffer.slice(begTitle, endTitle).toString().trim();
			const begTag = buffer.indexOf("<tag>") + 14;
			const endTag = buffer.indexOf("]]></tag>");
			const tag = buffer.slice(begTag, endTag).toString().trim();
			fs.writeFileSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`, title);
			fs.writeFileSync(process.env.DATABASES_FOLDER + `/tags/${id}.txt`, tag);
		}
		return id;
	},
	upload(ptype, buffer, name, type) {
		const id = fUtil.makeid(12);
		const dot = name.lastIndexOf('.');
		const endExt = name.substr(dot + 1);
		var ext;
		if (endExt == "PNG") ext = "png";
		else ext = endExt;
		switch(type) {
			case "prop": {
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
				return true;
			}
		}
	},
	getProps() {
		const table = [];
		fs.readdirSync(process.env.PROPS_FOLDER).forEach(file => {
			const id = file.slice(0, -4);
			if (!fs.existsSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`)) return;
			const name = fs.readFileSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`);
			const meta = require('.' + process.env.DATABASES_FOLDER + `/${id}.json`);
			const { otherProp, handheld, hat, wear } = meta;	
			table.unshift({id: file, title: name, holdable: handheld, wearable: wear, headable: hat, placeable: otherProp});
		});
		return table;
	},
	getBackgrounds() {
		const table = [];
		fs.readdirSync(process.env.BG_FOLDER).forEach(file => {
			const id = file.slice(0, -4);
			if (!fs.existsSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`)) return;
			const name = fs.readFileSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`);
			table.unshift({id: file, title: name});
		});
		return table;
	},
	getStarters() {
		const table = [];
		if (!fUtil.exists(process.env.STARTER_FOLDER + `/xmls`)) return;
		fs.readdirSync(process.env.STARTER_FOLDER + '/xmls').forEach(file => {
			const id = file.slice(0, -4);
			if (
				!fUtil.exists(
					process.env.DATABASES_FOLDER + `/names/${id}.txt`
				) && !fUtil.exists(process.env.DATABASES_FOLDER + `/names/${id}.txt`)
			) return;
			const name = fs.readFileSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`);
			const tag = fs.readFileSync(process.env.DATABASES_FOLDER + `/tags/${id}.txt`);
			table.unshift({id: id, title: name, tags: `${tag || ""}`});
		});
		return table;
	},
	saveCharacter(data) {
		const id = fUtil.makeid(12);
		const thumb = Buffer.from(data.thumbdata, "base64");
		const head = Buffer.from(data.imagedata, "base64");
		fs.writeFileSync(process.env.CHARS_FOLDER + `/${id}.xml`, data.body);
		fs.writeFileSync(process.env.CHARS_FOLDER + `/${id}.png`, thumb);
		if (!fs.existsSync(process.env.DATABASES_FOLDER + `/names`)) fs.mkdirSync(process.env.DATABASES_FOLDER + `/names`);
		if (!fs.existsSync(process.env.DATABASES_FOLDER + `/states`)) fs.mkdirSync(process.env.DATABASES_FOLDER + `/states`);
		if (!fs.existsSync(process.env.DATABASES_FOLDER + `/tags`)) fs.mkdirSync(process.env.DATABASES_FOLDER + `/tags`);
		fs.writeFileSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`, "Untitled");
		fs.writeFileSync(process.env.DATABASES_FOLDER + `/states/${id}.txt`, "Y");
		fs.writeFileSync(process.env.DATABASES_FOLDER + `/tags/${id}.txt`, "");
		const tId = getTheme(id);
		fs.writeFileSync(process.env.ASSETS_FOLDER + `/charHeads/${tId}/${id}.png`, head);
		const tidFolder = fUtil.exists(process.env.CHARS_FOLDER + `/${tId}`);
		if (!tidFolder) fs.mkdirSync(process.env.CHARS_FOLDER + `/${tId}`);
		fs.writeFileSync(process.env.CHARS_FOLDER + `/${tId}/${id}.xml`, data.body);
		fs.unlinkSync(process.env.CHARS_FOLDER + `/${id}.xml`);
		return id;
	},
	loadCharacter(id) {
		return new Promise((res, rej) => {
			if (!fUtil.exists(process.env.CHARS_FOLDER + `/${id}.xml`)) {
				const nId = (id.slice(0, -3) + "000").padStart(9, 0);
				const baseUrl = process.env.CHAR_BASE_URL;
				get(`${baseUrl}/${nId}.txt`).then(chars => {
					var line = chars.toString("utf8").split("\n").find(v => v.substring(0, 3) == id.slice(-3));
					if (line) res(Buffer.from(line.substring(3)));
					else rej("Error: A Stock Character Has Failed To Load. Please Try Again Later.");
				}).catch(e => rej(e));
			} else {
				fs.readFile(fUtil.fileString(process.env.CHARS_FOLDER + `/${id}.xml`), (e, b) => {
					if (e) rej(e);
					else res(b);
				});
			}
		});
	},
	saveCharacterThumb(thumbdata, id) {
		const thumb = Buffer.from(thumbdata, "base64");
		if (
			fUtil.exists(
				process.env.CHARS_FOLDER + `/${id}.png`
			)
		) fs.writeFileSync(process.env.CHARS_FOLDER + `/${id.slice(0, -3) + "000"}.png`, thumb);
		else fs.writeFileSync(process.env.CHARS_FOLDER + `/${id}.png`, thumb);
	},
	getFolders(type) {
		return new Promise((res) => {
			switch(type) {
				case "bg": {
					res(process.env.BG_FOLDER);
					break;
				} case "movie": {
					res(process.env.STARTER_FOLDER);
					break;
				}
			}
		});
	},
	getFiles(folder) {
		return new Promise((res) => fs.readdirSync(folder).forEach(file => res(file)));
	},
	async getXmlsForZip(data) {
		var xml, files;
		switch (data.type) {
			case "bg": {
				files = this.getBackgrounds();
				xml = `<ugc more="0">${
					files.map(v => `<background subtype="0" id="${v.id}" name="${v.title}" enable="Y"/>`).join("")
				}</ugc>`;
				break;
			} case "movie": {
				files = this.getStarters();
				xml = `<ugc more="0">${
					files.map(v => `<movie id="${v.id}" enc_asset_id="${v.id}" path="${process.env.STARTER_FOLDER}/${
						v.id
					}" numScene="1" title="${v.title}" thumbnail_url="/assets/${v.id}.png"><tags>${v.tags}</tags></movie>`).join("")
				}</ugc>`;
				break;
			} default: {
				xml = `<ugc more="0"></ugc>`;
				break;
			}
		}
		const zip = nodezip.create();
		fUtil.addToZip(zip, "desc.xml", Buffer.from(xml));
	
		this.getFolders(data.type).then(folder => {
			this.getFiles(folder).then(file => {
				const buffer = fs.readFileSync(`${folder}/${file}`);
				fUtil.addToZip(zip, `${data.type}/${file}`, buffer);
			}).catch(e => console.log(e));
		}).catch(e => console.log(e));

		return await zip.zip();
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
						} default: {
							tId = data.themeId;
							break;
						}
					}
					files = this.getChars(tId);
					xml = `<ugc more="0">${
						files.map(v => `<char id="${
							v.id
						}" name="${v.title}" cc_theme_id="${v.theme}" thumbnail_url="/assets/${v.id}.png" copyable="${
							v.copyable
						}"><tags>${v.tags || ""}</tags></char>`).join('')
					}</ugc>`;
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
