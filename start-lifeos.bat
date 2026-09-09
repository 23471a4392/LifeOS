@echo off
title LifeOS Platform Launcher
color 0A

:: Close any lingering node processes
taskkill /f /im node.exe >nul 2>&1

echo =====================================================================
echo           LIFEOS - PERSONAL LIFE MANAGEMENT PLATFORM
echo =====================================================================
echo.

echo [1/3] Starting Backend API Server (Port 5000)...
start "LifeOS Backend" "%~dp0backend\run-backend.bat"

echo.
echo [2/3] Starting Frontend Web Interface (Port 3000)...
start "LifeOS Frontend" "%~dp0frontend\run-frontend.bat"

echo.
echo [3/3] Opening LifeOS Website in default browser...
timeout /t 4 /nobreak >nul
start http://localhost:3000

echo.
echo =====================================================================
echo   LifeOS has been launched!
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo =====================================================================
echo.
