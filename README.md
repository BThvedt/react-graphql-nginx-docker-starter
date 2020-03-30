## Usage
This is very much a work in progress. I wanted a starter app with multiple react front-ends, a graphql backend, and nginx as a gateway.  There is more to do .. 

To use: Navigate into root folder and run 
```
docker-compose up
```
There are 2 frontends, fooapp and barapp
There is a very basic graphql with express and apollo-server backend
And an nginx gateway

Fooapp is served from: domainnamehere.com

Barapp is served from: barapp.domainnamehere.com

And the api is served from api.domainnamehere.com

Edit the nginx.conf file in the gateway folder to change to localhost, or your domain name. 

If you're on Windows home (like me), edit the hosts file in C:\Windows\System32\Drivers\etc\hosts to include these lines:

192.168.99.102 domainnamehere.com

192.168.99.102 barapp.domainnamehere.com

192.168.99.102 api.domainnamehere.com

Where 192.168.99.102 is the IP my docker quickstart terminal runs (which I'm pretty sure you gotta use if you use windows 10 home). You might have to adjust it to your own, there should be a message when the quickstart terminal starts up with the address. 

### ToDo 

Authentication

SSL layer

Add React Router/Redux to one of the starter apps

Understand Docker files/nginx configuration better

Deployment Example

### Credits:
This was a weekend project, starting knowing very little about docker/nginx. Credit goes to these articles: 

[https://dev.to/phuonghau98/yet-another-way-to-containerize-your-react-app-with-docker-multi-stage-build-3n6](https://dev.to/phuonghau98/yet-another-way-to-containerize-your-react-app-with-docker-multi-stage-build-3n6)

[https://dev.to/destrodevshow/docker-201-use-nginx-as-a-proxy-for-nodejs-server-in-2020-practical-guide-57ji](https://dev.to/destrodevshow/docker-201-use-nginx-as-a-proxy-for-nodejs-server-in-2020-practical-guide-57ji)

As well as this repo: https://github.com/akullpp/multiple-react-nginx/blob/master/vm/docker-compose.yml

For providing me guidance/examples to follow to get this up and running.
