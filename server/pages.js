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
        const files = movie.listInSmall();
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
        
            
                    
            ${files.map(v => `${v.html}`) || "<h3>You currently have no movies right now. <a href='/studio'>Create one now</a> | <a href='/upload?type=movie'>Upload</a></h3>"}
        
          
        </ul>
          
        </div>
                  
                </div>
                
                <div id="content-footer" class="clear-block">
                  <div class="block block-block block-block-2">
            <a href="http://localhost:4343/home" target="_blank"><br/><br/><img src="https://web.archive.org/web/20190914005828im_/http://www.zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/xRegularZTeaderboard728x90.png.pagespeed.ic.YduuUokUCR.png" alt="advertisement" height="90" width="728"/></a></div>
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
        var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-295035-21"]);_gaq.push(["_trackPageview"]);(function(){var ga=document.createElement("script");ga.type="text/javascript";ga.async=true;ga.src=("https:"==document.location.protocol?"https://web.archive.org/web/20190914005828/https://ssl":"https://web.archive.org/web/20190914005828/http://www")+".google-analytics.com/ga.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga,s);})();
        //]]></script>
            
          </body>
        </html>`;
        break;
    } case "/templates": {
      const files = movie.listTemplates();
      html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-local" lang="en-local" id="page-movie-starter-index">
        <head>
      
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <title>Make A Movie | Zimmer Twins at School</title>
          <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, School, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
          <meta name="description" content="The Zimmer Twins at School website invites teachers and students to create and share their own animated stories."/>
          <meta name="copyright" content="©2020 Lost The Plot Productions"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <link rel="shortcut icon" href="https://web.archive.org/web/20200217033736im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/themes/zimmertwins_education/images/favicon.ico" type="image/x-icon"/>
          <link type="text/css" rel="stylesheet" media="all" href="https://web.archive.org/web/20200217033736cs_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/css/css_97c345e5473bbf14caff4d84125f1008.css"/>
          <!--[if IE]>
            <link type="text/css" rel="stylesheet" media="all" href="/sites/zimmertwinsatschool.com/themes/zimmertwins_education/ie.css" />
          <![endif]-->
          <script type="text/javascript" src="https://web.archive.org/web/20200217033736js_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/js/js_b4b8414e9f53fe14bc2267bfc30775ab.js.pagespeed.jm.vM1isTyUh8.js"></script>
      <script type="text/javascript">//<![CDATA[
      jQuery.extend(Drupal.settings,{"basePath":"/","fivestar":{"titleUser":"Your rating: ","titleAverage":"Average: ","feedbackSavingVote":"Saving vote...\r\n","feedbackVoteSaved":"Rating saved.","feedbackDeletingVote":"Removing vote...","feedbackVoteDeleted":"Rating removed."},"googleanalytics":{"trackOutbound":1,"trackMailto":1,"trackDownload":1,"trackDownloadExtensions":"7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip"}});
      //]]></script>${script}
        </head>
        <body>
          <div id="wrapper" class="clear-block">
      
            <div id="main">
              
              <div id="content-header">
                <div class="block block-block block-block-4">
          <a href="http://localhost:4343" target="_blank"><img src="https://web.archive.org/web/20200217033736im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/xRegularZTeaderboard728x90.png.pagespeed.ic.YduuUokUCR.png" alt="advertisement" height="90" width="728"/></a></div>
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
          <input type="hidden" name="movieid" value="677649"/>
        </code>
      
      </div>	
        <a href="/studio?movieId=677649" id="current-starter-link">Make Movie From <strong>Drayden be like....
      
      </strong></a>
      </div>
      
      <div id="past-starters" class="clear-block group">
        <h3>Other Starters</h3>
        
      <ul class="movie-starter-list past-starter-list clear-block">
        
          
                ${
                  files.map(v => `${
                    v.html
                  }`) || "<h3>There are no other starters at the moment. <a href='/upload?type=starter'>Upload</a></h3>"
                }
          
            
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
                        <ul class="links"><li class="menu-873 first"><a href="http://localhost:4343" title="The Zimmer Twins">The Zimmer Twins</a></li>
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
      var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-295035-21"]);_gaq.push(["_trackPageview"]);(function(){var ga=document.createElement("script");ga.type="text/javascript";ga.async=true;ga.src=("https:"==document.location.protocol?"https://web.archive.org/web/20200217033736/https://ssl":"https://web.archive.org/web/20200217033736/http://www")+".google-analytics.com/ga.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga,s);})();
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
          <a href="http://localhost"4343/home" target="_blank"><br/><br/><img src="https://web.archive.org/web/20200203204514im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/xRegularZTeaderboard728x90.png.pagespeed.ic.YduuUokUCR.png" alt="advertisement" height="90" width="728"/></a></div>
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
          <a href="http://localhost:4343" target="_blank"><img src="https://web.archive.org/web/20190517163136im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/files/xRegularZTeaderboard728x90.png.pagespeed.ic.YduuUokUCR.png" alt="advertisement" height="90" width="728"/></a></div>
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
