## Overview
Very much a work in progress, this project is my desire to have a starter for a web platform with multiple frontends, a single api gateway that can be built on top of that can then be connected to whatever services or microservices to my heart's desire. Also I wanted it to be modular so each section can be worked on independently, and deployable in minutes, with baked-in auth and HTTPS. It should be scalable, easy to hook into other hosted services or microservices, and all those good things.
What this is then, is two very simple react apps built with create-react-app, an Apolloserver/express api gateway with all the those things.. the baked in auth, the HTTPS, etc etc that's designed to be deployed to Amazon's lighsail.
I'm at a stopping point for now, working on a more customized version to my taste on my private repo, but more could be done to this. 

## To Do
Modularize the graphql code, maybe include subscriptions, find a better method other than puliing code off a public repo (undeseriable in real project) maybe figure out how to include instructions to make an image on dockerhub and pull from there or something... 
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

## Development
First, make a new repo of your own, push the starter code to it, and now you've got your own project. Each react app can be run in development mode wtih ```npm start``` inside their respective root folders and you can also go into the api gateway folder and run ```node server```  (or more preferbilly with nodemon if you install that) to spin that up. You do kinda gotta go into the folders and all the files and change the names to what you want. In development mode, the auth switches from cookie based to tolken based to make authenticated queries easier, and the graphql playgrond can be accessed at localhost:9000 when the gateway is running. The apps run at localhost:3000 and localhost:4000 when you start them up.

## Deployment
I am using Amazon Lightsail - an easy to use hosting service. I believe that this can be spun up and pretty heavily scaled with only basic services like this. So to deploy, go get an AWS account, configure a domain and some subdomains, go into lightsail, create a static IP, and then get ready to start up. If you want HTTPS you'll have to configure a load-balancer and point your domain at that, but it's easy to do on Lightsail and Amazon has a blog on how to do it.

When you start up your instance, choose Ubuntu 16.06 and copy the contents of the lightsail-startup-script.sh file into the section where it says startup script. Change the lines where it exports variables to your own values like this:
```
FOOAPP_URL=domainnamehere.com
BARAPP_URL=barapp.domainnamehere.com
API_URL=api.domainnamehere.com
NODE_ENV=production
HTTPS=false
```
Make sure you chooe the $5/month instance or greater, as the cheapest instance doesn't have enough memory to start up the various docker containers. 
If you want HTTPS, change "HTTPS" to 'true' (designed to work with a lightsail load balancer with a security certificate). The script  basically pulls this code from github and runs docker-compose, so if you're pulling from your own repo you'll have to go through the .sh files and change the address it curls from. Obviously pulling from a public repo is sub-optimal for a real project, so some alternative deployment will have to be done .. alter the script to curl from a private repo, or create an image when you're ready to deply and change the script to download from Dockerhub, or some other method.
