
## spiderPuppet

a pre-rendered application created by [ThinkJS](http://www.thinkjs.org)

## Installation & Usage

1.Install dependencies

```
npm install
```

2.start server
```
npm start
```

3.visit http://127.0.0.1:8360


## ThinkJS Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```

## Front

devlopment
```
npm run dev
```

production
```
npm run build
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



