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

echo Atualizando a ponte do TikFinity...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; Invoke-WebRequest -UseBasicParsing 'https://raw.githubusercontent.com/erickhoga/anime-neom-live/main/live-bridge.mjs' -OutFile 'live-bridge.update'; if ((Get-Item 'live-bridge.update').Length -lt 1000) { throw 'Arquivo de atualizacao invalido' }; Move-Item -Force 'live-bridge.update' 'live-bridge.mjs'"
if errorlevel 1 (
  echo AVISO: nao foi possivel atualizar. Usando a ponte local existente.
) else (
  echo Ponte atualizada com sucesso.
)

start "Anime Neom Clash - Ponte" /D "%~dp0" cmd /k node live-bridge.mjs
timeout /t 2 /nobreak >nul
start "" "https://erickhoga.github.io/anime-neom-live/?mode=live&bridge=local"
exit /b 0
