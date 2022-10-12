const fs = require("fs"),
fUtil = require("./fileUtil"),
env = require("./env");
aniSwfUrl = env.SWF_URL,
aniStoreUrl = env.STORE_URL,
aniClientUrl = env.CLIENT_URL;

module.exports = function (req, res, url) {
  if (req.method != "GET") return;
  var html, tId, mId;
  if (url.query.movieId) mId = `&amp;movieId=${url.query.movieId}`;
  else mId = '';
  const urlPrefix = req.headers.host == "localhost" ? "http" : req.headers.host == `localhost:${process.env.port}` ? "http" : "https";
  switch (url.pathname) {
   case "/": {
        html = ``;
        break;
    } case "/player": {
	    res.setHeader("Content-Type", "text/html; charset=utf8");
	    html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-local" lang="en-local" id="page-movie-clip-view">
        <head>
      
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <title>Grammar Contest | Zimmer Twins</title>
          <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
          <meta name="description" content="The Zimmer Twins website invites kids to create and share their own animated stories."/>
          <meta name="copyright" content="©2016 Lost The Plot Productions"/>
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
                  Grammar Contest          </h1>
              
                        
                        
                <div class="node node-movie-clip clear-block corners">
        
        <!-- Movie Clip Player -->
        <div id="movie-clip-player-0" class="movie-clip-player flash">
      
        <input type="hidden" name="bgcolor" value="#734C11"/>
        <input type="hidden" name="height" value="330"/>
        <input type="hidden" name="src" value="https://josephanimate2021.github.io/lvm-static/api/zimmertwins/player.swf"/>
        <input type="hidden" name="width" value="436"/>
      
        <code class="flashvars">
          
          <input type="hidden" name="apiurl" value="https://josephanimate2021.github.io/lvm-static/api/zimmertwins/api_paid.xml"/>
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
            Grammar Contest
      
          </h2>
          
          <p class="submitted">
            <span class="date">
              Posted <em>6 years ago</em>      </span>
            <span class="user">
              By <a href="/profile/view/40061">RageTheRetard280</a> 
                    <img src="/sites/localhost/files/badges/32x18xbadge-participation-5.png.pagespeed.ic.UtTQYP-1wD.png" alt="Super Pro Producer" title="Super Pro Producer" width="32" height="18" class="badge"/>      </span>
          </p>
          
          <p class="description">Fix the capitalizitaion errors, spelling errors
      
      </p>
          
          <!-- Movie Clip Types -->
          
          <dl class="movie-clip-statistics">
            <dt>Comments:</dt>
          <dd>6</dd>
            <dt>Views:</dt>
          <dd>538</dd>
            <dt>Ratings:</dt>
          <dd>0</dd>
            <dt>Rated:</dt>
          <dd>0/5</dd>
        </dl>  </div>
        
        <span class="separator"></span>
        
        <!-- Movie Clip Actions -->
            <ul class="movie-clip-actions clear-block">
                    <li class="flag">
                <a href="/abuse/report/node/${url.query.movieId || ""}">Flag</a>        </li>
                </ul>
        
        <!-- Movie Clip Rating -->
            <div class="movie-clip-rating">
              <div class="fivestar-static-form-item"><div class="form-item">
       <div class="fivestar-widget-static fivestar-widget-static-vote fivestar-widget-static-5 clear-block"><div class="star star-1 star-odd star-first"><span class="off">0</span></div><div class="star star-2 star-even"><span class="off"></span></div><div class="star star-3 star-odd"><span class="off"></span></div><div class="star star-4 star-even"><span class="off"></span></div><div class="star star-5 star-odd star-last"><span class="off"></span></div></div>
       <div class="description"><div class="fivestar-summary fivestar-summary-"></div></div>
      </div>
      </div>    </div>
            
      </div>
                
              </div>
              
              <div id="content-footer">
                        </div>
              
            </div>
            
            <div id="sidebar">
              
              <a id="site-logo" href="/">
                        </a>
              
                      <ul id="nav"><li class="menu-343 first"><a href="/" id="nav-home">Home</a></li>
      <li class="menu-345"><a href="/movie/watch" id="nav-watch">Watch A Movie</a></li>
      <li class="menu-344"><a href="/movie/starters" id="nav-make">Make A Movie</a></li>
      <li class="menu-920"><a href="/spotlight" id="nav-spotlight">Spotlight</a></li>
      <li class="menu-347"><a href="/extras" id="nav-extras">Extras</a></li>
      <li class="menu-79 last"><a href="/help" id="nav-help">Help</a></li>
      </ul>                
              <div class="block block-user block-user-0">
            <h2>Login</h2>
          <form action="/api/userLogin" accept-charset="UTF-8" method="post" id="user-login-form">
      <div><div class="form-item" id="edit-name-wrapper">
       <label for="edit-name">Nickname: <span class="form-required" title="This field is required.">*</span></label>
       <input type="text" maxlength="60" name="name" id="edit-name" size="15" value="" class="form-text required"/>
      </div>
      <div class="form-item" id="edit-pass-wrapper">
       <label for="edit-pass">Password: <span class="form-required" title="This field is required.">*</span></label>
       <input type="password" name="pass" id="edit-pass" maxlength="60" size="15" class="form-text required"/>
      </div>
      <input type="submit" name="op" id="edit-submit" value="Log in" class="form-submit"/>
      <div class="item-list"><ul><li class="first"><a href="/user/register" title="Create a new user account.">Join The Site</a></li>
      <li class="last"><a href="/user/password" title="Request new password via e-mail.">Forgot Password</a></li>
      </ul></div><input type="hidden" name="form_build_id" id="form-xntQ7_xvQJNJ5JbVpriodCNHj0X7T99RsAZRKazXbnU" value="form-xntQ7_xvQJNJ5JbVpriodCNHj0X7T99RsAZRKazXbnU"/>
      <input type="hidden" name="form_id" id="edit-user-login-block" value="user_login_block"/>
      
      </div></form>
      </div>
      <div class="block block-movie-search block-movie-search-0">
            <h2>search</h2>
          <form action="/ajax/searchMovies" accept-charset="UTF-8" method="post" id="movie-clip-block-search-movie-form">
      <div><div class="form-item" id="edit-keywords-wrapper">
       <input type="text" maxlength="50" name="keywords" id="edit-keywords" size="10" value="" class="form-text required"/>
      </div>
      <input type="submit" name="op" id="edit-search" value="Go" class="form-submit"/>
      <input type="hidden" name="form_build_id" id="form-NH0AABK8yV2pTbzP8Uj2RA8o3PueaJ9Vkzn_uMAsgOg" value="form-NH0AABK8yV2pTbzP8Uj2RA8o3PueaJ9Vkzn_uMAsgOg"/>
      <input type="hidden" name="form_id" id="edit-movie-clip-block-search-movie-form" value="movie_clip_block_search_movie_form"/>
      
      </div></form>
      </div>
                      
            </div>
            
            <div id="sidebar-bg"></div>
            
            <div id="footer">
              <span class="copyright">©2016 Lost The Plot Productions</span>
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
	    res.setHeader("Content-Type", "text/html; charset=utf8");
	    html = `<body style="margin:0px"><embed height="100%" flashvars="apiurl=%2Fmovie%2Fassets%2Fapi.xml&amp;asseturl=%2Fmovie%2Fassets&amp;baseurl=${urlPrefix}://${req.headers.host}&amp;lang=en-local&amp;userid=416896${mId}" pluginspage="http://www.adobe.com/go/getflashplayer" src="${aniSwfUrl}/editor.swf" type="application/x-shockwave-flash" width="100%"></embed></body>`;
	    break;
    }
  }
  res.end(html);
};
