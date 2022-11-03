const get = require("../req/get");
const loadPost = require("../req/body");
const env = require("../env");
const fUtil = require("../fileUtil");
const dbFolder = env.DATABASES_FOLDER;
const fs = require("fs");
const formidable = require("formidable");
const path = require("path");
const home = process.env.HOME_HTML;

function toAttrString(data) {
	return typeof data == "object"
		? Object.keys(data)
				.filter((key) => data[key] !== null)
				.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
				.join("&")
		: data.replace(/"/g, '\\"');
}
function toParamString(data) {
	return Object.keys(data)
		.map((key) => `${toAttrString(data[key])}`)
		.join(" ");
}
function toObjectString(data) {
	return `${toParamString(data)}`;
}

module.exports = function (req, res, url) {
  switch (req.method) {
    case "GET": {
      switch (url.pathname) {
        case "/ajax/movieStarterCheck": {
          const mId = url.query.movieId;
          if (fUtil.exists(env.DATABASES_FOLDER + `/${mId}-starter.txt`)) {
            const id = fs.readFileSync(env.DATABASES_FOLDER + `/${mId}-starter.txt`, 'utf8');
            var name;
            switch (id) {
              case "199947": {
                name = "charming13";
                break;
              } case "199946": {
                name = "rock-contest";
                break;
              } case "199944": {
                name = "13talks";
                break;
              } case "16684": {
                name = "kitty-dreams";
                break;
              } case "16683": {
                name = "foiled";
                break;
              } case "16682": {
                name = "mystery-box";
                break;
              } case "8": {
                name = "zapped";
                break;
              } case "7": {
                name = "misfortune";
                break;
              } case "281145": {
                name = "fortune";
                break;
              } case "3": {
                name = "joyride";
                break;
              } case "281136": {
                name = "run";
                break;
              } case "281144": {
                name = "gemjest";
                break;
              } case "344704": {
                name = "surprise";
                break;
              } case "344709": {
                name = "idolhands";
                break;
              } case "344711": {
                name = "wheres13";
                break;
              } default: {
                name = fs.readFileSync(env.DATABASES_FOLDER + `/${id}-title.txt`);
                break;
              }
            }
            res.statusCode = 302;
            res.setHeader("Location", `/node?id=${mId}&name=${name}`);
            res.end();
          } else {
            res.statusCode = 302;
            res.setHeader("Location", `/node?id=${mId}`);
            res.end();
          }
          return true;
        }
        case "/accountCreated": {
          const name = url.query.username;
          if (!name) {
            res.end();
            return;
          }
          const script = `<script>function logout(name) {
            const xhttp = new XMLHttpRequest();
            xhttp.open('POST', \`/ajax/logout?accountName=\${name}\`);
            xhttp.send();
            location.href = '/';
          }</script>`;
          res.end(process.env.HOME_HTML + `<html><head><title>Hello ${name}!</title>${script}</head><body><center><p>Your Account Has Successfully Been Created. Username: ${name} | <a href="javascript:logout('${name}')">Log Out</a></p></center></body></html>`);
          return true;
        }
        case "/ajax/firstTimeCheck": {
          const begVer = "?version=";
          const ver = url.query.ver ? begVer + url.query.ver : "";
          const questionOrAnd = url.query.ver ? "&" : "?";
          const redir = fUtil.exists(env.DATABASES_FOLDER + `/tutorialCompleted.txt`) ? `/studio${ver}` : `/studio${ver}${
            questionOrAnd
          }tutorial=0`;
          res.statusCode = 302;
          res.setHeader("Location", redir);
          res.end();
          return true;
        } case "/movie/delete": {
          const id = url.query.movieId;
          const title = fs.readFileSync(env.DATABASES_FOLDER + `/${id}-title.txt`);
          fs.unlinkSync(process.env.TITLES_FOLDER + `/${title}.txt`);
          if (fUtil.exists(env.MOVIE_FOLDER + `/${id}.txt`)) fs.unlinkSync(env.MOVIE_FOLDER + `/${id}.txt`);
          if (!fUtil.exists(env.STARTER_FOLDER + `/${id}.txt`)) {
            if (fUtil.exists(env.DATABASES_FOLDER + `/${id}-title.txt`)) fs.unlinkSync(env.DATABASES_FOLDER + `/${id}-title.txt`);
            if (fUtil.exists(env.DATABASES_FOLDER + `/${id}-desc.txt`)) fs.unlinkSync(env.DATABASES_FOLDER + `/${id}-desc.txt`);
          }
          if (fUtil.exists(env.DATABASES_FOLDER + `/${id}-starter.txt`)) fs.unlinkSync(env.DATABASES_FOLDER + `/${id}-starter.txt`);
          res.statusCode = 302;
          res.setHeader("Location", "/movie");
          res.end();
          return true;
        } case "/movie/fetch": {
          // if there is no id, fetch a random movie id and use it as the only starter.
          if (!url.query.movieid) {
            const id = "1734613";
            get(`https://web.archive.org/web/20200807182213if_/http://www.zimmertwins.com/movie/fetch?movieid=${id}`).then(buff => {
              if (!fUtil.exists(process.env.STARTER_FOLDER + `/${id}.txt`)) fs.writeFileSync(process.env.STARTER_FOLDER + `/${id}.txt`, buff);
              if (!fUtil.exists(env.DATABASES_FOLDER + `/${
                id
              }-title.txt`)) fs.writeFileSync(env.DATABASES_FOLDER + `/${id}-title.txt`, 'How2 Eat Tuna');
              if (!fUtil.exists(env.DATABASES_FOLDER + `/${id}-desc.txt`)) fs.writeFileSync(env.DATABASES_FOLDER + `/${id}-desc.txt`, '');
              if (!fUtil.exists(env.DATABASES_FOLDER + `/${id}-date.txt`)) fs.writeFileSync(env.DATABASES_FOLDER + `/${
                id
              }-date.txt`, 'Jun 23 2020');
              if (!fUtil.exists(env.DATABASES_FOLDER + `/${id}-user.txt`)) fs.writeFileSync(env.DATABASES_FOLDER + `/${id}-user.txt`, '3426');
              if (!fUtil.exists(env.DATABASES_FOLDER + `/${id}-user-link.txt`)) fs.writeFileSync(env.DATABASES_FOLDER + `/${
                id
              }-user-link.txt`, 'https://www.google.com/search?q=3426');
              if (!url.query.redirect) res.end(home + buff);
              else {
                res.statusCode = 302;
                res.setHeader("Location", `/templates`);
                res.end();
              }
            }).catch(e => {
              console.log(e);
              if (url.query.redirect) {
                res.statusCode = 302;
                res.setHeader("Location", `/err?mesg=${e}`);
                res.end("ERROR OCCURED!");

              }
            });
          } else res.end(fs.readFileSync(env.MOVIE_FOLDER + `/${url.query.movieid}.txt`));
          return true;
        } case "/upload": {
          res.setHeader("Content-Type", "text/html; charset=utf8");
          var html;
          switch (url.query.type) {
            case "starter": {
              html = `<html><head><title>Import A Starter | Zimmer Twins</title></head><body>${home}<form enctype='multipart/form-data' action='/starter${
                url.path.slice(0, -13)
              }${url.query.loadMore ? `?loadMore=${url.query.loadMore}` : ""}' method='post'><input id='file' type="file" onchange="this.form.submit()" name='import' accept=".swf" /></form></body></html>`;
              break;
            }
            case "movie": {
              html = `<html><head><title>Upload A Movie | Zimmer Twins</title></head><body>${home}<form enctype='multipart/form-data' action='/movie${
                url.path.slice(0, -11)
              }' method='post'><input id='file' type="file" onchange="this.form.submit()" name='import' accept=".txt" /></form></body></html>`;
              break;
            } default: {
              html = 'Type Not Found';
              break;
            }
          }
          res.end(html);
          return true;
        } case "/err": {
          res.end(`${home}Error: ${url.query.mesg || "No Message Was Found."}`);
          return true;
        }
      }
    } case "POST": {
      switch (url.pathname) {
        case "/ajax/checkAge": {
          new formidable.IncomingForm().parse(req, (e, f) => {
            fs.writeFileSync(process.env.DATABASES_FOLDER + `/age.txt`, f.age);
            switch (f.age) {
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7":
              case "8":
              case "9":
              case "10":
              case "11":
              case "12": {
                const [ _blank, beg, end ] = url.query.redirect_to.split("/");
                res.statusCode = 302;
                res.setHeader("Location", `/agecheck${url.query.redirect_to ? `?path=${beg}/${end}` : ""}`);
                res.end();
                break;
              } default: {
                const [ _blank, beg, end ] = url.query.redirect_to.split("/");
                res.statusCode = 302;
                if (f.age) res.setHeader("Location", url.query.redirect_to);
                else {
                  res.setHeader("Location", `/agecheck${url.query.redirect_to ? `?path=${beg}/${end}` : ""}`);
                  fs.unlinkSync(process.env.DATABASES_FOLDER + `/age.txt`);
                }
                res.end();
                break;
              }
            }
          });
          return true;
        } case "/ajax/createAccont/": {
          new formidable.IncomingForm().parse(req, (e, f) => {
            fs.writeFileSync(process.env.DATABASES_FOLDER + `/name.txt`, f.username);
            res.statusCode = 302;
            if (f.username) res.setHeader("Location", `/accountCreated?username=${f.username}`);
            else {
              res.setHeader("Location", `/user/register`);
              fs.unlinkSync(process.env.DATABASES_FOLDER + `/name.txt`);
            }
            res.end();
          });
          return true;
        } case "/ajax/login": {
          new formidable.IncomingForm().parse(req, (e, f) => {
            const name = fs.readFileSync(process.env.DATABASES_FOLDER + `/temp-name.txt`);
            res.statusCode = 302;
            if (f.username == name) {
              fs.writeFileSync(process.env.DATABASES_FOLDER + `/name.txt`, f.username);
              res.setHeader("Location", `/`);
            } else res.setHeader("Location", `/user/login`);
            res.end();
          });
          return true;
        } case "/ajax/searchMovies/": {
          new formidable.IncomingForm().parse(req, (e, f) => {
            if (e) return;
            f.type ||= "all";
            const result = f.q;
            const type = f.type;
            switch (type) {
              case "contains-starters": {
                res.statusCode = 302;
                res.setHeader("Location", `/search?q=${result}&filters=${type}`);
                res.end();
                break;
              } case "all": {
                res.statusCode = 302;
                res.setHeader("Location", `/search?q=${result}`);
                res.end();
                break;
              }
            }
          });
          return true;
        } case "/movie/upload": {
          new formidable.IncomingForm().parse(req, (e, f, files) => {
            if (e) return;
            if (!files.import) return;
            const name = files.import.originalFilename;
            const path = files.import.filepath;
            const buffer = fs.readFileSync(path);
            const id = fUtil.makeid(7);
            fs.writeFileSync(process.env.MOVIE_FOLDER + `/${id}.txt`, buffer);
            fs.writeFileSync(env.DATABASES_FOLDER + `/${id}-title.txt`, name);
            fs.writeFileSync(env.DATABASES_FOLDER + `/${id}-desc.txt`, '');
            fs.writeFileSync(env.DATABASES_FOLDER + `/${id}-upload.txt`, '');
            fs.writeFileSync(env.TITLES_FOLDER + `/${name}.json`, JSON.stringify({movieid: id}));
            res.statusCode = 302;
            res.setHeader("Location", `/studio?movieId=${id}`);
            res.end();
          });
          return true;
        } case "/starter/upload": {
          new formidable.IncomingForm().parse(req, (e, f, files) => {
            if (e) return;
            if (!files.import) return;
            const file = files.import.originalFilename;
            const name = file.slice(0, -4);
            const path = files.import.filepath;
            const buffer = fs.readFileSync(path);
            const id = fUtil.makeid(7);
            fs.writeFileSync(process.env.FILES_FOLDER + `/${file}`, buffer);
            fs.writeFileSync(process.env.STARTER_FOLDER + `/${id + '.txt'}`, `This starter has been uploaded so that it can be listed on the make a movie page. if you don't want your starter to be listed, then please delete this file.`);
            fs.writeFileSync(process.env.DATABASES_FOLDER + `/${name}-title.txt`, name);
            // why
            fs.writeFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`, name);
            if (url.query.loadMore) {
              res.statusCode = 302;
              res.setHeader("Location", `/templates?uploaded=true&id=${id}`);
              res.end();
            } else {
              res.statusCode = 302;
              res.setHeader("Location", `/starters?uploaded=true&id=${id}`);
              res.end();
            }
          });
          return true;
        } case "/movie/save": {
          new formidable.IncomingForm().parse(req, (e, f) => {
            if (e) { 
              console.log(e); 
              return;
            }
            if (fs.existsSync(env.DATABASES_FOLDER + `/movieIdSection.txt`)) {
              const id = fs.readFileSync(env.DATABASES_FOLDER + `/movieIdSection.txt`, 'utf8');
              var user;
              if (fs.existsSync(env.DATABASES_FOLDER + `/${id}-user.txt`)) {
                user = fs.readFileSync(env.DATABASES_FOLDER + `/${id}-user.txt`) 
              } else if (fs.existsSync(env.DATABASES_FOLDER + `/${id}-owner.txt`)) {
                user = fs.readFileSync(env.DATABASES_FOLDER + `/${id}-owner.txt`) 
              } else user = "";
              const params = {
                meta: {
                  action: f.action,
                  thumbid: f.thumbid,
                  description: f.description,
                  username: user,
                  title: f.title,
                  moviexml: f.moviexml,
                  lang: f.lang,
                  movieid: id,
                  userid: f.userid
                }
              };
              fs.writeFileSync(env.MOVIE_FOLDER + `/${params.meta.movieid}.txt`, toObjectString(params));
              fs.writeFileSync(env.DATABASES_FOLDER + `/${params.meta.movieid}-title.txt`, params.meta.title);
              fs.writeFileSync(env.DATABASES_FOLDER + `/${params.meta.movieid}-desc.txt`, params.meta.description);
              fs.writeFileSync(env.TITLES_FOLDER + `/${params.meta.title}.txt`, params.meta.movieid);
              res.end(params.meta.movieid);
            } else if (fs.existsSync(env.DATABASES_FOLDER + `/starterIdSection.txt`)) {
              const id = fs.readFileSync(env.DATABASES_FOLDER + `/starterIdSection.txt`);
              var user;
              if (fs.existsSync(env.DATABASES_FOLDER + `/${id}-user.txt`)) {
                user = fs.readFileSync(env.DATABASES_FOLDER + `/${id}-user.txt`) 
              } else if (fs.existsSync(env.DATABASES_FOLDER + `/${id}-owner.txt`)) {
                user = fs.readFileSync(env.DATABASES_FOLDER + `/${id}-owner.txt`) 
              } else if (fs.existsSync(env.DATABASES_FOLDER + `/name.txt`)) {
                user = fs.readFileSync(env.DATABASES_FOLDER + `/name.txt`, 'utf8');
              } else user = "";
              const params = {
                meta: {
                  action: f.action,
                  thumbid: f.thumbid,
                  starterid: id,
                  description: f.description,
                  username: user,
                  title: f.title,
                  moviexml: f.moviexml,
                  lang: f.lang,
                  movieid: fUtil.makeid(7),
                  userid: f.userid
                }
              };
              if (fs.existsSync(env.DATABASES_FOLDER + `/name.txt`)) {
                fs.writeFileSync(env.DATABASES_FOLDER + `/${params.meta.movieid}-owner.txt`, params.username);
              }
              fs.writeFileSync(env.MOVIE_FOLDER + `/${params.meta.movieid}.txt`, toObjectString(params));
              fs.writeFileSync(env.DATABASES_FOLDER + `/${params.meta.movieid}-title.txt`, params.meta.title);
              fs.writeFileSync(env.DATABASES_FOLDER + `/${params.meta.movieid}-desc.txt`, params.meta.description);
              fs.writeFileSync(env.DATABASES_FOLDER + `/${params.meta.movieid}-starter.txt`, params.meta.starterid);
              fs.writeFileSync(env.TITLES_FOLDER + `/${params.meta.title}.txt`, params.meta.movieid);
              res.end(params.meta.movieid);
            } else {
              var user;
              if (fs.existsSync(env.DATABASES_FOLDER + `/name.txt`)) user = fs.readFileSync(env.DATABASES_FOLDER + `/name.txt`, 'utf8');
              const params = {
                meta: {
                  action: f.action,
                  thumbid: f.thumbid,
                  description: f.description,
                  username: user,
                  title: f.title,
                  moviexml: f.moviexml,
                  lang: f.lang,
                  movieid: fUtil.makeid(7),
                  userid: f.userid
                }
              };
              if (fs.existsSync(env.DATABASES_FOLDER + `/name.txt`)) {
                fs.writeFileSync(env.DATABASES_FOLDER + `/${params.meta.movieid}-owner.txt`, params.username);
              }
              fs.writeFileSync(env.MOVIE_FOLDER + `/${params.meta.movieid}.txt`, toObjectString(params));
              fs.writeFileSync(env.DATABASES_FOLDER + `/${params.meta.movieid}-title.txt`, params.meta.title);
              fs.writeFileSync(env.DATABASES_FOLDER + `/${params.meta.movieid}-desc.txt`, params.meta.description);
              fs.writeFileSync(env.TITLES_FOLDER + `/${params.meta.title}.txt`, params.meta.movieid);
              res.end(params.meta.movieid);
            }
          });
          return true;
        } case "/movie/fetch": {
          loadPost(req, res).then(data => {
            var buffer;
            if (!fs.existsSync(env.MOVIE_FOLDER + `/${data.movieid}.txt`)) buffer = fs.readFileSync(env.STARTER_FOLDER + `/${data.movieid}.txt`);
            else buffer = fs.readFileSync(env.MOVIE_FOLDER + `/${data.movieid}.txt`);
            res.end(buffer);
          }).catch(e => console.log(e));
          return true;
        } case "/ajax/logout": {
          const name = url.query.accountName;
          fs.unlinkSync(process.env.DATABASES_FOLDER + `/name.txt`);
          fs.writeFileSync(process.env.DATABASES_FOLDER + `/temp-name.txt`, name);
          res.end();
        }
      }
    }
  }
}
