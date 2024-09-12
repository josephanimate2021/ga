@echo off
:: env config
if exist .git ( set node_env=dev ) else ( set node_env=production )
:: where everything else begins.
if %node_env%==dev ( call update.bat )
if not exist node_modules ( npm install && npm start ) else ( npm start )