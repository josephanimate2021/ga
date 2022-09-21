@echo off
if not exist node_modules ( npm install && node main.js && pause ) else ( node main.js && pause )
