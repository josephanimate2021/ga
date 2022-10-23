const fs = require("fs"),
fUtil = require("./fileUtil"),
env = require("./env"),
movie = require("./movie/main")

module.exports = function (req, res, url) {
  if (req.method != "GET") return;
  var html;

  const urlPrefix = req.headers.host == "localhost" ? "http" : req.headers.host == `localhost:${process.env.port}` ? "http" : "https";
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
          </script>		
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
            <li id="links-join"><a href="user/register">Join !</a></li>
        </ul>
      
      <div id="movies">
      <h3>Your Movies</h3>
      <ul class="movie-list mustsee">${files.map(v => v.html) || "<li><p>Nothing to see here.</p></li>"}</ul>
      </div>
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
        <form action="movie/search" method="post"><input type="text" class="form-text" name="edit[keys]" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
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
      
      <ul class="movie-list now-showing">${files.map(v => v.html) || "<li><p>Nothing to see here.</p></li>"}</ul>
      <!-- end content -->			</div>
      
            <div id="sidebar">
              <a id="logo" href="/">Zimmer Twins</a>
              <ul id="nav">
                <li id="nav-home"><a href="">home</a></li>
      <li id="nav-watch"><a href="movie" class="active">watch</a></li>
      <li id="nav-make"><a href="starters">make</a></li>
      <li id="nav-telepicks"><a href="telepicks">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help">help</a></li>
              </ul>
      <div id="quick-search">
        <h3>search</h3>
        <form action="movie/search" method="post"><input type="text" class="form-text" name="edit[keys]" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
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
      switch (url.query.id) {
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
        } default: {
          id = "281144"
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
        <h2><a href="/studio?templateId=${id}">Make Movie From <span>${title}</span></a></h2>
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
      <!-- end content -->			</div>
      
            <div id="sidebar">
              <a id="logo" href="/">Zimmer Twins</a>
              <ul id="nav">
                <li id="nav-home"><a href="">home</a></li>
      <li id="nav-watch"><a href="movie">watch</a></li>
      <li id="nav-make"><a href="starters" class="active">make</a></li>
      <li id="nav-telepicks"><a href="telepicks">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help">help</a></li>
              </ul>
      <div id="quick-search">
        <h3>search</h3>
        <form action="movie/search" method="post"><input type="text" class="form-text" name="edit[keys]" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
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
      
          <title>${!url.query.movieId ? "create movie" : "edit movie"} | Zimmer Twins</title>
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
                      <h1><span>${!url.query.movieId ? "Create movie" : "Edit movie"}</span></h1>
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
      <li id="nav-telepicks"><a href="telepicks">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help">help</a></li>
              </ul>
      <div id="quick-search">
        <h3>search</h3>
        <form action="movie/search" method="post"><input type="text" class="form-text" name="edit[keys]" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
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
      <li id="nav-telepicks"><a href="telepicks">telepicks</a></li>
      <li id="nav-extras"><a href="extras">extras</a></li>
      <li id="nav-help"><a href="help">help</a></li>
              </ul>
      <div id="quick-search">
        <h3>search</h3>
        <form action="movie/search" method="post"><input type="text" class="form-text" name="edit[keys]" id="sidebar-search-keyword" maxlength="50" size="10" value=""/>
      <input type="submit" class="form-submit" value="Go"/><a href="movie/search">advanced search</a>
      </form>
      </div>
                              <a href="http://www.jumeauxzimmer.ca/">Zimmertwins 2020 Archive</a>
      
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
    }
  }
};
