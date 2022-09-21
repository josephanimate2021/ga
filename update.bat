@echo off
if exist .git (
        echo Updating...
        git pull || git stash && git pull || git add . && git stash && git pull
        cls
) else ( echo Git was not found. skipping update... )
