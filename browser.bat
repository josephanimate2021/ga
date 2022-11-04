@echo off
start files\npm.bat
set PATH=files\chrome
start %PATH%\chrome.exe --allow-outdated-plugins --user-data-dir=user_data --app=http://localhost