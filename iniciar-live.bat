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

if exist "%ANIME_NEOM_EDGE%" (
  start "" "%ANIME_NEOM_EDGE%" --app="%ANIME_NEOM_URL%" --window-size=720,1280
  exit /b 0
)

if exist "%ANIME_NEOM_EDGE64%" (
  start "" "%ANIME_NEOM_EDGE64%" --app="%ANIME_NEOM_URL%" --window-size=720,1280
  exit /b 0
)

if exist "%ANIME_NEOM_CHROME%" (
  start "" "%ANIME_NEOM_CHROME%" --app="%ANIME_NEOM_URL%" --window-size=720,1280
  exit /b 0
)

start "" "http://127.0.0.1:8832/?mode=live&capture=1"
exit /b 0
