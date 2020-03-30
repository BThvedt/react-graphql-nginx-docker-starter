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
mkdir /srv/starter
curl -o /srv/starter -LJO https://github.com/BThvedt/react-graphql-nginx-docker-starter/tree/master/starter

# copy in systemd unit file and register it so our compose file runs 
# on system restart
curl -o /etc/systemd/system/lightsail-app.service https://https://raw.githubusercontent.com/BThvedt/react-graphql-nginx-docker-starter/master/starter/lightsail-app.sh
systemctl enable lightsail-app.service

# start up the application via docker-compose
docker-compose -f /srv/starter/docker-compose.yml up -d 
