@echo off
title Anime Neom Clash - Iniciando LIVE
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo ERRO: Node.js nao foi encontrado neste computador.
  echo Instale o Node.js LTS e execute este arquivo novamente.
  pause
  exit /b 1
)

start "Anime Neom Clash - Ponte" /D "%~dp0" cmd /k node live-bridge.mjs
timeout /t 2 /nobreak >nul
set "ANIME_NEOM_URL=http://127.0.0.1:8832/?mode=live&capture=1"
set "ANIME_NEOM_EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
set "ANIME_NEOM_EDGE64=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
set "ANIME_NEOM_CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
set "ANIME_NEOM_BROWSER_PROFILE=%TEMP%\anime-neom-live-browser"
set "ANIME_NEOM_WINDOW_ARGS=--user-data-dir=%ANIME_NEOM_BROWSER_PROFILE% --no-first-run --disable-default-apps --disable-background-mode --new-window --window-position=20,20 --window-size=540,960"

if exist "%ANIME_NEOM_EDGE%" (
  start "" "%ANIME_NEOM_EDGE%" %ANIME_NEOM_WINDOW_ARGS% --app="%ANIME_NEOM_URL%"
  exit /b 0
)

if exist "%ANIME_NEOM_EDGE64%" (
  start "" "%ANIME_NEOM_EDGE64%" %ANIME_NEOM_WINDOW_ARGS% --app="%ANIME_NEOM_URL%"
  exit /b 0
)

if exist "%ANIME_NEOM_CHROME%" (
  start "" "%ANIME_NEOM_CHROME%" %ANIME_NEOM_WINDOW_ARGS% --app="%ANIME_NEOM_URL%"
  exit /b 0
)

start "" "http://127.0.0.1:8832/?mode=live&capture=1"
exit /b 0
