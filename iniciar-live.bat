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
start "" "http://127.0.0.1:8832/?mode=live"
exit /b 0
