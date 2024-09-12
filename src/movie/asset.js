import get from "../req/get.js";
import CookieManager from "../req/cookie.js";
import urlModule from 'node:url';
const {
	env
} = process;
import fUtil from "../fileUtil.js";
import fs from "fs";
import formidable, {errors as formidableErrors} from 'formidable';
import starter from './starter.js';
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
export default async (req, res, url) => {
	const cookieManager = new CookieManager();
	const currentCookie = cookieManager.get(req);
	const acc = JSON.parse(fs.readFileSync(env.DATABASES_FOLDER + "/users.json")).find(i => i.id == currentCookie.userId) || {};
	const [f, files] = await formidable().parse(req);
	console.log(f, files);
	switch (req.method) {
		case "GET": {
			switch (url.pathname) {
				case "/movie/delete": {
					const id = url.query.movieId;
					const title = fs.readFileSync(env.DATABASES_FOLDER + `/${acc.id}.${id}-title.txt`);
					fs.unlinkSync(process.env.TITLES_FOLDER + `/${acc.id}.${title}.txt`);
					if (fUtil.exists(env.MOVIE_FOLDER + `/${acc.id}.${id}.txt`)) fs.unlinkSync(env.MOVIE_FOLDER + `/${acc.id}.${id}.txt`);
					if (!fUtil.exists(env.STARTER_FOLDER + `/${id}.txt`)) {
						if (fUtil.exists(env.DATABASES_FOLDER + `/${acc.id}.${id}-title.txt`)) fs.unlinkSync(
							env.DATABASES_FOLDER + `/${acc.id}.${id}-title.txt`
						);
						if (fUtil.exists(env.DATABASES_FOLDER + `/${acc.id}.${id}-desc.txt`)) fs.unlinkSync(
							env.DATABASES_FOLDER + `/${acc.id}.${id}-desc.txt`
						);
					}
					if (fUtil.exists(env.DATABASES_FOLDER + `/${acc.id}.${id}-starter.txt`)) fs.unlinkSync(
						env.DATABASES_FOLDER + `/${acc.id}.${id}-starter.txt`
					);
					res.statusCode = 302;
					res.setHeader("Location", "/movie");
					res.end();
					break;
				} case "/movie/fetch": {
					// if there is no id, fetch a random movie id and use it as the only starter.
					if (!url.query.movieid) {
						const id = "1734613";
						get(`https://web.archive.org/web/20200807182213if_/http://www.zimmertwins.com/movie/fetch?movieid=${id}`).then(buff => {
							const files = [
								fUtil.getFullFile(env.STARTER_FOLDER, `${id}.txt`),
								fUtil.getFullFile(env.DATABASES_FOLDER, `${id}-title.txt`),
								fUtil.getFullFile(env.DATABASES_FOLDER, `${id}-desc.txt`),
								fUtil.getFullFile(env.DATABASES_FOLDER, `${id}-date.txt`),
								fUtil.getFullFile(env.DATABASES_FOLDER, `${id}-user.txt`),
								fUtil.getFullFile(env.DATABASES_FOLDER, `${id}-user-link.txt`)
							];
							if (!fUtil.exists(env.STARTER_FOLDER + `/${files[0]}`)) fs.writeFileSync(
								env.STARTER_FOLDER + `/${files[0]}`, buff
							);
							if (!fUtil.exists(env.DATABASES_FOLDER + `/${files[1]}`)) fs.writeFileSync(
								env.DATABASES_FOLDER + `/${files[1]}`, 'How2 Eat Tuna'
							);
							if (!fUtil.exists(env.DATABASES_FOLDER + `/${files[2]}`)) fs.writeFileSync(
								env.DATABASES_FOLDER + `/${files[2]}`, ''
							);
							if (!fUtil.exists(env.DATABASES_FOLDER + `/${files[3]}`)) fs.writeFileSync(
								env.DATABASES_FOLDER + `/${files[3]}`, 'Jun 23 2020'
							);
							if (!fUtil.exists(env.DATABASES_FOLDER + `/${files[4]}`)) fs.writeFileSync(
								env.DATABASES_FOLDER + `/${files[4]}`, '3426'
							);
							if (!fUtil.exists(env.DATABASES_FOLDER + `/${files[5]}`)) fs.writeFileSync(
								env.DATABASES_FOLDER + `/${files[5]}`, 'https://www.google.com/search?q=3426'
							);
							if (!url.query.redirect) {
								res.statusCode = 200;
								res.end(home + buff);
							} else {
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
							} else {
								res.statusCode = 404;
								res.end(home + "404 Not Found");
							}
						});
					} else {
						const file = fUtil.getFullFile(env.MOVIE_FOLDER, `${url.query.movieid}.txt`);
						if (fs.existsSync(env.MOVIE_FOLDER + `/${file}`)) {
							res.statusCode = 200;
							res.end(fs.readFileSync(env.MOVIE_FOLDER + `/${file}`));
						} else {
							res.statusCode = 404;
							res.end(home + "404 Not Found");
						}
					}
					break;
				} case "/upload": {
					res.setHeader("Content-Type", "text/html; charset=utf8");
					var html;
					switch (url.query.type) {
						case "starter": {
							html = `<html>
								<head>
									<title>Import A Starter | Zimmer Twins</title>
								</head>
								<body>
									${home}
									<form enctype='multipart/form-data' action='/starter${url.path.slice(0, -13)}${
										url.query.loadMore ? `?loadMore=${url.query.loadMore}` : ""
									}' method='post'>
										<input id='file' type="file" onchange="this.form.submit()" name='import' accept=".swf" />
									</form>
								</body>
							</html>`;
							break;
						} case "movie": {
							html = `<html>
								<head>
									<title>Upload A Movie | Zimmer Twins</title>
								</head>
								<body>
									${home}
									<form enctype='multipart/form-data' action='/movie${url.path.slice(0, -11)}' method='post'>
										<input id='file' type="file" onchange="this.form.submit()" name='import' accept=".txt" />
									</form>
								</body>
							</html>`;
							break;
						} default: {
							res.statusCode = 404;
							html = 'Type Not Found';
							break;
						}
					}
					res.end(html);
					break;
				} case "/err": {
					res.end(`${home}Error: ${url.query.mesg || "No Message Was Found."}`);
					break;
				}
			}
		} case "POST": {
			switch (url.pathname) {
				case "/ajax/agecheck": {
					function calculateAge(dob) {
						const today = new Date();
						const birthDate = new Date(dob);
						let age = today.getFullYear() - birthDate.getFullYear();
						const monthDifference = today.getMonth() - birthDate.getMonth();
					
						// Adjust age if the birth month hasn't occurred yet this year
						if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
							age--;
						}
					
						return age;
					}
					const json = {
						birth: {
							age: calculateAge(`${f.birth_year[0]}-${f.birth_month[0]}-${f.birth_day[0]}`)
						}
					};
					for (const i in f) {
						if (!i.startsWith("birth") || f[i].length != 1) continue;
						json.birth[i.substr(6)] = f[i][0];
					}
					console.log(json);
					cookieManager.set(res, json);
					res.statusCode = 302;
					res.setHeader("Location", json.birth.age < 13 ? '/agecheck' : '/user/register');
					res.end();
					break;
				} case "/ajax/user/register": {
					const array = JSON.parse(fs.readFileSync(env.DATABASES_FOLDER + "/users.json"));
					const json = currentCookie || {};
					json.id = fUtil.makeid(7);
					for (const i in f) {
						if (f[i].length != 1) continue;
						switch (i) {
							case "op": continue;
							case "password": {
								json.password = Buffer.from(f.password[0]).toString("base64");
								break;
							} default: json[i] = f[i][0];
						}
					}
					array.unshift(json);
					fs.writeFileSync(env.DATABASES_FOLDER + "/users.json", JSON.stringify(array, null, "\t"));
					cookieManager.set(res, {
						userId: json.id
					});
					res.statusCode = 302;
					res.setHeader("Location", "/");
					res.end();
					break;
				} case "/ajax/user/login": {
					let location = f.destination ? f.destination[0] : "/";
					const parsedUrl = urlModule.parse(req.headers.referer, true);
					const user = JSON.parse(fs.readFileSync(env.DATABASES_FOLDER + "/users.json")).find(i => i.username == f.username[0]);
					if (!user) location = parsedUrl.pathname + `?show_error_message=Please enter in a valid username`;
					else {
						if (
							f.pass[0] != Buffer.from(user.password, "base64")
						) location = parsedUrl.pathname + `?show_error_message=Please enter in a valid password`;
						else cookieManager.set(res, {
							birth: user.birth,
							userId: user.id
						});
					}
					res.statusCode = 302;
					res.setHeader("Location", location);
					res.end();
					break;
				} case "/ajax/searchMovies/": {
					res.statusCode = 302;
					res.setHeader("Location", `/search?q=${f.q[0]}${f.type ? `&filters=${f.type[0]}` : ''}`);
					res.end();
					break;
				} case "/movie/upload": {
					if (!files.import) return;
					const name = files.import.originalFilename;
					const path = files.import.filepath;
					const buffer = fs.readFileSync(path);
					const id = fUtil.makeid(7);
					fs.writeFileSync(env.MOVIE_FOLDER + `/${acc.id}.${id}.txt`, buffer);
					fs.writeFileSync(env.DATABASES_FOLDER + `/${acc.id}.${id}-title.txt`, name);
					fs.writeFileSync(env.DATABASES_FOLDER + `/${acc.id}.${id}-desc.txt`, '');
					fs.writeFileSync(env.DATABASES_FOLDER + `/${acc.id}.${id}-upload.txt`, '');
					fs.writeFileSync(env.TITLES_FOLDER + `/${acc.id}.${name}.json`, JSON.stringify({movieid: id}, null, "\t"));
					res.statusCode = 302;
					res.setHeader("Location", `/studio?movieId=${id}`);
					res.end();
					break;
				} case "/starter/upload": {
					if (!files.import) return;
					const file = files.import.originalFilename;
					const name = file.slice(0, -4);
					const path = files.import.filepath;
					const buffer = fs.readFileSync(path);
					const id = fUtil.makeid(7);
					fs.writeFileSync(env.FILES_FOLDER + `/${acc.id}.${file}`, buffer);
					fs.writeFileSync(env.STARTER_FOLDER + `/${acc.id}.${id + '.txt'}`, `This starter has been uploaded so that it can be 
					listed on the make a movie page. if you don't want your starter to be listed, then please delete this file.`);
					fs.writeFileSync(env.DATABASES_FOLDER + `/${acc.id}.${name}-title.txt`, name);
					// why
					fs.writeFileSync(env.DATABASES_FOLDER + `/${acc.id}.${id}-title.txt`, name);
					res.statusCode = 302;
					if (url.query.loadMore) res.setHeader("Location", `/templates?uploaded=true&id=${id}`);
					else res.setHeader("Location", `/starters?uploaded=true&id=${id}`);
					res.end();
					break;
				} case "/movie/save": {
					if (acc.id) {
						const meta = {};
						for (const i in f) {
							if (f[i].length != 1) continue;
							meta[i] = f[i][0]
						}
						function saveMovie(id = fUtil.makeid(7)) {
							if (fs.existsSync(env.DATABASES_FOLDER + `/${acc.id}.${id}-user.txt`)) {
								meta.username = fs.readFileSync(env.DATABASES_FOLDER + `/${acc.id}.${id}-user.txt`);
							} else if (fs.existsSync(env.DATABASES_FOLDER + `/${acc.id}.${id}-owner.txt`)) {
								meta.username = fs.readFileSync(env.DATABASES_FOLDER + `/${acc.id}.${id}-owner.txt`) 
							} else meta.username = acc.username;
							meta.movieid = id;
							console.log(meta);
							fs.writeFileSync(env.DATABASES_FOLDER + `/${acc.id}.${meta.movieid}-owner.txt`, acc.username);
							fs.writeFileSync(env.MOVIE_FOLDER + `/${acc.id}.${meta.movieid}.txt`, new URLSearchParams(meta).toString());
							fs.writeFileSync(env.DATABASES_FOLDER + `/${acc.id}.${meta.movieid}-title.txt`, meta.title);
							fs.writeFileSync(env.DATABASES_FOLDER + `/${acc.id}.${meta.movieid}-desc.txt`, meta.description);
							fs.writeFileSync(env.TITLES_FOLDER + `/${acc.id}.${meta.title}.txt`, meta.movieid);
							res.end(new URLSearchParams({
								watchurl: `/node?id=${meta.movieid}`
							}).toString());
						}
						if (fs.existsSync(env.DATABASES_FOLDER + `/${acc.id}.movieIdSection.txt`)) {
							saveMovie(fs.readFileSync(env.DATABASES_FOLDER + `/${acc.id}.movieIdSection.txt`, 'utf8'));
						} else if (fs.existsSync(env.DATABASES_FOLDER + `/${acc.id}.starterIdSection.txt`)) {
							const id = fs.readFileSync(env.DATABASES_FOLDER + `/${acc.id}.starterIdSection.txt`);
							meta.starterid = id.toString();
							const movieId = fUtil.makeid(7);
							fs.writeFileSync(env.DATABASES_FOLDER + `/${acc.id}.${movieId}-starter.txt`, meta.starterid);
							saveMovie(movieId);
						} else saveMovie();
					} else res.end(new URLSearchParams({
						watchurl: `/user/${f.action[0]}`
					}).toString());
					break;
				} case "/movie/fetch": {
					const file = `${f.movieid[0]}.txt`;
					res.end(!fs.existsSync(env.MOVIE_FOLDER + `/${fUtil.getFullFile(env.MOVIE_FOLDER, file)}`) ? fs.readFileSync(
						env.STARTER_FOLDER + `/${fUtil.getFullFile(env.STARTER_FOLDER, file)}`
					) : fs.readFileSync(env.MOVIE_FOLDER + `/${file}`));
					break;
				} case "/ajax/logout": {
					console.log(currentCookie);
					cookieManager.remove(res, currentCookie);
					res.statusCode = 302;
					res.setHeader("Location", req.headers.referer);
					res.end();
					break;
				}
			}
		}
	}
}
