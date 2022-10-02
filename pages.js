const fs = require("fs"),
asset = require("./asset/main"),
fUtil = require("./fileUtil"),
env = require("./env");
aniSwfUrl = env.SWF_URL,
aniStoreUrl = env.STORE_URL,
aniClientUrl = env.CLIENT_URL;

module.exports = function (req, res, url) {
  if (req.method != "GET") return;
  var html, tId;
  const tutorialReload = url.query.tutorial ? true : false;
  const tutorialDataBase = fUtil.exists(process.env.DATABASES_FOLDER + `/tutorialStatus.txt`) ? false : true;
  switch (url.pathname) {
    case "/dashboard/videos": {
        if (!fUtil.exists(`${process.env.MOVIE_FOLDER}/xmls`)) fs.mkdirSync(`${process.env.MOVIE_FOLDER}/xmls`);
        const files = asset.listMovies();
        html = `<html><head><title>Your Videos</title></head><body><center><h1>Your Movies</h1></center><br>${files.map(v => `${v.html}`).join('') || '<center><h2>You currently have no movies right now. <a href="/studio">Create one now</a></h2></center>'}</body></html>`;
        break;
    } case "/": {
        if (!fUtil.exists(`${process.env.MOVIE_FOLDER}/xmls`)) fs.mkdirSync(`${process.env.MOVIE_FOLDER}/xmls`);
        const files = asset.listMovies();
        html = `<html><head><title>Your Videos</title></head><body><center><h1>This LVM Clone is currently on it's beta stage right now and is most likely to be unstable. Alot of fixes are being added constantly in order to make this lvm clone stable. <br><a href="/charcreator">Create a character</a> <a href="/studio">Make a video</a></h1><br><h2>How am i supposed to record videos on here?</h2><br><h3>You are pretty lucky that the preview window has a fullscreen option on the player. all you need to do is pull out your screen recorder, do what you would normally do, and then put the player on full screen. simple as that :)</h3><br><h2>What do i do if i accidently closed the video editor?</h2><br><h3>you are pretty lucky that this list of your movies contain a download link next to each one of your movies. they are there so that way you can download them. after your movie is downloaded, extract the zip file like how you would normally do it and you have your movie xml right there!</h3></center><br><center><h2>Your Movies</h2></center><br>${files.map(v => `${v.html}`).join('') || '<center><h3>You currently have no movies right now. <a href="/studio">Create one now</a></h3></center>'}</body></html>`;
        break;
    } case "/charcreator": {
	    res.setHeader("Content-Type", "text/html; charset=utf8");
	    switch (url.query.themeId) {
		    case "family": {
			    tId = "custom";
			    break;
		    } default: {
			    tId = url.query.themeId;
			    break;
		    }
	    }
	    html = `<html><head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <link rel="dns-prefetch" href="https://josephanimate2021.github.io">
        <title>The Character Creator from Vyond - Make a Character Online!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="The Character Creator from Vyond - Create a character online with Vyond.">
        <meta property="og:site_name" content="Vyond">
        <meta property="fb:app_id" content="177116303202">
        <meta name="google-site-verification" content="K_niiTfCVi72gwvxK00O4NjsVybMutMUnc-ZnN6HUuA">
        <link rel="canonical" href="${url.pathname}">
        <link href="https://josephanimate2021.github.io/fonts/1/sailec.css" rel="stylesheet" type="text/css">
        <link href="https://josephanimate2021.github.io/static/55910a7cd204c37c/go/css/common_combined.css.gz.css" rel="stylesheet" type="text/css">
        <link href="https://josephanimate2021.github.io/static/55910a7cd204c37c/go/css/cc.css.gz.css" rel="stylesheet" type="text/css">
        <!--[if lt IE 9]>
        <style text="text/css">
        .top-nav.collapse {height: auto;overflow: visible;}
        </style>
        <![endif]-->
        <script type="text/javascript" src="https://pi.pardot.com/pd.js"></script><script type="text/javascript" src="https://pi.pardot.com/pd.js"></script><script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script><script type="text/javascript" async="" src="https://sjs.bizographics.com/insight.min.js"></script><script type="text/javascript" async="" src="//www.googleadservices.com/pagead/conversion_async.js"></script><script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script><script src="https://connect.facebook.net/signals/config/784667875001149?v=2.9.15&amp;r=stable" async=""></script><script async="" src="//connect.facebook.net/en_US/fbevents.js"></script><script async="" src="//www.googletagmanager.com/gtm.js?id=GTM-TXV7MD"></script><script type="text/javascript" async="" src="https://ga.vyond.com/ajax/cookie_policy"></script><script type="text/javascript" src="https://pi.pardot.com/pd.js"></script><script type="text/javascript" async="" src="//munchkin.marketo.net/155/munchkin.js"></script><script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script><script src="https://connect.facebook.net/signals/config/784667875001149?v=2.9.15&amp;r=stable" async=""></script><script async="" src="//connect.facebook.net/en_US/fbevents.js"></script><script type="text/javascript" async="" src="https://sjs.bizographics.com/insight.min.js"></script><script type="text/javascript" async="" src="//www.googleadservices.com/pagead/conversion_async.js"></script><script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script async="" src="//www.googletagmanager.com/gtm.js?id=GTM-TXV7MD"></script><script type="text/javascript" async="" src="https://ga.vyond.com/ajax/cookie_policy"></script><script>
        var srv_tz_os = -4, view_name = "go", user_cookie_name = "u_info";
        var user_role = 11;
        </script>
        <script src="https://josephanimate2021.github.io/static/55910a7cd204c37c/go/js/common_combined.js.gz.js"></script>
        <script type="text/javascript" src="https://josephanimate2021.github.io/static/55910a7cd204c37c/go/js/../po/goserver_js-en_US.json.gz.json"></script>
        <script type="text/javascript">
        var I18N_LANG = 'en_US';
        var GT = new Gettext({'locale_data': json_locale_data});
        </script>
        <script src="https://josephanimate2021.github.io/static/55910a7cd204c37c/go/js/sessionChecker.js.gz.js"></script>
        <script src="https://josephanimate2021.github.io/static/55910a7cd204c37c/go/js/amplitude/go_amp.js.gz.js"></script>
        <!-- Vyond Cookie Consent -->
        <script>(function(v,y,o,n){v[n]=v[n]||[];
        var f=y.getElementsByTagName(o)[0],d=y.createElement(o);
        d.type='text/javascript';d.async=true;d.src=
        'https://ga.vyond.com/ajax/cookie_policy';
        f.parentNode.insertBefore(d,f);
        })(window,document,'script','_vyccq');</script>
        <!-- End Vyond Cookie Consent -->
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TXV7MD');
        dataLayer.push({"userId":"0TBAAga2Mn6g"});
        </script>
        <!-- Google Tag Manager -->
        <script>
        </script>
        <script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script><script src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/956549168/?random=1577875084777&amp;cv=9&amp;fst=1577875084777&amp;num=1&amp;guid=ON&amp;resp=GooglemKTybQhCsO&amp;eid=376635470&amp;u_h=900&amp;u_w=1600&amp;u_ah=860&amp;u_aw=1600&amp;u_cd=24&amp;u_his=2&amp;u_tz=-360&amp;u_java=false&amp;u_nplug=4&amp;u_nmime=6&amp;gtm=2wgc61&amp;sendb=1&amp;ig=1&amp;frm=0&amp;url=https%3A%2F%2Ftvy4gv.000webhostapp.com%2FThe%2520Character%2520Creator%2520from%2520Vyond%2520-%2520Make%2520a%2520Character%2520Online%2520cw.html&amp;tiba=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;hn=www.googleadservices.com&amp;async=1&amp;rfmt=3&amp;fmt=4"></script><script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=109029277&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Ftvy4gv.000webhostapp.com%2FThe%2520Character%2520Creator%2520from%2520Vyond%2520-%2520Make%2520a%2520Character%2520Online%2520cw.html&amp;referrer="></script><script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script><script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script><script src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/956549168/?random=1580006012218&amp;cv=9&amp;fst=1580006012218&amp;num=1&amp;guid=ON&amp;resp=GooglemKTybQhCsO&amp;u_h=900&amp;u_w=1600&amp;u_ah=860&amp;u_aw=1600&amp;u_cd=24&amp;u_his=2&amp;u_tz=-360&amp;u_java=false&amp;u_nplug=4&amp;u_nmime=6&amp;gtm=2wg1f1&amp;sendb=1&amp;ig=1&amp;frm=0&amp;url=https%3A%2F%2Fkennystuff001001001.000webhostapp.com%2Foldvyondstuff%2Fcharactercreator&amp;tiba=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;hn=www.googleadservices.com&amp;async=1&amp;rfmt=3&amp;fmt=4"></script><script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fkennystuff001001001.000webhostapp.com%2Foldvyondstuff%2Fcharactercreator&amp;referrer="></script><script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fkennystuff001001001.000webhostapp.com%2Foldvyondstuff%2Fcharactercreator&amp;referrer="></script></head>
        <body class="en_US has-user" contenteditable="false">
        <script type="text/javascript">
        if (self !== top) {
                    jQuery('body').hide();
            }
        </script>
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TXV7MD" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
        <script type="text/javascript">
                jQuery.extend(CCStandaloneBannerAdUI, {"actionshopSWF":"https:\/\/josephanimate2021.github.io\/animation\/66453a3ba2cc5e1b\/actionshop.swf","apiserver":"\/","clientThemePath":"https:\/\/josephanimate2021.github.io\/static\/55910a7cd204c37c\/<client_theme>","userId":"0TBAAga2Mn6g"});
        </script>
        <div class="page-container">
        <div class="site-header">
            <div class="navbar site-nav site-nav--legacy" role="navigation">
                    <div class="collapse navbar-collapse navbar-ex1-collapse"><ul class="nav navbar-nav navbar-right"><li>Powered by Vyond &amp; Kenny Animate&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</li></ul></div></div></div><div class="container container-cc">
        <div>
            <div id="char_creator_client" align="center"><object data="https://josephanimate2021.github.io/animation/414827163ad4eb60/cc.swf" type="application/x-shockwave-flash" id="char_creator" width="960" height="600"><param name="align" value="middle"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="transparent"><param name="flashvars" value="apiserver=%2F&amp;m_mode=school&amp;bs=adam&amp;isLogin=Y&amp;isEmbed=0&amp;ctc=go&amp;tlang=en_US&amp;storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F3a981f5cb2739137%2F%3Cstore%3E&amp;clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2Fad44370a650793d9%2F%3Cclient_theme%3E&amp;appCode=go&amp;page=&amp;siteId=go&amp;userId=00EDZP3Cu0aw&amp;themeId=${url.query.themeId || "family"}&amp;ut=30"><param name="movie" value="https://josephanimate2021.github.io/animation/414827163ad4eb60/cc.swf"></object></div>
        </div>
        <script>
        var character = "${url.query.bs || "adam"}";
        var origId = "${url.query.original_asset_id || ""}";
        $('#char_creator_client').flash({
           id: "char_creator",
           swf: "${aniSwfUrl}/cc.swf",
           height: 600,
           width: 960,
           align: "middle",
           allowScriptAccess: "always",
           allowFullScreen: "true",
           wmode: "transparent",
           hasVersion: "10.3",
           flashvars: {"apiserver":"/","m_mode":"school","bs":character,"original_asset_id":origId,"isLogin":"Y","isEmbed":"0","ctc":"go","tlang":"en_US","storePath":"${aniStoreUrl}/<store>","clientThemePath":"${aniClientUrl}/<client_theme>","appCode":"go","page":"","siteId":"go","userId":"00EDZP3Cu0aw","themeId":"${url.query.themeId || "family"}","ut":30}});
        function goSubscribe()
        {
            var url = 'https://www.vyond.com/pricing';
            window.open(url, 'goSubscribe');
        }
        function characterSaved()
        {
            SetCookie('cc_saved', '1', 1, '/');
            window.location = '/studio?tray=${tId}';
        }
        </script>
            </div>
        <script>
        function fbShare(ccId)
        {
            if (ccId == undefined) {
                return;
            }
            var url = encodeURIComponent('/?cc_id=' + ccId);
            var title = encodeURIComponent('I just created a new character on Vyond');
            var shareUrl = 'https://www.facebook.com/sharer.php?u=' + url + '&t=' + title;
            window.open(shareUrl, 'fbshare', 'height=350, width=650, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no, status=no');
        }
        </script>
        <script>
        $(window).on('amplitude_loaded', function() {
            amplitudeTrackEvent(
                AMPLITUDE_EVENT.LAUNCH_CHARACTER_CREATOR,
                {
                    theme: 'Whiteboard Animation'
                }
            );
        });
            // Amplitude interface for Flash player.
            function logAmplitudeEvent(eventName, eventProperties) {
                amplitudeTrackEvent(eventName, eventProperties);
            }
        </script>
        <!-- FOOTER -->
        <footer class="site-footer">
            <div class="container">
                Vyond™ is a trademark of GoAnimate, Inc. © 2019 GoAnimate, Inc. <a href="https://www.vyond.com/terms">Terms of Service</a> | <a href="https://www.vyond.com/privacy">Privacy Policy</a> | <a href="https://www.vyond.com/cookies">Cookies Policy</a>
            </div>
        </footer>
        <div id="studio_container" style="display: none;">
            <div id="studio_holder"><!-- Full Screen Studio -->
                <div style="top: 50%; position: relative;">
                    You can't use Vyond because Flash might be disabled. <a href="https://get.adobe.com/flashplayer/">Enable Flash</a>.
                </div>
            </div>
        </div>
        </div>
        <!-- END OF PAGE STRUCTURE -->
        <div id="offer_container">
        </div>
        <script type="text/javascript">
            </script>
        <script type="text/javascript">
        </script>
        </body></html>`;
	    break;
    } case "/studio": {
	    res.setHeader("Content-Type", "text/html; charset=utf8");
	    html = `<html lang="en">
                <head>
                    <meta charset="utf-8">
                    <link rel="icon" href="/favicon.png" type="image/png">
                    <title>Video Studio</title>
                    <script src="https://josephanimate2021.github.io/lvm-static/api/jquery/index.js"></script>
                    <script src="https://josephanimate2021.github.io/static/55910a7cd204c37c/go/js/studio.js.gz.js"></script>
                    <style>
                    html, body {
                        background: #696969;
                        margin: 0px;
                    }
                    
                    /**
                    main
                    **/
                    main {
                        padding: 0;
                    }
                    
                    /**
                    character page stuff
                    **/
                    #character_studio,
                    #character_browser {
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    /* character studio */
                    #character_studio {
                        width: 960px;
                        height: 600px;
                    }
                    /* character browser */
                    #character_browser {
                        width: 100%;
                        height: 100%;
                    }
                    
                    /**
                    other pages
                    **/
                    #video_studio,
                    #video_player {
                        width: 100%;
                        height: 100%;
                    }
                    #preview_player {
                        height: 360px;
                        width: 640px;
                        display: block;
                        margin: auto;
                    }
                    
                    /**
                    popups
                    **/
                    /* popup */
                    #preview_popup,
                    .preview_popup,
                    #import_popup {
                        position: absolute;
                        background: #f2f7fc;
                        top: 50%;
                        left: 50%;
                        padding: 20px 40px;
                        border-radius: 4px;
                        box-shadow: 0 8px 12px 2px #00000065;
                        color: #525a6b;
                    }
                    /* preview popup */
                    .preview_popup,
                    #preview_popup {
                        margin: -225px 0 0 -360px;
                    }
                    /* import popup */
                    #import_popup {
                        margin: -154px 0 0 -220.5px;
                    }
                    #preview_popup h2,
                    #import_popup h2  {
                        margin: 0px 0px 15px;
                        font-weight: 400;
                    }
                    /* popup container */
                    #preview_popup_container,
                    .preview_popup_container,
                    #import_popup_container {
                        background: #00000082;
                        position: fixed;
                        width: 100%;
                        height: 100%;
                    }
                    /* close button */
                    .close-button {
                        position: absolute;
                        top: 10px;
                        right: 40px;
                        color: #4f5b93;
                    }
                    
                    /**
                    form stuff
                    **/
                    .button_import {
                        background: #4f5b93;
                        border: 1px solid #8892bf;
                        border-radius: 3px;
                        padding: 4px 10px;
                        color: #fff;
                        width: 100%;
                        margin-top: 20px;
                    }
                    ::-webkit-file-upload-button {
                        background: #4f5b93;
                        border: 1px solid #8892bf;
                        border-radius: 3px;
                        padding: 4px 10px;
                        color: #fff;
                    }
                    </style>
                </head>
                <body>
                
                <!-- Asset Importer -->
                <div id="import_popup_container" style="display:none">
                        <div id="import_popup">
                                 <h2 id="import-an-asset">Import an Asset</h2>
		                        <a class="close-button" onclick="hideImporter()">X</a>
		                        <!-- Import form -->
		                        <div id="import_image">
                                        <button onclick="document.getElementById('import_as').style.display = 'block'">Upload An Asset As...</button>
                                        <p>Because everything else is in beta, <br>prop uploading is only supported. <br>no worries, everything else is bound to come soon.</p>
                                        <div id="import_as" style="display:none"><center><button onclick="document.getElementById('import_as').style.display = 'none'">↑</button></center><br><button onclick="document.getElementById('holdable').click()">Holdable Prop</button><br><br><button onclick="document.getElementById('headable').click()">Headable Prop</button><br><br><button onclick="document.getElementById('wearable').click()">Wearable Prop</button><br><br><button onclick="document.getElementById('placeable').click()">Other Prop</button><form enctype='multipart/form-data' style="display:none" action='/upload_prop' method='post' target='dummy'><input id='placeable' type="file" onchange="this.form.submit()" name='import' accept=".png,.jpg" /></form><form enctype='multipart/form-data' style="display:none" action='/upload_prop_holdable' method='post' target='dummy'><input id='holdable' type="file" onchange="this.form.submit()" name='import' accept=".png,.jpg" /></form><form enctype='multipart/form-data' style="display:none" action='/upload_prop_headable' method='post' target='dummy'><input id='headable' type="file" onchange="this.form.submit()" name='import' accept=".png,.jpg" /></form><form enctype='multipart/form-data' style="display:none" action='/upload_prop_wearable' method='post' target='dummy'><input id='wearable' type="file" onchange="this.form.submit()" name='import' accept=".png,.jpg" /></form></div>
                                </div>
                        </div>
                </div>
                
                <!-- Video Previewer -->
                <div id="preview_popup_container" style="display:none">
                    <div id="preview_popup">
                        <h2 id="preview-video">Preview Video</h2>
                        <a class="close-button" href="javascript:hidePreviewer()">X</a>
                        <object data="${aniSwfUrl}/player.swf" type="application/x-shockwave-flash" id="preview_player">
                            <!-- The flashvars are a huge mess, have fun looking at them. :) -->
                            <param name="flashvars" value="apiserver=/&storePath=${aniStoreUrl}/<store>&ut=30&clientThemePath=${aniClientUrl}/<client_theme>&isInitFromExternal=1&isWide=1&startFrame=1&autostart=1">
                            <param name="allowScriptAccess" value="always">
                            <param name="allowFullScreen" value="true">
                        </object>
                    </div>
                </div>
                <div class="preview_popup_container" id="video-tutorial" style="display:none">
                    <div class="preview_popup">
                        <h2>&nbsp;</h2>
                            <div class="preview_player">
                                <div id="wistia_player" class="wistia_embed" style="width:640px;height:360px">&nbsp;</div>
                                </div>
                            <a class="close-button" href="javascript:hideTutorial()">X</a>
                        </div>
                     </div>
                </div>
                
                <!-- Video Studio -->
                <main id="studio_holder">
                
                <object data="${aniSwfUrl}/go_full.swf" type="application/x-shockwave-flash" id="video_studio">
                    <!-- The flashvars are a huge mess, have fun looking at them. :) -->
                    <param name="flashvars" value="movieId=${url.query.movieId || ""}&apiserver=/&storePath=${aniStoreUrl}/<store>&isEmbed=1&ctc=go&ut=30&bs=default&appCode=go&page=&siteId=go&lid=13&isLogin=Y&retut=1&clientThemePath=${aniClientUrl}/<client_theme>&tlang=en_US&goteam_draft_only=1&isWide=1&collab=0&nextUrl=/ajax/redirect&tray=${url.query.tray || "custom"}">            
                    <param name="allowScriptAccess" value="always">
                    <param name="allowFullScreen" value="true">
                </object>
                
                </main>
                
                <!-- Keeps the page from reloading on form submission -->
                <iframe style="display:none" name="dummy"></iframe>
                <script>
	////
	//// This JS contains important Video Studio stuff
	////
	
	///
	/// Variables
	///
	var previewPlayerTempData = "";
	const fu = document.getElementById('fileupload'),
		sub = document.getElementById('submit');

	///
	/// Previewer
	///
	function initPreviewPlayer(dataXmlStr, startFrame, containsChapter, themeList) {
		// New variable to be used by loadPreviewer()
		movieDataXmlStr = dataXmlStr;
		// Movie XML
		filmXmlStr = dataXmlStr.split("<filmxml>")[1].split("</filmxml>")[0];
		// Show preview popup
		$("#preview_popup_container").show();
		// Load the Video Previewer
		loadPreviewer();
	}
	function loadPreviewer() {
		// I think this is in case of an error??
		if (movieDataXmlStr === null) {
			return;
		}
		// I don't know
		savePreviewData(movieDataXmlStr);
	}
	function savePreviewData(a) {
		// Set temp data variable
		previewPlayerTempData = a
	}
	function retrievePreviewPlayerData() {
		// Store in separate variable
		var recentPreviewPlayerTempData = previewPlayerTempData;
		// Clear original variable
		previewPlayerTempData = "";
		// Return recent temp data
		return recentPreviewPlayerTempData;
	}

	///
	/// Importing
	///
	// Show upload window
	function showImporter() {
		$("#import_popup_container").show();
	};

	///
	/// Other stuff
	///
	function exitStudio() {
		window.location = "/";
	}
	// interactive tutorial
	interactiveTutorial.isShowTutorial = ${tutorialReload || tutorialDataBase};

        function tutorialStarted() {
        }
        function tutorialStep(sn) {
        }
        function tutorialCompleted() {
            $.ajax({
                type: 'POST',
                url: '/ajax/tutorialStatus/completed'
            });
        }
	// Hide Video Previewer popup
	function hidePreviewer() {
		$("#preview_popup_container").hide();
	}
	function hideTutorial() {
		$("#video-tutorial").hide();
	}
	// Hide Asset Importer popup
	function hideImporter() {
		$("#import_popup_container").hide();
	}
    var videoTutorial = new VideoTutorial($("#video-tutorial"));
    VideoTutorial.tutorials.composition = {
        title: 'Composition Tutorial',
        wistiaId: 'nuy96pslyp',
    };
    VideoTutorial.tutorials.enterexit = {
        title: 'Enter and Exit Effects Tutorial',
        wistiaId: 'fvjsa3jnzc',
    }
</script><script charset="ISO-8859-1" src="//fast.wistia.com/assets/external/E-v1.js" async></script>
                
                </main>
                
                </body></html>`;
	    break;
    }
  }
  res.end(html);
};
