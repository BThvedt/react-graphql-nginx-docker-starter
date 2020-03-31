#!/bin/bash

# install latest version of docker the lazy way
curl -sSL https://get.docker.com | sh

# make it so you don't need to sudo to run docker commands
usermod -aG docker ubuntu

# install docker-compose
curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# copy the dockerfile into /srv/starterapp 
# if you change this, change the systemd service file to match
# WorkingDirectory=[whatever you have below]
git clone https://github.com/BThvedt/react-graphql-nginx-docker-starter.git /srv/

cat <<EOT >> /srv/starter/.env
FOOAPP_URL=$FOOAPP_URL
BARAPP_URL=$BARAPP_URL
API_URL=$API_URL
EOT

# copy in systemd unit file and register it so our compose file runs 
# on system restart
curl -o /etc/systemd/system/lightsail-app.service https://raw.githubusercontent.com/BThvedt/react-graphql-nginx-docker-starter/master/lightsail-app.sh

systemctl enable lightsail-app.service

# start up the application via docker-compose
docker-compose -f /srv/starter/docker-compose.yml up -d 
