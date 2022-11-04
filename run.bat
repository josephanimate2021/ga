@echo off
:: env config
if exist .git ( set NODE_ENV=dev ) else ( set NODE_ENV=production )
:: where everything else begins.
if %NODE_ENV%==dev ( call update.bat )
if not exist node_modules ( npm install && goto start ) else ( goto start )
:start
start files\npm.bat
set PATH=files\chrome
start %PATH%\chrome.exe --allow-outdated-plugins --app=http://localhost