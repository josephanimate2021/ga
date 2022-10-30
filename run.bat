@echo off
:: env config
if exist .git ( set NODE_ENV=dev ) else ( set NODE_ENV=production )
:: where everything else begins.
if %NODE_ENV%==dev ( call update.bat )
if not exist node_modules ( npm install && npm start ) else ( npm start )
