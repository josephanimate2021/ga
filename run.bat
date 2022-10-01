@echo off
call update.bat
if not exist node_modules ( npm install && npm start && npm error ) else ( npm start && npm error )
