@echo off
npm install
del update.sh
del run.sh
del reset.sh
echo Building Application...
npx electron-packager .
echo Build Complete!
pause
