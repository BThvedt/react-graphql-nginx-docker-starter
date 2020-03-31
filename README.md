## Usage
This is very much a work in progress. I wanted a starter app with multiple react front-ends, a graphql backend, and nginx as a gateway.  There is more to do .. 

To use: Navigate into root folder and run 
```
cd starter
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

### Deployment example 

In this example I will be deploying to AWS lightsail. If you have an AWS account, go to lightsail and select the second smallest instance with 1GB memory. The smallest unfortinately will run out of memory when docker builds it's containers, or at least it does for me.

You might have to click around the UI or watch a tutoral to do someo of this stuff, but it's one of Amazon's more friendly UI's.

For your instance, choose Ubuntu 16.04 (for some reason 18.04 doesn't work for me.. todo: figure out why) and find where it asks for the launch script. Copy/paste the contents of lightsail-startup-script.sh, changing the "domainnamehere.com" lines to whatever your desired domain name is. Hit create, and wait a few mins, the containers don't start up right away.

Once running, go into your instance and under the networking tab attach a static IP. You can also connect using ssh and running docker container ls to see if all 4 containers are running, they should be. Point your domain to the static IP including the subdomains, or if you're like me on windows edit Windows/System32/drivers/etc/hosts to indlude (assuming your static IP you just attached is 123.45.678.91)

123.45.678.91 yourdomain.com

123.45.678.91 barapp.yourdomain.com (or whatever you called it)

123.45.678.91 api.yourdomain.com

And see it live! 

### Actual Deployment

Chances are your front ends aren't called 'fooapp' and 'barapp'. Docker compose starts up it's network in a pretty simple pattern, so it's pretty easy to figure out how the proxy passes will work. Once your files are pulled down go into the .env file in the root and add your domains like this:

YOURAPP_URL="yourdomain.com"

SECOND_APP_URL="subdomain.yourdomain.com"

API_URL="yourapisubdomain.yourdomain.com" 

Also look for the FOOAPP_URL and BARAPP_URL etc in the docker-compose.yml file (they each come up twice) and switch them all to the new variable names. Assuming you named the folders something else instead of 'fooapp' and 'barapp' go to gateway/nginx.template and change the proxy_pass statements to match your new pattern. Also be sure to replace the environment variables there too of course. 

So you should have made modifications to a total of 3 files: the .env in the root, the starter/gateway/nginx.template file, and the starter/docker-compose.yml file, plus maybe renamed some of the folders to suit your needs. The 3 lightsail shell script files in the root can be ignored... or trashed. They aren't necessary except for the lightsail deployment exmaple. 

Then once everything is on the server, a simple ```docker-compose up``` should do the trick! Make sure port 80 is exposed and you should be able to navagite between the apps and the api via subdomains once you've got the DNS side handeled (you're on your own for that one!).


### ToDo 

Authentication

SSL layer

Add React Router/Redux to one of the starter apps

Understand Docker files/nginx configuration better

### Credits:
This was a weekend project, starting knowing very little about docker/nginx. Credit goes to these articles: 

[https://dev.to/phuonghau98/yet-another-way-to-containerize-your-react-app-with-docker-multi-stage-build-3n6](https://dev.to/phuonghau98/yet-another-way-to-containerize-your-react-app-with-docker-multi-stage-build-3n6)

[https://dev.to/destrodevshow/docker-201-use-nginx-as-a-proxy-for-nodejs-server-in-2020-practical-guide-57ji](https://dev.to/destrodevshow/docker-201-use-nginx-as-a-proxy-for-nodejs-server-in-2020-practical-guide-57ji)

As well as this repo: https://github.com/akullpp/multiple-react-nginx/blob/master/vm/docker-compose.yml

For providing me guidance/examples to follow to get this up and running.
