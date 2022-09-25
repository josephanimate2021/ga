// vars
const loadPost = require("../req/body");
const nodezip = require("node-zip");
const asset = require('./main');
const fUtil = require('../fileUtil');
const fs = require('fs');
const xml = require('../xml');
const base = Buffer.alloc(1, 0);
// functions
// server functions
module.exports = function (req, res) {
  switch (req.method) {
    case "GET": {
      const match = req.url.match(/\/assets\/([^/]+)$/);
      if (!match) return;
      const id = match[1];
      try {
        res.end(fs.readFileSync(process.env.CHARS_FOLDER + `/${id}.png`));
      } catch (e) {
        try {
          res.end(fs.readFileSync(process.env.BG_FOLDER + `/${id}.png`));
        } catch (e) {
          try {
            res.end(fs.readFileSync(process.env.PRPOS_FOLDER + `/${id}.png`));
          } catch (e) {
            try {
              res.end('404 not found.');
            } catch (e) {
              console.log(e);
            }
          }
        }
      }
      return true;
    }
    case "POST": {
      switch (req.url) {
        // i don't know what to expect here. but a blank asset error will give you other options.
        case "/goapi/getUserAssets/": {
          loadPost(req, res).then(data => asset.getXmls(data).then(b => res.end(Buffer.from(b))).catch(e => console.log(e)));
          return true;
        } case "/goapi/getUserAssetsXml/": {
          loadPost(req, res).then(data => asset.getXmls(data).then(b => res.end(Buffer.from(b))).catch(e => console.log(e)));
          return true;
        } case "/goapi/getCCPreMadeCharacters": {
          res.end();
          return true;
        } case "/goapi/saveCCCharacter/": {
          loadPost(req, res).then(data => asset.saveCharacter(data)).then(id => {
            const name = fUtil.exists(process.env.DATABASES_FOLDER + "/names");
            const state = fUtil.exists(process.env.DATABASES_FOLDER + "/states");
            const tag = fUtil.exists(process.env.DATABASES_FOLDER + "/tags");
            if (!name) fs.mkdirSync(process.env.DATABASES_FOLDER + `/names`);
            if (!state) fs.mkdirSync(process.env.DATABASES_FOLDER + `/states`);
            if (!tag) fs.mkdirSync(process.env.DATABASES_FOLDER + `/tags`);
            fs.writeFileSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`, "Untitled");
            fs.writeFileSync(process.env.DATABASES_FOLDER + `/states/${id}.txt`, "Y");
            fs.writeFileSync(process.env.DATABASES_FOLDER + `/tags/${id}.txt`, "");
            res.end(0 + id);
          }).catch(e => console.log(e));
          return true;
        } case "/goapi/getCcCharCompositionXml/": {
          loadPost(req, res).then(async data => {
            res.setHeader("Content-Type", "text/html; charset=UTF-8");
            asset.loadCharacter(data.assetId || data.original_asset_id).then((v) => {
              (res.statusCode = 200), res.end(0 + v);
            }).catch(e => { res.statusCode = 404, console.log(e), res.end(1 + Buffer.from(xml.error(e))) });
          });
        }
      }
    }
  }
}
