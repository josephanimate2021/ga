@echo off
set NODE_ENV=dev
if %NODE_ENV%==dev ( call update.bat )
if not exist node_modules ( npm install && npm start ) else ( npm start )
