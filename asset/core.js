// vars
const fs = require('fs');
const folder = process.env.ASSETS_FOLDER;
const loadPost = require("../req/body");

// functions
function getAssets(type) {
  switch (type) {
    case "char": {
      const table = [];
      const themes = {};
      fs.readdirSync(folder + `/chars`).forEach(file => {
        if (!file.includes(".xml")) return;
        const id = file.slice(0, -4);
        const xml = fs.existsSync(folder + `/chars/${id}.xml`);
        const png = fs.existsSync(folder + `/chars/${id}.png`);
        if (xml && png) {
          const buffer = fs.readFileSync(folder = `/chars/${id}.xml`);
          const beg = buffer.indexOf(`theme_id="`) + 10;
          const end = buffer.indexOf(`"`, beg);
          const theme = buffer.subarray(beg, end).toString();
          const name = fs.readFileSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`);
          const tag = fs.readFileSync(process.env.DATABASES_FOLDER + `/tags/${id}.txt`);
          const state = fs.readFileSync(process.env.DATABASES_FOLDER + `/states/${id}.txt`);
          table.unshift({ theme: (themes[id] = theme), id: id, title: name, copyable: state, tags: tag});
        }
      });
      return table;
    }
  }
}
function getAssetXmls(data) {
  var files, xml;
  if (data.type == "char") {
    files = getAssets("char");
    const xml = `<ugc more="0">${files.map(v => `<char id="${v.id}" name="${v.title}" cc_theme_id="${v.theme}" thumbnail_url="/assets/${v.id}.png" copyable="${v.copyable}"><tags>${v.tags || ""}</tags></char>`).join('')}</ugc>`;
  } else xml = `<ugc more="0"></ugc>`;
  return Buffer.from(xml);
}
// server functions
module.exports = function (req, res) {
  switch (req.method) {
    case "POST": {
      switch (req.url) {
        case "/goapi/getUserAssetsXml/": loadPost(req, res).then(data => getAssetXmls(data)).then(b => res.end(b)).catch(e => console.log(e));
      }
    }
  }
};
      
