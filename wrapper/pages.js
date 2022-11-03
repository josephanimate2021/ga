const fs = require("fs"),
fUtil = require("./fileUtil"),
env = require("./env"),
movie = require("./movie/main")

module.exports = function (req, res, url) {
  if (req.method != "GET") return;
  const questionorand = url.query.uploaded ? `&` : `?`;
  const urlPrefix = req.headers.host == "localhost" ? "http" : req.headers.host == `localhost:${process.env.port}` ? "http" : "https";
  const accName = fs.existsSync(process.env.DATABASES_FOLDER + `/name.txt`) ? fs.readFileSync(process.env.DATABASES_FOLDER + `/name.txt`, 'utf8') : "";
  const join = fs.existsSync(process.env.DATABASES_FOLDER + `/name.txt`) ? `<li id="links-join"><a href="javascript:logout('${accName}')">Logout</a></li>` : `<li id="links-join"><a href="user/register">Join !</a></li>`;
  const script = `<script>function logout(name) {
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', \`/ajax/logout?accountName=\${name}\`);
    xhttp.send();
    location.href = '/';
  }</script>`;
  switch (url.pathname) {
    case "/movie/frontpage":
    case "/": {
      const files = movie.home();
      res.setHeader("Content-Type", "text/html; charset=utf8");
      res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="home">
        <head>
      
          <title>Home | Zimmer Twins</title>
          <base href="${urlPrefix}://${req.headers.host}/"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta http-equiv="content-language" content="en-local"/>
          <meta name="description" content=""/>
          <meta name="keywords" content=""/>
          <meta name="copyright" content="(c)2006 Lost The Plot Productions"/>
      
          <meta name="robots" content="all"/>
          <meta http-equiv="imagetoolbar" content="no"/>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <script type="text/javascript" src="https://web.archive.org/web/20070111205335js_/http://www.zimmertwins.ca/themes/zimmertwins/js/shared.js"></script>
              <script src="https://web.archive.org/web/20070111205335js_/http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
          <script type="text/javascript">
            _uacct = "UA-295035-5";
            urchinTracker();
          </script>${script}	
              <link rel="stylesheet" type="text/css" href="https://web.archive.org/web/20070111205335cs_/http://www.zimmertwins.ca/themes/zimmertwins/css/shared.css"/>
          <!--[if IE]><link rel="stylesheet" type="text/css" href="themes/zimmertwins/css/ie-win.css" media="screen" /><![endif]-->
        </head>
        <body class="en-local">
          <div id="wrapper">
            <div id="content">
                      <h1><span>Home</span></h1>
                                              <!-- begin content --><div id="animation">	
      
        <img src="https://web.archive.org/web/20070111205335im_/http://www.zimmertwins.ca/media/home/jungle/animation.png" width="760" height="325" alt=""/>
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
        <li id="links-make"><a href="starters">Make A Movie</a></li>
        <li id="links-watch"><a href="movie">Watch A Movie</a></li>
            ${join}
        </ul>
      
      <div id="movies">
      <h3>Your Movies</h3>
      <ul class="movie-list mustsee">${files.map(v => v.html).join('') || "<p>Nothing to see here</p>"}</ul>
      </div>
      <!-- end content -->			</div>
      
            <div id="sidebar">
              <a id="logo" href="/">Zimmer Twins</a>
              <ul id="nav">
                <li id="nav-home"><a href="">home</a></li>
      <li id="nav-watch"><a href="movie">watch</a></li>
      <li id="nav-make"><a href="starters">make</a></li>
      <li id="nav-telepicks"><a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help">help</a></li>
              </ul>
      <div id="quick-search">
        <h3>search</h3>
        <form action="/ajax/searchMovies/" method="post"><input type="text" class="form-text" name="q" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a target="_blank" href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
            </div>
            <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
             
          </div>
          <div id="footer">
            <ul>
              <li><a>&copy;2006 Lost The Plot</a></li>
              <li><a href="about/terms">terms of use</a></li>
      <li><a href="about/privacy">privacy policy</a></li>
      <li><a href="about/conduct">code of conduct</a></li>
      <li><a href="about/parents">parents</a></li>
      <li><a href="about/contact">contact</a></li>
      <li><a href="about/credits">credits</a></li>
            </ul>
          </div>
        </body>
      
      </html>`);
      return true;
    } case "/movie": {
      const files = movie.list();
      res.setHeader("Content-Type", "text/html; charset=utf8");
      res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="watch">
        <head>
      
          <title>Watch a Movie | Zimmer Twins</title>
          <base href="${urlPrefix}://${req.headers.host}/"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta http-equiv="content-language" content="en-local"/>
          <meta name="description" content=""/>
          <meta name="keywords" content=""/>
          <meta name="copyright" content="(c)2006 Lost The Plot Productions"/>
      
          <meta name="robots" content="all"/>
          <meta http-equiv="imagetoolbar" content="no"/>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <script type="text/javascript" src="https://web.archive.org/web/20061023094121js_/http://www.zimmertwins.ca/themes/zimmertwins/js/shared.js"></script>
              <script src="https://web.archive.org/web/20061023094121js_/http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
          <script type="text/javascript">
            _uacct = "UA-295035-5";
            urchinTracker();
          </script>		
              <link rel="stylesheet" type="text/css" href="https://web.archive.org/web/20061023094121cs_/http://www.zimmertwins.ca/themes/zimmertwins/css/shared.css"/>
          <!--[if IE]><link rel="stylesheet" type="text/css" href="themes/zimmertwins/css/ie-win.css" media="screen" /><![endif]-->
        </head>
        <body class="en-local">
          <div id="wrapper">
            <div id="content">
                      <h1><span>Watch a Movie</span></h1>
                                              <!-- begin content -->
      
      <ul class="movie-list now-showing">${files.map(v => v.html).join('') || "<h3>Nothing to see here</h3>"}</ul>
      <!-- end content -->			</div>
      
            <div id="sidebar">
              <a id="logo" href="/">Zimmer Twins</a>
              <ul id="nav">
                <li id="nav-home"><a href="">home</a></li>
      <li id="nav-watch"><a href="movie" class="active">watch</a></li>
      <li id="nav-make"><a href="starters">make</a></li>
      <li id="nav-telepicks"><a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help">help</a></li>
              </ul>
      <div id="quick-search">
        <h3>search</h3>
        <form action="/ajax/searchMovies/" method="post"><input type="text" class="form-text" name="q" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a target="_blank" href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
            </div>
            <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
             
          </div>
          <div id="footer">
            <ul>
              <li><a>&copy;2006 Lost The Plot</a></li>
              <li><a href="about/terms">terms of use</a></li>
      <li><a href="about/privacy">privacy policy</a></li>
      <li><a href="about/conduct">code of conduct</a></li>
      <li><a href="about/parents">parents</a></li>
      <li><a href="about/contact">contact</a></li>
      <li><a href="about/credits">credits</a></li>
            </ul>
          </div>
        </body>
      
      </html>`);
      return true;
    } case "/starters": {
      var name, title;
      var id = url.query.id;
      const files = movie.list("starter");
      if (url.query.uploaded) {
        name = fs.readFileSync(env.DATABASES_FOLDER + `/${id}-title.txt`);
        title = "";
      } else switch (url.query.id) {
        case "199947": {
          name = "charming13";
          title = "Charming 13";
          break;
        } case "199946": {
          name = "rock-contest";
          title = "Rock Out!";
          break;
        } case "199944": {
          name = "13talks";
          title = "13 Talks";
          break;
        } case "16684": {
          name = "kitty-dreams";
          title = "Kitty Dreams";
          break;
        } case "16683": {
          name = "foiled";
          title = "Foiled!";
          break;
        } case "16682": {
          name = "mystery-box";
          title = "Mystery Box";
          break;
        } case "8": {
          name = "zapped";
          title = "Zapped";
          break;
        } case "7": {
          name = "misfortune";
          title = "Misfortune";
          break;
        } case "281145": {
          name = "fortune";
          title = "Fortune Misfortune";
          break;
        } case "3": {
          name = "joyride";
          title = "Joyride";
          break;
        } case "281136": {
          name = "run";
          title = "Run!";
          break;
        } case "281144": {
          name = "gemjest";
          title = "Gem Jest";
          break;
        } default: {
          id = "281144";
          name = "gemjest";
          title = "Gem Jest";
          break;
        }
      }
      if (url.query.name == "joyride") title = "Joyride";
      res.setHeader("Content-Type", "text/html; charset=utf8");
      res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="make">
        <head>
      
          <title>Make a Movie | Zimmer Twins</title>
          <base href="${urlPrefix}://${req.headers.host}/"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta http-equiv="content-language" content="en-local"/>
          <meta name="description" content=""/>
          <meta name="keywords" content=""/>
          <meta name="copyright" content="(c)2006 Lost The Plot Productions"/>
      
          <meta name="robots" content="all"/>
          <meta http-equiv="imagetoolbar" content="no"/>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <script type="text/javascript" src="https://web.archive.org/web/20061023094045js_/http://www.zimmertwins.ca/themes/zimmertwins/js/shared.js"></script>
              <script src="https://web.archive.org/web/20061023094045js_/http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
          <script type="text/javascript">
            _uacct = "UA-295035-5";
            urchinTracker();
          </script>		
              <link rel="stylesheet" type="text/css" href="https://web.archive.org/web/20061023094045cs_/http://www.zimmertwins.ca/themes/zimmertwins/css/shared.css"/>
          <!--[if IE]><link rel="stylesheet" type="text/css" href="themes/zimmertwins/css/ie-win.css" media="screen" /><![endif]-->
        </head>
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
      Pick a starter and<br/>make a movie!</p>
      <ul id="new-starters" class="movie-list new-starter">
        <li>  
        <a href="/starters?id=281136"><img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/running-scared.png" alt="Run!"/></a>  <dl>
          <dt><a href="/starters?id=281136">Run!</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/starters?id=281144"><img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/gemjest.png" alt="Gem Jest"/></a>  <dl>
          <dt><a href="/starters?id=281144">Gem Jest</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/starters?id=281145"><img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/fortune.png" alt="Fortune Misfortune"/></a>  <dl>
          <dt><a href="/starters?id=281145">Fortune Misfortune</a></dt>
        </dl>
      </li>
      </ul>
      
      <a id="make-from-scratch" href="/templates${
        !url.query.uploaded ? "" : `?uploaded=${
          url.query.uploaded
        }`
      }${
        !url.query.id ? "" : `${
          questionorand
        }id=${
          url.query.id
        }`
      }">Load More Starters</a>
      <a id="make-from-scratch" href="/studio">Make From Scratch</a>
      <a id="how-to-make" href="/studio?howto=1">How To Make A Movie</a>
      
      <h3>Past Starters</h3>
      <ul id="past-starters" class="movie-list past-starter">
        <li>  
        <a href="/starters?id=3"><img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/joyride.png" alt="Joyride"/></a>  <dl>
          <dt><a href="/starters?name=joyride">Joyride</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/starters?id=7"><img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/misfortune.png" alt="Misfortune"/></a>  <dl>
          <dt><a href="/starters?id=7">Misfortune</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/starters?id=8"><img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/zapped.png" alt="Zapped"/></a>  <dl>
          <dt><a href="/starters?id=8">Zapped</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/starters?id=16682"><img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/mystery-box.png" alt="Mystery Box"/></a>  <dl>
          <dt><a href="/starters?id=16682">Mystery Box</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/starters?id=16683"><img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/foiled.png" alt="Foiled!"/></a>  <dl>
          <dt><a href="/starters?id=16683">Foiled!</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/starters?id=16684"><img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/kitty-dreams.png" alt="Kitty Dreams"/></a>  <dl>
          <dt><a href="/starters?id=16684">Kitty Dreams</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/starters?id=199944"><img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/13talks.png" alt="13 Talks"/></a>  <dl>
          <dt><a href="/starters?id=199944">13 Talks</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/starters?id=199946"><img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/rock-contest.png" alt="Rock Out!"/></a>  <dl>
          <dt><a href="/starters?id=199946">Rock Out!</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/starters?id=199947"><img src="https://web.archive.org/web/20061023094045im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/charming13.png" alt="Charming 13"/></a>  <dl>
          <dt><a href="/starters?id=199947">Charming 13</a></dt>
        </dl>
      </li>
      </ul>
      <h3>Uploaded Starters</h3>
      <ul id="past-starters" class="movie-list past-starter">${files.map(v => v.html).join('') || "<p>There are currently no uploaded starters at the monent. <a href='/upload?type=starter'>Upload</a> a starter to get started.</p>"}</ul>
      <!-- end content -->			</div>
      
            <div id="sidebar">
              <a id="logo" href="/">Zimmer Twins</a>
              <ul id="nav">
                <li id="nav-home"><a href="">home</a></li>
      <li id="nav-watch"><a href="movie">watch</a></li>
      <li id="nav-make"><a href="starters" class="active">make</a></li>
      <li id="nav-telepicks"><a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help">help</a></li>
              </ul>
      <div id="quick-search">
        <h3>search</h3>
        <form action="/ajax/searchMovies/" method="post"><input type="text" class="form-text" name="q" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a target="_blank" href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
            </div>
            <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
             
          </div>
          <div id="footer">
            <ul>
              <li><a>&copy;2006 Lost The Plot</a></li>
              <li><a href="about/terms">terms of use</a></li>
      <li><a href="about/privacy">privacy policy</a></li>
      <li><a href="about/conduct">code of conduct</a></li>
      <li><a href="about/parents">parents</a></li>
      <li><a href="about/contact">contact</a></li>
      <li><a href="about/credits">credits</a></li>
            </ul>
          </div>
        </body>
      
      </html>`);
      return true;
    } case "/studio": {
      if (url.query.templateId) fs.writeFileSync(process.env.DATABASES_FOLDER + `/starterIdSection.txt`, url.query.templateId);
      else {
        if (fs.existsSync(process.env.DATABASES_FOLDER + `/starterIdSection.txt`)) {
          fs.unlinkSync(process.env.DATABASES_FOLDER + `/starterIdSection.txt`);
        }
      }
      if (url.query.movieId) fs.writeFileSync(process.env.DATABASES_FOLDER + `/movieIdSection.txt`, url.query.movieId);
      else {
        if (fs.existsSync(process.env.DATABASES_FOLDER + `/movieIdSection.txt`)) {
          fs.unlinkSync(process.env.DATABASES_FOLDER + `/movieIdSection.txt`);
        }
      }
      res.setHeader("Content-Type", "text/html; charset=utf8");
      res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="movie-create">
        <head>
      
          <title>${url.query.howto ? "How To Make A Movie" : !url.query.movieId ? "create movie" : "edit movie"} | Zimmer Twins</title>
          <base href="${urlPrefix}://${req.headers.host}/"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta http-equiv="content-language" content="en-local"/>
          <meta name="description" content=""/>
          <meta name="keywords" content=""/>
          <meta name="copyright" content="(c)2006 Lost The Plot Productions"/>
      
          <meta name="robots" content="all"/>
          <meta http-equiv="imagetoolbar" content="no"/>
          <link rel="shortcut icon" href="https://web.archive.org/web/20061022092730im_/http://www.zimmertwins.ca/favicon.ico" type="image/x-icon"/>
          <script type="text/javascript" src="https://web.archive.org/web/20061022092730js_/http://www.zimmertwins.ca/themes/zimmertwins/js/shared.js"></script>
              <script src="https://web.archive.org/web/20061022092730js_/http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
          <script type="text/javascript">
            _uacct = "UA-295035-5";
            urchinTracker();
          </script>		
              <link rel="stylesheet" type="text/css" href="https://web.archive.org/web/20061022092730cs_/http://www.zimmertwins.ca/themes/zimmertwins/css/shared.css"/>
          <!--[if IE]><link rel="stylesheet" type="text/css" href="themes/zimmertwins/css/ie-win.css" media="screen" /><![endif]-->
        </head>
        <body class="en-local">
          <div id="wrapper">
            <div id="content">
                      <h1><span>${url.query.howto ? "How To Make A Movie" : !url.query.movieId ? "Create movie" : "Edit movie"}</span></h1>
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
      so.addVariable("userid","9");
      so.addVariable("lang","en-local");
      so.write("editor");
      </script>
      </div>
      <!-- end content -->			</div>
      
            <div id="sidebar">
              <a id="logo" href="/">Zimmer Twins</a>
              <ul id="nav">
                <li id="nav-home"><a href="">home</a></li>
      <li id="nav-watch"><a href="movie">watch</a></li>
      <li id="nav-make"><a href="starters">make</a></li>
      <li id="nav-telepicks"><a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help">help</a></li>
              </ul>
      <div id="quick-search">
        <h3>search</h3>
        <form action="/ajax/searchMovies/" method="post"><input type="text" class="form-text" name="q" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a target="_blank" href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
            </div>
            <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
             
          </div>
          <div id="footer">
            <ul>
              <li><a>&copy;2006 Lost The Plot</a></li>
              <li><a href="about/terms">terms of use</a></li>
      <li><a href="about/privacy">privacy policy</a></li>
      <li><a href="about/conduct">code of conduct</a></li>
      <li><a href="about/parents">parents</a></li>
      <li><a href="about/contact">contact</a></li>
      <li><a href="about/credits">credits</a></li>
            </ul>
          </div>
        </body>
      
      </html>`);
      return true;
    } case "/node": {
      var title;
      if (!fs.existsSync(process.env.DATABASES_FOLDER + `/${url.query.id}-title.txt`)) title = "Video Player";
      else title = fs.readFileSync(process.env.DATABASES_FOLDER + `/${url.query.id}-title.txt`);
      const f = !url.query.id ? ` onload="hideActions()"` : "";
      res.setHeader("Content-Type", "text/html; charset=utf8");
      res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="movie-watch">
        <head>
      
          <title>${title} | Zimmer Twins</title>
          <base href="${urlPrefix}://${req.headers.host}"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta http-equiv="content-language" content="en-local"/>
          <meta name="description" content=""/>
          <meta name="keywords" content=""/>
          <meta name="copyright" content="(c)2006 Lost The Plot Productions"/>
      
          <meta name="robots" content="all"/>
          <meta http-equiv="imagetoolbar" content="no"/>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <script type="text/javascript" src="https://web.archive.org/web/20061023093418js_/http://www.zimmertwins.ca/themes/zimmertwins/js/shared.js"></script>
              <script src="https://web.archive.org/web/20061023093418js_/http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
          <script type="text/javascript">
            _uacct = "UA-295035-5";
            urchinTracker();
          </script><script>function hideActions() { 
            document.getElementById("actions").style.display = "none";
            document.getElementById("info").style.display = "none"; 
          }</script>	
              <link rel="stylesheet" type="text/css" href="https://web.archive.org/web/20061023093418cs_/http://www.zimmertwins.ca/themes/zimmertwins/css/shared.css"/>
          <!--[if IE]><link rel="stylesheet" type="text/css" href="themes/zimmertwins/css/ie-win.css" media="screen" /><![endif]-->
        </head>
        <body${f} class="en-local">
          <div id="wrapper">
            <div id="content">
                      <h1><span>${title}</span></h1>
                                              <!-- begin content --><div id="panel">
        
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
      so.addVariable("flvurl","${url.query.flvurl || ""}");
      so.addVariable("asseturl","/files");
      so.addVariable("movieid","${url.query.id || ""}");
      so.addVariable("startername","${url.query.name || ""}");
      so.addVariable("userid","9");
      so.addVariable("lang","en-local");
      so.write("player");
      </script>
      </div>
        <div id="info">					
          <h4>${title}
      </h4>					
        </div>
        <div id="actions">
          <ul class="movie-actions">
                    <li class="flag"><a href="/movie/delete?movieId=${url.query.id}">Delete</a></li>
                        <li class="share"><a onclick="alert('While downloading this movie, everything will not be in it. Please be aware of that. if you are going to unpack this movie here, you will have to save it inside the studio while it loads after the movie has been unpacked here while you upload it using the movie upload feature that is here.')" href="/files/movies/${url.query.id}.txt" download="${title}.txt">Download</a></li>
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
      <li id="nav-telepicks"><a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help">help</a></li>
              </ul>
      <div id="quick-search">
        <h3>search</h3>
        <form action="/ajax/searchMovies/" method="post"><input type="text" class="form-text" name="q" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a target="_blank" href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
            </div>
            <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
             
          </div>
          <div id="footer">
            <ul>
              <li><a>&copy;2006 Lost The Plot</a></li>
              <li><a href="about/terms">terms of use</a></li>
      <li><a href="about/privacy">privacy policy</a></li>
      <li><a href="about/conduct">code of conduct</a></li>
      <li><a href="about/parents">parents</a></li>
      <li><a href="about/contact">contact</a></li>
      <li><a href="about/credits">credits</a></li>
            </ul>
          </div>
        </body>
      
      </html>`);
      return true;
    } case "/templates": {
      const files = movie.list("starter", "loadMore");
      var name, title;
      var id = url.query.id;
      if (url.query.uploaded) {
        name = fs.readFileSync(env.DATABASES_FOLDER + `/${id}-title.txt`);
        title = "";
      } else switch (url.query.id) {
        case "344704": {
          name = "surprise";
          title = "Suprise";
          break;
        } case "344709": {
          name = "idolhands";
          title = "Idol Hands";
          break;
        } case "199947": {
          name = "charming13";
          title = "Charming 13";
          break;
        } case "199946": {
          name = "rock-contest";
          title = "Rock Out!";
          break;
        } case "199944": {
          name = "13talks";
          title = "13 Talks";
          break;
        } case "16684": {
          name = "kitty-dreams";
          title = "Kitty Dreams";
          break;
        } case "16683": {
          name = "foiled";
          title = "Foiled!";
          break;
        } case "16682": {
          name = "mystery-box";
          title = "Mystery Box";
          break;
        } case "8": {
          name = "zapped";
          title = "Zapped";
          break;
        } case "7": {
          name = "misfortune";
          title = "Misfortune";
          break;
        } case "281145": {
          name = "fortune";
          title = "Fortune Misfortune";
          break;
        } case "3": {
          name = "joyride";
          title = "Joyride";
          break;
        } case "281136": {
          name = "run";
          title = "Run!";
          break;
        } case "344711": {
          name = "wheres13";
          title = "Where's 13?";
          break;
        } case "281144": {
          name = "gemjest";
          title = "Gem Jest";
          break;
        } default: {
          id = "344711"
          name = "wheres13";
          title = "Where's 13?";
          break;
        }
      }
      if (url.query.name == "joyride") title = "Joyride";
      res.setHeader("Content-Type", "text/html; charset=utf8");
      res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="make">
        <head>
      
          <title>Make a Movie | Zimmer Twins</title>
          <base href="${urlPrefix}://${req.headers.host}/"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta http-equiv="content-language" content="en-local"/>
          <meta name="description" content=""/>
          <meta name="keywords" content=""/>
          <meta name="copyright" content="(c)2006 Lost The Plot Productions"/>
      
          <meta name="robots" content="all"/>
          <meta http-equiv="imagetoolbar" content="no"/>
          <link rel="shortcut icon" href="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/favicon.ico" type="image/x-icon"/>
          <script type="text/javascript" src="https://web.archive.org/web/20070317063626js_/http://www.zimmertwins.ca/themes/zimmertwins/js/shared.js"></script>
                      <script src="https://web.archive.org/web/20070317063626js_/http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
            <script type="text/javascript">
              _uacct = "UA-295035-5";
              urchinTracker();
            </script>		
                    <link rel="stylesheet" type="text/css" href="https://web.archive.org/web/20070317063626cs_/http://www.zimmertwins.ca/themes/zimmertwins/css/shared.css"/>
          <!--[if IE]><link rel="stylesheet" type="text/css" href="themes/zimmertwins/css/ie-win.css" media="screen" /><![endif]-->
        </head>
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
      Pick a starter and<br/>make a movie!</p>
      <ul id="new-starters" class="movie-list new-starter">
        <li>  
        <a href="/templates?id=344704"><img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/surprise.png" alt="Suprise"/></a>  <dl>
          <dt><a href="/templates?id=344704">Suprise</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/templates?id=344709"><img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/idolhands.png" alt="Idol Hands"/></a>  <dl>
          <dt><a href="/templates?id=344709">Idol Hands</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/templates?id=344711"><img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/wheres13.png" alt="Where's 13?"/></a>  <dl>
          <dt><a href="/templates?id=344711">Where&#039;s 13?</a></dt>
        </dl>
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
        <a href="/templates?id=3"><img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/joyride.png" alt="Joyride"/></a>  <dl>
          <dt><a href="/templates?name=joyride">Joyride</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/templates?id=7"><img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/misfortune.png" alt="Misfortune"/></a>  <dl>
          <dt><a href="/templates?id=7">Misfortune</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/templates?id=8" class="active"><img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/zapped.png" alt="Zapped"/></a>  <dl>
          <dt><a href="/templates?id=8">Zapped</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/templates?id=16682"><img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/mystery-box.png" alt="Mystery Box"/></a>  <dl>
          <dt><a href="/templates?id=16682">Mystery Box</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/templates?id=16683"><img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/foiled.png" alt="Foiled!"/></a>  <dl>
          <dt><a href="/templates?id=16683">Foiled!</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/templates?id=16684"><img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/kitty-dreams.png" alt="Kitty Dreams"/></a>  <dl>
          <dt><a href="/templates?id=16684">Kitty Dreams</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/templates?id=199944"><img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/13talks.png" alt="13 Talks"/></a>  <dl>
          <dt><a href="/templates?id=199944">13 Talks</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/templates?id=199946"><img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/rock-contest.png" alt="Rock Out!"/></a>  <dl>
          <dt><a href="/templates?id=199946">Rock Out!</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/templates?id=199947"><img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/charming13.png" alt="Charming 13"/></a>  <dl>
          <dt><a href="/templates?id=199947">Charming 13</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/templates?id=281136"><img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/running-scared.png" alt="Run!"/></a>  <dl>
          <dt><a href="/templates?id=281136">Run!</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/templates?id=281144"><img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/gemjest.png" alt="Gem Jest"/></a>  <dl>
          <dt><a href="/templates?id=281144">Gem Jest</a></dt>
        </dl>
      </li>
        <li>  
        <a href="/templates?id=281145"><img src="https://web.archive.org/web/20070317063626im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/fortune.png" alt="Fortune Misfortune"/></a>  <dl>
          <dt><a href="/templates?id=281145">Fortune Misfortune</a></dt>
        </dl>
      </li>
      </ul>
      <h3>Uploaded Starters</h3>
      <ul id="past-starters" class="movie-list past-starter">${files.map(v => v.html).join('') || "<p>There are currently no uploaded starters at the monent. <a href='/upload?type=starter&loadMore=true'>Upload</a> a starter to get started.</p>"}</ul>
      <!-- end content -->			</div>
      
            <div id="sidebar">
              <a id="logo" href="/">Zimmer Twins</a>
              <ul id="nav">
                <li id="nav-home"><a href="">home</a></li>
      <li id="nav-watch"><a href="movie">watch</a></li>
      <li id="nav-make"><a href="starters">make</a></li>
      <li id="nav-telepicks"><a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help">help</a></li>
              </ul>
      <div id="quick-search">
        <h3>search</h3>
        <form action="/ajax/searchMovies/" method="post"><input type="text" class="form-text" name="q" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a target="_blank" href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
            </div>
            <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
             
          </div>
          <div id="footer">
            <ul>
              <li><a>&copy;2006 Lost The Plot</a></li>
              <li><a href="about/terms">terms of use</a></li>
      <li><a href="about/privacy">privacy policy</a></li>
      <li><a href="about/conduct">code of conduct</a></li>
      <li><a href="about/parents">parents</a></li>
      <li><a href="about/contact">contact</a></li>
      <li><a href="about/credits">credits</a></li>
            </ul>
          </div>
        </body>
      
      </html>`);
      return true;
    } case "/allowFlash": {
      res.setHeader("Content-Type", "text/html; charset=utf8");
      res.end('<a href="/">Home</a><br><br><br><br><br><br><br><center><object data="/files/flash_tree.swf" height="400" width="280" type="application/x-shockwave-flash"><param name="quality" value="high"><param name="bgcolor" value="#FAF6ED"><param name="play" value="true"><param name="loop" value="true"><param name="wmode" value="window"><param name="scale" value="showall"><param name="menu" value="true"><param name="devicefont" value="false"><param name="salign" value=""><param name="allowscriptaccess" value="sameDomain"></object></center>');
      return true;
    } case "/help": {
      res.setHeader("Content-Type", "text/html; charset=utf8");
      res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="help">
        <head>
      
          <title>Help | Zimmer Twins</title>
          <base href="${urlPrefix}://${req.headers.host}/"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta http-equiv="content-language" content="en-local"/>
          <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Wallpapers, Movies, Movie-Maker, Animated Stories, Learning, Literacy, Educational, Free, Activities, Art, Elementary, Primary, Eva, Edgar, Psychic, Creative, Characters, Scenes, Dialog, Parents, Family, TV, Canada, Teletoon, Aaron Leighton, zinc Roe."/>
          <meta name="description" content="The Zimmer Twins website invites kids to create and share their own animated stories."/>
          <meta name="copyright" content="(c)2006 Lost The Plot Productions"/>
      
          <meta name="robots" content="all"/>
          <meta http-equiv="imagetoolbar" content="no"/>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <script type="text/javascript" src="https://web.archive.org/web/20070326043612js_/http://www.zimmertwins.ca/themes/zimmertwins/js/shared.js"></script>
                      <script src="https://web.archive.org/web/20070326043612js_/http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
            <script type="text/javascript">
              _uacct = "UA-295035-5";
              urchinTracker();
            </script>		
                    <link rel="stylesheet" type="text/css" href="https://web.archive.org/web/20070326043612cs_/http://www.zimmertwins.ca/themes/zimmertwins/css/shared.css"/>
          <!--[if IE]><link rel="stylesheet" type="text/css" href="themes/zimmertwins/css/ie-win.css" media="screen" /><![endif]-->
        </head>
        <body class="en-local">
          <div id="wrapper">
            <div id="content">
                      <h1><span>Help</span></h1>
                                              <!-- begin content --><div class="node-content"><ol id="topics">
      <li id="quick">
      <a class="button" href="/studio?howto=1">How To Make A Movie</a>
      <a class="button" href="welcome">Zimmer Twins Tour</a>
      </li>
        <li id="toc">
          <h3>Table Of Contents</h3>
          <ol>
            <li><a href="/help#gettingStarted">Getting Started</a></li>
            <li><a href="/help#movies">Movies</a></li>
            <li><a href="/help#flash">Adobe Flash Questions For Chromium</a></li>
            <li><a href="/help#videoList">Questions Relating To The Video List</a></li>
            <li><a href="/help#siteRequirements">Site Requirements</a></li>
            <li><a href="/help#feedback">Feedback</a></li>
          </ol>
        </li>
        
        <li id="gettingStarted">
          <h3>Getting Started <a href="/help#wrapper">Top</a></h3>
          <ol>
            <li>
              <h2>What's this all about?</h2>
      
              
              <p>On zimmertwins, you create your own endings to one of our story starters. You may also create your stories from scratch. The very best endings will be broadcast coast-to-coast on <a href="http://www.teletoon.com/">TELETOON</a>! So put on your director's hat because we're going to make some TV!</p>
            </li>
            <li>
              <h2>Who are the Zimmer Twins?</h2>
              <p>Edgar and Eva Zimmer are an ordinary pair of 12 year-olds except for one thing - they have psychic powers. They weren't always psychic though. The weirdness began when they adopted a black cat named 13. From that point on, they strange things began to happen. How strange? Well, watch some of the <a href="/web/20070326043612/http://www.zimmertwins.ca/starters">starters</a> and you'll get the idea.</p>
            </li>
            <li>
              <h2>Do i need to be 13+ to use zimmertwins?</h2>
              <p>If you are under the age of 13, then you can't use zimmertwins to create movies. sorry, but it is the law inside the goanimate community if you are in it or not. In other words, yes, you do need to be 13+ in order to use zimmertwins.</p>
            </li>
          </ol>
        </li>
        <li id="movies">
          <h3>Movies <a href="/help#wrapper">Top</a></h3>
          <ol>
            <li>
              <h2>How do I create a movie?</h2>
              <p>
              First, you need to head to the <a href="/starters">make a movie</a> page then pick a starter that you would like to make an ending for. Click on 'Make Movie' and away you go. If you don't want to use a starter you can also <a href="/studio">make a movie from stratch</a>.
                  </p>
            </li>
            <li>
              <h2>How do I edit a movie that I've already made?</h2>
               <p>
              First, you need to head to the <a href="/movie">watch a movie</a> page then find a movie that you want to edit. Once you found the movie, click on it and below it, there will be 3 choices. One is download, second is delete, and third is edit. What you want to click on is the edit button and then your movie will load inside the studio for you to edit.
                  </p>
            </li>
            <li>
              <h2>How do I delete a movie I don't want to keep anymore?</h2>
              <p>
              First, you need to head to the <a href="/movie">watch a movie</a> page then find a movie that you want to delete. Once you found the movie, click on it and below it, there will be 3 choices. One is download, second is delete, and third is edit. What you want to click on is the delete button and then your movie will go away from the list for good. Note: there is no turning back if you do this unless you downloaded a backup copy of your movie.
                  </p>
            </li>
            <li>
              <h2>How do I download a backup copy of my movie?</h2>
              <p>
              First, you need to head to the <a href="/movie">watch a movie</a> page then find a movie that you want to download. Once you found the movie, click on it and below it, there will be 3 choices. One is download, second is delete, and third is edit. What you want to click on is the download button and then your movie will be saved to your files. the filename of your movie is going to be the title of your movie so that you can keep things in place. please keep that in mind.
                  </p>
            </li>
          </ol>
        </li>
        <li id="videoList">
          <h3>Questions relating to the videolist <a href="/help#wrapper">Top</a></h3>
          <ol>
            <li>
              <h2>Why is the your movies section including the watch a movie page always blank?</h2>
              <p>That will be because you haven't made any movies yet. to do so, go to the <a href="/starters">make a movie</a> page.</p>
            </li>
            <li>
              <h2>How do I find my friends' movies?</h2>
              <p>Type their nickname in the search box and press 'go'. Remember that you can see a list of their movies by clicking on their nickname anywhere it appears on the site.</p>
            </li>
          </ol>
        </li>
        <li id="flash">
          <h3>Adobe Flash Questions For Chromium <a href="/help#wrapper">Top</a></h3>
          <ol>
            <li>
              <h2>Flash isn't working! what do i do?</h2>
              <p>You can try using the Allow Flash button below to fix the issue. if that dosen't work, then that means that flash isn't installed for chromium. to install flash, <a href="/files/flash_windows_chromium.msi">Click here</a>.<br><a href="/allowFlash">Allow Flash</a></p>
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
              <p>Yes. We recommend a 1Mbps or faster connection such as would be found with a DSL or cable connection. While a slower connection may work, you will have to be extraordinarily patient.</p>
            </li>
          </ol>
        </li>
        <li id="feedback">
          <h3>Feedback <a href="/help#wrapper">Top</a></h3>
          <ol>
            <li>
              <h2>Something on the site is broken. Can you fix it?</h2>
              <p>We certainly can try! Before you report a problem, please check our <a href="#siteRequirements">site requirements</a>. If your computer meets these requirements and something still isn't working properly, then let us know about it by using the <a href="/about/contact">contact form</a>. Please be as specific as possible when you explain what the problem is and we'll make every effort to fix it.</p>
            </li>
            <li>
              <h2>How can I make suggestions for the website?</h2>
              <p>We'd love to hear from you and, unlike the Zimmer Twins, we're not psychic! To make a suggestion, use our <a href="/about/contact">contact form</a>.</p>
            </li>
            <li>
              <h2>I think the Zimmer Twins are super cool. Do you like fan mail?</h2>
              <p>In our books, fan mail is right up there with free samples of chocolate and snow days. We LOVE fan mail! Our team put a lot of work into creating the Zimmer Twins and it's always nice to here from you. Drop us a line with the <a href="/about/contact">contact form</a>.</p>
            </li>
          </ol>
        </li>
      </ol></div><!-- end content -->			</div>
      
            <div id="sidebar">
              <a id="logo" href="/">Zimmer Twins</a>
              <ul id="nav">
                <li id="nav-home"><a href="">home</a></li>
      <li id="nav-watch"><a href="movie">watch</a></li>
      <li id="nav-make"><a href="starters">make</a></li>
      <li id="nav-telepicks"><a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help" class="active">help</a></li>
              </ul>
      <div id="quick-search">
        <h3>search</h3>
        <form action="/ajax/searchMovies/" method="post"><input type="text" class="form-text" name="q" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a target="_blank" href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
            </div>
            <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
             
          </div>
          <div id="footer">
            <ul>
              <li><span>&copy;2006 Lost The Plot</span></li>
              <li><a href="about/terms">terms of use</a></li>
      <li><a href="about/privacy">privacy policy</a></li>
      <li><a href="about/conduct">code of conduct</a></li>
      <li><a href="about/parents">parents</a></li>
      <li><a href="about/contact">contact</a></li>
      <li><a href="about/credits">credits</a></li>
            </ul>
          </div>
        </body>
      
      </html>`);
      return true;
    } case "/welcome": {
      res.setHeader("Content-Type", "text/html; charset=utf8");
      res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local">
        <head>
      
          <title>Zimmer Twins Tour | Zimmer Twins</title>
          <base href="${urlPrefix}://${req.headers.host}/"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta http-equiv="content-language" content="en-local"/>
          <meta name="description" content=""/>
          <meta name="keywords" content=""/>
          <meta name="copyright" content="(c)2006 Lost The Plot Productions"/>
      
          <meta name="robots" content="all"/>
          <meta http-equiv="imagetoolbar" content="no"/>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <script type="text/javascript" src="https://web.archive.org/web/20070219211300js_/http://www.zimmertwins.ca/themes/zimmertwins/js/shared.js"></script>
                      <script src="https://web.archive.org/web/20070219211300js_/http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
            <script type="text/javascript">
              _uacct = "UA-295035-5";
              urchinTracker();
            </script>		
                    <link rel="stylesheet" type="text/css" href="https://web.archive.org/web/20070219211300cs_/http://www.zimmertwins.ca/themes/zimmertwins/css/shared.css"/>
          <!--[if IE]><link rel="stylesheet" type="text/css" href="themes/zimmertwins/css/ie-win.css" media="screen" /><![endif]-->
        </head>
        <body class="en-local">
          <div id="wrapper">
            <div id="content">
                      <h1><span>Zimmer Twins Tour</span></h1>
                                              <!-- begin content --><div class="node-content"><div id="flv-player">
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
      </div></div><!-- end content -->			</div>
      
            <div id="sidebar">
              <a id="logo" href="/">Zimmer Twins</a>
              <ul id="nav">
                <li id="nav-home"><a href="">home</a></li>
      <li id="nav-watch"><a href="movie">watch</a></li>
      <li id="nav-make"><a href="starters">make</a></li>
      <li id="nav-telepicks"><a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help">help</a></li>
              </ul>
      <div id="quick-search">
        <h3>search</h3>
        <form action="/ajax/searchMovies/" method="post"><input type="text" class="form-text" name="edit[keys]" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a target="_blank" href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
            </div>
            <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
             
          </div>
          <div id="footer">
            <ul>
              <li><a>&copy;2006 Lost The Plot</a></li>
              <li><a href="about/terms">terms of use</a></li>
      <li><a href="about/privacy">privacy policy</a></li>
      <li><a href="about/conduct">code of conduct</a></li>
      <li><a href="about/parents">parents</a></li>
      <li><a href="about/contact">contact</a></li>
      <li><a href="about/credits">credits</a></li>
            </ul>
          </div>
        </body>
      
      </html>`);
      return true;
    } case "/movie/search": {
      res.setHeader("Content-Type", "text/html; charset=utf8");
      res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local">
        <head>
      
          <title>Search | Zimmer Twins</title>
          <base href="${urlPrefix}://${req.headers.host}/"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta http-equiv="content-language" content="en-local"/>
          <meta name="description" content=""/>
          <meta name="keywords" content=""/>
          <meta name="copyright" content="(c)2006 Lost The Plot Productions"/>
      
          <meta name="robots" content="all"/>
          <meta http-equiv="imagetoolbar" content="no"/>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <script type="text/javascript" src="https://web.archive.org/web/20070219082617js_/http://www.zimmertwins.ca/themes/zimmertwins/js/shared.js"></script>
                      <script src="https://web.archive.org/web/20070219082617js_/http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
            <script type="text/javascript">
              _uacct = "UA-295035-5";
              urchinTracker();
            </script>		
                    <link rel="stylesheet" type="text/css" href="https://web.archive.org/web/20070219082617cs_/http://www.zimmertwins.ca/themes/zimmertwins/css/shared.css"/>
          <!--[if IE]><link rel="stylesheet" type="text/css" href="themes/zimmertwins/css/ie-win.css" media="screen" /><![endif]-->
        </head>
        <body class="en-local">
          <div id="wrapper">
            <div id="content">
                      <h1><span>Search</span></h1>
                                              <!-- begin content --><form action="/ajax/searchMovies/" method="post" id="search-form">
      <fieldset><div class="form-item">
       <label for="edit-keys">Keyword:</label>
       <input type="text" maxlength="64" class="form-text" name="q" id="edit-keys" size="64" value=""/>
      </div>
      <div class="form-item">
       <label for="edit-type">Movie Type:</label>
       <select name="type" id="edit-type"><option value="all" selected="selected">All</option><option value="contains-starters">Contains Starters</option><option value="uploaded">Uploaded</option></select>
      </div>
      </fieldset>
      <input type="submit" class="form-submit" name="op" value="Search"/>
      
      </form>
      <!-- end content -->			</div>
      
            <div id="sidebar">
              <a id="logo" href="/">Zimmer Twins</a>
              <ul id="nav">
                <li id="nav-home"><a href="">home</a></li>
      <li id="nav-watch"><a href="movie">watch</a></li>
      <li id="nav-make"><a href="starters">make</a></li>
      <li id="nav-telepicks"><a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help">help</a></li>
              </ul>
      <div id="quick-search">
        <h3>search</h3>
        <form action="/ajax/searchMovies/" method="post"><input type="text" class="form-text" name="q" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search" class="active">advanced search</a>
      </form>
      </div>
                              <a target="_blank" href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
            </div>
            <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
             
          </div>
          <div id="footer">
            <ul>
              <li><a>&copy;2006 Lost The Plot</a></li>
              <li><a href="about/terms">terms of use</a></li>
      <li><a href="about/privacy">privacy policy</a></li>
      <li><a href="about/conduct">code of conduct</a></li>
      <li><a href="about/parents">parents</a></li>
      <li><a href="about/contact">contact</a></li>
      <li><a href="about/credits">credits</a></li>
            </ul>
          </div>
        </body>
      
      </html>`);
      return true;
    } case "/search": {
      const type = !url.query.filters ? "" : url.query.filters;
      const files = movie.search(url.query.q, type);
      if (!url.query.q) {
        res.statusCode = 302;
        res.setHeader("Location", "/movie/search");
        res.end();
      } else {
        res.setHeader("Content-Type", "text/html; charset=utf8");
        res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local" id="watch">
          <head>
        
            <title>Search For Movies | Zimmer Twins</title>
            <base href="${urlPrefix}://${req.headers.host}/"/>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
            <meta http-equiv="content-language" content="en-local"/>
            <meta name="description" content=""/>
            <meta name="keywords" content=""/>
            <meta name="copyright" content="(c)2006 Lost The Plot Productions"/>
        
            <meta name="robots" content="all"/>
            <meta http-equiv="imagetoolbar" content="no"/>
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
            <script type="text/javascript" src="https://web.archive.org/web/20061023094121js_/http://www.zimmertwins.ca/themes/zimmertwins/js/shared.js"></script>
                <script src="https://web.archive.org/web/20061023094121js_/http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
            <script type="text/javascript">
              _uacct = "UA-295035-5";
              urchinTracker();
            </script>		
                <link rel="stylesheet" type="text/css" href="https://web.archive.org/web/20061023094121cs_/http://www.zimmertwins.ca/themes/zimmertwins/css/shared.css"/>
            <!--[if IE]><link rel="stylesheet" type="text/css" href="themes/zimmertwins/css/ie-win.css" media="screen" /><![endif]-->
          </head>
          <body class="en-local">
            <div id="wrapper">
              <div id="content">
                        <h1><span>Search For Movies</span></h1>
                                                <!-- begin content -->
        
        <ul class="movie-list now-showing">${files.map(v => v.html).join('') || '<h3>No movies were found</h3>'}</ul>
        <!-- end content -->			</div>
        
              <div id="sidebar">
                <a id="logo" href="/">Zimmer Twins</a>
                <ul id="nav">
                  <li id="nav-home"><a href="">home</a></li>
        <li id="nav-watch"><a href="movie" class="active">watch</a></li>
        <li id="nav-make"><a href="starters">make</a></li>
        <li id="nav-telepicks"><a target="_blank" href="https://www.youtube.com/channel/UCCVQTNiEGqQBD-qXls5VS6g/videos">telepicks</a></li>
        <li id="nav-extras"><a href="extras">extras</a></li>
        <li id="nav-help"><a href="help">help</a></li>
                </ul>
        <div id="quick-search">
          <h3>search</h3>
          <form action="/ajax/searchMovies/" method="post"><input type="text" class="form-text" name="q" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
        <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
        </form>
        </div>
                                <a target="_blank" href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
        
              </div>
              <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
               
            </div>
            <div id="footer">
              <ul>
                <li><a>&copy;2006 Lost The Plot</a></li>
                <li><a href="about/terms">terms of use</a></li>
        <li><a href="about/privacy">privacy policy</a></li>
        <li><a href="about/conduct">code of conduct</a></li>
        <li><a href="about/parents">parents</a></li>
        <li><a href="about/contact">contact</a></li>
        <li><a href="about/credits">credits</a></li>
              </ul>
            </div>
          </body>
        
        </html>`);
      }
      return true;
    } case "/agecheck": {
      const age = fs.existsSync(process.env.DATABASES_FOLDER + `/age.txt`) ? fs.readFileSync(process.env.DATABASES_FOLDER + `/age.txt`) : "";
      if (age == "1" || age == "2" || age == "3" || age == "4" || age == "5" || age == "6" || age == "7" || age == "8" || age == "9" || age == "10" || age == "11" || age == "12") res.end("Access Denied");
      else if (!fs.existsSync(process.env.DATABASES_FOLDER + `/age.txt`)) res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local">
        <head>
      
          <title>Let&#039;s get started! | Zimmer Twins</title>
          <base href="${urlPrefix}://${req.headers.host}/"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta http-equiv="content-language" content="en-local"/>
          <meta name="description" content=""/>
          <meta name="keywords" content=""/>
          <meta name="copyright" content="(c)2006 Lost The Plot Productions"/>
      
          <meta name="robots" content="all"/>
          <meta http-equiv="imagetoolbar" content="no"/>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <script type="text/javascript" src="https://web.archive.org/web/20061023094621js_/http://www.zimmertwins.ca/themes/zimmertwins/js/shared.js"></script>
              <script src="https://web.archive.org/web/20061023094621js_/http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
          <script type="text/javascript">
            _uacct = "UA-295035-5";
            urchinTracker();
          </script>		
              <link rel="stylesheet" type="text/css" href="https://web.archive.org/web/20061023094621cs_/http://www.zimmertwins.ca/themes/zimmertwins/css/shared.css"/>
          <!--[if IE]><link rel="stylesheet" type="text/css" href="themes/zimmertwins/css/ie-win.css" media="screen" /><![endif]-->
        </head>
        <body class="en-local">
          <div id="wrapper">
            <div id="content">
                      <h1><span>Let&#039;s get started!</span></h1>
                                              <!-- begin content --><form action="/ajax/checkAge${url.query.path ? `?redirect_to=/${url.query.path}` : ""}" method="post">
      <fieldset><legend>How Old Are You? <a target="_blank" href="https://www.google.com/search?q=why+is+your+age+required+in+order+to+use+websites">Why is this required?</a></legend>
      <div class="form-item">
       <label for="edit-birthday][year">Age:</label>
       <input type="text" maxlength="4" class="form-text" name="age" id="edit-birthday][year" size="4" value=""/>
      </div>
      </fieldset>
      <input type="submit" class="form-submit" name="op" value="Procced To Signup"/>
      
      </form>
      <!-- end content -->			</div>
      
            <div id="sidebar">
              <a id="logo" href="/">Zimmer Twins</a>
              <ul id="nav">
                <li id="nav-home"><a href="">home</a></li>
      <li id="nav-watch"><a href="movie">watch</a></li>
      <li id="nav-make"><a href="starters">make</a></li>
      <li id="nav-telepicks"><a href="telepicks">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help">help</a></li>
              </ul>
      <div id="quick-search">
        <h3>search</h3>
        <form action="/ajax/searchMovies/" method="post"><input type="text" class="form-text" name="q" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a target="_blank" href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
            </div>
            <a id="teletoon" href="http://www.teletoon.com/">Teletoon</a>
             
          </div>
          <div id="footer">
            <ul>
              <li><a>&copy;2006 Lost The Plot</a></li>
              <li><a href="about/terms">terms of use</a></li>
      <li><a href="about/privacy">privacy policy</a></li>
      <li><a href="about/conduct">code of conduct</a></li>
      <li><a href="about/parents">parents</a></li>
      <li><a href="about/contact">contact</a></li>
      <li><a href="about/credits">credits</a></li>
            </ul>
          </div>
        </body>
      
      </html>`);
      else res.end(`<html><head><script>function redir() { 
        location.href = '/user/register'; 
      }</script></head><body onload="redir()"></body></html>`);
      return true;
    } case "/user/register": {
      const age = fs.existsSync(process.env.DATABASES_FOLDER + `/age.txt`) ? fs.readFileSync(process.env.DATABASES_FOLDER + `/age.txt`) : "";
      if (age == "1" || age == "2" || age == "3" || age == "4" || age == "5" || age == "6" || age == "7" || age == "8" || age == "9" || age == "10" || age == "11" || age == "12") res.end("Access Denied");
      else if (fs.existsSync(process.env.DATABASES_FOLDER + `/age.txt`)) res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local">
        <head>
      
          <title>Let's get you signed up! | Zimmer Twins</title>
          <base href="${urlPrefix}://${req.headers.host}/"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta http-equiv="content-language" content="en-local"/>
          <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Wallpapers, Movies, Movie-Maker, Animated Stories, Learning, Literacy, Educational, Free, Activities, Art, Elementary, Primary, Eva, Edgar, Psychic, Creative, Characters, Scenes, Dialog, Parents, Family, TV, Canada, Teletoon, Aaron Leighton, zinc Roe."/>
          <meta name="description" content="The Zimmer Twins website invites kids to create and share their own animated stories."/>
          <meta name="copyright" content="(c)2006 Lost The Plot Productions"/>
      
          <meta name="robots" content="all"/>
          <meta http-equiv="imagetoolbar" content="no"/>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <script type="text/javascript" src="https://web.archive.org/web/20070813045227js_/http://www.zimmertwins.ca/themes/zimmertwins/js/shared.js"></script>
                      <script src="https://web.archive.org/web/20070813045227js_/http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
            <script type="text/javascript">
              _uacct = "UA-295035-5";
              urchinTracker();
            </script>		
                    <link rel="stylesheet" type="text/css" href="https://web.archive.org/web/20070813045227cs_/http://www.zimmertwins.ca/themes/zimmertwins/css/shared.css"/>
          <!--[if IE]><link rel="stylesheet" type="text/css" href="themes/zimmertwins/css/ie-win.css" media="screen" /><![endif]-->
        </head>
        <body class="en-local">
          <div id="wrapper">
            <div id="content">
                      <h1><span>Let's get you signed up!</span></h1>
                                              <!-- begin content --><form action="/ajax/createAccont/" method="post">
      <div class="form-item">
       <label for="edit-name">Username:</label>
       <input type="text" maxlength="64" class="form-text" name="username" id="edit-name" size="30" value=""/>
       <div class="description">Enter the username that you want to use in zimmer twins.</div>
      </div>
      <input type="submit" class="form-submit" name="op" value="Create Account"/>
      
      </form>
      <!-- end content -->			</div>
      
            <div id="sidebar">
              <a id="logo" href="/">Zimmer Twins</a>
              <ul id="nav">
                <li id="nav-home"><a href="">home</a></li>
      <li id="nav-watch"><a href="movie">watch</a></li>
      <li id="nav-make"><a href="starters">make</a></li>
      <li id="nav-telepicks"><a href="telepicks">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help">help</a></li>
              </ul>
              <div id="quick-search">
        <h3>search</h3>
        <form action="/ajax/searchMovies/" method="post"><input type="text" class="form-text" name="q" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a target="_blank" href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
            </div>
            <p>Already Have An Account? <a href="/user/login">Login</a></p>
             
          </div>
          <div id="footer">
            <ul>
              <li><span>&copy;2007 Lost The Plot</span></li>
              <li><a href="about/terms">terms of use</a></li>
      <li><a href="about/privacy">privacy policy</a></li>
      <li><a href="about/conduct">code of conduct</a></li>
      <li><a href="about/parents">parents</a></li>
      <li><a href="about/contact">contact</a></li>
      <li><a href="about/credits">credits</a></li>
            </ul>
          </div>
        </body>
      
      </html>`);
      else res.end(`<html><head><script>function redir() { 
        location.href = '/agecheck?path=user/register'; 
      }</script></head><body onload="redir()"></body></html>`);
      return true;
    } case "/user/login": {
      const age = fs.existsSync(process.env.DATABASES_FOLDER + `/age.txt`) ? fs.readFileSync(process.env.DATABASES_FOLDER + `/age.txt`) : "";
      if (age == "1" || age == "2" || age == "3" || age == "4" || age == "5" || age == "6" || age == "7" || age == "8" || age == "9" || age == "10" || age == "11" || age == "12") res.end("Access Denied");
      else if (fs.existsSync(process.env.DATABASES_FOLDER + `/age.txt`)) {
        if (!fs.existsSync(process.env.DATABASES_FOLDER + `/name.txt`)) res.end(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" lang="en-local">
        <head>
      
          <title>Login | Zimmer Twins</title>
          <base href="${urlPrefix}://${req.headers.host}/"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta http-equiv="content-language" content="en-local"/>
          <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Wallpapers, Movies, Movie-Maker, Animated Stories, Learning, Literacy, Educational, Free, Activities, Art, Elementary, Primary, Eva, Edgar, Psychic, Creative, Characters, Scenes, Dialog, Parents, Family, TV, Canada, Teletoon, Aaron Leighton, zinc Roe."/>
          <meta name="description" content="The Zimmer Twins website invites kids to create and share their own animated stories."/>
          <meta name="copyright" content="(c)2006 Lost The Plot Productions"/>
      
          <meta name="robots" content="all"/>
          <meta http-equiv="imagetoolbar" content="no"/>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <script type="text/javascript" src="https://web.archive.org/web/20070813045227js_/http://www.zimmertwins.ca/themes/zimmertwins/js/shared.js"></script>
                      <script src="https://web.archive.org/web/20070813045227js_/http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
            <script type="text/javascript">
              _uacct = "UA-295035-5";
              urchinTracker();
            </script>		
                    <link rel="stylesheet" type="text/css" href="https://web.archive.org/web/20070813045227cs_/http://www.zimmertwins.ca/themes/zimmertwins/css/shared.css"/>
          <!--[if IE]><link rel="stylesheet" type="text/css" href="themes/zimmertwins/css/ie-win.css" media="screen" /><![endif]-->
        </head>
        <body class="en-local">
          <div id="wrapper">
            <div id="content">
                      <h1><span>Login</span></h1>
                                              <!-- begin content --><form action="/ajax/login" method="post">
      <div class="form-item">
       <label for="edit-name">Username:</label>
       <input type="text" maxlength="64" class="form-text" name="username" id="edit-name" size="30" value=""/>
       <div class="description">Enter the username that you used while you were signing up to use zimmer twins.</div>
      </div>
      <input type="submit" class="form-submit" name="op" value="Login"/>
      
      </form>
      <!-- end content -->			</div>
      
            <div id="sidebar">
              <a id="logo" href="/">Zimmer Twins</a>
              <ul id="nav">
                <li id="nav-home"><a href="">home</a></li>
      <li id="nav-watch"><a href="movie">watch</a></li>
      <li id="nav-make"><a href="starters">make</a></li>
      <li id="nav-telepicks"><a href="telepicks">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help">help</a></li>
              </ul>
              <div id="quick-search">
        <h3>search</h3>
        <form action="/ajax/searchMovies/" method="post"><input type="text" class="form-text" name="q" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a target="_blank" href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
            </div>
            <p>Don't Have An Account? <a href="/user/register">Register</a></p>
             
          </div>
          <div id="footer">
            <ul>
              <li><span>&copy;2007 Lost The Plot</span></li>
              <li><a href="about/terms">terms of use</a></li>
      <li><a href="about/privacy">privacy policy</a></li>
      <li><a href="about/conduct">code of conduct</a></li>
      <li><a href="about/parents">parents</a></li>
      <li><a href="about/contact">contact</a></li>
      <li><a href="about/credits">credits</a></li>
            </ul>
          </div>
        </body>
      
      </html>`);
      else res.end(`<html><head><script>function redir() { 
        location.href = '/'; 
      }</script></head><body onload="redir()"></body></html>`);
    } else res.end(`<html><head><script>function redir() { 
        location.href = '/agecheck?path=user/register'; 
      }</script></head><body onload="redir()"></body></html>`);
      return true;
    } default: {
      res.end('<a href="/">Home</a><br><center><p>404 Not Found</p></center>');
      return;
    }
  }
};
