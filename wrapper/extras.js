const fs = require("fs");
const path = require("path");

module.exports = function (req, res, url) {
	if (req.method != "GET" || !url.pathname.startsWith("/extras")) return;
	res.setHeader("Content-Type", "text/html; charset=utf8");
	const pathName = path.join(__dirname, '.' + url.pathname + '.txt')
	const html = fs.existsSync(pathName) ? fs.readFileSync(pathName) : `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-local" lang="en-local" id="page-extra-index">
      <head>
    
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Extras | Zimmer Twins</title>
        <meta name="keywords" content="Animation, Games, Kids, Children, Storytelling, Stories, Movies, Movie-Maker, Learning, Literacy, Educational, Free, Activities, Elementary, Primary, Eva, Edgar, Psychic, Creative, Parents, Family, zinc Roe"/>
        <meta name="description" content="The Zimmer Twins website invites kids to create and share their own animated stories."/>
        <meta name="copyright" content="©2020 Lost The Plot Productions"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="shortcut icon" href="https://web.archive.org/web/20200809021120im_/http://www.zimmertwins.com/sites/zimmertwins.com/themes/zimmertwins/images/favicon.ico" type="image/x-icon"/>
        <link type="text/css" rel="stylesheet" media="all" href="https://web.archive.org/web/20200809021120cs_/http://www.zimmertwins.com/sites/A.all,,_modules,,_contrib,,_cck,,_theme,,_content-module.css,,qF+all,,_modules,,_contrib,,_date,,_date.css,,qF+all,,_modules,,_contrib,,_og,,_theme,,_og.css,,qF+all,,_modules,,_contrib,,_pollfield,,_pollfield.css,,qF+all,,_modules,,_contrib,,_ubercart,,_uc_order,,_uc_order.css,,qF+all,,_modules,,_contrib,,_ubercart,,_uc_product,,_uc_product.css,,qF+all,,_modules,,_contrib,,_ubercart,,_uc_roles,,_uc_roles.css,,qF+all,,_modules,,_contrib,,_ubercart,,_uc_store,,_uc_store.css,,qF+all,,_modules,,_contrib,,_cck,,_modules,,_fieldgroup,,_fieldgroup.css,,qF+all,,_modules,,_contrib,,_views,,_css,,_views.css,,qF+zimmertwins.com,,_themes,,_zimmertwins,,_style.css,,qF,Mcc.ZqA5kNg5Py.css.pagespeed.cf.Xig_POpVNl.css"/>
    
    
    
    
    
    
    
    
    
    
        <!--[if IE]>
          <link type="text/css" rel="stylesheet" media="all" href="/sites/zimmertwins.com/themes/zimmertwins/ie.css" />
        <![endif]-->
        <script src="https://web.archive.org/web/20200809021120js_/http://www.zimmertwins.com/misc,_jquery.js,qF+misc,_drupal.js,qF+sites,_all,_modules,_contrib,_fivestar,_js,_fivestar.js,qF+sites,_all,_modules,_contrib,_google_analytics,_googleanalytics.js,qF+sites,_all,_modules,_contrib,_og,_og.js,qF+sites,_all,_modules,_contrib,_ubercart,_uc_roles,_uc_roles.js,qF+sites,_zimmertwins.com,_themes,_zimmertwins,_jquery.flash.js,qF+sites,_zimmertwins.com,_themes,_zimmertwins,_jquery.livequery.js,qF+sites,_zimmertwins.com,_themes,_zimmertwins,_scripts.js,qF.pagespeed.jc.PcxgMZVs9K.js"></script><script>eval(mod_pagespeed_pvLUIrROzy);</script>
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
                Extras          </h1>
            
                      
                      
              <div id="node-612355" class="node node-page">
    
      
      
      
      <div class="node-content clear-block">
    
    <ul class="extra-list clear-block">
      <li class="extra wrap">
        <a class="thumbnail corners" target="_blank" href="https://github.com/josephanimate2021/ga/tree/zimmertwins-desktop-api">
          <img src="https://i.ytimg.com/vi/t6RcCufh1QQ/maxresdefault.jpg" alt="Zimmertwins Source Code"/>
        </a>
        <p><strong>Zimmertwins Source Code</strong> Ever wondered how zimmertwins was made as a desktop application? view the anwser there!</p>
      </li>
      <li class="extra">
        <a class="thumbnail corners" href="extras/psychic-stack">
          <img src="https://web.archive.org/web/20200809021120im_/http://www.zimmertwins.com/sites/zimmertwins.com/files/xextra-index-psychic-stack.png.pagespeed.ic.sWazidWBP1.webp" alt="Psychic Stack"/>
        </a>
        <p><strong>Psychic Stack</strong> Use your psychic powers to stack stuff. How high can you go?!</p>
      </li>
      <li class="extra">
        <a class="thumbnail corners" href="extras/flying-furball">
          <img src="https://web.archive.org/web/20200809021120im_/http://www.zimmertwins.com/sites/zimmertwins.com/files/xextra-index-flying-furball.gif.pagespeed.ic.QYHhxrI7xT.webp" alt="Flying Furball"/>
        </a>
        <p><strong>Flying Furball</strong> Jump! Duck! Keep thirteen in fishbones and out of trouble!</p>
      </li>
      <li class="extra wrap">
        <a class="thumbnail corners" target="_blank" href="https://flashthemes.net">
          <img src="https://flashthemes.net/maintenance/ft.png" alt="FlashThemes"/>
        </a>
        <p><strong>FlashThemes</strong> Make videos using lvms from 2010 to 2016 in seconds! create an account to get started.</p>
      </li>
      <li class="extra">
        <a class="thumbnail corners" href="extras/escape-from-skull-cave">
          <img src="https://web.archive.org/web/20200809021120im_/http://www.zimmertwins.com/sites/zimmertwins.com/files/xextra-index-escape-from-skull-cave.png.pagespeed.ic.txO_IrN0ds.webp" alt="Escape From Skull Cave"/>
        </a>
        <p><strong>Escape From Skull Cave</strong> Keep the idol safe from evil forces... Can you make it out alive?!</p>
      </li>
      <li class="extra">
        <a class="thumbnail corners" href="extras/snack-attack">
          <img src="https://web.archive.org/web/20200809021120im_/http://www.zimmertwins.com/sites/zimmertwins.com/files/extra-index-snack-attack.gif.pagespeed.ce.8MknXt0NL3.gif" alt="Snack Attack"/>
        </a>
        <p><strong>Snack Attack</strong> The hungry trick-or-treaters are headed toward Edgar and Eva's house... Quick, give 'em the candy!!</p>
      </li>
      <li class="extra wrap">
        <a class="thumbnail corners" href="extras/psychic-stunt-wagon">
          <img src="https://web.archive.org/web/20200809021120im_/http://www.zimmertwins.com/sites/zimmertwins.com/files/xextra-index-psychic-stunt-wagon.gif.pagespeed.ic.7Z1-0c5Bgq.webp" alt="Psychic Stunt Wagon"/>
        </a>
        <p><strong>Psychic Stunt Wagon</strong> You'll need speed, bravery and a bit of luck to be the fastest on the hill.</p>
      </li>
      <li class="extra">
        <a class="thumbnail corners" href="extras/desktops">
          <img src="https://web.archive.org/web/20200809021120im_/http://www.zimmertwins.com/sites/zimmertwins.com/files/extra-index-desktops.gif.pagespeed.ce.hlJr9F0zMQ.gif" alt="Zimmerize Your Desktop"/>
        </a>
        <p><strong>Zimmerize Your Desktop</strong> You can have Eva, Edgar, 13 or the whole gang right on your desktop.</p>
      </li>
      <li class="extra">
        <a class="thumbnail corners" target="_blank" href="https://web.archive.org/web/20200806063748/http://www.zimmertwins.com/">
          <img src="/images?file=wayback_zimmertwins.jpg" alt="ZimmerTwins Wayback"/>
        </a>
        <p><strong>ZimmerTwins Wayback</strong> Look at the zimmertwins website before it got shut down. it is a very sad scene. you can stil do anything there. well, unresigered of course.</p>
      </li>
    </ul>  </div>
    
      
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
    <li class="menu-920"><a href="/" id="nav-spotlight">Spotlight</a></li>
    <li class="menu-347 active-trail active"><a href="/extras" id="nav-extras" class="active">Extras</a></li>
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
    var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-295035-15"]);_gaq.push(['_setCustomVar',1,"User roles","anonymous user",1]);_gaq.push(["_trackPageview"]);(function(){var ga=document.createElement("script");ga.type="text/javascript";ga.async=true;ga.src=("https:"==document.location.protocol?"https://web.archive.org/web/20200809021120/https://ssl":"https://web.archive.org/web/20200809021120/http://www")+".google-analytics.com/ga.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(ga,s);})();
    //]]></script>
        
      </body>
    </html>`;
	res.end(html);
	return true;
};
