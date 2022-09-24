const fs = require('fs');
const fUtil = require("../fileUtil");
  
module.exports = {
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
		fs.readFile(fUtil.fileString(process.env.CHARS_FOLDER + `/${id}.xml`), (e, b) => {
			if (e) return false;
			else return b;
		});
	},
	saveCharacterThumb(thumbdata, id) {
		const thumb = Buffer.from(thumbdata, "base64");
		if (fUtil.exists(process.env.CHARS_FOLDER + `/${id}.png`)) fs.writeFileSync(process.env.CHARS_FOLDER + `/${id.slice(0, -3) + "000"}.png`, thumb);
		else fs.writeFileSync(process.env.CHARS_FOLDER + `/${id}.png`, thumb);
	},
	getAssetXmls(data) {
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
		return xml;
	}
};
