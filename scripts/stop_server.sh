#!/bin/bash
pm2 stop ege-frontend
pm2 delete ege-frontend

# isExistApp=`sudo pgrep pm2`
# if [[ -n  $isExistApp ]]; then
    # sudo pm2 kill
    # sudo pm2 stop node-app
    # you can remove the crontab as well
# fi

# isExistApp=`pgrep pm2`
# if [[ -n  $isExistApp ]]; then
#     # sudo pm2 kill
#     echo 'yo'
#     # you can remove the crontab as well
# fi