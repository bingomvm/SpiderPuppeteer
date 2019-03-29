
## spiderPuppet

a pre-rendered application created by [ThinkJS](http://www.thinkjs.org)

you can view a SSR page by enter a specified address or get the SSR page content.

## Installation & Usage

1.Install dependencies

```
npm install
```

2.start server
```
npm start
```

3.visit http://127.0.0.1:8362

if you want to get the SSR content, You can access http://127.0.0.1:8362/api/index?url=xxx directly


if you watch change front code, you can run ```npm run dev``` and change the code. then run ```npm run build``` generate last code.

## deploy product 

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json

```

## Start with docker

build images

```
npm run docker
```

run container

```
docker run -p your port:8362 IMAGEID

```

>notice: if you modify font code. before you run a container, you need to build docker image again.



