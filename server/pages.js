const fs = require("fs"),
fUtil = require("./fileUtil"),
env = require("./env");
const movie = require("./movie/main")

module.exports = function (req, res, url) {
  if (req.method != "GET") return;
  var html;

  const urlPrefix = req.headers.host == "localhost" ? "http" : req.headers.host == `localhost:${process.env.port}` ? "http" : "https";
  var tutorial, studioTitle;
  if (url.query.tutorial == "0") {
    tutorial = "1";
    studioTitle = "How To Make A Movie";
  } else {
    tutorial = "";
    studioTitle = "Create Movie";
  }
  var name, title, id;
  // assign some names and titles for the /templates path so that i don't have to use so many htmls lol.
  switch (url.query.currentId) {
    // current starters
    case "42": {
      id = "42";
      name = "mystery-box";
      title = "Mystery Box";
      break;
    } case "44": {
      id = "44";
      name = "foiled";
      title = "Foiled!";
      break;
    } case "46": {
      id = "46";
      name = "kitty-dreams";
      title = "Kitty Dreams";
      break;
    // past starters
    } case "43": {
      id = "43";
      name = "gemjest";
      title = "Gem Jest";
      break;
    } case "45": {
      id = "45";
      name = "run";
      title = "Run!";
      break;
    } case "47": {
      id = "47";
      name = "fortune";
      title = "Fortune Misfortune";
      break;
    } case "48": {
      id = "48";
      name = "surprise";
      title = "Surprise";
      break;
    } case "50": {
      id = "50";
      name = "rock-contest";
      title = "Rock Out!";
      break;
    } case "51": {
      id = "51";
      name = "13talks";
      title = "13 Talks";
      break;
    } case "59": {
      id = "59";
      name = "charming13";
      title = "Charming 13";
      break;
    } default: {
      id = "53";
      name = "idolhands";
      title = "Idol Hands";
      break;
    }
  }
  const script = `<script>function apiVerSelectForStudio(mId = false) {
    const yesorno = confirm('Do you want to use version 2 of the studio? if not, then you will be redirected to version 1 of the studio.');
    if (yesorno) {
      if (mId) location.href = \`/studio?movieId=\${mId}&version=2\`;
      else location.href = '/ajax/firstTimeCheck?ver=2';
    } else {
      if (mId) location.href = \`/studio?movieId=\${mId}\`;
      else location.href = '/ajax/firstTimeCheck';
    }
  } function apiVerSelectForPlayer(mId = false) {
    const yesorno = confirm('Do you want to use version 2 of the player? if not, then you will be redirected to version 1 of the player.');
    if (yesorno) {
      if (mId) location.href = \`/player?movieId=\${mId}&version=2\`;
      else location.href = '/player?version=2';
    } else {
      if (mId) location.href = \`/player?movieId=\${mId}\`;
      else location.href = '/player';
    }
  }</script>`;
  switch (url.pathname) {
    case "/images": {
      res.end(fs.readFileSync(`./files/${url.query.file}`));
      break;
    } case "/videos/html5": {
      res.setHeader("Content-Type", "video/mp4");
      res.end(fs.readFileSync(`./files/${url.query.file}`));
      break;
    } case "/home": {
      html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-local" lang="en-local" id="page-zt-frontpage">
        <head>
      
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <title>Home | Zimmer Twins at School</title>
          <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, School, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
          <meta name="description" content="The Zimmer Twins at School website invites teachers and students to create and share their own animated stories."/>
          <meta name="copyright" content="©2020 Lost The Plot Productions"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <link rel="shortcut icon" href="https://web.archive.org/web/20200204050542im_/http://www.zimmertwinsatschool.com/sites/zimmertwinsatschool.com/themes/zimmertwins_education/images/favicon.ico" type="image/x-icon"/>
          <link type="text/css" rel="stylesheet" media="all" href="https://web.archive.org/web/20200204050542cs_/http://www.zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/css/A.css_97c345e5473bbf14caff4d84125f1008.css.pagespeed.cf.GmVhnvQXT8.css"/>
          <!--[if IE]>
            <link type="text/css" rel="stylesheet" media="all" href="/sites/zimmertwinsatschool.com/themes/zimmertwins_education/ie.css" />
          <![endif]-->
          <script type="text/javascript" src="https://web.archive.org/web/20200204050542js_/http://www.zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/js/js_b4b8414e9f53fe14bc2267bfc30775ab.js.pagespeed.jm.vM1isTyUh8.js"></script>
      <script type="text/javascript">//<![CDATA[
      jQuery.extend(Drupal.settings,{"basePath":"/","fivestar":{"titleUser":"Your rating: ","titleAverage":"Average: ","feedbackSavingVote":"Saving vote...\r\n","feedbackVoteSaved":"Rating saved.","feedbackDeletingVote":"Removing vote...","feedbackVoteDeleted":"Rating removed."},"googleanalytics":{"trackOutbound":1,"trackMailto":1,"trackDownload":1,"trackDownloadExtensions":"7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip"}});
      //]]></script>
        </head>
        <body>
          <div id="wrapper" class="clear-block">
      
            <div id="main">
              
              <div id="content-header">
                        </div>
              
              <div id="content" class="clear-block">
              
                <h1 class="page-title">
                  <span class="page-icon"></span>
                  Home          </h1>
              
                      
                        
                <div id="animation" class="flash" style="background-color:#647fa9;background-image:url(https://web.archive.org/web/20200204050542im_/http://www.zimmertwinsatschool.com/sites/all/movie/frontpage/at-school/xbg.gif.pagespeed.ic.L1WwMccbYD.png)">
        <img src="https://web.archive.org/web/20200204050542im_/http://www.zimmertwinsatschool.com/sites/all/movie/frontpage/at-school/xanimation.gif.pagespeed.ic.xgPhzZwi7D.png" alt=""/>
        <input type="hidden" name="height" value="335"/>
        <input type="hidden" name="src" value="/swfs/animation.swf"/>
        <input type="hidden" name="width" value="760"/>
        <input type="hidden" name="wmode" value="transparent"/>
      </div>
      
      <ul id="movie-links" class="clear-block">
        <li id="movie-links-make">
          <a href="/templates">Make A Movie</a>  </li>
        <li id="movie-links-watch">
          <a href="/">Your Movies</a>  </li>
        <li id="movie-links-user">
                <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfgdlx75wCvKbK8osqdpztxBI_I8zrNbwNUzmhSMQF6Dg4nUg/viewform">Request A New Video (YouTube Channel Required)</a>      </li>
      </ul>
      
   
      
                
              </div></div>
              
            
            <div id="sidebar">
              
              <a id="site-logo" href="/home">
                        </a>
              
                      <ul id="nav"><li class="menu-835 active-trail first active"><a href="/home" id="nav-home" class="active">Home</a></li>
      <li class="menu-837"><a href="/" id="nav-gallery">Your Movies</a></li>
      <li class="menu-836"><a href="/templates" id="nav-make">Make A Movie</a></li>
      <li class="menu-876 last"><a href="/help" id="nav-help">Help</a></li>
      </ul>                
    
                      
            </div>
            
            <div id="sidebar-bg"></div>
            
            <div id="footer">
              <span class="copyright">©2020 Lost The Plot Productions</span>
                        <ul class="links"><li class="menu-873 first"><a href="http://localhost:4343/home" title="The Zimmer Twins">The Zimmer Twins</a></li>
      <li class="menu-863"><a href="/membership" title="Get A Membership">Membership</a></li>
      <li class="menu-870"><a href="/about/terms" title="Terms Of Use">Terms Of Use</a></li>
      <li class="menu-871"><a href="/about/privacy" title="Privacy Policy">Privacy Policy</a></li>
      <li class="menu-864"><a href="/about/conduct" title="Code Of Conduct">Code Of Conduct</a></li>
      <li class="menu-866"><a href="/about/credits" title="Credits">Credits</a></li>
      <li class="menu-874"><a href="/contact" title="Contact">Contact</a></li>
      <li class="menu-867"><a target="_blank" href="http://localhost:4343/extras" title="Extras">Extras</a></li>
      <li class="menu-839 last"><a href="/about" title="About The Zimmer Twins">About</a></li>
      </ul>              </div>
            
          </div>
          
          <script type="text/javascript">//<![CDATA[
      var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-295035-21"]);_gaq.push(["_trackPageview"]);(function(){var ga=document.createElement("script");ga.type="text/javascript";ga.async=true;ga.src=("https:"==document.location.protocol?"https://web.archive.org/web/20200204050542/https://ssl":"https://web.archive.org/web/20200204050542/http://www")+".google-analytics.com/ga.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga,s);})();
      //]]></script>
          
        </body>
      </html>`;
    break;
   } case "/": {
        const files = movie.list("noFunctions");
        html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-local" lang="en-local" id="">
          <head>
        
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
            <title>Your Movies | Zimmer Twins at School</title>
            <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, School, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
            <meta name="description" content="The Zimmer Twins at School website invites teachers and students to create and share their own animated stories."/>
            <meta name="copyright" content="©2020 Lost The Plot Productions"/>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <link rel="shortcut icon" href="https://web.archive.org/web/20190914005828im_/http://www.zimmertwinsatschool.com/sites/zimmertwinsatschool.com/themes/zimmertwins_education/images/favicon.ico" type="image/x-icon"/>
            <link type="text/css" rel="stylesheet" media="all" href="https://web.archive.org/web/20190914005828cs_/http://www.zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/css/A.css_97c345e5473bbf14caff4d84125f1008.css.pagespeed.cf.GmVhnvQXT8.css"/>
            <!--[if IE]>
              <link type="text/css" rel="stylesheet" media="all" href="/sites/zimmertwinsatschool.com/themes/zimmertwins_education/ie.css" />
            <![endif]-->
            <script type="text/javascript" src="https://web.archive.org/web/20190914005828js_/http://www.zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/js/js_b4b8414e9f53fe14bc2267bfc30775ab.js.pagespeed.jm.vM1isTyUh8.js"></script>
        <script type="text/javascript">//<![CDATA[
        jQuery.extend(Drupal.settings,{"basePath":"/","fivestar":{"titleUser":"Your rating: ","titleAverage":"Average: ","feedbackSavingVote":"Saving vote...\r\n","feedbackVoteSaved":"Rating saved.","feedbackDeletingVote":"Removing vote...","feedbackVoteDeleted":"Rating removed."},"googleanalytics":{"trackOutbound":1,"trackMailto":1,"trackDownload":1,"trackDownloadExtensions":"7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip"}});
        //]]></script>
          </head>
          <body>
            <div id="wrapper" class="clear-block">
        
              <div id="main">
                
                <div id="content-header">
                          </div>
                
                <div id="content" class="clear-block">
                
                  <h1 class="page-title">
                    <span class="page-icon"></span>
                    Your Movies          </h1>
                
                        
                          
  
        
        <div id="gallery-container" class="clear-block group">
        
          
        <ul class="movie-clip-list archive-list clear-block">
        
            
                    
            ${files.map(v => `${v.html}`)}
        
          
        </ul>
          
        </div>
                  
                </div>
                
                <div id="content-footer" class="clear-block">
                  <div class="block block-block block-block-2">
            <a href="http://localhost:4343/home"><br/><br/><img src="https://web.archive.org/web/20190914005828im_/http://www.zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/xRegularZTeaderboard728x90.png.pagespeed.ic.YduuUokUCR.png" alt="advertisement" height="90" width="728"/></a></div>
                </div>
                
              </div>
              
              <div id="sidebar">
                
                <a id="site-logo" href="/home">
                          </a>
                
                        <ul id="nav"><li class="menu-835 first"><a href="/home" id="nav-home">Home</a></li>
        <li class="menu-837 active-trail active"><a href="/" id="nav-gallery" class="active">Your Movies</a></li>
        <li class="menu-836"><a href="/templates" id="nav-make">Make A Movie</a></li>
        <li class="menu-876 last"><a href="/help" id="nav-help">Help</a></li>
        </ul>                
                        
              </div>
              
              <div id="sidebar-bg"></div>
              
              <div id="footer">
                <span class="copyright">©2020 Lost The Plot Productions</span>
                          <ul class="links"><li class="menu-873 first"><a href="http://localhost:4343/home" title="The Zimmer Twins">The Zimmer Twins</a></li>
        <li class="menu-863"><a href="/membership" title="Get A Membership">Membership</a></li>
        <li class="menu-870"><a href="/about/terms" title="Terms Of Use">Terms Of Use</a></li>
        <li class="menu-871"><a href="/about/privacy" title="Privacy Policy">Privacy Policy</a></li>
        <li class="menu-864"><a href="/about/conduct" title="Code Of Conduct">Code Of Conduct</a></li>
        <li class="menu-866"><a href="/about/credits" title="Credits">Credits</a></li>
        <li class="menu-874"><a href="/contact" title="Contact">Contact</a></li>
        <li class="menu-867"><a target="_blank" href="http://localhost:4343/extras" title="Extras">Extras</a></li>
        <li class="menu-839 last"><a href="/about" title="About The Zimmer Twins">About</a></li>
        </ul>              </div>
              
            </div>
            
            <script type="text/javascript">//<![CDATA[
        var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-295035-21"]);_gaq.push(["_trackPageview"]);(function(){var ga=document.createElement("script");ga.type="text/javascript";ga.async=true;ga.src=("https:"==document.location.protocol?"https://web.archive.org/web/20190914005828/https://ssl":"https://web.archive.org/web/20190914005828/http://www")+".google-analytics.com/ga.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga,s);})();
        //]]></script>
            
          </body>
        </html>`;
        break;
    } case "/templateEdit": {
      html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-local" lang="en-local" id="">
        <head>
      
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <title>Create Movie | Zimmer Twins at School</title>
          <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, School, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
          <meta name="description" content="The Zimmer Twins at School website invites teachers and students to create and share their own animated stories."/>
          <meta name="copyright" content="©2020 Lost The Plot Productions"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <link rel="shortcut icon" href="https://web.archive.org/web/20190913213951im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/themes/zimmertwins_education/images/favicon.ico" type="image/x-icon"/>
          <link type="text/css" rel="stylesheet" media="all" href="https://web.archive.org/web/20190913213951cs_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/css/A.css_97c345e5473bbf14caff4d84125f1008.css.pagespeed.cf.GmVhnvQXT8.css"/>
          <!--[if IE]>
            <link type="text/css" rel="stylesheet" media="all" href="/sites/zimmertwinsatschool.com/themes/zimmertwins_education/ie.css" />
          <![endif]-->
          <script type="text/javascript" src="https://web.archive.org/web/20190913213951js_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/js/js_b4b8414e9f53fe14bc2267bfc30775ab.js.pagespeed.jm.vM1isTyUh8.js"></script>
      <script type="text/javascript">//<![CDATA[
      jQuery.extend(Drupal.settings,{"basePath":"/","fivestar":{"titleUser":"Your rating: ","titleAverage":"Average: ","feedbackSavingVote":"Saving vote...\r\n","feedbackVoteSaved":"Rating saved.","feedbackDeletingVote":"Removing vote...","feedbackVoteDeleted":"Rating removed."},"googleanalytics":{"trackOutbound":1,"trackMailto":1,"trackDownload":1,"trackDownloadExtensions":"7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip"}});
      //]]></script>
        </head>
        <body>
          <div id="wrapper" class="clear-block">
      
            <div id="main">
              
              <div id="content-header">
                        </div>
              
              <div id="content" class="clear-block">
              
                <h1 class="page-title">
                  <span class="page-icon"></span>
                  Create Movie          </h1>
              
                      
                        
                <div id="movie-clip-editor-0" class="movie-clip-editor flash">
        
        <input type="hidden" name="height" value="565"/>
        <input type="hidden" name="src" value="/swfs/editor.swf"/>
        <input type="hidden" name="width" value="760"/>
        
        <code class="flashvars">
        
          <input type="hidden" name="apiurl" value="/movie/assets/api.paid.xml"/>
          <input type="hidden" name="asseturl" value="/movie/assets"/>
          <input type="hidden" name="baseurl" value="${urlPrefix}://${req.headers.host}"/>
          <input type="hidden" name="lang" value="en-local"/>
          <input type="hidden" name="userid" value="9"/>
          <input type="hidden" name="movieid" value=""/>
          
                <input type="hidden" name="starterid" value="${id}"/>
            <input type="hidden" name="startername" value="${name}"/>
              
          <input type="hidden" name="playhelpmovie" value=""/>
          
        </code>
      
      </div>          
              </div>
              
              <div id="content-footer" class="clear-block">
                <div class="block block-block block-block-2">
          <a href="http://localhost:4343/home" target="_blank"><br/><br/><img src="https://web.archive.org/web/20190913213951im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/xRegularZTeaderboard728x90.png.pagespeed.ic.YduuUokUCR.png" alt="advertisement" height="90" width="728"/></a></div>
              </div>
              
            </div>
            
            <div id="sidebar">
              
              <a id="site-logo" href="/home">
                        </a>
              
                      <ul id="nav"><li class="menu-835 first"><a href="/home" id="nav-home">Home</a></li>
      <li class="menu-837"><a href="/" id="nav-gallery">Your Movies</a></li>
      <li class="menu-836"><a href="/templates" id="nav-make">Make A Movie</a></li>
      <li class="menu-876 last"><a href="/help" id="nav-help">Help</a></li>
      </ul>                
                      
            </div>
            
            <div id="sidebar-bg"></div>
            
            <div id="footer">
              <span class="copyright">©2020 Lost The Plot Productions</span>
                        <ul class="links"><li class="menu-873 first"><a href="http://localhost:4343/home" title="The Zimmer Twins">The Zimmer Twins</a></li>
      <li class="menu-863"><a href="/membership" title="Get A Membership">Membership</a></li>
      <li class="menu-870"><a href="/about/terms" title="Terms Of Use">Terms Of Use</a></li>
      <li class="menu-871"><a href="/about/privacy" title="Privacy Policy">Privacy Policy</a></li>
      <li class="menu-864"><a href="/about/conduct" title="Code Of Conduct">Code Of Conduct</a></li>
      <li class="menu-866"><a href="/about/credits" title="Credits">Credits</a></li>
      <li class="menu-874"><a href="/contact" title="Contact">Contact</a></li>
      <li class="menu-867"><a href="http://localhost:4343/extras" title="Extras">Extras</a></li>
      <li class="menu-839 last"><a href="/about" title="About The Zimmer Twins">About</a></li>
      </ul>              </div>
            
          </div>
          
          <script type="text/javascript">//<![CDATA[
      var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-295035-21"]);_gaq.push(["_trackPageview"]);(function(){var ga=document.createElement("script");ga.type="text/javascript";ga.async=true;ga.src=("https:"==document.location.protocol?"https://web.archive.org/web/20190913213951/https://ssl":"https://web.archive.org/web/20190913213951/http://www")+".google-analytics.com/ga.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga,s);})();
      //]]></script>
          
        </body>
      </html>`;
      break;
    } case "/templates": {
      /* in the school edition of zimmertwins, 
      everything here is stock for school appropriate purpaces and to prevent more firewalls from being added in all schools. 
      */
      html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-local" lang="en-local" id="page-movie-starter-index">
        <head>
      
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <title>Make A Movie | Zimmer Twins at School</title>
          <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, School, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
          <meta name="description" content="The Zimmer Twins at School website invites teachers and students to create and share their own animated stories."/>
          <meta name="copyright" content="©2020 Lost The Plot Productions"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <link rel="shortcut icon" href="https://web.archive.org/web/20200808041855im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/themes/zimmertwins_education/images/favicon.ico" type="image/x-icon"/>
          <link type="text/css" rel="stylesheet" media="all" href="https://web.archive.org/web/20200808041855cs_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/css/css_b788c334c7e01b3b8f64b522424b4b6f.css"/>
          <!--[if IE]>
            <link type="text/css" rel="stylesheet" media="all" href="/sites/zimmertwinsatschool.com/themes/zimmertwins_education/ie.css" />
          <![endif]-->
          <script type="text/javascript" src="https://web.archive.org/web/20200808041855js_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/js/js_351cd8826e37d0fa4d3e3164042d833f.js.pagespeed.jm.vM1isTyUh8.js"></script>
      <script type="text/javascript">//<![CDATA[
      jQuery.extend(Drupal.settings,{"basePath":"/","fivestar":{"titleUser":"Your rating: ","titleAverage":"Average: ","feedbackSavingVote":"Saving vote...\r\n","feedbackVoteSaved":"Rating saved.","feedbackDeletingVote":"Removing vote...","feedbackVoteDeleted":"Rating removed."},"googleanalytics":{"trackOutbound":1,"trackMailto":1,"trackDownload":1,"trackDownloadExtensions":"7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip"}});
      //]]></script>
        </head>
        <body>
          <div id="wrapper" class="clear-block">
      
            <div id="main">
              
              <div id="content-header">
                <div class="block block-block block-block-4">
          <a href="http://localhost:4343/home" target="_blank"><img src="https://web.archive.org/web/20200808041855im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/xRegularZTeaderboard728x90.png.pagespeed.ic.5Q_j6Py0sP.webp" alt="advertisement" height="90" width="728"/></a></div>
              </div>
              
              <div id="content" class="clear-block">
              
                <h1 class="page-title">
                  <span class="page-icon"></span>
                  Make A Movie          </h1>
              
                      
                        
                <div id="teaser" class="clear-block">
        
        <div id="teaser-content">
          Pick a starter and<br/>make a movie!  </div>
        
        <ul id="teaser-links">
          <li id="from-scratch" class="first corners"><a href="/studio">Make From Scratch</a></li>
          <li id="how-to" class="last corners"><a href="/studio?tutorial=0">How To Make A Movie</a></li>
        </ul>
      
      </div>
      
      <div id="current-starter" class="corners">
        
        <div id="movie-starter-player-0" class="movie-starter-player flash">
      
        <input type="hidden" name="bgcolor" value="#734C11"/>
        <input type="hidden" name="height" value="330"/>
        <input type="hidden" name="src" value="/swfs/player.swf"/>
        <input type="hidden" name="width" value="436"/>
        
        <code class="flashvars">
          <input type="hidden" name="apiurl" value="/movie/assets/api.paid.xml"/>
          <input type="hidden" name="asseturl" value="/movie/assets"/>
          <input type="hidden" name="baseurl" value="${urlPrefix}://${req.headers.host}"/>
          <input type="hidden" name="lang" value="en-local"/>
          <input type="hidden" name="userid" value=""/>
          <input type="hidden" name="starterid" value="${id}"/>
          <input type="hidden" name="startername" value="${name}"/>
        </code>
      
      </div>	
        <a href="/templateEdit?currentId=${id}" id="current-starter-link">Make Movie From <strong>${title}
      
      </strong></a>
      </div>
      
      <div id="new-starters" class="clear-block group">
        <h3>New Starters</h3>
        
      <ul class="movie-starter-list new-starter-list clear-block">
        
          
                
          <li class="small corners">
            <a href="/templates?currentId=42" class="thumbnail"><img src="data:image/webp;base64,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" alt="Mystery Box
      
      " title=""/></a>      <a href="/templates?currentId=42" class="title">Mystery Box
      
      </a>    </li>
          
          
                
          <li class="small corners">
            <a href="/templates?currentId=44" class="thumbnail"><img src="https://web.archive.org/web/20200808041855im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/movie/thumbnails/small/xfoiled.png.pagespeed.ic.vVMIdScCct.webp" alt="Foiled!
      
      " title=""/></a>      <a href="/templates?currentId=44" class="title">Foiled!
      
      </a>    </li>
          
          
                
          <li class="small corners">
            <a href="/templates?currentId=46" class="thumbnail"><img src="https://web.archive.org/web/20200808041855im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/movie/thumbnails/small/xkitty-dreams.png.pagespeed.ic.sdX28X2b-k.webp" alt="Kitty Dreams
      
      " title=""/></a>      <a href="/templates?currentId=46" class="title">Kitty Dreams
      
      </a>    </li>
          
            
      </ul></div>
      
      <div id="past-starters" class="clear-block group">
        <h3>Past Starters</h3>
        
      <ul class="movie-starter-list past-starter-list clear-block">
        
          
                
          <li class="small corners">
            <a href="/templates?currentId=43" class="thumbnail"><img src="https://web.archive.org/web/20200808041855im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/movie/thumbnails/small/xgemjest.png.pagespeed.ic.M_97h5xp8z.webp" alt="Gem Jest
      
      " title=""/></a>      <a href="/templates?currentId=43" class="title">Gem Jest
      
      </a>    </li>
          
          
                
          <li class="small corners">
            <a href="/templates?currentId=45" class="thumbnail"><img src="https://web.archive.org/web/20200808041855im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/movie/thumbnails/small/xrun.png.pagespeed.ic.9EcXDQMd_k.webp" alt="Run!
      
      " title=""/></a>      <a href="/templates?currentId=45" class="title">Run!
      
      </a>    </li>
          
          
                
          <li class="small corners">
            <a href="/templates?currentId=47" class="thumbnail"><img src="https://web.archive.org/web/20200808041855im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/movie/thumbnails/small/xfortune.png.pagespeed.ic.ExzW8sDXh3.webp" alt="Fortune Misfortune
      
      " title=""/></a>      <a href="/templates?currentId=47" class="title">Fortune Misfortune
      
      </a>    </li>
          
          
                
          <li class="small corners">
            <a href="/templates?currentId=48" class="thumbnail"><img src="https://web.archive.org/web/20200808041855im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/movie/thumbnails/small/xsurprise.png.pagespeed.ic.9esDX881Xi.webp" alt="Surprise
      
      " title=""/></a>      <a href="/templates?currentId=48" class="title">Surprise
      
      </a>    </li>
          
          
                
          <li class="small corners">
            <a href="/templates?currentId=50" class="thumbnail"><img src="https://web.archive.org/web/20200808041855im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/movie/thumbnails/small/xrock-contest.png.pagespeed.ic.0ikluVv9qR.webp" alt="Rock Out!
      
      " title=""/></a>      <a href="/templates?currentId=50" class="title">Rock Out!
      
      </a>    </li>
          
          
                
          <li class="small corners">
            <a href="/templates?currentId=51" class="thumbnail"><img src="https://web.archive.org/web/20200808041855im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/movie/thumbnails/small/x13talks.png.pagespeed.ic.t5eKvyTl4p.webp" alt="13 Talks
      
      " title=""/></a>      <a href="/templates?currentId=51" class="title">13 Talks
      
      </a>    </li>
          
          
                
          <li class="small corners">
            <a href="/templates?currentId=53" class="thumbnail"><img src="https://web.archive.org/web/20200808041855im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/movie/thumbnails/small/xidolhands.png.pagespeed.ic.X5_zAIvLnJ.webp" alt="Idol Hands
      
      " title=""/></a>      <a href="/templates?currentId=53" class="title">Idol Hands
      
      </a>    </li>
          
          
                
          <li class="small corners">
            <a href="/templates?currentId=59" class="thumbnail"><img src="https://web.archive.org/web/20200808041855im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/movie/thumbnails/small/xcharming13.png.pagespeed.ic.m-aFqc28YC.webp" alt="Charming 13
      
      " title=""/></a>      <a href="/templates?currentId=59" class="title">Charming 13
      
      </a>    </li>
          
            
      </ul></div>
      
                
              </div>
              
              <div id="content-footer" class="clear-block">
                        </div>
              
            </div>
            
            <div id="sidebar">
              
              <a id="site-logo" href="/home">
                        </a>
              
                      <ul id="nav"><li class="menu-835 first"><a href="/home" id="nav-home">Home</a></li>
      <li class="menu-837"><a href="/" id="nav-gallery">Your Movies</a></li>
      <li class="menu-836 active-trail active"><a href="/templates" id="nav-make" class="active">Make A Movie</a></li>
      <li class="menu-876 last"><a href="/help" id="nav-help">Help</a></li>
      </ul>                
                      
            </div>
            
            <div id="sidebar-bg"></div>
            
            <div id="footer">
              <span class="copyright">©2020 Lost The Plot Productions</span>
                        <ul class="links"><li class="menu-873 first"><a href="http://localhost:4343/home" title="The Zimmer Twins">The Zimmer Twins</a></li>
      <li class="menu-863"><a href="/membership" title="Get A Membership">Membership</a></li>
      <li class="menu-870"><a href="/about/terms" title="Terms Of Use">Terms Of Use</a></li>
      <li class="menu-871"><a href="/about/privacy" title="Privacy Policy">Privacy Policy</a></li>
      <li class="menu-864"><a href="/about/conduct" title="Code Of Conduct">Code Of Conduct</a></li>
      <li class="menu-866"><a href="/about/credits" title="Credits">Credits</a></li>
      <li class="menu-874"><a href="/contact" title="Contact">Contact</a></li>
      <li class="menu-867"><a target="_blank" href="http://localhost:4343/extras" title="Extras">Extras</a></li>
      <li class="menu-839 last"><a href="/about" title="About The Zimmer Twins">About</a></li>
      </ul>              </div>
            
          </div>
          
          <script type="text/javascript">//<![CDATA[
      var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-295035-21"]);_gaq.push(["_trackPageview"]);(function(){var ga=document.createElement("script");ga.type="text/javascript";ga.async=true;ga.src=("https:"==document.location.protocol?"https://web.archive.org/web/20200808041855/https://ssl":"https://web.archive.org/web/20200808041855/http://www")+".google-analytics.com/ga.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga,s);})();
      //]]></script>
          
        </body>
      </html>`;
      break;
  } case "/player": {
      files = movie.listInSmall();
	    res.setHeader("Content-Type", "text/html; charset=utf8");
	    html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-local" lang="en-local" id="page-movie-clip-view">
        <head>
      
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <title>${fs.readFileSync(env.DATABASES_FOLDER + `/${url.query.movieId}-title.txt`)} | Zimmer Twins at School</title>
          <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, School, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
          <meta name="description" content="The Zimmer Twins at School website invites teachers and students to create and share their own animated stories."/>
          <meta name="copyright" content="©2020 Lost The Plot Productions"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <link rel="shortcut icon" href="https://web.archive.org/web/20200203204514im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/themes/zimmertwins_education/images/favicon.ico" type="image/x-icon"/>
          <link type="text/css" rel="stylesheet" media="all" href="https://web.archive.org/web/20200203204514cs_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/css/A.css_97c345e5473bbf14caff4d84125f1008.css.pagespeed.cf.GmVhnvQXT8.css"/>
          <!--[if IE]>
            <link type="text/css" rel="stylesheet" media="all" href="/sites/zimmertwinsatschool.com/themes/zimmertwins_education/ie.css" />
          <![endif]-->
          <script type="text/javascript" src="https://web.archive.org/web/20200203204514js_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/js/js_b4b8414e9f53fe14bc2267bfc30775ab.js.pagespeed.jm.vM1isTyUh8.js"></script>
      <script type="text/javascript">//<![CDATA[
      jQuery.extend(Drupal.settings,{"basePath":"/","fivestar":{"titleUser":"Your rating: ","titleAverage":"Average: ","feedbackSavingVote":"Saving vote...\r\n","feedbackVoteSaved":"Rating saved.","feedbackDeletingVote":"Removing vote...","feedbackVoteDeleted":"Rating removed."},"googleanalytics":{"trackOutbound":1,"trackMailto":1,"trackDownload":1,"trackDownloadExtensions":"7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip"}});
      //]]></script>
        </head>
        <body onload="loadRows()">
          <div id="wrapper" class="clear-block">
      
            <div id="main">
              
              <div id="content-header">
                        </div>
              
              <div id="content" class="clear-block">
              
                <h1 class="page-title">
                  <span class="page-icon"></span>
                  ${fs.readFileSync(env.DATABASES_FOLDER + `/${url.query.movieId}-title.txt`)}          </h1>
              
                      
                        
                <div class="node node-movie-clip clear-block corners">
        
        <!-- Movie Clip Player -->
        <div id="movie-clip-player-0" class="movie-clip-player flash">
      
        <input type="hidden" name="bgcolor" value="#734C11"/>
        <input type="hidden" name="height" value="330"/>
        <input type="hidden" name="src" value="/swfs/player.swf"/>
        <input type="hidden" name="width" value="436"/>
      
        <code class="flashvars">
          
          <input type="hidden" name="apiurl" value="/movie/assets/api.paid.xml"/>
          <input type="hidden" name="asseturl" value="/movie/assets"/>
          <input type="hidden" name="baseurl" value="${urlPrefix}://${req.headers.host}"/>
          <input type="hidden" name="lang" value="en-local"/>
          <input type="hidden" name="userid" value=""/>
          <input type="hidden" name="movieid" value="${url.query.movieId || ""}"/>
          <input type="hidden" name="flvurl" value=""/>
      
          
          <input type="hidden" name="startername" value=""/>
      
        </code>
      
      </div>  
        <div class="summary">
          
          <!-- Movie Clip Info -->
          <h2 class="title">
            ${fs.readFileSync(env.DATABASES_FOLDER + `/${url.query.movieId}-title.txt`)}
      
          </h2>
        </div></div>
      
      
      
        <div id="movie-clip-gallery-container" class="clear-block group">
        <h3>Your Movies</h3>
        
      <ul class="movie-clip-list movies-list clear-block">
      
          
      ${files.map(v => `${v.html}`)}        
      
        
      </ul>
      </div></div>
              
              <div id="content-footer" class="clear-block">
                <div class="block block-block block-block-2">
          <a href="http://localhost"4343/home"><br/><br/><img src="https://web.archive.org/web/20200203204514im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/xRegularZTeaderboard728x90.png.pagespeed.ic.YduuUokUCR.png" alt="advertisement" height="90" width="728"/></a></div>
              </div>
              
            </div>
            
            <div id="sidebar">
              
              <a id="site-logo" href="/home">
                        </a>
              
                      <ul id="nav"><li class="menu-835 first"><a href="/home" id="nav-home">Home</a></li>
      <li class="menu-837"><a href="/" id="nav-gallery">Your Movies</a></li>
      <li class="menu-836"><a href="/templates" id="nav-make">Make A Movie</a></li>
      <li class="menu-876 last"><a href="/help" id="nav-help">Help</a></li>
      </ul>                
                      
            </div>
            
            <div id="sidebar-bg"></div>
            
            <div id="footer">
              <span class="copyright">©2020 Lost The Plot Productions</span>
                        <ul class="links"><li class="menu-873 first"><a href="http://localhost:4343/home" title="The Zimmer Twins">The Zimmer Twins</a></li>
      <li class="menu-863"><a href="/membership" title="Get A Membership">Membership</a></li>
      <li class="menu-870"><a href="/about/terms" title="Terms Of Use">Terms Of Use</a></li>
      <li class="menu-871"><a href="/about/privacy" title="Privacy Policy">Privacy Policy</a></li>
      <li class="menu-864"><a href="/about/conduct" title="Code Of Conduct">Code Of Conduct</a></li>
      <li class="menu-866"><a href="/about/credits" title="Credits">Credits</a></li>
      <li class="menu-874"><a href="/contact" title="Contact">Contact</a></li>
      <li class="menu-867"><a target="_blank" href="http://localhost:4343/extras" title="Extras">Extras</a></li>
      <li class="menu-839 last"><a href="/about" title="About The Zimmer Twins">About</a></li>
      </ul>              </div>
            
          </div>
          
          <script type="text/javascript">//<![CDATA[
      var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-295035-21"]);_gaq.push(["_trackPageview"]);(function(){var ga=document.createElement("script");ga.type="text/javascript";ga.async=true;ga.src=("https:"==document.location.protocol?"https://web.archive.org/web/20200203204514/https://ssl":"https://web.archive.org/web/20200203204514/http://www")+".google-analytics.com/ga.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga,s);})();
      //]]></script>
          
        </body>
      </html>`;
	    break;
    } case "/studio": {
      if (
        !fUtil.exists(
          env.DATABASES_FOLDER + `/tutorialCompleted.txt`
        )
      ) fs.writeFileSync(`${
        env.DATABASES_FOLDER
      }/tutorialCompleted.txt`, 'The tutorial has went through the first time. if you want to go through it again, please delete this file.');
      if (url.query.movieId) fs.writeFileSync(env.DATABASES_FOLDER + `/movieIdSection.json`, JSON.stringify({id: url.query.movieId}));
      else if (fs.existsSync(env.DATABASES_FOLDER + `/movieIdSection.json`)) fs.unlinkSync(env.DATABASES_FOLDER + `/movieIdSection.json`);
	    res.setHeader("Content-Type", "text/html; charset=utf8");
	    html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-local" lang="en-local" id="">
        <head>
      
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <title>${studioTitle} | Zimmer Twins at School</title>
          <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, School, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
          <meta name="description" content="The Zimmer Twins at School website invites teachers and students to create and share their own animated stories."/>
          <meta name="copyright" content="©2020 Lost The Plot Productions"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <link rel="shortcut icon" href="https://web.archive.org/web/20190517163136im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/themes/zimmertwins_education/images/favicon.ico" type="image/x-icon"/>
          <link type="text/css" rel="stylesheet" media="all" href="https://web.archive.org/web/20190517163136cs_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/css/A.css_919c34ddc77db1321fefc333cd92c46a.css.pagespeed.cf.GmVhnvQXT8.css"/>
          <!--[if IE]>
            <link type="text/css" rel="stylesheet" media="all" href="/sites/zimmertwinsatschool.com/themes/zimmertwins_education/ie.css" />
          <![endif]-->
          <script type="text/javascript" src="https://web.archive.org/web/20190517163136js_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/js/js_c21fc4b9628e4ac39d512b1f8502b9dc.js.pagespeed.jm.vM1isTyUh8.js"></script>
      <script type="text/javascript">//<![CDATA[
      jQuery.extend(Drupal.settings,{"basePath":"/","fivestar":{"titleUser":"Your rating: ","titleAverage":"Average: ","feedbackSavingVote":"Saving vote...\r\n","feedbackVoteSaved":"Rating saved.","feedbackDeletingVote":"Removing vote...","feedbackVoteDeleted":"Rating removed."},"googleanalytics":{"trackOutbound":1,"trackMailto":1,"trackDownload":1,"trackDownloadExtensions":"7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip"}});
      //]]></script>
        </head>
        <body>
          <div id="wrapper" class="clear-block">
      
            <div id="main">
              
              <div id="content-header">
                        </div>
              
              <div id="content" class="clear-block">
              
                <h1 class="page-title">
                  <span class="page-icon"></span>
                  ${studioTitle}          </h1>
              
                      
                        
                <div id="movie-clip-editor-0" class="movie-clip-editor flash">
        
        <input type="hidden" name="height" value="565"/>
        <input type="hidden" name="src" value="/swfs/editor.swf"/>
        <input type="hidden" name="width" value="760"/>
        
        <code class="flashvars">
        
          <input type="hidden" name="apiurl" value="/movie/assets/api.paid.xml"/>
          <input type="hidden" name="asseturl" value="/movie/assets"/>
          <input type="hidden" name="baseurl" value="${urlPrefix}://${req.headers.host}"/>
          <input type="hidden" name="lang" value="en-local"/>
          <input type="hidden" name="userid" value="0654"/>
          <input type="hidden" name="movieid" value="${url.query.movieId || ""}"/>

           
          <input type="hidden" name="playhelpmovie" value="${tutorial}"/>
          
        </code>
      
      </div>          
              </div>
              
              <div id="content-footer" class="clear-block">
                <div class="block block-block block-block-2">
          <a href="http://localhost:4343/home"><img src="https://web.archive.org/web/20190517163136im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/xRegularZTeaderboard728x90.png.pagespeed.ic.YduuUokUCR.png" alt="advertisement" height="90" width="728"/></a></div>
              </div>
              
            </div>
            
            <div id="sidebar">
              
              <a id="site-logo" href="/home">
                        </a>
              
                      <ul id="nav"><li class="menu-835 first"><a href="/home" id="nav-home">Home</a></li>
      <li class="menu-837"><a href="/" id="nav-gallery">Your Movies</a></li>
      <li class="menu-836"><a href="/templates" id="nav-make">Make A Movie</a></li>
      <li class="menu-876 last"><a href="/help" id="nav-help">Help</a></li>
      </ul>                
                      
            </div>
            
            <div id="sidebar-bg"></div>
            
            <div id="footer">
              <span class="copyright">©2020 Lost The Plot Productions</span>
                        <ul class="links"><li class="menu-873 first"><a href="http://localhost:4343/" title="The Zimmer Twins">The Zimmer Twins</a></li>
      <li class="menu-863"><a href="/membership" title="Get A Membership">Membership</a></li>
      <li class="menu-870"><a href="/about/terms" title="Terms Of Use">Terms Of Use</a></li>
      <li class="menu-871"><a href="/about/privacy" title="Privacy Policy">Privacy Policy</a></li>
      <li class="menu-864"><a href="/about/conduct" title="Code Of Conduct">Code Of Conduct</a></li>
      <li class="menu-866"><a href="/about/credits" title="Credits">Credits</a></li>
      <li class="menu-874"><a href="/contact" title="Contact">Contact</a></li>
      <li class="menu-867"><a target="_blank" href="http://localhost:4343/extras" title="Extras">Extras</a></li>
      <li class="menu-839 last"><a href="/about" title="About The Zimmer Twins">About</a></li>
      </ul>              </div>
            
          </div>
          
          <script type="text/javascript">//<![CDATA[
      var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-295035-21"]);_gaq.push(["_trackPageview"]);(function(){var ga=document.createElement("script");ga.type="text/javascript";ga.async=true;ga.src=("https:"==document.location.protocol?"https://web.archive.org/web/20190517163136/https://ssl":"https://web.archive.org/web/20190517163136/http://www")+".google-analytics.com/ga.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga,s);})();
      //]]></script>
          
        </body>
      </html>`;
	    break;
    }
  }
  res.end(html);
};
