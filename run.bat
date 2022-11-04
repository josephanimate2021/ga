@echo off
:: env config
if exist .git ( set NODE_ENV=dev ) else ( set NODE_ENV=production )
:: where everything else begins.
if %NODE_ENV%==dev ( call update.bat )
if not exist node_modules ( npm install && goto start ) else ( goto start )
:start
set FLASH_DETECTED=n
set FLASH_CHROMIUM_DETECTED=n
if exist "%windir%\SysWOW64\Macromed\Flash\*pepper.exe" set FLASH_CHROMIUM_DETECTED=y
if exist "%windir%\System32\Macromed\Flash\*pepper.exe" set FLASH_CHROMIUM_DETECTED=y
if %FLASH_CHROMIUM_DETECTED%==n (
	echo Flash for Chrome could not be found.
        echo:
        echo Please press any key to begin the installation for flash.
        pause
	echo:
	goto flash_checked
) else (
	echo Flash is installed.
        pause
	echo:
	set FLASH_DETECTED=y
	goto flash_checked
)
:flash_checked
if %FLASH_DETECTED%==n (
	:start_flash_install
	echo Installing Flash Player...
	echo:
	echo To install Flash Player, Zimmertwins must kill any currently running web browsers.
	echo Please make sure any work in your browser is saved before proceeding.
	echo Zimmertwins will not continue installation until you press a key.
	echo:
	pause
	echo:

	echo Rip and tear, until it is done.
	for %%i in (firefox,palemoon,iexplore,microsoftedge,chrome,chrome64,opera,brave) do (
		taskkill /f /im %%i.exe /t >nul
		wmic process where name="%%i.exe" call terminate >nul
	)
	echo:
	echo Starting Flash for Chrome installer...
	if not exist "files\flash_windows_chromium.msi" (
	        echo ...erm. Bit of an issue there actually. The installer doesn't exist.
	        echo A normal copy of zimmertwins should come with one.
	        echo You may be able to find a copy on this website:
	        echo https://github.com/josephanimate2021/ga/tree/zimmertwins-stable-web/files
		echo Although Flash is needed, Zimmertwins will continue launching.
		pause
	) else ( 
                call files\flash_windows_chromium.msi
                echo Flash has been installed.
                pause
                echo:
                goto after_flash_install
       )
)
:after_flash_install
start files\npm.bat
set PATH=files\chrome
start %PATH%\chrome.exe --allow-outdated-plugins --app=http://localhost