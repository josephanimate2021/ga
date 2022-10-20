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
    case "/movie/welcome": {
      html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-local" lang="en-local" id="page-welcome">
        <head>
      
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <title>Welcome To The Zimmer Twins | Zimmer Twins</title>
          <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
          <meta name="description" content="The Zimmer Twins website invites kids to create and share their own animated stories."/>
          <meta name="copyright" content="©2020 Lost The Plot Productions"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <link rel="shortcut icon" href="https://web.archive.org/web/20200809021222im_/http://www.zimmertwins.com/sites/zimmertwins.com/themes/zimmertwins/images/favicon.ico" type="image/x-icon"/>
          <link type="text/css" rel="stylesheet" media="all" href="https://web.archive.org/web/20200809021222cs_/http://www.zimmertwins.com/sites/A.all,,_modules,,_contrib,,_cck,,_theme,,_content-module.css,,qF+all,,_modules,,_contrib,,_date,,_date.css,,qF+all,,_modules,,_contrib,,_og,,_theme,,_og.css,,qF+all,,_modules,,_contrib,,_pollfield,,_pollfield.css,,qF+all,,_modules,,_contrib,,_ubercart,,_uc_order,,_uc_order.css,,qF+all,,_modules,,_contrib,,_ubercart,,_uc_product,,_uc_product.css,,qF+all,,_modules,,_contrib,,_ubercart,,_uc_roles,,_uc_roles.css,,qF+all,,_modules,,_contrib,,_ubercart,,_uc_store,,_uc_store.css,,qF+all,,_modules,,_contrib,,_cck,,_modules,,_fieldgroup,,_fieldgroup.css,,qF+all,,_modules,,_contrib,,_views,,_css,,_views.css,,qF+zimmertwins.com,,_themes,,_zimmertwins,,_style.css,,qF,Mcc.ZqA5kNg5Py.css.pagespeed.cf.Xig_POpVNl.css"/>
      
      
      
      
      
      
      
      
      
      
          <!--[if IE]>
            <link type="text/css" rel="stylesheet" media="all" href="/sites/zimmertwins.com/themes/zimmertwins/ie.css" />
          <![endif]-->
          <script src="https://web.archive.org/web/20200809021222js_/http://www.zimmertwins.com/misc,_jquery.js,qF+misc,_drupal.js,qF+sites,_all,_modules,_contrib,_fivestar,_js,_fivestar.js,qF+sites,_all,_modules,_contrib,_google_analytics,_googleanalytics.js,qF+sites,_all,_modules,_contrib,_og,_og.js,qF+sites,_all,_modules,_contrib,_ubercart,_uc_roles,_uc_roles.js,qF+sites,_zimmertwins.com,_themes,_zimmertwins,_jquery.flash.js,qF+sites,_zimmertwins.com,_themes,_zimmertwins,_jquery.livequery.js,qF+sites,_zimmertwins.com,_themes,_zimmertwins,_scripts.js,qF.pagespeed.jc.PcxgMZVs9K.js"></script><script>eval(mod_pagespeed_pvLUIrROzy);</script>
      <script>eval(mod_pagespeed_nMe05TFCjV);</script>
      <script>eval(mod_pagespeed_FV7$Z$2NYz);</script>
      <script>eval(mod_pagespeed_6bVrPKWsmp);</script>
      <script>eval(mod_pagespeed_rpLsmZMkp$);</script>
      <script>eval(mod_pagespeed_Ku_4HW9_SG);</script>
      <script>eval(mod_pagespeed_p9axFxECUi);</script>
      <script>eval(mod_pagespeed_t4terhz9CH);</script>
      <script>eval(mod_pagespeed_Z0T_uRoeFL);</script>
      <script type="text/javascript">//<![CDATA[
      jQuery.extend(Drupal.settings,{"basePath":"/","fivestar":{"titleUser":"Your rating: ","titleAverage":"Average: ","feedbackSavingVote":"Saving vote...\r\n","feedbackVoteSaved":"Rating saved.","feedbackDeletingVote":"Removing vote...","feedbackVoteDeleted":"Rating removed."},"googleanalytics":{"trackMailto":1,"trackDownload":1,"trackDownloadExtensions":"7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip"}});
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
                  Welcome To The Zimmer Twins          </h1>
              
                        
                        
                <div id="node-612356" class="node node-page">
      
        
        
        
        <div class="node-content clear-block">
          <div class="flash">
        <input type="hidden" name="src" value="/swfs/flvplayer.swf"/>
        <input type="hidden" name="height" value="565"/>
        <input type="hidden" name="width" value="760"/>
        <span class="flashvars">
          <input type="hidden" name="flvurl" value="/movie/assets/welcome.flv"/>
        </span>
      </div>
      <p>Can't hear anything? Make sure your volume is turned up.</p>  </div>
      
        
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
                        <ul class="links"><li class="menu-924 first"><a href="membership" title="Get A Membership">Membership</a></li>
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
      var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-295035-15"]);_gaq.push(['_setCustomVar',1,"User roles","anonymous user",1]);_gaq.push(["_trackPageview"]);(function(){var ga=document.createElement("script");ga.type="text/javascript";ga.async=true;ga.src=("https:"==document.location.protocol?"https://web.archive.org/web/20200809021222/https://ssl":"https://web.archive.org/web/20200809021222/http://www")+".google-analytics.com/ga.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga,s);})();
      //]]></script>
          
        </body>
      </html>`;
      break;
    } case "/help": {
      html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-local" lang="en-local" id="page-help-index">
        <head>
      
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <title>Help | Zimmer Twins</title>
          <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
          <meta name="description" content="The Zimmer Twins website invites kids to create and share their own animated stories."/>
          <meta name="copyright" content="©2020 Lost The Plot Productions"/>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <link rel="shortcut icon" href="https://web.archive.org/web/20200809021137im_/http://www.zimmertwins.com/sites/zimmertwins.com/themes/zimmertwins/images/favicon.ico" type="image/x-icon"/>
          <link type="text/css" rel="stylesheet" media="all" href="https://web.archive.org/web/20200809021137cs_/http://www.zimmertwins.com/sites/A.all,,_modules,,_contrib,,_cck,,_theme,,_content-module.css,,qF+all,,_modules,,_contrib,,_date,,_date.css,,qF+all,,_modules,,_contrib,,_og,,_theme,,_og.css,,qF+all,,_modules,,_contrib,,_pollfield,,_pollfield.css,,qF+all,,_modules,,_contrib,,_ubercart,,_uc_order,,_uc_order.css,,qF+all,,_modules,,_contrib,,_ubercart,,_uc_product,,_uc_product.css,,qF+all,,_modules,,_contrib,,_ubercart,,_uc_roles,,_uc_roles.css,,qF+all,,_modules,,_contrib,,_ubercart,,_uc_store,,_uc_store.css,,qF+all,,_modules,,_contrib,,_cck,,_modules,,_fieldgroup,,_fieldgroup.css,,qF+all,,_modules,,_contrib,,_views,,_css,,_views.css,,qF+zimmertwins.com,,_themes,,_zimmertwins,,_style.css,,qF,Mcc.ZqA5kNg5Py.css.pagespeed.cf.Xig_POpVNl.css"/>
      
      
      
      
      
      
      
      
      
      
          <!--[if IE]>
            <link type="text/css" rel="stylesheet" media="all" href="/sites/zimmertwins.com/themes/zimmertwins/ie.css" />
          <![endif]-->
          <script src="https://web.archive.org/web/20200809021137js_/http://www.zimmertwins.com/misc,_jquery.js,qF+misc,_drupal.js,qF+sites,_all,_modules,_contrib,_fivestar,_js,_fivestar.js,qF+sites,_all,_modules,_contrib,_google_analytics,_googleanalytics.js,qF+sites,_all,_modules,_contrib,_og,_og.js,qF+sites,_all,_modules,_contrib,_ubercart,_uc_roles,_uc_roles.js,qF+sites,_zimmertwins.com,_themes,_zimmertwins,_jquery.flash.js,qF+sites,_zimmertwins.com,_themes,_zimmertwins,_jquery.livequery.js,qF+sites,_zimmertwins.com,_themes,_zimmertwins,_scripts.js,qF.pagespeed.jc.PcxgMZVs9K.js"></script><script>eval(mod_pagespeed_pvLUIrROzy);</script>
      <script>eval(mod_pagespeed_nMe05TFCjV);</script>
      <script>eval(mod_pagespeed_FV7$Z$2NYz);</script>
      <script>eval(mod_pagespeed_6bVrPKWsmp);</script>
      <script>eval(mod_pagespeed_rpLsmZMkp$);</script>
      <script>eval(mod_pagespeed_Ku_4HW9_SG);</script>
      <script>eval(mod_pagespeed_p9axFxECUi);</script>
      <script>eval(mod_pagespeed_t4terhz9CH);</script>
      <script>eval(mod_pagespeed_Z0T_uRoeFL);</script>
      <script type="text/javascript">//<![CDATA[
      jQuery.extend(Drupal.settings,{"basePath":"/","fivestar":{"titleUser":"Your rating: ","titleAverage":"Average: ","feedbackSavingVote":"Saving vote...\r\n","feedbackVoteSaved":"Rating saved.","feedbackDeletingVote":"Removing vote...","feedbackVoteDeleted":"Rating removed."},"googleanalytics":{"trackMailto":1,"trackDownload":1,"trackDownloadExtensions":"7z|aac|arc|arj|asf|asx|avi|bin|csv|doc|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|msi|msp|pdf|phps|png|ppt|qtm?|ra(m|r)?|sea|sit|tar|tgz|torrent|txt|wav|wma|wmv|wpd|xls|xml|z|zip"}});
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
                  Help          </h1>
              
                        
                        
                <div id="node-22" class="node node-page">
      
        
        
        
        <div class="node-content clear-block">
          <ol id="topics">
        <li class="topic clear-block" id="topic-quick-start">
          <ol>
            <li class="corners column column-first"><a href="/studio?tutorial=0">How To Make A Movie</a></li>
            <li class="corners column column-last"><a href="/movie/welcome">Zimmer Twins Tour</a></li>
          </ol>
        </li>
        <li class="topic clear-block" id="toc">
          <h3>Table Of Contents</h3>
          <ol>
            <li><a href="/help#topic-getting-started">Getting Started</a></li>
            <li><a href="/help#topic-membership">Membership</a></li>
            <li><a href="/help#topic-movies">Movies</a></li>
            <li><a href="/help#topic-ratings">Ratings</a></li>
            <li><a href="/help#topic-points">Points</a></li>
            <li><a href="/help#topic-favourites">Favourites</a></li>
            <li><a href="/help#topic-search">Search</a></li>
            <li><a href="/help#topic-flagging">Flagging</a></li>
            <li><a href="/help#topic-site-requirements">Site Requirements</a></li>
            <li><a href="/help#topic-feedback">Feedback</a></li>
            <li><a href="/help#topic-zimmerspeak">ZimmerSpeak</a></li>
            <li><a href="/help#topic-vip">VIP Membership</a></li>
          </ol>
        </li>
        <li class="topic clear-block" id="topic-getting-started">
          <h3>Getting Started <a href="/help#wrapper">Top</a></h3>
          <ol>
            <li>
              <h2>What's this all about?</h2>
              <p>On zimmertwins.com you create your own endings to one of our story starters. You may also create your stories from scratch. So put on your director's hat and you might just be our next featured movie maker!</p>
            </li>
            <li>
              <h2>Who are the Zimmer Twins?</h2>
              <p>Edgar and Eva Zimmer are an ordinary pair of 12 year-olds except for one thing - they have psychic powers. They weren't always psychic though. The weirdness began when they adopted a black cat named 13. From that point on, strange things began to happen. How strange? Well, watch some of the <a href="/templates">starters</a> and you'll get the idea.</p>
            </li>
            <li>
              <h2>Why should I join?</h2>
              <p>When you join you can save your movies and rate other people’s movies. The <a href="/agecheck">join page</a> will get you started. Paid members can share their movies with the world and access bonus features. Take a look at the <a href="/membership">membership</a> page for more details.</p>
            </li>
            <li>
              <h2>How do I join?</h2>
              <p>Go to the <a href="/agecheck">join</a> page and fill in the form. You will need your parent or guardian's email address to join. If you need help, ask your parents or a friend.</p>
            </li>
            <li>
              <h2>Will my personal information stay private?</h2>
              <p>Yes. When you join you make up your own nickname that will be displayed alongside any movie you make. This is the only information others will see.  All other information such as your email address will be kept private. See our <a href="/about/privacy">privacy policy</a> for more details.</p>
            </li>
            <li>
              <h2>I forgot my login or my password. What should I do?</h2>
              <p>No problem! Click on the <a href="/user/password">Forgot Password</a> link on the green sidebar. Enter your parent or guardian's email address or your nickname and we'll email you all the info you need to log in. Be sure to check your spam folder in case our email winds up there.</p>
            </li>
            <li>
              <h2>How do I change my nickname or password?</h2>
              <p>First you need to <a href="/user">log in</a>. Then you can change your nickname and password on your <dfn>my account</dfn> page.</p>
            </li>
            <li>
              <h2>How do I change my email address or contact info?</h2>
              <p>First you need to <a href="/user/">log in</a>. Then you can change this information on your <dfn>my account</dfn> page. If you change your email address, it's very important that you update your account page.</p>
            </li>
            <li>
              <h2>Why can't I use my real name as my nickname?</h2>
              <p>Your nickname can be seen by all the others visitors to the site. To keep our site a friendly and safe place, you are not allowed to post your real name or any other <a href="/about/privacy">private information</a>. Your nickname must also not contain any inappropriate language. Decisions on appropriate nicknames are made by the moderators. You'll find more information in our <a href="/about/conduct">code of conduct</a> and <a href="/about/terms">terms of use</a></p>
            </li>
            <li>
              <h2>How do I tell if I'm logged in?</h2>
              <p>When you're logged in, your nickname appears in the green sidebar on the lefthand side of every page.</p>
              <p><img src="https://web.archive.org/web/20200809021137im_/http://www.zimmertwins.com/sites/zimmertwins.com/files/xhelp-how-to-tell-if-logged-in.gif.pagespeed.ic.kQ7R48RDhv.webp" alt=""/></p>
            </li>
          </ol>
        </li>
        <li class="topic clear-block" id="topic-membership">
          <h3>Membership <a href="/help#wrapper">Top</a></h3>
          <ol>
          <li>
              <h2>Why should I become a VIP member?</h2>
              <p>VIP members can share their Zimmer Twins movies with the world. Plus they can review other member's movies and get access to exclusive animation clips for their movies! To learn more visit our <a href="/membership">membership</a> page.</p>
          </li>
          <li>
              <h2>Why isn't my movie showing up on the Watch a Movie page?</h2>
              <p>Only VIP members have their movies visible to the public in areas like the <a href="/">Watch a Movie</a> and <a href="/spotlight">Spotlight</a> pages.</p>
          </li>
          <li>
              <h2>What happens to my movies if I don't renew my VIP membership?</h2>
              <p>The movies you made as a VIP member are still visible to everyone on the website. But new movies you make won't be visible to the public until you renew your subscription.</p>
          </li>
          <li>
              <h2>Why are VIP members the coolest people around?</h2>
              <p>Because their membership fees keep the Zimmer Twins website ticking along! We genuinely appreciate this financial support and so should you! A big round of applause for our VIP members!</p>
          </li>
          </ol>
        </li>
        <li class="topic clear-block" id="topic-ratings">
          <h3>Ratings <a href="/help#wrapper">Top</a></h3>
          <ol>
            <li>
              <h2>What's a rating?</h2>
              <p>Members can rate movies on a scale of 1 to 5.</p>
              <dl>
                <dt>5/5</dt><dd>Best of the best!</dd>
                <dt>4/5</dt><dd>Really good!</dd>
                <dt>3/5</dt><dd>Getting better!</dd>
                <dt>2/5</dt><dd>Keep practicing!</dd>
                <dt>1/5</dt><dd>Needs some work.</dd>
              </dl>
              <p>Ratings give members an idea of how popular their movies are (but remember - popularity isn't everything!).</p>
            </li>
            <li>
              <h2>How do I rate something?</h2>
              <p>Just click on the <dfn>rating paws</dfn> on the movie's page.</p>
            </li>
            <li>
              <h2>My movies are being rated very low, what can I do?</h2>
              <p>Remember that ratings aren't really important. If you want to improve your movie ratings, simply create a new, hold-on-to-your-hat-Steven-Spielberg movie and you should see your ratings go through the roof!</p>
            </li>
            <li>
              <h2>How are ratings calculated? What do they mean?</h2>
              <p>The rating displayed beside a movie is the average of all the ratings given by members. Ratings are only calculated when a few members have rated a movie.</p>
            </li>
          </ol>
        </li>
        <li class="topic clear-block" id="topic-points">
          <h3>Points <a href="#wrapper" class="more">Top</a></h3>
          <ol>
            <li>
              <h2>What are points?</h2>
              <p>Points are a quick way to tell how much a member participates on the Zimmer Twins. The more movies and comments a member makes, the more points they earn. You can see a member's points meter beside their nickname on their movies and comments, or you can see a member's tagline and how many points they have at the top of their movies page.</p>
            </li>
            <li>
              <h2>How do I earn points?</h2>
              <p>You can earn points by making movies and leaving comments &mdash; the more stuff you make, the more points you'll earn! You can see your tagline and how many points you have at the top of your my movies page.</p>
            </li>
            <li>
              <h2>How do I get a new tagline?</h2>
              <p>When you earn enough points, you'll get a new tagline and an extra bar on the points meter that shows up beside your nickname.</p>
              <table>
                <thead>
                  <tr>
                    <th>Tagline</th>
                    <th>Points</th>
                    <th>Meter</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Certified Spoon Bender</td>
                    <td>2500</td>
                    <td><img src="data:image/webp;base64,UklGRr4AAABXRUJQVlA4TLIAAAAvH0AEEMegqG0kZ3bvjj/Se/UeGgraNnJ69//88T2OvaOgbSMnd/8P5vlD27tqIkmKOsUBSogRgwasnR9+E1SFhJzzlfgppVZKCRCQe6+11nvvmXPm9x4QEJD/f5VIaynOYZuxz6EA3uNJDDM6GEmSlKhx2GZd//9Wxe4R/RcSJJo5gv9f57aOSfaYhz4k2T2SNsluJE2KffbHfvVu/3W3rdfpBAcssXMywQGTN0IluPYH" alt=""/></td>
                  </tr>
                  <tr>
                    <td>Competent Clarivoyant</td>
                    <td>1000</td>
                    <td><img src="data:image/webp;base64,UklGRvwAAABXRUJQVlA4TPAAAAAvH0AEEIehOJKkZA/JPx6C4uXuEIOCNpKU3Qf/+t4FM6yCNpKUuQcxr+D9a2JeRbGtVHdLA9Qerg1jBuoYgz7+SzBTBwB0SA8gpI/dlOJDYkjUe0lr/fYecU5t7zEkhsSQ6P83AElLXg6HyCmHOgTt8QEmEVMxSzlnAEScs/yftJaX8871EDG4kiTZtPoac23jzX3m/rfHy/+I/gsJEs0cwfhfz9v1ONJmaRS6eJwP+36kTXzHNnAfmJuRNraIVNyYuR5pIyJSvhtj//XbjuvTbj1THuPe7SoAgWVq4ih3GXZtCcDTFUEa5U5dXeTY/gA=" alt=""/></td>
                  </tr>
                  <tr>
                    <td>Amateur Astrologer</td>
                    <td>500</td>
                    <td><img src="data:image/webp;base64,UklGRgABAABXRUJQVlA4TPQAAAAvH0AEEIehOJKkZA/JPx6C4uXuEIOCNpKU3Qf/+t4FM6yCNpKUuQcxr+D9a2JeRbGtVHdLA9Qerg1jBuoYgz7+SzBTBwB0SA8gpI/dlOJDYkjUe0lr/fYecU5t7zEkhsSQ6P83AElLXg6HyCmHOgTt8QEmEVMxSzlnAEScs/yftJaX8871EDG4DQA2bRQGhZlJKeP/91UN7xH9FxIkmjkC8/9+no/LIvu+nU89TJ2lUegy+xqJmkmb+I5tMPskonrSxhai+mt5EzZCRGWq/3Ze3B47U55wT6KhYg4gsExNnHD3cWhL5gA8XRGkCXft6iJn7vgD" alt=""/></td>
                  </tr>
                  <tr>
                    <td>Faux Fortune Teller</td>
                    <td>250</td>
                    <td><img src="data:image/webp;base64,UklGRgIBAABXRUJQVlA4TPYAAAAvH0AEEIehOJKkZA/JPx6C4uXuEIOCNpKU3Qf/+t4FM6yCNpKUuQcxr+D9a2JeRbGtVHdLA9Qerg1jBuoYgz7+SzBTBwB0SA8gpI/dlOJDYkjUe0lr/fYecU5t7zEkhsSQ6P83AElLXg6HyCmHOgTt8QEmEVMxSzlnAEScs/yftJaX8871EDG4kiTZtOYac21rrp7f/td3jf+I/gsJEs0cge3/f+/XsMt+H31X77KflqiA+VHoueaKfRNRvmAD29CVZTtvZn0NUZzatWbWQ0RhW1N791R+5t5ETbbiABxNldiZe7ZNma44AEsWGG7mxipP4hV3/wE=" alt=""/></td>
                  </tr>
                  <tr>
                    <td>Ouija Board Operator</td>
                    <td>100</td>
                    <td><img src="data:image/webp;base64,UklGRvoAAABXRUJQVlA4TO4AAAAvH0AEEIehOJKkZA/JPx6C4uXuEIOCNpKU3Qf/+t4FM6yCNpKUuQcxr+D9a2JeRbGtVHdLA9Qerg1jBuoYgz7+SzBTBwB0SA8gpI/dlOJDYkjUe0lr/fYecU5t7zEkhsSQ6P83AElLXg6HyCmHOgTt8QEmEVMxSzlnAEScs/yftJaX8871EDG4kiTZtPoac21r7jP3vz5d/kf0X0iQaOYIpv9+3W+nWfZ5OR76WfYxMjez7J2ZawBZGoXuJPtd4ju28dv+LbaI1E87sYiIlL1nyrgzD9UkBwSWqYm4jkNbTnKApyuChHNXF/kkt/8B" alt=""/></td>
                  </tr>
                  <tr>
                    <td>Psychic Trainee</td>
                    <td>0</td>
                    <td><img src="data:image/webp;base64,UklGRrQAAABXRUJQVlA4TKgAAAAvH0AEEMegkJEkaXr/VVl/k+M4HwVt20jN/oEb+sNxHBS1bQOlu8cf2rjsrahtI8kwBskgGuSzJ4N9rRQS7jgS7U4CIljAivDcXSAgIO5uZq676+6ICCAgM3MlfmbWe0fi/f/AuI0kRb3MdJx/rLj0j+i/kCDRzBH8/6JcnlWWKG1ClWXWuVxluXOu1Nhnf+xX7/Zfdzt7fqlwgLA+bRUOOGJZ9wo3/wA=" alt=""/></td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ol>
        </li>
        <li class="topic clear-block" id="topic-favorites">
          <h3>favorites <a href="/help#wrapper">Top</a></h3>
          <ol>
            <li>
              <h2>What's a favorite?</h2>
              <p>Your favorites are a list of the movies you have selected as your favorite movies on the site. By adding a movie to your favorites list, you can quickly find it again by clicking on the <dfn>my favorites</dfn> button on any page.</p>
            </li>
            <li>
              <h2>How do I add a movie to <em>my favorites</em>?</h2>
              <p>Click the favorite button on the page containing the movie you like.</p>
            </li>
            <li>
              <h2>How do I remove a movie from <em>my favorites</em>?</h2>
              <p>Click on the favorite button on the page containing the movie.</p>
            </li>
          </ol>
        </li>
        <li class="topic clear-block" id="topic-search">
          <h3>Search <a href="/help#wrapper">Top</a></h3>
          <ol>
            <li>
              <h2>How do I find new and awesome movies to watch?</h2>
              <p>Go to the <a href="/">watch a movie</a> page where you'll find some of the latest and greatest movies. You can also use the <a href="/movie/search">search tool</a> to search for movies with the highest rating made in the last day, week or month.</p>
            </li>
            <li>
              <h2>How do I find my friends' movies?</h2>
              <p>Type their nickname in the search box and press 'go'. Remember that you can see a list of their movies by clicking on their nickname anywhere it appears on the site.</p>
            </li>
          </ol>
        </li>
        <li class="topic clear-block" id="topic-site-requirements">
          <h3>Site Requirements <a href="/help#wrapper">Top</a></h3>
          <ol>
            <li>
              <h2>What browser do I need?</h2>
              <p>We strongly recommend that you use a recent version of <a href="http://www.mozilla.org/products/firefox/">Firefox</a>, <a href="http://www.microsoft.com/windows/ie/">Internet Explorer</a>, or <a href="http://www.apple.com/safari/">Safari</a>. Firefox is available for PC, OSX (mac), and Linux.</p>
            </li>
            <li>
              <h2>What plugins do I need?</h2>
              <p>To use the site, you will need to have Flash 9 (or higher) installed. Flash is a <a href="http://get.adobe.com/flashplayer/">free download</a> from Adobe.</p>
            </li>
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
        <li class="topic clear-block" id="topic-feedback">
          <h3>Feedback <a href="/help#wrapper">Top</a></h3>
          <ol>
            <li>
              <h2>Something on the site is broken. Can you fix it?</h2>
              <p>We certainly can try! Before you report a problem, please check our <a href="/help#topic-site-requirements">site requirements</a>. If your computer meets these requirements and something still isn't working properly, then let us know about it by using the <a href="/contact">contact form</a>. Please be as specific as possible when you explain what the problem is and we'll make every effort to fix it.</p>
            </li>
            <li>
              <h2>How can I make suggestions for the website?</h2>
              <p>We'd love to hear from you and, unlike the Zimmer Twins, we're not psychic! To make a suggestion, use our <a href="/contact">contact form</a>.</p>
            </li>
            <li>
              <h2>I think the Zimmer Twins are super cool. Do you like fan mail?</h2>
              <p>In our books, fan mail is right up there with free samples of chocolate and fairy floss. We LOVE fan mail! Our team put a lot of work into creating the Zimmer Twins and it's always nice to here from you. Drop us a line with the <a href="/contact">contact form</a>.</p>
            </li>
          </ol>
        </li>
        <li class="topic clear-block" id="topic-zimmerspeak">
          <h3>ZimmerSpeak – Glossary <a href="/help#wrapper">Top</a></h3>
          <dl>
            <dt>Collabo-write:</dt><dd>When you make your own version of a movie from one that someone else has already created, you are collabo-writing!</dd>
            <dt>Comment:</dt><dd>Messages from members about what they think of a movie.</dd>
            <dt>Crowd Pleasers:</dt><dd>The top-rated movies as decided by other members.</dd>
            <dt>Ending:</dt><dd>An ending is the animation which you create to finish off one of the story starters.</dd>
            <dt>Favorites:</dt><dd>Your own personal list of favorite movies. Once you've added a movie to your favorites it's very easy to find it again.</dd>
            <dt>Movie:</dt><dd>A movie is a starter plus your unique ending put together to create a complete story from beginning to end.</dd>
            <dt>Must-See Movie:</dt><dd>Movies that are so clever that the Mod Squad just had to let everyone know.</dd>
            <dt>Nickname:</dt><dd>The name you use on this website. Your nickname appears on all of your movies. Be creative and make something up. Don't use your real name.</dd>
            <dt>Starter:</dt><dd>A starter is the beginning of a movie, which we've already created, ready for you to finish.</dd>
            <dt>Rating:</dt><dd>What people think of the movies on a scale of 1 (not so good) to 5 (amazingly fantastic!).</dd>
      
          </dl>
        </li>
          <li class="topic clear-block" id="topic-vip">
          <h3>VIP Membership <a href="/help#wrapper">Top</a></h3>
          <ol>
            <li>
              <h2>Will my subscription be renewed automatically?</h2>
              <p>You will not be automatically charged. We only bill a one-time fee for the subscription. You can renew at any time on our <a href="/membership/renewal">renewal</a> page.</p>
            </li>
            <li>
              <h2>What happens to my movies if I forget to renew my account?</h2>
              <p>All of the movies made while you are VIP member remain publicly viewable. But new movies made after your subscription has run out will be private. You can renew your membership at any time.</p>
            </li>
          </ol>
        </li>
      
      </ol>  </div>
      
        
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
      <li class="menu-79 active-trail last active"><a href="/help" id="nav-help" class="active">Help</a></li>
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
          
          <script type="text/javascript">//<![CDATA[
      var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-295035-15"]);_gaq.push(['_setCustomVar',1,"User roles","anonymous user",1]);_gaq.push(["_trackPageview"]);(function(){var ga=document.createElement("script");ga.type="text/javascript";ga.async=true;ga.src=("https:"==document.location.protocol?"https://web.archive.org/web/20200809021137/https://ssl":"https://web.archive.org/web/20200809021137/http://www")+".google-analytics.com/ga.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga,s);})();
      //]]></script>
          
        </body>
      </html>`;
      break;
    } case "/images": {
      html = fs.readFileSync(`./files/${url.query.file}`);
      break;
    } case "/videos/html5": {
      res.setHeader("Content-Type", "video/mp4");
      html = fs.readFileSync(`./files/${url.query.file}`);
      break;
    } case "/home": {
      const files = movie.home();
      html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-local" lang="en-local" id="page-zt-frontpage">
      <head>
    
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Home | Zimmer Twins</title>
        <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
        <meta name="description" content="The Zimmer Twins website invites kids to create and share their own animated stories."/>
        <meta name="copyright" content="©2020 Lost The Plot Productions"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="shortcut icon" href="http://web.archive.org/web/20190516080207im_/http://www.zimmertwins.com/sites/zimmertwins.com/themes/zimmertwins/images/favicon.ico" type="image/x-icon"/>
        <link type="text/css" rel="stylesheet" media="all" href="http://web.archive.org/web/20190516080207cs_/http://www.zimmertwins.com/sites/A.all,,_modules,,_contrib,,_cck,,_theme,,_content-module.css,,qo+all,,_modules,,_contrib,,_date,,_date.css,,qo+all,,_modules,,_contrib,,_og,,_theme,,_og.css,,qo+all,,_modules,,_contrib,,_pollfield,,_pollfield.css,,qo+all,,_modules,,_contrib,,_ubercart,,_uc_order,,_uc_order.css,,qo+all,,_modules,,_contrib,,_ubercart,,_uc_product,,_uc_product.css,,qo+all,,_modules,,_contrib,,_ubercart,,_uc_roles,,_uc_roles.css,,qo+all,,_modules,,_contrib,,_ubercart,,_uc_store,,_uc_store.css,,qo+all,,_modules,,_contrib,,_cck,,_modules,,_fieldgroup,,_fieldgroup.css,,qo+all,,_modules,,_contrib,,_views,,_css,,_views.css,,qo+zimmertwins.com,,_themes,,_zimmertwins,,_style.css,,qo,Mcc.ZqA5kNg5Py.css.pagespeed.cf.NDzs0fZpXb.css"/>
    
    
    
    
    
    
    
    
    
    
        <!--[if IE]>
          <link type="text/css" rel="stylesheet" media="all" href="/sites/zimmertwins.com/themes/zimmertwins/ie.css" />
        <![endif]-->
        <script src="http://web.archive.org/web/20190516080207js_/http://www.zimmertwins.com/misc,_jquery.js,qo+misc,_drupal.js,qo+sites,_all,_modules,_contrib,_fivestar,_js,_fivestar.js,qo+sites,_all,_modules,_contrib,_google_analytics,_googleanalytics.js,qo+sites,_all,_modules,_contrib,_og,_og.js,qo+sites,_all,_modules,_contrib,_ubercart,_uc_roles,_uc_roles.js,qo+sites,_zimmertwins.com,_themes,_zimmertwins,_jquery.flash.js,qo+sites,_zimmertwins.com,_themes,_zimmertwins,_jquery.livequery.js,qo+sites,_zimmertwins.com,_themes,_zimmertwins,_scripts.js,qo.pagespeed.jc.dKbUp59vmP.js"></script><script>eval(mod_pagespeed_bgZrOPqkZY);</script>
    <script>eval(mod_pagespeed_VLM$MYZ711);</script>
    <script>eval(mod_pagespeed_nnMR8dxSX7);</script>
    <script>eval(mod_pagespeed_GdQ3ddNIqE);</script>
    <script>eval(mod_pagespeed_gyHVRD6vOc);</script>
    <script>eval(mod_pagespeed_NZ8d5V8DGO);</script>
    <script>eval(mod_pagespeed_fQUrv_GhEc);</script>
    <script>eval(mod_pagespeed_UVWLs_Qj4i);</script>
    <script>eval(mod_pagespeed_PFELyjrgjL);</script>
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
                Home          </h1>
            
                      
                      
              <div id="animation" class="flash" style="background-color:#a1b0ab;background-image:url(http://web.archive.org/web/20190516080207im_/http://www.zimmertwins.com/sites/all/movie/frontpage/kitchen/xbg.gif.pagespeed.ic.2zRH9tVTzy.png)">
      <img src="http://web.archive.org/web/20190516080207im_/http://www.zimmertwins.com/sites/all/movie/frontpage/kitchen/xanimation.gif.pagespeed.ic.bp0NR-K-Ov.png" alt=""/>
      <input type="hidden" name="height" value="335"/>
      <input type="hidden" name="src" value="/swfs/animation.swf"/>
      <input type="hidden" name="width" value="760"/>
      <input type="hidden" name="wmode" value="transparent"/>
    </div>
    
    <ul id="movie-links" class="clear-block">
      <li id="movie-links-make">
        <a href="/templates">Make A Movie</a>  </li>
      <li id="movie-links-watch">
        <a href="/">Watch A Movie</a>  </li>
      <li id="movie-links-user">
              <a target="_blank" href="https://youtube.com/@josephanimate">JosephAnimate YouTube Channel</a>      </li>
    </ul>
    <div id="ads">
      <div class="block block-block block-block-14">
		    <a href="http://localhost/home">
          <img src="https://web.archive.org/web/20200806063748im_/http://www.zimmertwins.com/sites/zimmertwins.com/files/xad-square-education.png.pagespeed.ic.TjtrKXdlWy.png" alt="Zimmer Twins At School advert"/>
        </a>
      </div>
    </div>
    <div id="movies">
      <h3>
        Your Movies    <a href="/" class="more">Link To The Video List</a>  </h3>
      
    <ul class="movie-clip-list must-see-list clear-block">
    
        
                
        ${files.map(v => `${v.html}`)}
    
      
    </ul>
    </div>
    
    <div id="coppa">
      <h3>Privacy Notice</h3>
      <p>Zimmertwins localhost respects the privacy of its members. Please see our <a href="/about/privacy">privacy policy</a> for details.</p>
    </div>
              
            </div>
            
            <div id="content-footer">
                      </div>
            
          </div>
          
          <div id="sidebar">
            
            <a id="site-logo" href="/home">
                      </a>
            
                    <ul id="nav"><li class="menu-343 active-trail first active"><a href="/home" id="nav-home" class="active">Home</a></li>
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
        
        <script type="text/javascript">//<![CDATA[
    var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-295035-15"]);_gaq.push(['_setCustomVar',1,"User roles","anonymous user",1]);_gaq.push(["_trackPageview"]);(function(){var ga=document.createElement("script");ga.type="text/javascript";ga.async=true;ga.src=("https:"==document.location.protocol?"http://web.archive.org/web/20190516080207/https://ssl":"http://web.archive.org/web/20190516080207/http://www")+".google-analytics.com/ga.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga,s);})();
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
