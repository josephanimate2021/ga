@echo off
if exist .git (
        echo Updating...
        git pull || git stash && git pull || git add . && git stash && git pull
        echo Update Complete!
        pause
        cls
) else ( echo Git was not found. skipping update... && pause )
