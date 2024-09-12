import fs from 'fs';
import CookieManager from './req/cookie.js';
const {
    env
} = process;
import movie from "./movie/main.js";
import starter from "./movie/starter.js";
import fUtil from "./fileUtil.js"; 
function includeOnSite(what, json = {}) {
    const site = {
        header: `<head>
            <title>${json.s} | ${json.t}</title>
            <base href="${json.urlPrefix}://${json.host}/"/>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
            <meta http-equiv="content-language" content="en-local"/>
            <meta name="description" content="${json.d}"/>
            <meta name="keywords" content="animation,software,website"/>
            <meta name="copyright" content="(c)${new Date().getFullYear()} ${json.t}"/>
            <meta name="robots" content="all"/>
            <meta http-equiv="imagetoolbar" content="no"/>
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
            <script type="text/javascript" src="/files/js/shared.js"></script>
            <script src="https://www.google-analytics.com/urchin.js" type="text/javascript"></script>
            <script type="text/javascript">
                _uacct = "UA-295035-5";
                urchinTracker();
            </script>
            ${json.script}
            <link rel="stylesheet" type="text/css" href="https://web.archive.org/web/20070111205335cs_/http://www.zimmertwins.ca/themes/zimmertwins/css/shared.css"/>
            <!--[if IE]>
                <link rel="stylesheet" type="text/css" href="themes/zimmertwins/css/ie-win.css" media="screen"/>
            <![endif]-->
        </head>`,
        searchBar: `<div id="quick-search">
            <h3>search</h3>
            <form action="/ajax/searchMovies/" method="post">
                <input type="text" class="form-text" name="q" id="sidebar-search-keyword" maxlength="50" size="10"/>
                <input type="submit" class="form-submit" value="Go"/>
                <a href="movie/search">advanced search</a>
            </form>
        </div>
        <a target="_blank" href="https://gonexus.xyz/">Back To GoNexus</a>`,
        footer: `<div id="footer">
            <ul>
                <li>
                    <a>&copy;${new Date().getFullYear()} ${json.t}</a>
                </li>
                <li><a href="about/terms">terms of use</a></li>
                <li><a href="about/privacy">privacy policy</a></li>
                <li><a href="about/conduct">code of conduct</a></li>
                <li><a href="about/parents">parents</a></li>
                <li><a href="about/contact">contact</a></li>
                <li><a href="about/credits">credits</a></li>
            </ul>
        </div>`
    }
    return site[what];
}
export default async (req, res, url) => {
    if (req.method != "GET") return;
    const cookieManager = new CookieManager();
    const currentCookie = cookieManager.get(req);
    const questionorand = url.query.uploaded ? `&` : `?`;
    const urlPrefix = req.headers.host == "localhost" || req.headers.host == `localhost:${process.env.port}` ? "http" : "https";
    const acc = JSON.parse(fs.readFileSync(env.DATABASES_FOLDER + `/users.json`)).find(i => i.id == currentCookie.userId) || {};
    const accName = acc.username
    const join = accName ? `<li id="links-join">
        <a href="/account">Your Account</a>
    </li>` : `<li id="links-join"><a href="user/register">Join !</a></li>`;
    const sidebarNotlogin = !accName ? `<form action="/ajax/user/login" method="post">
        <input type="hidden" name="destination" value="${req.headers.referer}"/>
        <div class="user-login-block">
            <div class="form-item">
                <label for="edit-name">Username:</label>
                <input type="text" maxlength="64" class="form-text" name="username" id="edit-name" size="15" required/>
            </div>
            <div class="form-item">
                <label for="edit-pass">Password:</label>
                <input type="password" class="form-password" maxlength="64" name="pass" id="edit-pass" size="15" required/>
            </div>
            <input type="submit" class="form-submit" name="op" value="Log in"/>
        </div>
    </form>
    <div class="item-list">
        <ul>
            <li>
                <a href="/user/register" title="Create a new user account.">Join The Site</a>
            </li>
            <li>
                <a href="/user/password" title="Request new password via e-mail.">Forgot Password</a>
            </li>
        </ul>
    </div>` : `<form action="/ajax/logout" method="post"><input type="submit" class="form-submit" name="op" value="Log Out"/></form>`
    let script = ``;
    if (url.query.show_error_message) script += `<p style="background: red; color: white;">${url.query.show_error_message}</p>`;
    const d = `Zimmer Twins was an awesome site where you could publish your movies on TV. 
    but with this project, you will have the opptunity to publish those movies to GoNexus if you have access to it. 
    What are you waiting for! Come check out this site today at ${urlPrefix}://${req.headers.host}/!`;
    const t = process.env.APP_TITLE;
    let s, files;
    switch (url.pathname) {
        case "/movie/frontpage":
        case "/": {
            s = 'Home'
            files = movie.home(acc);
            res.setHeader("Content-Type", "text/html; charset=utf8");
            res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="home">
                ${includeOnSite("header", {
                    d,
                    t,
                    s,
                    script,
                    urlPrefix,
                    host: req.headers.host
                })}
                <body class="en-local">
                    <div id="wrapper">
                        <div id="content">
                            <h1>
                                <span>Home</span>
                            </h1>
                            <!-- begin content -->
                            <div id="animation">	
                                <img src="themes/zimmertwins/media/home/jungle/animation.png" width="760" height="325" alt=""/>
                                <script type="text/javascript">
                                    var so = new SWFObject(
                                        "themes/zimmertwins/media/home/jungle/animation.swf", 
                                        "animation-flash", 
                                        "760", 
                                        "325", 
                                        "7", 
                                        "#39260B"
                                    );
                                    so.write("animation");
                                </script>
                            </div>
                            <ul id="links">
                                <li id="links-make">
                                    <a href="starters">Make A Movie</a>
                                </li>
                                <li id="links-watch">
                                    <a href="movie">Watch A Movie</a>
                                </li>
                                ${join}
                            </ul>
                            <div id="movies">
                                <h3>Your Movies</h3>
                                <ul class="movie-list mustsee">${
                                    files.map(v => v.html).join('') || "<p>Nothing to see here</p>"
                                }</ul>
                            </div>
                            <!-- end content -->			
                        </div>
                        <div id="sidebar">
                            <a id="logo" href="/">Zimmer Twins</a>
                            <ul id="nav">
                                <li id="nav-home"><a href="">home</a></li>
                                <li id="nav-watch"><a href="movie">watch</a></li>
                                <li id="nav-make"><a href="starters">make</a></li>
                                <li id="nav-telepicks">
                                    <a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a>
                                </li>
                                <li id="nav-extras"><a href="extras">extras</a></li>
                                <li id="nav-help"><a href="help">help</a></li>
                            </ul>
                            <div id="user">
                                <h3></h3>
                                ${sidebarNotlogin}
                            </div>
                            ${includeOnSite("searchBar")}
                        </div>
                        <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
                    </div>
                    ${includeOnSite("footer", {t})}
                </body>
            </html>`);
            break;
        } case "/movie": {
            s = 'Watch a Movie'
            files = movie.list();
            res.setHeader("Content-Type", "text/html; charset=utf8");
            res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="watch">
                ${includeOnSite("header", {
                    d,
                    t,
                    s,
                    script,
                    urlPrefix,
                    host: req.headers.host
                })}
                <body class="en-local">
                    <div id="wrapper">
                        <div id="content">
                            <h1>
                                <span>Watch a Movie</span>
                            </h1>
                            <!-- begin content -->
                            <ul class="movie-list now-showing">${
                                files.map(v => v.html).join('') || "<h3>Nothing to see here</h3>"
                            }</ul>
                            <!-- end content -->
                        </div>
                        <div id="sidebar">
                            <a id="logo" href="/">Zimmer Twins</a>
                            <ul id="nav">
                                <li id="nav-home"><a href="">home</a></li>
                                <li id="nav-watch"><a href="movie" class="active">watch</a></li>
                                <li id="nav-make"><a href="starters">make</a></li>
                                <li id="nav-telepicks">
                                    <a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a>
                                </li>
                                <li id="nav-extras"><a href="extras">extras</a></li>
                                <li id="nav-help"><a href="help">help</a></li>
                            </ul>
                            <div id="user">
                                <h3></h3>
                                ${sidebarNotlogin}
                            </div>
                            ${includeOnSite("searchBar")}
                        </div>
                        <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
                    </div>
                    ${includeOnSite("footer", {t})}
                </body>
            </html>`);
            break;
        } case "/starters": {
            var {
                name,
                title
            } = starter(url);
            var id = !url.query.id ? "281144" : url.query.id;
            if (!name) name = "gemjest";
            if (!title) title = "Gem Jest";
            files = movie.list("starter");
            if (url.query.uploaded && acc.id) {
                name = fs.readFileSync(env.DATABASES_FOLDER + `/${acc.id}.${id}-title.txt`);
                title = "";
            }
            s = "Make a Movie"
            res.setHeader("Content-Type", "text/html; charset=utf8");
            res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="make">
                ${includeOnSite("header", {
                    d,
                    t,
                    s,
                    script,
                    urlPrefix,
                    host: req.headers.host
                })}
                <body class="en-local">
                    <div id="wrapper">
                        <div id="content">
                            <h1><span>Make a Movie</span></h1>
                            <!-- begin content -->
                            <div id="player">
                                <div id="player-container">
                                    <script type="text/javascript">
                                        var so = new SWFObject(
                                            "/files/player.swf",
                                            "player-container-flash",
                                            "436",
                                            "330",
                                            "8",
                                            "#734c11",
                                            true
                                        );
                                        so.addVariable("baseurl","${urlPrefix}://${req.headers.host}");
                                        so.addVariable("asseturl","/files");
                                        so.addVariable("startername","${url.query.name || name}");
                                        so.addVariable("lang","en-local");
                                        so.write("player-container");
                                    </script>
                                </div>
                                <h2>
                                    <a href="/studio?templateId=${id}">Make Movie From <span>${title || name}</span></a>
                                </h2>
                            </div>
                            <p id="teaser">
                                Pick a starter and
                                <br/>
                                make a movie!
                            </p>
                            <ul id="new-starters" class="movie-list new-starter">
                                <li>  
                                    <a href="/starters?id=281136">
                                        <img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/running-scared.png" alt="Run!"/>
                                    </a>  
                                    <dl><dt><a href="/starters?id=281136">Run!</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/starters?id=281144">
                                        <img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/gemjest.png" alt="Gem Jest"/>
                                    </a>  
                                    <dl><dt><a href="/starters?id=281144">Gem Jest</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/starters?id=281145">
                                        <img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/fortune.png" alt="Fortune Misfortune"/>
                                    </a>  
                                    <dl><dt><a href="/starters?id=281145">Fortune Misfortune</a></dt></dl>
                                </li>
                            </ul>
                            <a id="make-from-scratch" href="/templates${
                                !url.query.uploaded ? "" : `?uploaded=${url.query.uploaded}`
                            }${!url.query.id ? "" : `${questionorand}id=${url.query.id }`}">Load More Starters</a>
                            <a id="make-from-scratch" href="/studio">Make From Scratch</a>
                            <a id="how-to-make" href="/studio?howto=1">How To Make A Movie</a>
                            <h3>Past Starters</h3>
                            <ul id="past-starters" class="movie-list past-starter">
                                <li>  
                                    <a href="/starters?id=3">
                                        <img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/joyride.png" alt="Joyride"/>
                                    </a>  
                                    <dl><dt><a href="/starters?name=joyride">Joyride</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/starters?id=7">
                                        <img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/misfortune.png" alt="Misfortune"/>
                                    </a>  
                                    <dl><dt><a href="/starters?id=7">Misfortune</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/starters?id=8">
                                        <img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/zapped.png" alt="Zapped"/>
                                    </a>  
                                    <dl><dt><a href="/starters?id=8">Zapped</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/starters?id=16682">
                                        <img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/mystery-box.png" alt="Mystery Box"/>
                                    </a>  
                                    <dl><dt><a href="/starters?id=16682">Mystery Box</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/starters?id=16683">
                                        <img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/foiled.png" alt="Foiled!"/>
                                    </a>  
                                    <dl><dt><a href="/starters?id=16683">Foiled!</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/starters?id=16684">
                                        <img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/kitty-dreams.png" alt="Kitty Dreams"/>
                                    </a>  
                                    <dl><dt><a href="/starters?id=16684">Kitty Dreams</a></dt></dl>
                                </li>
                                <li> 
                                    <a href="/starters?id=199944">
                                        <img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/13talks.png" alt="13 Talks"/>
                                    </a>  
                                    <dl><dt><a href="/starters?id=199944">13 Talks</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/starters?id=199946">
                                        <img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/rock-contest.png" alt="Rock Out!"/>
                                    </a>  
                                    <dl><dt><a href="/starters?id=199946">Rock Out!</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/starters?id=199947">
                                        <img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/charming13.png" alt="Charming 13"/>
                                    </a>  
                                    <dl><dt><a href="/starters?id=199947">Charming 13</a></dt></dl>
                                </li>
                            </ul>
                            <h3>Uploaded Starters</h3>
                            <ul id="past-starters" class="movie-list past-starter">${
                                files.map(v => v.html).join('') || `<p>
                                    There are currently no uploaded starters at the monent. 
                                    <a href='/upload?type=starter'>Upload</a> a starter to get started.
                                </p>`
                            }</ul>
                            <!-- end content -->			
                        </div>
                        <div id="sidebar">
                            <a id="logo" href="/">Zimmer Twins</a>
                            <ul id="nav">
                                <li id="nav-home"><a href="">home</a></li>
                                <li id="nav-watch"><a href="movie">watch</a></li>
                                <li id="nav-make"><a href="starters" class="active">make</a></li>
                                <li id="nav-telepicks">
                                    <a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a>
                                </li>
                                <li id="nav-extras"><a href="extras">extras</a></li>
                                <li id="nav-help"><a href="help">help</a></li>
                            </ul>
                            <div id="user">
                                <h3></h3>
                                ${sidebarNotlogin}
                            </div>
                            ${includeOnSite("searchBar")}
                        </div>
                        <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
                    </div>
                    ${includeOnSite("footer", {t})}
                </body>
            </html>`);
            break;
        } case "/studio": {
            if (url.query.templateId) fs.writeFileSync(process.env.DATABASES_FOLDER + `/${acc.id}.starterIdSection.txt`, url.query.templateId);
            else {
                if (fs.existsSync(process.env.DATABASES_FOLDER + `/${acc.id}.starterIdSection.txt`)) {
                    fs.unlinkSync(process.env.DATABASES_FOLDER + `/${acc.id}.starterIdSection.txt`);
                }
            }
            if (url.query.movieId) fs.writeFileSync(process.env.DATABASES_FOLDER + `/${acc.id}.movieIdSection.txt`, url.query.movieId);
            else {
                if (fs.existsSync(process.env.DATABASES_FOLDER + `/${acc.id}.movieIdSection.txt`)) {
                    fs.unlinkSync(process.env.DATABASES_FOLDER + `/${acc.id}.movieIdSection.txt`);
                }
            }
            s = url.query.howto ? "How To Make A Movie" : !url.query.movieId ? "create movie" : "edit movie";
            res.setHeader("Content-Type", "text/html; charset=utf8");
            res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="movie-create">
                ${includeOnSite("header", {
                    d,
                    t,
                    s,
                    script,
                    urlPrefix,
                    host: req.headers.host
                })}
                <body class="en-local">
                    <div id="wrapper">
                        <div id="content">
                            <h1><span>${
                                url.query.howto ? "How To Make A Movie" : !url.query.movieId ? "Create movie" : "Edit movie"
                            }</span></h1>
                            <!-- begin content -->
                            <div id="editor">
                                <script type="text/javascript">
                                    var so = new SWFObject(
                                        "/files/editor.swf",
                                        "editor-flash",
                                        "760",
                                        "565",
                                        "8",
                                        "",
                                        true
                                    );
                                    so.addVariable("baseurl","${urlPrefix}://${req.headers.host}");
                                    so.addVariable("asseturl","/files");
                                    so.addVariable("starterid","${url.query.templateId || ""}");
                                    so.addVariable("movieid","${url.query.movieId || ""}");
                                    so.addVariable("playhelpmovie","${url.query.howto || ""}");
                                    so.addVariable("userid","${acc.id || ''}");
                                    so.addVariable("lang","en-local");
                                    so.write("editor");
                                </script>
                            </div>
                            <!-- end content -->			
                        </div>
                        <div id="sidebar">
                            <a id="logo" href="/">Zimmer Twins</a>
                            <ul id="nav">
                                <li id="nav-home"><a href="">home</a></li>
                                <li id="nav-watch"><a href="movie">watch</a></li>
                                <li id="nav-make"><a href="starters">make</a></li>
                                <li id="nav-telepicks">
                                    <a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a>
                                </li>
                                <li id="nav-extras"><a href="extras">extras</a></li>
                                <li id="nav-help"><a href="help">help</a></li>
                            </ul>
                            <div id="user">
                                <h3></h3>
                                ${sidebarNotlogin}
                            </div>
                            ${includeOnSite("searchBar")}
                        </div>
                        <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
                    </div>
                    ${includeOnSite("footer", {t})}
                </body>
            </html>`);
            break;
        } case "/node": {
            const fullFile = fUtil.getFullFile(process.env.DATABASES_FOLDER, `${url.query.id}-title.txt`);
            var title;
            if (!fs.existsSync(process.env.DATABASES_FOLDER + `/${fullFile}`)) title = "Video Player";
            else title = fs.readFileSync(process.env.DATABASES_FOLDER + `/${fullFile}`);
            const f = !url.query.id ? ` onload="hideActions()"` : "";
            s = title;
            const aslert = `While downloading this movie, please be aware that everything will not be in it. 
            if you are going to unpack this movie here,
            you will have to save it inside the studio while it loads after the movie has been unpacked here while you upload it using the 
            movie upload feature that is here.`;
            res.setHeader("Content-Type", "text/html; charset=utf8");
            res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="movie-watch">
                ${includeOnSite("header", {
                    d,
                    t,
                    s,
                    script,
                    urlPrefix,
                    host: req.headers.host
                })}
                <body${f} class="en-local">
                    <div id="wrapper">
                        <div id="content">
                            <h1><span>${title}</span></h1>
                            <!-- begin content -->
                            <div id="panel">
                                <div id="player">
                                    <script type="text/javascript">
                                        var so = new SWFObject(
                                            "/files/player.swf",
                                            "player-flash",
                                            "436",
                                            "330",
                                            "8",
                                            "#734c11",
                                            true
                                        );
                                        so.addVariable("baseurl","${urlPrefix}://${req.headers.host}");
                                        so.addVariable("asseturl","/files");
                                        so.addVariable("movieid","${url.query.id || ""}");
                                        so.addVariable("startername","${(() => {
                                            const mId = url.query.id;
                                            const file = fUtil.getFullFile(env.DATABASES_FOLDER, `${mId}-starter.txt`);
                                            if (fUtil.exists(env.DATABASES_FOLDER + `/${file}`)) {
                                                const id = fs.readFileSync(env.DATABASES_FOLDER + `/${file}`, 'utf8');
                                                const file2 = fUtil.getFullFile(env.DATABASES_FOLDER, `${id}-title.txt`);
                                                var {
                                                    name
                                                } = starter({
                                                    query: {
                                                        id
                                                    }
                                                });
                                                return name || fs.readFileSync(env.DATABASES_FOLDER + `/${file2}`);
                                            } else return ''
                                        })()}");
                                        so.addVariable("lang","en-local");
                                        so.write("player");
                                    </script>
                                </div>
                                <div id="info">	
                                    <h4>${title}</h4>
                                </div>
                                <div id="actions">
                                    <ul class="movie-actions">
                                        <!--<li class="delete">
                                            <a href="/movie/delete?movieId=${url.query.id}">Delete</a>
                                        </li>-->
                                        <li class="share">
                                            <a onclick="alert('${aslert}')" href="/files/movies/${
                                                fUtil.getFullFile('./files/movies', `${url.query.id}.txt`)
                                            }" download="${title}.txt">
                                                Download
                                            </a>
                                        </li>
                                        <li class="collabowrite"><a href="/studio?movieId=${url.query.id}">Edit</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div id="sidebar">
                            <a id="logo" href="/">Zimmer Twins</a>
                            <ul id="nav">
                                <li id="nav-home"><a href="">home</a></li>
                                <li id="nav-watch"><a href="movie">watch</a></li>
                                <li id="nav-make"><a href="starters">make</a></li>
                                <li id="nav-telepicks">
                                    <a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a>
                                </li>
                                <li id="nav-extras"><a href="extras">extras</a></li>
                                <li id="nav-help"><a href="help">help</a></li>
                            </ul>
                            <div id="user">
                                <h3></h3>
                                ${sidebarNotlogin}
                            </div>
                            ${includeOnSite("searchBar")}
                        </div>
                        <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
                    </div>
                    ${includeOnSite("footer", {t})}
                </body>
            </html>`);
            break;
        } case "/templates": {
            files = movie.list("starter", "loadMore");
            var {
                name,
                title
            } = starter(url);
            var id = url.query.id || "344711"
            if (!name) name = "wheres13";
            if (!title) title = "Where's 13?";
            if (url.query.uploaded) {
                name = fs.readFileSync(env.DATABASES_FOLDER + `/${acc.id}.${id}-title.txt`);
                title = "";
            }
            s = "Make a Movie";
            const m = `<p>
                There are currently no uploaded starters at the monent. 
                <a href='/upload?type=starter&loadMore=true'>Upload</a> 
                a starter to get started.
            </p>`;
            res.setHeader("Content-Type", "text/html; charset=utf8");
            res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="make">
                ${includeOnSite("header", {
                    d,
                    t,
                    s,
                    script,
                    urlPrefix,
                    host: req.headers.host
                })}
                <body class="en-local">
                    <div id="wrapper">
                        <div id="content">
                            <h1><span>Make a Movie</span></h1>
                            <!-- begin content -->
                            <div id="player">
                                <div id="player-container">
                                    <script type="text/javascript">
                                        var so = new SWFObject(
                                            "/files/player.swf",
                                            "player-container-flash",
                                            "436",
                                            "330",
                                            "8",
                                            "#734c11",
                                            true
                                        );
                                        so.addVariable("baseurl","${urlPrefix}://${req.headers.host}");
                                        so.addVariable("asseturl","/files");
                                        so.addVariable("startername","${url.query.name || name}");
                                        so.addVariable("lang","en-local");
                                        so.write("player-container");
                                    </script>
                                </div>
                                <h2><a href="/studio?templateId=${id}">Make Movie From <span>${title || name}</span></a></h2>
                            </div>
                            <p id="teaser">
                                Pick a starter and
                                <br/
                                >make a movie!
                            </p>
                            <ul id="new-starters" class="movie-list new-starter">
                                <li>  
                                    <a href="/templates?id=344704">
                                        <img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/surprise.png" alt="Suprise"/>
                                    </a>  
                                    <dl><dt><a href="/templates?id=344704">Suprise</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/templates?id=344709">
                                        <img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/idolhands.png" alt="Idol Hands"/>
                                    </a>  
                                    <dl><dt><a href="/templates?id=344709">Idol Hands</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/templates?id=344711">
                                        <img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/wheres13.png" alt="Where's 13?"/>
                                    </a>  
                                    <dl><dt><a href="/templates?id=344711">Where&#039;s 13?</a></dt></dl>
                                </li>
                            </ul>
                            <a id="make-from-scratch" href="/starters${
                                !url.query.uploaded ? "" : `?uploaded=${
                                    url.query.uploaded
                                }`
                            }${
                                !url.query.id ? "" : `${
                                    questionorand
                                }id=${
                                    url.query.id
                                }`
                            }">Load Less Starters</a>
                            <a id="make-from-scratch" href="/studio">Make From Scratch</a>
                            <a id="how-to-make" href="/studio?howto=1">How To Make A Movie</a>
                            <h3>Past Starters</h3>
                            <ul id="past-starters" class="movie-list past-starter">
                                <li>  
                                    <a href="/templates?id=3">
                                        <img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/joyride.png" alt="Joyride"/>
                                    </a>  
                                    <dl><dt><a href="/templates?name=joyride">Joyride</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/templates?id=7">
                                        <img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/misfortune.png" alt="Misfortune"/>
                                    </a>  
                                    <dl><dt><a href="/templates?id=7">Misfortune</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/templates?id=8" class="active">
                                        <img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/zapped.png" alt="Zapped"/>
                                    </a>  
                                    <dl><dt><a href="/templates?id=8">Zapped</a></dt></dl>
                                </li>
                                <li> 
                                    <a href="/templates?id=16682">
                                        <img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/mystery-box.png" alt="Mystery Box"/>
                                    </a>  
                                    <dl><dt><a href="/templates?id=16682">Mystery Box</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/templates?id=16683">
                                        <img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/foiled.png" alt="Foiled!"/>
                                    </a>  
                                    <dl><dt><a href="/templates?id=16683">Foiled!</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/templates?id=16684">
                                        <img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/kitty-dreams.png" alt="Kitty Dreams"/>
                                    </a>  
                                    <dl><dt><a href="/templates?id=16684">Kitty Dreams</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/templates?id=199944">
                                        <img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/13talks.png" alt="13 Talks"/>
                                    </a>  
                                    <dl><dt><a href="/templates?id=199944">13 Talks</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/templates?id=199946">
                                        <img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/rock-contest.png" alt="Rock Out!"/>
                                    </a>  
                                    <dl><dt><a href="/templates?id=199946">Rock Out!</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/templates?id=199947">
                                        <img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/charming13.png" alt="Charming 13"/>
                                    </a>  
                                    <dl><dt><a href="/templates?id=199947">Charming 13</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/templates?id=281136">
                                        <img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/running-scared.png" alt="Run!"/>
                                    </a>  
                                    <dl><dt><a href="/templates?id=281136">Run!</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/templates?id=281144">
                                        <img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/gemjest.png" alt="Gem Jest"/>
                                    </a>  
                                    <dl><dt><a href="/templates?id=281144">Gem Jest</a></dt></dl>
                                </li>
                                <li>  
                                    <a href="/templates?id=281145">
                                        <img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/fortune.png" alt="Fortune Misfortune"/>
                                    </a>  
                                    <dl><dt><a href="/templates?id=281145">Fortune Misfortune</a></dt></dl>
                                </li>
                            </ul>
                            <h3>Uploaded Starters</h3>
                            <ul id="past-starters" class="movie-list past-starter">${
                                files.map(v => v.html).join('') || m
                            }</ul>
                            <!-- end content -->			
                        </div>
                        <div id="sidebar">
                            <a id="logo" href="/">Zimmer Twins</a>
                            <ul id="nav">
                                <li id="nav-home"><a href="">home</a></li>
                                <li id="nav-watch"><a href="movie">watch</a></li>
                                <li id="nav-make"><a href="starters">make</a></li>
                                <li id="nav-telepicks">
                                    <a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a>
                                </li>
                                <li id="nav-extras"><a href="extras">extras</a></li>
                                <li id="nav-help"><a href="help">help</a></li>
                            </ul>
                            <div id="user">
                                <h3></h3>
                                ${sidebarNotlogin}
                            </div>
                            ${includeOnSite("searchBar")}
                        </div>
                        <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
                    </div>
                    ${includeOnSite("footer", {t})}
                </body>
            </html>`);
            break
        } case "/help": {
            s = 'Help';
            res.setHeader("Content-Type", "text/html; charset=utf8");
            res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="help">
                ${includeOnSite("header", {
                    d,
                    t,
                    s,
                    script,
                    urlPrefix,
                    host: req.headers.host
                })}
                <body class="en-local">
                    <div id="wrapper">
                        <div id="content">
                            <h1><span>Help</span></h1>
                            <!-- begin content -->
                            <div class="node-content">
                                <ol id="topics">
                                    <li id="quick">
                                        <a class="button" href="/studio?howto=1">How To Make A Movie</a>
                                        <a class="button" href="welcome">Zimmer Twins Tour</a>
                                    </li>
                                    <li id="toc">
                                        <h3>Table Of Contents</h3>
                                        <ol>
                                            <li><a href="/help#gettingStarted">Getting Started</a></li>
                                            <li><a href="/help#movies">Movies</a></li>
                                            <li><a href="/help#videoList">Questions Relating To The Video List</a></li>
                                            <li><a href="/help#flash">Adobe Flash Questions For Chromium</a></li>
                                            <li><a href="/help#siteRequirements">Site Requirements</a></li>
                                            <li><a href="/help#feedback">Feedback</a></li>
                                            <li><a href="/help#faq">FAQ</a></li>
                                        </ol>
                                    </li>
                                    <li id="gettingStarted">
                                        <h3>Getting Started <a href="/help#wrapper">Top</a></h3>
                                        <ol>
                                            <li>
                                                <h2>What's this all about?</h2>
                                                <p>
                                                    On zimmertwins, you create your own endings to one of our story starters. 
                                                    You may also create your stories from scratch. 
                                                    The very best endings will be broadcast coast-to-coast on 
                                                    <a href="http://www.teletoon.com/">TELETOON</a>! 
                                                    So put on your director's hat because we're going to make some TV!
                                                </p>
                                            </li>
                                            <li>
                                                <h2>Who are the Zimmer Twins?</h2>
                                                <p>
                                                    Edgar and Eva Zimmer are an ordinary pair of 12 year-olds except for one thing 
                                                    - they have psychic powers. They weren't always psychic though. 
                                                    The weirdness began when they adopted a black cat named 13.
                                                    From that point on, they strange things began to happen. How strange? Well, 
                                                    watch some of the <a href="/starters">starters</a> and you'll get the idea.
                                                </p>
                                            </li>
                                            <li>
                                                <h2>Do i need to be 13+ to use zimmertwins?</h2>
                                                <p>
                                                    If you are under the age of 13, 
                                                    then your parent will need to set up a child account for you which will allow 
                                                    your parent to monitor the stuff you do on zimmertwins to make sure that you are kept safe
                                                    on this site.
                                                </p>
                                            </li>
                                        </ol>
                                    </li>
                                    <li id="movies">
                                        <h3>Movies <a href="/help#wrapper">Top</a></h3>
                                        <ol>
                                            <li>
                                                <h2>How do I create a movie?</h2>
                                                <p>
                                                    First, you need to head to the <a href="/starters">make a movie</a> page then 
                                                    pick a starter that you would like to make an ending for. 
                                                    Click on 'Make Movie' and away you go. 
                                                    If you don't want to use a starter you can also 
                                                    <a href="/studio">make a movie from stratch</a>.
                                                </p>
                                            </li>
                                            <li>
                                                <h2>How do I edit a movie that I've already made?</h2>
                                                <p>
                                                    First, you need to head to the <a href="/movie">watch a movie</a> page then find a movie 
                                                    that you want to edit. Once you found the movie, click on it and below it, 
                                                    there will be three choices. One is download, second is delete, and third is edit. 
                                                    What you want to click on is the edit button and then your movie will load inside the 
                                                    studio for you to edit.
                                                </p>
                                            </li>
                                            <li>
                                                <h2>How do I delete a movie I don't want to keep anymore?</h2>
                                                <p>
                                                    First, you need to head to the <a href="/movie">watch a movie</a> page then find a movie 
                                                    that you want to delete. Once you found the movie, click on it and below it, 
                                                    there will be three choices. One is download, second is delete, and third is edit. 
                                                    What you want to click on is the delete button and then your movie will go away from the 
                                                    list for good. Note: there is no turning back if you do this unless you downloaded a 
                                                    backup copy of your movie.
                                                </p>
                                            </li>
                                            <li>
                                                <h2>How do I download a backup copy of my movie?</h2>
                                                <p>
                                                    First, you need to head to the <a href="/movie">watch a movie</a> page then find a movie 
                                                    that you want to download. Once you found the movie, click on it and below it, 
                                                    there will be 3 choices. One is download, second is delete, and third is edit. 
                                                    What you want to click on is the download button and then your movie will be saved to your 
                                                    files. the filename of your movie is going to be the title of your movie so that you can 
                                                    keep things in place. please keep that in mind.
                                                </p>
                                            </li>
                                        </ol>
                                    </li>
                                    <li id="videoList">
                                        <h3>Questions relating to the videolist <a href="/help#wrapper">Top</a></h3>
                                        <ol>
                                            <li>
                                                <h2>Why is the your movies section including the watch a movie page always blank?</h2>
                                                <p>
                                                    That will be because you haven't made any movies yet. to do so, 
                                                    go to the <a href="/starters">make a movie</a> page.
                                                </p>
                                            </li>
                                            <!--<li>
                                                <h2>How do I find my friends' movies?</h2>
                                                <p>
                                                    Type their nickname in the search box and press 'go'. 
                                                    Remember that you can see a list of their movies by clicking on their nickname anywhere it 
                                                    appears on the site.
                                                </p>
                                            </li>-->
                                        </ol>
                                    </li>
                                    <li id="flash">
                                        <h3>Adobe Flash Questions For Chromium <a href="/help#wrapper">Top</a></h3>
                                        <ol>
                                            <li>
                                                <h2>Flash isn't working! what do i do?</h2>
                                                <p>
                                                    You can try using the Allow Flash button below to fix the issue. if that dosen't work, 
                                                    then that means that flash isn't installed for chromium.
                                                    to install flash, <a href="/files/flash_windows_chromium.msi">Click here</a>.
                                                    <br><a href="/allowFlash">Allow Flash</a>
                                                </p>
                                            </li>
                                            <li>
                                                <h2>Does Zimmertwins Use Flash?</h2>
                                                <p>yes it does. it is advised if you do the steps above.</p>
                                            </li>
                                        </ol>
                                    </li>
                                    <li id="siteRequirements">
                                        <h3>Site Requirements <a href="/help#wrapper">Top</a></h3>
                                        <ol>
                                            <li>
                                                <h2>What kind of computer do I need?</h2>
                                                <ul>
                                                    <li>Computer running Windows with a 1.5Ghz processor or faster.</li>
                                                    <li>Computer running OSX with a 1Ghz processor or faster.</li>
                                                    <li>A screen resolution of 1024x768 or greater.</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <h2>Do I need a broadband internet connection?</h2>
                                                <p>
                                                    Yes. We recommend a 1Mbps or faster connection such as would be found with a DSL or cable 
                                                    connection. While a slower connection may work, 
                                                    you will have to be extraordinarily patient.
                                                </p>
                                            </li>
                                        </ol>
                                    </li>
                                    <li id="feedback">
                                        <h3>Feedback <a href="/help#wrapper">Top</a></h3>
                                        <ol>
                                            <li>
                                                <h2>Something on the site is broken. Can you fix it?</h2>
                                                <p>
                                                    We certainly can try! Before you report a problem, 
                                                    please check our <a href="#siteRequirements">site requirements</a>. 
                                                    If your computer meets these requirements and something still isn't working properly, 
                                                    then let us know about it by using the <a href="/about/contact">contact form</a>. 
                                                    Please be as specific as possible when you explain what the problem is and we'll make 
                                                    every effort to fix it.
                                                </p>
                                            </li>
                                            <li>
                                                <h2>How can I make suggestions for the website?</h2>
                                                <p>
                                                    We'd love to hear from you and, unlike the Zimmer Twins, we're not psychic! 
                                                    To make a suggestion, use our <a href="/about/contact">contact form</a>.
                                                </p>
                                            </li>
                                        </ol>
                                    </li>
                                </ol>
                            </div>
                            <!-- end content -->			
                        </div>
                        <div id="sidebar">
                            <a id="logo" href="/">Zimmer Twins</a>
                            <ul id="nav">
                                <li id="nav-home"><a href="">home</a></li>
                                <li id="nav-watch"><a href="movie">watch</a></li>
                                <li id="nav-make"><a href="starters">make</a></li>
                                <li id="nav-telepicks">
                                    <a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a>
                                </li>
                                <li id="nav-extras"><a href="extras">extras</a></li>
                                <li id="nav-help"><a href="help" class="active">help</a></li>
                            </ul>
                            <div id="user">
                                <h3></h3>
                                ${sidebarNotlogin}
                            </div>
                            ${includeOnSite("searchBar")}
                        </div>
                        <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
                    </div>
                    ${includeOnSite("footer", {t})}
                </body>
            </html>`);
            break;
        } case "/welcome": {
            s = 'Zimmer Twins Tour';
            res.setHeader("Content-Type", "text/html; charset=utf8");
            res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local">
                ${includeOnSite("header", {
                    d,
                    t,
                    s,
                    script,
                    urlPrefix,
                    host: req.headers.host
                })}
                <body class="en-local">
                    <div id="wrapper">
                        <div id="content">
                            <h1><span>Zimmer Twins Tour</span></h1>
                            <!-- begin content -->
                            <div class="node-content">
                                <div id="flv-player">
                                    <script type="text/javascript">
                                        var so = new SWFObject(
                                            "/files/flvplayer.swf", 
                                            "flv-player-flash", 
                                            "760", 
                                            "565", 
                                            "8", 
                                            "#39260B"
                                        );
                                        so.addVariable('flvurl','/files/welcome.flv');
                                        so.write("flv-player");
                                    </script>
                                </div>
                            </div>
                            <!-- end content -->			
                        </div>
                        <div id="sidebar">
                            <a id="logo" href="/">Zimmer Twins</a>
                            <ul id="nav">
                                <li id="nav-home"><a href="">home</a></li>
                                <li id="nav-watch"><a href="movie">watch</a></li>
                                <li id="nav-make"><a href="starters">make</a></li>
                                <li id="nav-telepicks">
                                    <a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a>
                                </li>
                                <li id="nav-extras"><a href="extras">extras</a></li>
                                <li id="nav-help"><a href="help">help</a></li>
                            </ul>
                            <div id="user">
                                <h3></h3>
                                ${sidebarNotlogin}
                            </div>
                            ${includeOnSite("searchBar")}
                        </div>
                        <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
                    </div>
                    ${includeOnSite("footer", {t})}
                </body>
            </html>`);
            break;
        } case "/movie/search": {
            s = 'Search';
            res.setHeader("Content-Type", "text/html; charset=utf8");
            res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local">
                ${includeOnSite("header", {
                    d,
                    t,
                    s,
                    script,
                    urlPrefix,
                    host: req.headers.host
                })}
                <body class="en-local">
                    <div id="wrapper">
                        <div id="content">
                            <h1><span>Search</span></h1>
                            <!-- begin content -->
                            <form action="/ajax/searchMovies/" method="post" id="search-form">
                                <fieldset>
                                    <div class="form-item">
                                        <label for="edit-keys">Keyword:</label>
                                        <input type="text" maxlength="64" class="form-text" name="q" id="edit-keys" size="64" value=""/>
                                    </div>
                                    <div class="form-item">
                                        <label for="edit-type">Movie Type:</label>
                                        <select name="type" id="edit-type">
                                            <option value="all" selected="selected">All</option>
                                            <option value="contains-starters">Contains Starters</option>
                                            <option value="uploaded">Uploaded</option>
                                        </select>
                                    </div>
                                </fieldset>
                                <input type="submit" class="form-submit" name="op" value="Search"/>
                            </form>
                            <!-- end content -->			
                        </div>
                        <div id="sidebar">
                            <a id="logo" href="/">Zimmer Twins</a>
                            <ul id="nav">
                                <li id="nav-home"><a href="">home</a></li>
                                <li id="nav-watch"><a href="movie">watch</a></li>
                                <li id="nav-make"><a href="starters">make</a></li>
                                <li id="nav-telepicks">
                                    <a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a>
                                </li>
                                <li id="nav-extras"><a href="extras">extras</a></li>
                                <li id="nav-help"><a href="help">help</a></li>
                            </ul>
                            <div id="user">
                                <h3></h3>
                                ${sidebarNotlogin}
                            </div>
                            ${includeOnSite("searchBar")}
                        </div>
                        <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
                    </div>
                    ${includeOnSite("footer", {t})}
                </body>
            </html>`);
            break;
        } case "/search": {
            const type = !url.query.filters ? "" : url.query.filters;
            files = movie.search(url.query.q, type);
            if (!url.query.q) {
                res.statusCode = 302;
                res.setHeader("Location", "/movie/search");
                res.end();
            } else {
                s = 'Search For Movies';
                res.setHeader("Content-Type", "text/html; charset=utf8");
                res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="watch">
                    ${includeOnSite("header", {
                        d,
                        t,
                        s,
                        script,
                        urlPrefix,
                        host: req.headers.host
                    })}
                    <body class="en-local">
                        <div id="wrapper">
                            <div id="content">
                                <h1><span>Search For Movies</span></h1>
                                <!-- begin content -->
                                <ul class="movie-list now-showing">${files.map(v => v.html).join('') || '<h3>No movies were found</h3>'}</ul>
                                <!-- end content -->			
                            </div>
                            <div id="sidebar">
                                <a id="logo" href="/">Zimmer Twins</a>
                                <ul id="nav">
                                    <li id="nav-home"><a href="">home</a></li>
                                    <li id="nav-watch"><a href="movie" class="active">watch</a></li>
                                    <li id="nav-make"><a href="starters">make</a></li>
                                    <li id="nav-telepicks">
                                        <a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a>
                                    </li>
                                    <li id="nav-extras"><a href="extras">extras</a></li>
                                    <li id="nav-help"><a href="help">help</a></li>
                                </ul>
                                <div id="user">
                                    <h3></h3>
                                    ${sidebarNotlogin}
                                </div>
                                ${includeOnSite("searchBar")}
                            </div>
                            <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
                        </div>
                        ${includeOnSite("footer", {t})}
                    </body>
                </html>`);
            }
            break;
        } case "/agecheck": {
            s = 'Let&#039;s get started!';
            const form = `<form action="/ajax/agecheck" method="post"><fieldset>
                <legend>Birthday</legend>
                <div class="form-item">
                    <label for="edit-birthday][month">month:</label>
                    <select name="birth_month" id="edit-birthday][month" required>
                        <option value="">What month does your birthday happen on?</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
                <div class="form-item">
                    <label for="edit-birthday][day">day:</label>
                    <select name="birth_day" id="edit-birthday][day" required>
                    <option value="">What day does your birthday happen on?</option>
                        <option value="01">1</option>
                        <option value="02">2</option>
                        <option value="03">3</option>
                        <option value="04">4</option>
                        <option value="05">5</option>
                        <option value="06">6</option>
                        <option value="07">7</option>
                        <option value="08">8</option>
                        <option value="09">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                    </select>
                </div>
                <div class="form-item">
                    <label for="edit-birthday][year">year:</label>
                    <input type="text" placeholder="What year does your birthday happen on?" class="form-text" name="birth_year" id="edit-birthday][year" size="44" required/>
                </div>
            </fieldset>
            <input type="submit" class="form-submit" name="op" value="Join The Site"/></form>`
            res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local">
                ${includeOnSite("header", {
                    d,
                    t,
                    s,
                    script,
                    urlPrefix,
                    host: req.headers.host
                })}
                <body class="en-local">
                    <div id="wrapper">
                        <div id="content">
                            <h1><span>Let&#039;s get started!</span></h1>
                            <!-- begin content -->
                            ${(() => {
                                if (!currentCookie.birth) return form;
                                const birth = JSON.parse(currentCookie.birth);
                                if (birth.age >= 13) {
                                    res.statusCode = 302;
                                    res.setHeader("Location", "/user/register");
                                } else return `<form action="/ajax/logout" method="post">
                                    <label>
                                        Sorry, but you are not old enough to sign up for The ${t}. 
                                        If your date of birth was set incorrectly for whatever reason or you are a parent that is willing to 
                                        create your child a ${t} account, you may click 
                                        <button type="submit">here</button> 
                                        to clear your current browser cookies for this website.
                                    </label>
                                </form>`;
                            })()}
                            <!-- end content -->			
                        </div>
                        <div id="sidebar">
                            <a id="logo" href="/">Zimmer Twins</a>
                            <ul id="nav">
                                <li id="nav-home"><a href="">home</a></li>
                                <li id="nav-watch"><a href="movie">watch</a></li>
                                <li id="nav-make"><a href="starters">make</a></li>
                                <li id="nav-telepicks">
                                    <a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a>
                                </li>
                                <li id="nav-extras"><a href="extras">extras</a></li>
                                <li id="nav-help"><a href="help">help</a></li>
                            </ul>
                            <div id="user">
                                <h3></h3>
                                ${sidebarNotlogin}
                            </div>
                            ${includeOnSite("searchBar")}
                        </div>
                        <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
                    </div>
                </body>
            </html>`);
            break;
        } case "/user/register": {
            s = 'Let\'s get you signed up!';
            const birth = currentCookie.birth;
            function redir(l) {
                res.statusCode = 302;
                res.setHeader("Location", l);
                res.end();
            }
            if (!birth) redir("/agecheck");
            else if (currentCookie.userId) redir("/");
            else res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local">
                ${includeOnSite("header", {
                    d,
                    t,
                    s,
                    script,
                    urlPrefix,
                    host: req.headers.host
                })}
                <body class="en-local">
                    <div id="wrapper">
                        <div id="content">
                            <h1><span>Let's get you signed up!</span></h1>
                            <!-- begin content -->
                            <form action="/ajax/user/register" method="post">
                                <div class="form-item required">
                                    <label for="edit-name">Username:</label>
                                    <input type="text" maxlength="64" class="form-text required" name="username" id="edit-name" size="30" required/>
                                </div>
                                <div class="form-item required">
                                    <label for="edit-mail">E-mail address:</label>
                                    <input type="email" maxlength="64" class="form-text required" name="email" id="edit-mail" size="30" required/>
                                </div>
                                <div class="form-item required">
                                    <label for="edit-check_mail">Password:</label>
                                    <input type="password" maxlength="64" class="form-text required" name="password" id="edit-check_mail" size="30" required/>
                                </div>
                                <div class="form-item required">
                                    <label for="edit-realName">Name:</label>
                                    <input type="text" maxlength="64" class="form-text required" name="name" id="edit-realName" size="30" required/>
                                </div>
                                <div class="form-group">
                                    Your email address, name and GoNexus Access Key are private and will not appear online. 
                                    Please see our <a href="/about/privacy">Privacy Policy</a> for details. 
                                </div>
                                <fieldset>
                                    <div class="form-item required">
                                        <label for="edit-gender">I am a:</label>
                                        <select name="gender" id="edit-gender" required>
                                            <option value="">Which gender do you go by?</option>
                                            <option value="transgender">Transgender</option>
                                            <option value="m">boy</option>
                                            <option value="f">girl</option>
                                        </select>
                                    </div>
                                    <div class="form-item required">
                                        <label for="edit-province">I live in:</label>
                                        <select name="province" id="edit-province" required>
                                            <option value="">What province do you live in?</option>
                                            <option value="AB">Alberta</option>
                                            <option value="BC">British Columbia</option>
                                            <option value="MB">Manitoba</option>
                                            <option value="NB">New Brunswick</option>
                                            <option value="NF">Newfoundland</option>
                                            <option value="NS">Nova Scotia</option>
                                            <option value="ON">Ontario</option>
                                            <option value="PE">Prince Edward Island</option>
                                            <option value="QC">Quebec</option>
                                            <option value="NV">Nunavut</option>
                                            <option value="NT">Northwest Territories</option>
                                            <option value="SK">Saskatchewan</option>
                                            <option value="YK">Yukon</option>
                                            <option value="NA">Not applicable</option>
                                        </select>
                                    </div>
                                    <div class="form-item required">
                                        <select name="country" id="edit-country" required>
                                            <option value="">What country do you live in?</option>
                                            <option value="AFG">Afghanistan</option>
                                            <option value="ALB">Albania</option>
                                            <option value="DZA">Algeria</option>
                                            <option value="AND">Andorra</option>
                                            <option value="AGO">Angola</option>
                                            <option value="ATG">Antigua and Barbuda</option>
                                            <option value="ARG">Argentina</option>
                                            <option value="ARM">Armenia</option>
                                            <option value="AUS">Australia</option>
                                            <option value="AUT">Austria</option>
                                            <option value="AZE">Azerbaijan</option>
                                            <option value="BHS">Bahamas</option>
                                            <option value="BHR">Bahrain</option>
                                            <option value="BGD">Bangladesh</option>
                                            <option value="BRB">Barbados</option>
                                            <option value="BLR">Belarus</option>
                                            <option value="BEL">Belgium</option>
                                            <option value="BLZ">Belize</option>
                                            <option value="BEN">Benin</option>
                                            <option value="BTN">Bhutan</option>
                                            <option value="BOL">Bolivia</option>
                                            <option value="BIH">Bosnia and Herzegovina</option>
                                            <option value="BWA">Botswana</option>
                                            <option value="BRA">Brazil</option>
                                            <option value="BRN">Brunei Darussalam</option>
                                            <option value="BGR">Bulgaria</option>
                                            <option value="BFA">Burkina Faso</option>
                                            <option value="BDI">Burundi</option>
                                            <option value="KHM">Cambodia</option>
                                            <option value="CMR">Cameroon</option>
                                            <option value="CAN">Canada</option>
                                            <option value="CPV">Cape Verde</option>
                                            <option value="CAF">Central African Republic</option>
                                            <option value="TCD">Chad</option>
                                            <option value="CHL">Chile</option>
                                            <option value="CHN">China</option>
                                            <option value="HKG">China - Hong Kong</option>
                                            <option value="COL">Colombia</option>
                                            <option value="COM">Comoros</option>
                                            <option value="COG">Congo</option>
                                            <option value="CRI">Costa Rica</option>
                                            <option value="CIV">Cote d&#039;Ivoire</option>
                                            <option value="HRV">Croatia</option>
                                            <option value="CUB">Cuba</option>
                                            <option value="CYP">Cyprus</option>
                                            <option value="CZE">Czech Republic</option>
                                            <option value="COD">Democratic Republic of the Congo</option>
                                            <option value="DNK">Denmark</option>
                                            <option value="DJI">Djibouti</option>
                                            <option value="DMA">Dominica</option>
                                            <option value="DOM">Dominican Republic</option>
                                            <option value="TLS">East Timor</option>
                                            <option value="ECU">Ecuador</option>
                                            <option value="EGY">Egypt</option>
                                            <option value="SLV">El Salvador</option>
                                            <option value="GNQ">Equatorial Guinea</option>
                                            <option value="ERI">Eritrea</option>
                                            <option value="EST">Estonia</option>
                                            <option value="ETH">Ethiopia</option>
                                            <option value="FJI">Fiji</option>
                                            <option value="FIN">Finland</option>
                                            <option value="FRA">France</option>
                                            <option value="GAB">Gabon</option>
                                            <option value="GMB">Gambia</option>
                                            <option value="GEO">Georgia</option>
                                            <option value="DEU">Germany</option>
                                            <option value="GHA">Ghana</option>
                                            <option value="GRC">Greece</option>
                                            <option value="GRD">Grenada</option>
                                            <option value="GTM">Guatemala</option>
                                            <option value="GIN">Guinea</option>
                                            <option value="GNB">Guinea-Bissau</option>
                                            <option value="GUY">Guyana</option>
                                            <option value="HTI">Haiti</option>
                                            <option value="HND">Honduras</option>
                                            <option value="HUN">Hungary</option>
                                            <option value="ISL">Iceland</option>
                                            <option value="IND">India</option>
                                            <option value="IDN">Indonesia</option>
                                            <option value="IRN">Iran</option>
                                            <option value="IRQ">Iraq</option>
                                            <option value="IRL">Ireland</option>
                                            <option value="ISR">Israel</option>
                                            <option value="ITA">Italy</option>
                                            <option value="JAM">Jamaica</option>
                                            <option value="JPN">Japan</option>
                                            <option value="JOR">Jordan</option>
                                            <option value="KAZ">Kazakhstan</option>
                                            <option value="KEN">Kenya</option>
                                            <option value="KIR">Kiribati</option>
                                            <option value="KOR">Korea, Republic of</option>
                                            <option value="KWT">Kuwait</option>
                                            <option value="KGZ">Kyrgyzstan</option>
                                            <option value="LAO">Lao PDR</option>
                                            <option value="LVA">Latvia</option>
                                            <option value="LBN">Lebanon</option>
                                            <option value="LSO">Lesotho</option>
                                            <option value="LBR">Liberia</option>
                                            <option value="LBY">Libyan Arab Jamahiriya</option>
                                            <option value="LIE">Liechtenstein</option>
                                            <option value="LTU">Lithuania</option>
                                            <option value="LUX">Luxembourg</option>
                                            <option value="MKD">Macedonia</option>
                                            <option value="MDG">Madagascar</option>
                                            <option value="MWI">Malawi</option>
                                            <option value="MYS">Malaysia</option>
                                            <option value="MDV">Maldives</option>
                                            <option value="MLI">Mali</option>
                                            <option value="MLT">Malta</option>
                                            <option value="MHL">Marshall Islands</option>
                                            <option value="MRT">Mauritania</option>
                                            <option value="MUS">Mauritius</option>
                                            <option value="MEX">Mexico</option>
                                            <option value="FSM">Micronesia</option>
                                            <option value="MDA">Moldova, Republic of</option>
                                            <option value="MCO">Monaco</option>
                                            <option value="MNG">Mongolia</option>
                                            <option value="MAR">Morocco</option>
                                            <option value="MOZ">Mozambique</option>
                                            <option value="MMR">Myanmar</option>
                                            <option value="NAM">Namibia</option>
                                            <option value="NRU">Nauru</option>
                                            <option value="NPL">Nepal</option>
                                            <option value="NLD">Netherlands</option>
                                            <option value="NZL">New Zealand</option>
                                            <option value="NIC">Nicaragua</option>
                                            <option value="NER">Niger</option>
                                            <option value="NGA">Nigeria</option>
                                            <option value="NOR">Norway</option>
                                            <option value="OMN">Oman</option>
                                            <option value="PAK">Pakistan</option>
                                            <option value="PLW">Palau</option>
                                            <option value="PAN">Panama</option>
                                            <option value="PNG">Papua New Guinea</option>
                                            <option value="PRY">Paraguay</option>
                                            <option value="PER">Peru</option>
                                            <option value="PHL">Philippines</option>
                                            <option value="POL">Poland</option>
                                            <option value="PRT">Portugal</option>
                                            <option value="QAT">Qatar</option>
                                            <option value="ROM">Romania</option>
                                            <option value="RUS">Russian Federation</option>
                                            <option value="RWA">Rwanda</option>
                                            <option value="KNA">Saint Kitts and Nevis</option>
                                            <option value="LCA">Saint Lucia</option>
                                            <option value="VCT">Saint Vincent and the Grenadines</option>
                                            <option value="WSM">Samoa</option>
                                            <option value="SMR">San Marino</option>
                                            <option value="STP">Sao Tome and Principe</option>
                                            <option value="SAU">Saudi Arabia</option>
                                            <option value="SEN">Senegal</option>
                                            <option value="SCG">Serbia and Montenegro</option>
                                            <option value="SYC">Seychelles</option>
                                            <option value="SLE">Sierra Leone</option>
                                            <option value="SGP">Singapore</option>
                                            <option value="SVK">Slovakia</option>
                                            <option value="SVN">Slovenia</option>
                                            <option value="SLB">Solomon Islands</option>
                                            <option value="SOM">Somalia</option>
                                            <option value="ZAF">South Africa</option>
                                            <option value="ESP">Spain</option>
                                            <option value="LKA">Sri Lanka</option>
                                            <option value="SDN">Sudan</option>
                                            <option value="SUR">Suriname</option>
                                            <option value="SWZ">Swaziland</option>
                                            <option value="SWE">Sweden</option>
                                            <option value="CHE">Switzerland</option>
                                            <option value="SYR">Syrian Arab Republic</option>
                                            <option value="TJK">Tajikistan</option>
                                            <option value="TZA">Tanzania</option>
                                            <option value="THA">Thailand</option>
                                            <option value="TGO">Togo</option>
                                            <option value="TON">Tonga</option>
                                            <option value="TTO">Trinidad and Tobago</option>
                                            <option value="TUN">Tunisia</option>
                                            <option value="TUR">Turkey</option>
                                            <option value="TKM">Turkmenistan</option>
                                            <option value="TUV">Tuvalu</option>
                                            <option value="UGA">Uganda</option>
                                            <option value="UKR">Ukraine</option>
                                            <option value="ARE">United Arab Emirates</option>
                                            <option value="USA">United States</option>
                                            <option value="GBR">United Kingdom</option>
                                            <option value="URY">Uruguay</option>
                                            <option value="UZB">Uzbekistan</option>
                                            <option value="VUT">Vanuatu</option>
                                            <option value="VAT">Vatican City State (Holy See)</option>
                                            <option value="VEN">Venezuela</option>
                                            <option value="VNM">Viet Nam</option>
                                            <option value="ESH">Western Sahara</option>
                                            <option value="YEM">Yemen</option>
                                            <option value="ZMB">Zambia</option>
                                            <option value="ZWE">Zimbabwe</option>
                                        </select>
                                    </div>
                                    <input type="hidden" name="gonexus_account" value="0"/>
                                    <div class="form-item">
                                        <label class="option">
                                            <input type="checkbox" class="form-checkbox" name="gonexus_account" id="edit-teletoon-account" value="1"/> 
                                            I have a GoNexus account.
                                        </label>
                                    </div>
                                    <div id="teletoon-account-controls">
                                        <div class="form-group">Enter your GoNexus account info here:</div>
                                        <div class="form-item required">
                                            <label>Access Key:</label>
                                            <input type="text" maxlength="64" class="form-text required" name="gonexus_key" size="69"/>
                                        </div>
                                        <div class="form-item required">
                                            <label>Email Address:</label>
                                            <input type="email" class="form-text required" maxlength="64" name="gonexus_email" size="30"/>
                                        </div>
                                        <div class="form-item required">
                                            <label>Password:</label>
                                            <input type="password" class="form-text required" maxlength="64" name="gonexus_password" size="30"/>
                                        </div>
                                        <div class="description">
                                            By filling out your GoNexus account infomation, 
                                            you are pretty much just linking your GoNexus account to the ${
                                                t
                                            } which means that you are getting some GoNexus beta 
                                            features like publishing your movies to GoNexus from here and etc.
                                        </div>
                                    </div>
                                </fieldset>
                                <input type="submit" class="form-submit" name="op" value="Join The Site"/>
                            </form>
                            <!-- end content -->			
                        </div>
                        <div id="sidebar">
                            <a id="logo" href="/">Zimmer Twins</a>
                            <ul id="nav">
                                <li id="nav-home"><a href="">home</a></li>
                                <li id="nav-watch"><a href="movie">watch</a></li>
                                <li id="nav-make"><a href="starters">make</a></li>
                                <li id="nav-telepicks">
                                    <a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a>
                                </li>
                                <li id="nav-extras"><a href="extras">extras</a></li>
                                <li id="nav-help"><a href="help">help</a></li>
                            </ul>
                            <div id="user">
                                <h3></h3>
                                ${sidebarNotlogin}
                            </div>
                            ${includeOnSite("searchBar")}
                        </div>
                        <p>Already Have An Account? <a href="/user/login">Login</a></p>
                    </div>
                    ${includeOnSite("footer", {t})}
                </body>
            </html>`);
            break
        } case "/user/login": {
            s = 'Login';
            if (currentCookie.userId) {
                res.statusCode = 302;
                res.setHeader("Locatrion", "/");
                res.end();
            } else res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local">
                ${includeOnSite("header", {
                    d,
                    t,
                    s,
                    script,
                    urlPrefix,
                    host: req.headers.host
                })}
                <body class="en-local">
                    <div id="wrapper">
                        <div id="content">
                            <h1><span>Login</span></h1>
                            <!-- begin content -->
                            <form action="/ajax/user/login" method="post">
                                ${
                                    req.headers.referer ? `<input type="hidden" name="destination" value="${
                                        req.headers.referer
                                    }"/>` : ''
                                }
                                <div class="form-item">
                                    <label for="edit-name">Username:</label>
                                    <input type="text" maxlength="64" class="form-text" name="username" id="edit-name" size="30" required/>
                                    <div class="description">Enter your Zimmer Twins nickname.</div>
                                </div>
                                <div class="form-item">
                                    <label for="edit-pass">Password:</label>
                                    <input type="password" class="form-password" maxlength="64" name="pass" id="edit-pass" size="30" required/>
                                    <div class="description">Enter the password that accompanies your nickname.</div>
                                </div>
                                <input type="submit" class="form-submit" name="op" value="Log in"/>
                            </form>
                            <!-- end content -->			
                        </div>
                        <div id="sidebar">
                            <a id="logo" href="/">Zimmer Twins</a>
                            <ul id="nav">
                                <li id="nav-home"><a href="">home</a></li>
                                <li id="nav-watch"><a href="movie">watch</a></li>
                                <li id="nav-make"><a href="starters">make</a></li>
                                <li id="nav-telepicks">
                                    <a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a>
                                </li>
                                <li id="nav-extras"><a href="extras">extras</a></li>
                                <li id="nav-help"><a href="help">help</a></li>
                            </ul>
                            <div id="user">
                                <h3></h3>
                                ${sidebarNotlogin}
                            </div>
                            ${includeOnSite("searchBar")}
                        </div>
                        <p>Don't Have An Account? <a href="/user/register">Register</a></p>
                    </div>
                    ${includeOnSite("footer", {t})}
                </body>
            </html>`);
            break;
        } case "/allowFlash": {
            res.setHeader("Content-Type", "text/html; charset=utf8");
            res.end(env.HOME_HTML + `<center>
                <object data="/files/flash_tree.swf" height="400" width="280" type="application/x-shockwave-flash">
                    <param name="quality" value="high"></param>
                    <param name="bgcolor" value="#FAF6ED"></param>
                    <param name="play" value="true"></param>
                    <param name="loop" value="true"></param>
                    <param name="wmode" value="window"></param>
                    <param name="scale" value="showall"></param>
                    <param name="menu" value="true"></param>
                    <param name="devicefont" value="false"></param>
                    <param name="salign" value=""></param>
                    <param name="allowscriptaccess" value="sameDomain"></param>
                </object>
            </center>`);
            break
        } default: return;
    }
};
