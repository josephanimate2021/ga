// vars
const loadPost = require("../req/body");
const formidable = require("formidable");
const asset = require('./main');
const fUtil = require('../fileUtil');
const fs = require('fs');
const xml = require('../xml');
const base = Buffer.alloc(1, 0);
// functions
// server functions
module.exports = function (req, res, url) {
  switch (req.method) {
    case "GET": {
      const match = req.url.match(/\/assets\/([^.]+)(?:\.(png|jpg))?$/);
      if (!match) return;
      const id = match[1];
      const ext = match[2];
      try {
        try {
          try {
            try {
              res.end(fs.readFileSync(process.env.PROPS_FOLDER + `/${id}.${ext}`));
            } catch (e) {
              res.end(fs.readFileSync(process.env.BG_FOLDER + `/${id}.${ext}`));
            }
          } catch (e) {
            res.end(fs.readFileSync(process.env.STARTER_FOLDER + `/${id}.${ext}`));
          }
        } catch (e) {
          res.end(fs.readFileSync(process.env.CHARS_FOLDER + `/${id}.${ext}`));
        }
      } catch (e) {
        res.end('404 Not Found');
      }
      return true;
    }
    case "POST": {
      switch (req.url) {
        // i don't know what to expect here. but a blank asset error will give you other options.
        case "/ajax/getCCCharacters": {
          loadPost(req, res).then(data => {
            const files = asset.charHeads(data.themeId);
            res.end(files);
          });
          return true;
        }
        case "/goapi/getUserAssets/": {
          loadPost(req, res).then(data => asset.getXmlsForZip(data)).then((buff) => {
            res.setHeader("Content-Type", "application/zip");
            res.write(base);
            res.end(buff);
          }).catch(e => console.log(e));
          return true;
        } case "/goapi/deleteAsset/": {
          loadPost(req, res).then(data => {
            try {
              fs.unlinkSync(process.env.PROPS_FOLDER + `/${data.assetId}`);
            } catch (e) {
              try {
                fs.unlinkSync(process.env.BG_FOLDER + `/${data.assetId}`);
              } catch (e) {
                console.log(e);
              }
            }
            fs.unlinkSync(process.env.DATABASES_FOLDER + `/${data.assetId.slice(0, -4)}.json`);
            fs.unlinkSync(process.env.DATABASES_FOLDER + `/names/${data.assetId.slice(0, -4)}.txt`);
          });
          return true;
        } case "/goapi/deleteUserTemplate/": {
          loadPost(req, res).then(data => {
            fs.unlinkSync(process.env.STARTER_FOLDER + `/${data.templateId}.zip`);
            fs.unlinkSync(process.env.STARTER_FOLDER + `/xmls/${data.templateId}.xml`);
            fs.unlinkSync(process.env.STARTER_FOLDER + `/${data.templateId}.png`);
            fs.unlinkSync(process.env.DATABASES_FOLDER + `/tags/${data.templateId}.txt`);
            fs.unlinkSync(process.env.DATABASES_FOLDER + `/names/${data.templateId}.txt`);
          });
          return true;
        } case "/goapi/updateSysTemplateAttributes/": {
          loadPost(req, res).then(data => {
            fs.writeFileSync(process.env.DATABASES_FOLDER + `/names/${data.movieId}.txt`, data.title);
            fs.writeFileSync(process.env.DATABASES_FOLDER + `/tags/${data.movieId}.txt`, data.tags);
          });
          return true;
        } case "/goapi/updateAsset/": {
          loadPost(req, res).then(data => {
            fs.writeFileSync(process.env.DATABASES_FOLDER + `/names/${data.assetId.slice(0, -4)}.txt`, data.title);
          });
          return true;
        } case "/goapi/getUserAssetsXml/": {
          loadPost(req, res).then(data => asset.getXmls(data).then(b => res.end(Buffer.from(b))).catch(e => console.log(e)));
          return true;
        } case "/goapi/getCCPreMadeCharacters": {
          res.end();
          return true;
        } case "/goapi/saveCCCharacter/": {
          loadPost(req, res).then(data => asset.saveCharacter(data)).then(id => res.end(0 + id)).catch(e => console.log(e));
          return true;
        } case "/goapi/getCcCharCompositionXml/": {
          loadPost(req, res).then(async data => {
            res.setHeader("Content-Type", "text/html; charset=UTF-8");
            asset.loadCharacter(data.assetId || data.original_asset_id).then((v) => {
              (res.statusCode = 200), res.end(0 + v);
            }).catch(e => { res.statusCode = 404, console.log(e), res.end(1 + Buffer.from(xml.error(e))) });
          });
        } case "/upload_prop": {
          new formidable.IncomingForm().parse(req, (e, f, files) => {
            if (!files.import) return;
            var path = files.import.path;
            var buffer = fs.readFileSync(path);
            asset.upload("placeable", buffer, files.import.name, "prop");
            fs.unlinkSync(path);
            res.end();
          });
          return true;
        } case "/upload_prop_holdable": {
          new formidable.IncomingForm().parse(req, (e, f, files) => {
            if (!files.import) return;
            var path = files.import.path;
            var buffer = fs.readFileSync(path);
            asset.upload("holdable", buffer, files.import.name, "prop");
            fs.unlinkSync(path);
            res.end();
          });
          return true;
        } case "/upload_prop_headable": {
          new formidable.IncomingForm().parse(req, (e, f, files) => {
            if (!files.import) return;
            var path = files.import.path;
            var buffer = fs.readFileSync(path);
            asset.upload("headable", buffer, files.import.name, "prop");
            fs.unlinkSync(path);
            res.end();
          });
          return true;
        } case "/upload_prop_wearable": {
          new formidable.IncomingForm().parse(req, (e, f, files) => {
            if (!files.import) return;
            var path = files.import.path;
            var buffer = fs.readFileSync(path);
            asset.upload("wearable", buffer, files.import.name, "prop");
            fs.unlinkSync(path);
            res.end();
          });
          return true;
        } case "/goapi/saveMovie/": {
          loadPost(req, res).then(data => asset.saveMovie(data)).then(id => res.end(0 + id)).catch(e => console.log(e));
          return true;
        } case "/goapi/saveTemplate/": {
          loadPost(req, res).then(data => asset.saveStarter(data)).then(id => res.end(0 + id)).catch(e => console.log(e));
          return true;
        } case "/ajax/tutorialStatus/skipped":
        case "/ajax/tutorialStatus/completed": {
          fs.writeFileSync(process.env.DATABASES_FOLDER + `/tutorialStatus.txt`, "false");
          return true;
        } case "/ajax/redirect": {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
          return true;
        }
      }
    }
  }
}
