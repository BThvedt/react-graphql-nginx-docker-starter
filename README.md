## Overview
I made this before I knew about kubernetes. I was just learning about docker, coming from a self-trained background with mixed success making small websites for people and doing some frontend work and contracting, and I wanted a template that would deploy a couple frontend apps and a graphql gateway to a cheap $5/month aws lightsail instance with secure cookies for deployment but jws for local development. 

## To Do
A lot of stuff
But I don't want to get too complicated! Also it won't work on Ubuntu 18 (only 16) and I haven't figured out why yet

## Usage
This is very much a work in progress. I wanted a starter app with multiple react front-ends, a graphql backend, and nginx as a gateway.  There is more to do .. 

To try out (locally): Navigate into starter folder and paste into the .env file some basic variables to configure everything:
```
FOOAPP_URL=domainnamehere.com
BARAPP_URL=barapp.domainnamehere.com
API_URL=api.domainnamehere.com
NODE_ENV=local
HTTPS=false
```
If you're on Windows 10 home like I am, you'll need Docker Toolbox. Use notepad and map whatever names you chose for the URL's to whatever IP your docker toolbox runs on in your hosts file buried in windows folders C:\Windows\System32\Drivers\etc\hosts. It's not a text file so you gotta search for "files". Mine looks something like this
```
192.168.99.102 domainnamehere.com
192.168.99.102 barapp.domainnamehere.com
192.168.99.102 api.domainnamehere.com
```
You probably will have to run notepad as an administrator. On Mac and Linux I don't know quite how to do this but I'm pretty sure you'll probably be able to use localhost and subdomains since docker just runs on localhost for those.

Then, in docker toolbox (or the command line if you're not on windows home) go into the starter folder and run 
```
docker-compose up
```
Bingo! After everything starts you should be able to navigate to the urls you set up and see 'fooapp' and 'barapp' and you should be able to sign in and out of each. Because the auth is using cookies, singing into one app will sign you into both, but each one has an example of a route that's protected on the front and back end available only to 'foouser' or 'baruser'.

## Development - as it stands
Make a new repo, push the starter code to it. Each react app can be run in development mode wtih ```npm start``` inside their respective root folders and you can also go into the api gateway folder and run ```node server```  (or install nodemon and ues that). It would be necessary to go into the folders and all the files and change the names to what you want. In development mode, the auth switches from cookie based to tolken based to make authenticated queries easier, and the graphql playgrond can be accessed at localhost:9000 when the gateway is running. The apps run at localhost:3000 and localhost:4000 when started up.

## Deployment
Designed to be uses with Amazon lighsail. To deploy, go to AWS account, configure a domain and some subdomains in route53, go into lightsail, create a static IP, and then get ready to start it up. If you want HTTPS I'm doing it with a load balancer, but there's other ways to configure HTTPS for lightsail with certbot there's like blogs and stuff on it

When starting up the instance, choose Ubuntu 16.06 and copy the contents of the lightsail-startup-script.sh file into the section where it says startup script. Change the lines where it exports variables to use whatever values like this:
```
FOOAPP_URL=domainnamehere.com
BARAPP_URL=barapp.domainnamehere.com
API_URL=api.domainnamehere.com
NODE_ENV=production
HTTPS=false
```
Make sure to chooe the $5/month instance or greater, as the cheapest instance doesn't have enough memory to start up the various docker containers. 
Also for HTTPS, change "HTTPS" to 'true' (designed to work with a lightsail load balancer with a security certificate). The script basically pulls this code from github and runs docker-compose, so if you're pulling from a differnt repo you'll have to go through the .sh files and change the address it curls from. Obviously pulling from a public repo is sub-optimal for a real project, so some alternative deployment will have to be done .. maybe a private repo, maybe use dockerhub.. haven't quite gotten there yet 
