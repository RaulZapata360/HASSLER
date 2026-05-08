@echo off
TITLE HASSLER - Portal Inmobiliario
echo Iniciando servidor de desarrollo...
start /b npm run dev
echo Esperando a que el servidor este listo...
timeout /t 5 /nobreak > nul
echo Abriendo Google Chrome en http://localhost:3000
start chrome "http://localhost:3000"
echo Servidor en ejecucion. No cierres esta ventana.
pause
