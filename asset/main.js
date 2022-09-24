const fs = require('fs');
const cFolder = process.env.CHARS_FOLDER;
const dbFolder = process.env.DATABASES_FOLDER;
const themes = {};

function addCharTheme(id, buffer) {
	const beg = buffer.indexOf(`theme_id="`) + 10;
	const end = buffer.indexOf(`"`, beg);
	const theme = buffer.subarray(beg, end).toString();
	return (themes[id] = theme);
}
  
module.exports = {
	getCharTheme(id) {
		if (themes[id]) return themes[id];
		const b = this.loadChars(id);
		if (b) return addCharTheme(id, b);
		else return "family";
	},
	getChars(theme) {
		const table = [];
		fs.readdirSync(cFolder).forEach(file => {
			const dot = file.lastIndexOf(".");
			const ext = file.substr(dot + 1);
			if (ext == "png") return;
			const id = file.slice(0, -4);
			if (!theme || theme != this.getCharTheme(id)) return;
			const meta = {
				name: fs.readFileSync(dbFolder + `/names/${id}.txt`),
				tag: fs.readFileSync(dbFolder + `/tags/${id}.txt`),
				state: fs.readFileSync(dbFolder + `/states/${id}.txt`)
			};
			table.unshift({id: id, theme: theme, title: meta.name, tags: meta.tag, copyable: meta.state});
		});
		return table;
	},
	getAssetXmls(data) {
		var files, xml;
		switch (data.type) {
			case "char": {
				files = this.getChars(data.themeId);
				xml = `<ugc more="0">${files.map(v => `<char id="${v.id}" name="${v.title}" cc_theme_id="${v.theme}" thumbnail_url="/assets/${v.id}.png" copyable="${v.copyable}"><tags>${v.tags || ""}</tags></char>`).join('')}</ugc>`;
				break;
			} default: {
				xml = `<ugc more="0"></ugc>`;
				break;
			}
		}
		return xml;
	}
};
