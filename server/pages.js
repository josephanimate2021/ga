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
        <input type="hidden" name="src" value="/schoolSwfs/animation.swf"/>
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
      
      <div id="middle">
         <h1>The Zimmer Twins at School</h1>
       <p><strong>Zimmer Twins at School bundles the fun moviemaker children love with new class management tools teachers will adore.</strong></p> 
      <!-- <h2>Join today it's free!</h2>-->
       <div id="ads">
        <div class="block block-block block-block-3">
           <!--<div class="award clear-block">
            <img src="/sites/zimmertwinsatschool.com/files/page-membership-parents-choice-award.png" width="70" height="70" alt="" />
            <span>Winner of the</span>
            <strong>Parent's Choice</strong> 
            <em>Silver Honor Award</em>
          </div>
      <div class="review">
            <blockquote>
              <p>Truly, the Zimmer Twins movie maker is one of the best web applications I’ve seen in a while. </p>
            </blockquote>
            <cite><strong>Dan Saffer</strong>,  <em>HOW Design Annual</em></cite>
          </div>
       <div class="review">
            <blockquote>
              <p>I LOVE THE ZIMMER TWINS HOW DID YOU THINK OF IT? IT'S MAGNIFASINT!!!!!!!!</p>
            </blockquote>
            <cite><strong>Charles</strong>,  <em>Zimmer Twins member</em></cite>
          </div>-->
      <div class="review">
            <blockquote>
              <p>On the Zimmer Twin site, students can create really impressive cartoon animations (seriously this is saturday morning cartoon quality). </p>
            </blockquote>
            <cite><strong>Kelly Tenkely</strong><em><a href="https://web.archive.org/web/20200204050542/http://ilearntechnology.com/?p=4339">iLearn Technology</a></em></cite>
          </div></div>
      </div>
      </div>
      
                
              </div>
              
            
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
      <li class="menu-867"><a href="http://localhost:4343/extras" title="Extras">Extras</a></li>
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
        const files = movie.list();
        html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-local" lang="en-local" id="page-movie-clip-search-results">
          <head>
        
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
            <title>Your Movies | Zimmer Twins</title>
            <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
            <meta name="description" content="The Zimmer Twins website invites kids to create and share their own animated stories."/>
            <meta name="copyright" content="©2020 Lost The Plot Productions"/>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <link rel="shortcut icon" href="https://web.archive.org/web/20120915212352im_/http://www.zimmertwins.com/sites/zimmertwins.com/themes/zimmertwins/images/favicon.ico" type="image/x-icon"/>
            <link type="text/css" rel="stylesheet" media="all" href="https://web.archive.org/web/20120915212352cs_/http://www.zimmertwins.com/sites/zimmertwins.com/files/css/css_3e27a0283c32f6923ebf4d3d6946a037.css"/>
            <!--[if IE]>
              <link type="text/css" rel="stylesheet" media="all" href="/sites/zimmertwins.com/themes/zimmertwins/ie.css" />
            <![endif]-->
            <script type="text/javascript" src="https://web.archive.org/web/20120915212352js_/http://www.zimmertwins.com/sites/zimmertwins.com/files/js/js_3167cd6c9b1cd1a9799552e87027261b.js"></script>
        <script type="text/javascript">
        <!--//--><![CDATA[//><!--
        jQuery.extend(Drupal.settings, { "basePath": "/", "fivestar": { "titleUser": "Your rating: ", "titleAverage": "Average: ", "feedbackSavingVote": "Saving vote...\r\n", "feedbackVoteSaved": "Rating saved.", "feedbackDeletingVote": "Removing vote...", "feedbackVoteDeleted": "Rating removed." }, "googleanalytics": { "trackMailto": 1, "trackDownload": 1, "trackDownloadExtensions": "7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip" } });
        //--><!]]>
        </script>
        ${script}
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
                
                          
                          
            
        
          
                  
            
          
        
        <ol class="movie-clip-search-results">${
          files.map(
            v => `${
              v.html
            }`
          ).join('') || `<h3>There are currently no movies at the moment. 
          <a href='javascript:apiVerSelectForStudio()'>Create one now</a> | <a href='/upload?type=movie'>Upload</a></h3>`
        }</ol>
        
        
                  
                </div>
                
                <div id="content-footer">
                          </div>
                
              </div>
              
              <div id="sidebar">
                
                <a id="site-logo" href="/home">
                          </a>
                
                        <ul id="nav"><li class="menu-343 first"><a href="/home" id="nav-home">Home</a></li>
        <li class="menu-345"><a href="/" id="nav-watch">Watch A Movie</a></li>
        <li class="menu-344"><a href="/templates" id="nav-make">Make A Movie</a></li>
        <li class="menu-920"><a href="/spotlight" id="nav-spotlight">Spotlight</a></li>
        <li class="menu-347"><a href="/extras" id="nav-extras">Extras</a></li>
        <li class="menu-79 last"><a href="/help" id="nav-help">Help</a></li>
        </ul>                
                        
              </div>
              
              <div id="sidebar-bg"></div>
              
              <div id="footer">
                <span class="copyright">©2020 Lost The Plot Productions</span>
                          <ul class="links"><li class="menu-924 first"><a href="/membership" title="Get A Membership">Membership</a></li>
        <li class="menu-82"><a href="/about/terms" title="">Terms Of Use</a></li>
        <li class="menu-81"><a href="/about/privacy" title="">Privacy Policy</a></li>
        <li class="menu-83"><a href="/about/conduct" title="">Code Of Conduct</a></li>
        <li class="menu-87"><a href="/about/credits" title="">Credits</a></li>
        <li class="menu-84"><a href="/about/parents" title="">Parents</a></li>
        <li class="menu-348"><a href="/contact" title="">Contact</a></li>
        <li class="menu-1343 last"><a href="/about" title="About The Zimmer Twins">About</a></li>
        </ul>              </div>
              
            </div>
            
            <script type="text/javascript">
        <!--//--><![CDATA[//><!--
        var _gaq = _gaq || [];_gaq.push(["_setAccount", "UA-295035-15"]);_gaq.push(["_setVar", "anonymous user"]);_gaq.push(['_setCustomVar', 1, "User roles", "anonymous user", 1]);_gaq.push(["_trackPageview"]);(function() {var ga = document.createElement("script");ga.type = "text/javascript";ga.async = true;ga.src = ("https:" == document.location.protocol ? "https://web.archive.org/web/20120915212352/https://ssl" : "https://web.archive.org/web/20120915212352/http://www") + ".google-analytics.com/ga.js";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga, s);})();
        //--><!]]>
        </script>
            
          </body>
        </html>`;
        break;
    } case "/templates": {
      const files = movie.listTemplates();
      html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-local" lang="en-local" id="page-movie-clip-search-results">
        <head>
      
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <title>Movie Starters | Zimmer Twins</title>
          <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
          <meta name="description" content="The Zimmer Twins website invites kids to create and share their own animated stories."/>
          <meta name="copyright" content="©2020 Lost The Plot Productions"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <link rel="shortcut icon" href="https://web.archive.org/web/20120915212352im_/http://www.zimmertwins.com/sites/zimmertwins.com/themes/zimmertwins/images/favicon.ico" type="image/x-icon"/>
          <link type="text/css" rel="stylesheet" media="all" href="https://web.archive.org/web/20120915212352cs_/http://www.zimmertwins.com/sites/zimmertwins.com/files/css/css_3e27a0283c32f6923ebf4d3d6946a037.css"/>
          <!--[if IE]>
            <link type="text/css" rel="stylesheet" media="all" href="/sites/zimmertwins.com/themes/zimmertwins/ie.css" />
          <![endif]-->
          <script type="text/javascript" src="https://web.archive.org/web/20120915212352js_/http://www.zimmertwins.com/sites/zimmertwins.com/files/js/js_3167cd6c9b1cd1a9799552e87027261b.js"></script>
      <script type="text/javascript">
      <!--//--><![CDATA[//><!--
      jQuery.extend(Drupal.settings, { "basePath": "/", "fivestar": { "titleUser": "Your rating: ", "titleAverage": "Average: ", "feedbackSavingVote": "Saving vote...\r\n", "feedbackVoteSaved": "Rating saved.", "feedbackDeletingVote": "Removing vote...", "feedbackVoteDeleted": "Rating removed." }, "googleanalytics": { "trackMailto": 1, "trackDownload": 1, "trackDownloadExtensions": "7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip" } });
      //--><!]]>
      </script>
      ${script}
        </head>
        <body>
            
          <div id="wrapper" class="clear-block">
            
            <div id="main">
              
              <div id="content-header">
                        </div>
              
              <div id="content" class="clear-block">
              
                <h1 class="page-title">
                  <span class="page-icon"></span>
                  Starters          </h1>
              
                        
                        
          
      
        
                
          
        
      
      <ol class="movie-clip-search-results">${
        files.map(
          v => `${
            v.html
          }`
        ).join('') || `<h3>There are currently no starters at the moment. 
        <a href='/upload?type=starter'>Upload</a> | <a href="/movie/fetch?redirect=true">Fetch A Random Starter</a></h3>`
      }</ol>
      
      
                
              </div>
              
              <div id="content-footer">
                        </div>
              
            </div>
            
            <div id="sidebar">
              
              <a id="site-logo" href="/home">
                        </a>
              
                      <ul id="nav"><li class="menu-343 first"><a href="/home" id="nav-home">Home</a></li>
      <li class="menu-345"><a href="/" id="nav-watch">Watch A Movie</a></li>
      <li class="menu-344"><a href="/templates" id="nav-make">Make A Movie</a></li>
      <li class="menu-920"><a href="/spotlight" id="nav-spotlight">Spotlight</a></li>
      <li class="menu-347"><a href="/extras" id="nav-extras">Extras</a></li>
      <li class="menu-79 last"><a href="/help" id="nav-help">Help</a></li>
      </ul>                
                      
            </div>
            
            <div id="sidebar-bg"></div>
            
            <div id="footer">
              <span class="copyright">©2020 Lost The Plot Productions</span>
                        <ul class="links"><li class="menu-924 first"><a href="/membership" title="Get A Membership">Membership</a></li>
      <li class="menu-82"><a href="/about/terms" title="">Terms Of Use</a></li>
      <li class="menu-81"><a href="/about/privacy" title="">Privacy Policy</a></li>
      <li class="menu-83"><a href="/about/conduct" title="">Code Of Conduct</a></li>
      <li class="menu-87"><a href="/about/credits" title="">Credits</a></li>
      <li class="menu-84"><a href="/about/parents" title="">Parents</a></li>
      <li class="menu-348"><a href="/contact" title="">Contact</a></li>
      <li class="menu-1343 last"><a href="/about" title="About The Zimmer Twins">About</a></li>
      </ul>              </div>
            
          </div>
          
          <script type="text/javascript">
      <!--//--><![CDATA[//><!--
      var _gaq = _gaq || [];_gaq.push(["_setAccount", "UA-295035-15"]);_gaq.push(["_setVar", "anonymous user"]);_gaq.push(['_setCustomVar', 1, "User roles", "anonymous user", 1]);_gaq.push(["_trackPageview"]);(function() {var ga = document.createElement("script");ga.type = "text/javascript";ga.async = true;ga.src = ("https:" == document.location.protocol ? "https://web.archive.org/web/20120915212352/https://ssl" : "https://web.archive.org/web/20120915212352/http://www") + ".google-analytics.com/ga.js";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga, s);})();
      //--><!]]>
      </script>
          
        </body>
      </html>`;
      break;
  } case "/player": {
	    res.setHeader("Content-Type", "text/html; charset=utf8");
	    html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-local" lang="en-local" id="page-movie-clip-view">
        <head>
      
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <title>Video Player | Zimmer Twins</title>
          <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
          <meta name="description" content="The Zimmer Twins website invites kids to create and share their own animated stories."/>
          <meta name="copyright" content="©2020 Lost The Plot Productions"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <link type="text/css" rel="stylesheet" media="all" href="https://web.archive.org/web/20160905043221cs_/http://zimmertwins.com/A.sites,,_all,,_modules,,_contrib,,_cck,,_theme,,_content-module.css,,qn+sites,,_all,,_modules,,_contrib,,_date,,_date.css,,qn+sites,,_all,,_modules,,_contrib,,_og,,_theme,,_og.css,,qn+sites,,_all,,_modules,,_contrib,,_pollfield,,_pollfield.css,,qn+sites,,_all,,_modules,,_contrib,,_ubercart,,_uc_order,,_uc_order.css,,qn+sites,,_all,,_modules,,_contrib,,_ubercart,,_uc_product,,_uc_product.css,,qn+sites,,_all,,_modules,,_contrib,,_ubercart,,_uc_roles,,_uc_roles.css,,qn+sites,,_all,,_modules,,_contrib,,_ubercart,,_uc_store,,_uc_store.css,,qn+sites,,_all,,_modules,,_contrib,,_cck,,_modules,,_fieldgroup,,_fieldgroup.css,,qn+sites,,_all,,_modules,,_contrib,,_views,,_css,,_views.css,,qn+modules,,_comment,,_comment.css,,qn+sites,,_zimmertwins.com,,_themes,,_zimmertwins,,_style.css,,qn,Mcc.C1TVrviQtF.css.pagespeed.cf.rC5ElewgIx.css"/>
      
      
      
      
      
      
      
      
      
      
      
          <!--[if IE]>
            <link type="text/css" rel="stylesheet" media="all" href="/sites/zimmertwins.com/themes/zimmertwins/ie.css" />
          <![endif]-->
          <script src="https://web.archive.org/web/20160909183717js_/http://zimmertwins.com/misc,_jquery.js,qn+misc,_drupal.js,qn+sites,_all,_modules,_contrib,_fivestar,_js,_fivestar.js,qn+sites,_all,_modules,_contrib,_google_analytics,_googleanalytics.js,qn+sites,_all,_modules,_contrib,_og,_og.js,qn+sites,_all,_modules,_contrib,_ubercart,_uc_roles,_uc_roles.js,qn+sites,_zimmertwins.com,_themes,_zimmertwins,_jquery.flash.js,qn+sites,_zimmertwins.com,_themes,_zimmertwins,_jquery.livequery.js,qn+sites,_zimmertwins.com,_themes,_zimmertwins,_scripts.js,qn.pagespeed.jc.OMW7dtu1QK.js"></script><script>eval(mod_pagespeed_nY1Z0rRqrr);</script>
      <script>eval(mod_pagespeed_frUSgF27iq);</script>
      <script>eval(mod_pagespeed_VEL7yD4xun);</script>
      <script>eval(mod_pagespeed_vC2LpTDHkl);</script>
      <script>eval(mod_pagespeed_XZ12xHADsD);</script>
      <script>eval(mod_pagespeed_by2NQOABdO);</script>
      <script>eval(mod_pagespeed_WeFY4JIK8o);</script>
      <script>eval(mod_pagespeed_Cz89F7N0s6);</script>
      <script>eval(mod_pagespeed_CP36ZbYGwj);</script>
      <script type="text/javascript">//<![CDATA[
      jQuery.extend(Drupal.settings,{"basePath":"/","fivestar":{"titleUser":"Your rating: ","titleAverage":"Average: ","feedbackSavingVote":"Saving vote...\r\n","feedbackVoteSaved":"Rating saved.","feedbackDeletingVote":"Removing vote...","feedbackVoteDeleted":"Rating removed."},"googleanalytics":{"trackMailto":1,"trackDownload":1,"trackDownloadExtensions":"7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip"}});
      //]]></script>${script}
        </head>
        <body>
            
          <div id="wrapper" class="clear-block">
            
            <div id="main">
              
              <div id="content-header">
                        </div>
              
              <div id="content" class="clear-block">
              
                <h1 class="page-title">
                  <span class="page-icon"></span>
                  Video Player          </h1>
              
                        
                        
                <div class="node node-movie-clip clear-block corners">
        
        <!-- Movie Clip Player -->
        <div id="movie-clip-player-0" class="movie-clip-player flash">
      
        <input type="hidden" name="bgcolor" value="#734C11"/>
        <input type="hidden" name="height" value="330"/>
        <input type="hidden" name="src" value="/swfs/player.swf"/>
        <input type="hidden" name="width" value="436"/>
      
        <code class="flashvars">
          
          <input type="hidden" name="apiurl" value="/movie/assets/${url.query.version == "2" ? "full" : "trial"}.xml"/>
          <input type="hidden" name="asseturl" value="/movie/assets"/>
          <input type="hidden" name="baseurl" value="${urlPrefix}://${req.headers.host}"/>
          <input type="hidden" name="lang" value="en-local"/>
          <input type="hidden" name="userid" value=""/>
          <input type="hidden" name="movieid" value="${url.query.movieId || ""}"/>
          <input type="hidden" name="flvurl" value=""/>
      
          
          <input type="hidden" name="startername" value=""/>
      
        </code>
      
      </div>  
        <div class="summary"></div>
            
      </div>
                
              </div>
              
              <div id="content-footer">
                        </div>
              
            </div>
            
            <div id="sidebar">
              
              <a id="site-logo" href="/home">
                        </a>
              
                      <ul id="nav"><li class="menu-343 first"><a href="/home" id="nav-home">Home</a></li>
      <li class="menu-345"><a href="/" id="nav-watch">Watch A Movie</a></li>
      <li class="menu-344"><a href="/templates" id="nav-make">Make A Movie</a></li>
      <li class="menu-920"><a href="/spotlight" id="nav-spotlight">Spotlight</a></li>
      <li class="menu-347"><a href="/extras" id="nav-extras">Extras</a></li>
      <li class="menu-79 last"><a href="/help" id="nav-help">Help</a></li>
      </ul>                
                      
            </div>
            
            <div id="sidebar-bg"></div>
            
            <div id="footer">
              <span class="copyright">©2020 Lost The Plot Productions</span>
                        <ul class="links"><li class="menu-924 first"><a href="/membership" title="Get A Membership">Membership</a></li>
      <li class="menu-82"><a href="/about/terms" title="">Terms Of Use</a></li>
      <li class="menu-81"><a href="/about/privacy" title="">Privacy Policy</a></li>
      <li class="menu-83"><a href="/about/conduct" title="">Code Of Conduct</a></li>
      <li class="menu-87"><a href="/about/credits" title="">Credits</a></li>
      <li class="menu-84"><a href="/about/parents" title="">Parents</a></li>
      <li class="menu-348"><a href="/about/contact" title="">Contact</a></li>
      <li class="menu-1343 last"><a href="/about" title="About The Zimmer Twins">About</a></li>
      </ul>              </div>
            
          </div>
          
          <script type="text/javascript">//<![CDATA[
      var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-295035-15"]);_gaq.push(['_setCustomVar',1,"User roles","anonymous user",1]);_gaq.push(["_trackPageview"]);(function(){var ga=document.createElement("script");ga.type="text/javascript";ga.async=true;ga.src=("https:"==document.location.protocol?"https://web.archive.org/web/20160915024310/https://ssl":"https://web.archive.org/web/20160915024310/http://www")+".google-analytics.com/ga.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga,s);})();
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
          <title>${studioTitle} | Zimmer Twins</title>
          <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
          <meta name="description" content="The Zimmer Twins website invites kids to create and share their own animated stories."/>
          <meta name="copyright" content="©2020 Lost The Plot Productions"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <link rel="shortcut icon" href="https://web.archive.org/web/20200705182311im_/http://www.zimmertwins.com/sites/zimmertwins.com/themes/zimmertwins/images/favicon.ico" type="image/x-icon"/>
          <link type="text/css" rel="stylesheet" media="all" href="https://web.archive.org/web/20200705182311cs_/http://www.zimmertwins.com/sites/A.all,,_modules,,_contrib,,_cck,,_theme,,_content-module.css,,qu+all,,_modules,,_contrib,,_date,,_date.css,,qu+all,,_modules,,_contrib,,_og,,_theme,,_og.css,,qu+all,,_modules,,_contrib,,_pollfield,,_pollfield.css,,qu+all,,_modules,,_contrib,,_ubercart,,_uc_order,,_uc_order.css,,qu+all,,_modules,,_contrib,,_ubercart,,_uc_product,,_uc_product.css,,qu+all,,_modules,,_contrib,,_ubercart,,_uc_roles,,_uc_roles.css,,qu+all,,_modules,,_contrib,,_ubercart,,_uc_store,,_uc_store.css,,qu+all,,_modules,,_contrib,,_cck,,_modules,,_fieldgroup,,_fieldgroup.css,,qu+all,,_modules,,_contrib,,_views,,_css,,_views.css,,qu+zimmertwins.com,,_themes,,_zimmertwins,,_style.css,,qu,Mcc.ZqA5kNg5Py.css.pagespeed.cf.NDzs0fZpXb.css"/>
      
      
      
      
      
      
      
      
      
      
          <!--[if IE]>
            <link type="text/css" rel="stylesheet" media="all" href="/sites/zimmertwins.com/themes/zimmertwins/ie.css" />
          <![endif]-->
          <script src="https://web.archive.org/web/20200705182311js_/http://www.zimmertwins.com/misc,_jquery.js,qu+misc,_drupal.js,qu+sites,_all,_modules,_contrib,_fivestar,_js,_fivestar.js,qu+sites,_all,_modules,_contrib,_google_analytics,_googleanalytics.js,qu+sites,_all,_modules,_contrib,_og,_og.js,qu+sites,_all,_modules,_contrib,_ubercart,_uc_roles,_uc_roles.js,qu+sites,_zimmertwins.com,_themes,_zimmertwins,_jquery.flash.js,qu+sites,_zimmertwins.com,_themes,_zimmertwins,_jquery.livequery.js,qu+sites,_zimmertwins.com,_themes,_zimmertwins,_scripts.js,qu.pagespeed.jc.ISNOxQFg5D.js"></script><script>eval(mod_pagespeed_lY3PXsDeiT);</script>
      <script>eval(mod_pagespeed_Aq8kdrmCeT);</script>
      <script>eval(mod_pagespeed_m_VrBtb9AX);</script>
      <script>eval(mod_pagespeed_8mSAI53C15);</script>
      <script>eval(mod_pagespeed_HYIE38osD2);</script>
      <script>eval(mod_pagespeed_yKhvl9r7EL);</script>
      <script>eval(mod_pagespeed_cUiJjLrepK);</script>
      <script>eval(mod_pagespeed_w9$j8Xny$J);</script>
      <script>eval(mod_pagespeed_1EKkpeHo72);</script>
      <script type="text/javascript">//<![CDATA[
      jQuery.extend(Drupal.settings,{"basePath":"/","fivestar":{"titleUser":"Your rating: ","titleAverage":"Average: ","feedbackSavingVote":"Saving vote...\r\n","feedbackVoteSaved":"Rating saved.","feedbackDeletingVote":"Removing vote...","feedbackVoteDeleted":"Rating removed."},"googleanalytics":{"trackMailto":1,"trackDownload":1,"trackDownloadExtensions":"7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip"}});
      //]]></script>${script}
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
        
          <input type="hidden" name="apiurl" value="/movie/assets/${url.query.version == "2" ? "full" : "trial"}.xml"/>
          <input type="hidden" name="asseturl" value="/movie/assets"/>
          <input type="hidden" name="baseurl" value="${urlPrefix}://${req.headers.host}"/>
          <input type="hidden" name="lang" value="en-local"/>
          <input type="hidden" name="userid" value="9"/>
          <input type="hidden" name="starterid" value="${url.query.templateId || ""}"/>
          <input type="hidden" name="movieid" value="${url.query.movieId || ""}"/>
          
              
          <input type="hidden" name="playhelpmovie" value="${tutorial}"/>
          
        </code>
      
      </div>          
              </div>
              
              <div id="content-footer">
                        </div>
              
            </div>
            
            <div id="sidebar">
              
              <a id="site-logo" href="/home">
                        </a>
              
                      <ul id="nav"><li class="menu-343 first"><a href="/home" id="nav-home">Home</a></li>
      <li class="menu-345"><a href="/" id="nav-watch">Watch A Movie</a></li>
      <li class="menu-344"><a href="/templates" id="nav-make">Make A Movie</a></li>
      <li class="menu-920"><a href="/spotlight" id="nav-spotlight">Spotlight</a></li>
      <li class="menu-347"><a href="/extras" id="nav-extras">Extras</a></li>
      <li class="menu-79 last"><a href="/help" id="nav-help">Help</a></li>
      </ul>                
            
            <div id="sidebar-bg"></div>
            
            <div id="footer">
              <span class="copyright">©2020 Lost The Plot Productions</span>
                        <ul class="links"><li class="menu-924 first"><a href="/membership" title="Get A Membership">Membership</a></li>
      <li class="menu-82"><a href="/about/terms" title="">Terms Of Use</a></li>
      <li class="menu-81"><a href="/about/privacy" title="">Privacy Policy</a></li>
      <li class="menu-83"><a href="/about/conduct" title="">Code Of Conduct</a></li>
      <li class="menu-87"><a href="/about/credits" title="">Credits</a></li>
      <li class="menu-84"><a href="/about/parents" title="">Parents</a></li>
      <li class="menu-348"><a href="/contact" title="">Contact</a></li>
      <li class="menu-1343 last"><a href="/about" title="About The Zimmer Twins">About</a></li>
      </ul>              </div>
            
          </div>
          
          <script type="text/javascript">//<![CDATA[
      var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-295035-15"]);_gaq.push(['_setCustomVar',1,"User roles","anonymous user",1]);_gaq.push(["_trackPageview"]);(function(){var ga=document.createElement("script");ga.type="text/javascript";ga.async=true;ga.src=("https:"==document.location.protocol?"https://web.archive.org/web/20200705182311/https://ssl":"https://web.archive.org/web/20200705182311/http://www")+".google-analytics.com/ga.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga,s);})();
      //]]></script>
          
        </body>
      </html>`;
	    break;
    }
  }
  res.end(html);
};
