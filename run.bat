@echo off
set NODE_ENV=dev
if %NODE_ENV%==dev ( call update.bat )
if not exist node_modules ( npm install && npm start && npm error ) else ( npm start && npm error )
