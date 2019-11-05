
## spiderPuppet

SpiderPuppet是一个借助puppeteer的服务端渲染服务。

这个项目的动机是为了方便服务端/前端来处理搜索引擎的爬虫请求。当爬虫请求下发时，服务端可以直接将请求的url直接转发到本服务上，稍后会使用puppeteer打开对应页面并将页面内容返回。
这种解决方式不需要业务方来针对某些爬虫使用SSR（服务端渲染），对于他们来说方便、快捷。

目前支持预渲染页面、截图功能

## 启动本地服务

```
1. npm install

2. npm start
```

启动服务后可以通过http://127.0.0.1:8362访问服务的展示页面。在页面通过输入url来查看预渲染的内容
或者可以直接访问/render?url=xxx

## 使用方式

启动服务后可以将爬虫等请求直接转发到服务接口，然后接口就会返回渲染内容。ngxinx和php的简单示例如下：

#### nginx
```
http {
    map $http_user_agent $is_bot {
        default 1;
        ~[a-z]bot[^a-z] 1;
        ~[sS]pider[^a-z] 1;
        ~[sS]pider[^a-z] 1;
        ~[Ww]get 1;
        'Yahoo! Slurp China' 1;
        'Mediapartners-Google' 1;
    }
    server {
        location / {
            error_page 418 =200 @bots;
            if ($is_bot) {
                return 418;
            }
        }
        location @bots {
            proxy_pass_header Server;
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Scheme $scheme;
            proxy_set_header Cookie $http_cookie;
            proxy_set_header User-Agent $http_user_agent;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_read_timeout 3000;
            proxy_redirect off;
            proxy_pass $scheme://yourssrserverhost/render?url=$scheme://$host:$server_port$request_uri;
        }
    }
}
```

#### php 
```
<?php
$ssrHost = 'yourssrserverhost';
$protocol = strpos(strtolower($_server['server_protocol']),'https')  === false ? 'http' : 'https';
$host = $protocol.'://'.$_SERVER["SERVER_NAME"];
$user_agent = urlencode($_SERVER['HTTP_USER_AGENT']);
$port = '';

if($protocol == 'http' && $_SERVER["SERVER_PORT"] != 80){
    $port = ':'.$_SERVER["SERVER_PORT"];
}

if($protocol == 'https' && $_SERVER["SERVER_PORT"] != 443){
    $port = ':'.$_SERVER["SERVER_PORT"];
}
$requestUrl = $host.$port.$_SERVER['REQUEST_URI'];
$result = file_get_contents($ssrHost.'/render?url='.$requestUrl);

echo $result;
?>
```

## 部署服务

通过pm2来部署

```
pm2 startOrReload pm2.json

```
如果想自己部署可以通过 ```node production.js```来启动服务

## 修改代码

本项目是基于ThinkJS+Vue。服务端代码在src目录中，修改后直接生效。

如果想要修改前端代码可以通过以下方式:

```
1. npm run dev 

2. 访问127.0.0.1:3100 （所有请求会通过webpack-dev-server转发到8362端口），进行开发

3. 开发完成执行 npm run build 打包代码

```

## API

/api/page/render?url=xxx

返回包含目标页面内容的JSON对象

+ `url`: 目标地址
+ `return`: {errno:0,errmsg:'', data: {content:'xxx'}}

`/api/page/render?url=https://ppt.baomitu.com`



/api/page/screenshot

生成目标地址的截图并自动下载

+ `url`: 目标地址
+ `fullpage`: 是否截取整个可滚动的页面，默认为0
+ `viewport`: 设置页面的宽高（默认为1920*1080）

`/api/page/screenshot?url=https://ppt.baomitu.com&fullpage=1&viewport=1920,1080`

## 使用docker

构建镜像

```
npm run docker
```

启动容器

```
docker run -t -p yourport:8362 IMAGEID

```

>注意：如果修改了服务端代码需要重新构建镜像，修改了前端代码在构建镜像前需要执行```npm run build```打包前端代码


目前该项目docker镜像已经上传到了docker hub，如需使用可以通过以下指令使用

```
// 下载镜像
docker pull bingomvm/spider-puppeteer

// 运行镜像
docker run -t -i -p yourport:8362 bingomvm/spider-puppeteer

// 进入运行中的容器内部
docker exec -it your_container_id /bin/bash
```