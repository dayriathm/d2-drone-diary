@echo off
setlocal enabledelayedexpansion

:: Change directory to script location
cd /d "%~dp0"

:: Define relative paths
set "SOURCE=001-README.md"
set "TARGET=..\README.md"

if not exist "%SOURCE%" (
    echo [ERROR] Source file "%SOURCE%" not found!
    pause
    exit /b 1
)

echo Syncing %SOURCE% to %TARGET% ...
copy /Y "%SOURCE%" "%TARGET%" > nul

if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] README.md updated successfully.
    
    :: Auto-stage changes in Git
    cd ..
    git add README.md docs-d2/001-README.md
    echo [GIT] Staged README.md and docs-d2/001-README.md for commit.
) else (
    echo [ERROR] Failed to copy file.
)

echo.
echo Press any key to exit...
pause > nul