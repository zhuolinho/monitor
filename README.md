rsync -ravz -e "ssh -p 2082" user@url:~/monitor .  
rsync -av -e "ssh -p 2082" user@url:~/monitor .

#run pm2 start ecosystem.json
