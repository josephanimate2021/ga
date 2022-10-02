const loadPost = require('../req/body');
const {zipList, zipTheme} = require("../fileUtil");
const fs = require("fs");

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
          zipList().then(b => {
            if (b = "themelist.zip written.") fs.createReadStream("themelist.zip").pipe(res);
            else res.end();
          }).catch(e => console.log(e));
          return true;
        } case "/goapi/getTheme/": {
          loadPost(req, res).then(data => {
            zipTheme(data.themeId).then(b => {
              if (b = "theme.zip written.") fs.createReadStream("theme.zip").pipe(res);
              else res.end();
            }).catch(e => console.log(e));
          });
          return true;
        } case "/goapi/getMovie/": {
          try {
            console.log("b");
            res.end(fs.readFileSync(process.env.MOVIE_FOLDER + `/${url.query.movieId}.zip`));
          } catch (e) {
            console.log("e");
            res.end(fs.readFileSync(process.env.STARTER_FOLDER + `/${url.query.movieId}.zip`));
          }
          return true;
        }
      }
    }
  }
};
