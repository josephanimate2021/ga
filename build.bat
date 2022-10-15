@echo off
if not exist node_modules ( echo Installing Dependicies... && npm install )
del update.bat
del run.bat
del reset.bat
echo Building Application...
npx electron-packager .
echo Build Complete!
pause
