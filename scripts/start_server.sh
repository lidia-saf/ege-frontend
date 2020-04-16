#!/bin/bash
# sudo chmod 755 /var/www/server.js # optional
# this will restart app/server on instance reboot
cd /var/frontend
ls
pm2 stop ege-frontend
# actually start the server
pm2 start "npm run startProduction" --name "ege-frontend"