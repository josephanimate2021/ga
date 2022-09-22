@echo off
call update.bat
if not exist node_modules ( npm install && npm start ) else ( npm start )
pause
