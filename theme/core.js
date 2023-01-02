const loadPost = require('../req/body');
const get = require('../req/get');
const {zipList, zipTheme} = require("../fileUtil");
const env = require("../env");
const fs = require("fs");
const JSZip = require('jszip');
const zip = new JSZip;

module.exports = function (req, res, url) {
  switch (req.method) { 
    case "GET": {
      const match = url.pathname.match(/\/go\/character_creator\/(\w+)(\/\w+)?(\/.+)?$/);
      if (!match) return;
      let [, theme, mode, id] = match;
    
      let redirect;
      switch (mode) {
        case "/copy": {
          redirect = `/charcreator?themeId=${theme}&original_asset_id=${id.substring(1)}`;
          break;
        } default: {
          var type;
          switch (theme) {
            case "family": {
              type = "&bs=adam";
              break;
            } case "anime": {
              type = "&bs=guy";
              break;
            } default: {
              type = '';
              break;
            }
          }
          redirect = `/charcreator?themeId=${theme}${type}`;
          break;
        }
      }
      res.setHeader("Location", redirect);
      res.statusCode = 302;
      res.end();
      return true;
    }
    case "POST": {
      switch (req.url) {
        case "/goapi/getThemeList/": {
          try {
            const buffer = fs.readFileSync(`./files/themes/list.xml`);
            res.setHeader("Content-Type", "application/zip");
            zip.file("themelist.xml", buffer);
            zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true }).pipe(res).on('finish', function () {
              res.end();
            });
          } catch (err) {
            console.error(err);
          }
          return true;
        } case "/goapi/getTheme/": {
          loadPost(req, res).then(data => {
            try {
              get(env.STORE_URL + `/${data.themeId}/theme.xml`).then(buffer => {
                res.setHeader("Content-Type", "application/zip");
                zip.file("theme.xml", buffer);
                zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true }).pipe(res).on('finish', function () {
                  res.end();
                });
              });
            } catch (err) {
              console.error(err);
            }
          });
          return true;
        }
      }
    }
  }
};
