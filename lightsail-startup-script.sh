curl -o ./lightsail.sh https://raw.githubusercontent.com/BThvedt/react-graphql-nginx-docker-starter/master/lightsail-compose.sh

chmod +x ./lightsail.sh 

export FOOAPP_URL=domainnamehere.com
export BARAPP_URL=barapp.domainnamehere.com
export API_URL=api.domainnamehere.com

./lightsail.sh
