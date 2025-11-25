---
# 当前页面内容标题
title: Docker Mac M3 启动nginx 并且部署本地博客
# 分类
category:
    - docker
# 标签
tag:
    - docker
    - 云原生开发
    - Devops
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## Docker Mac M3 启动 nginx 并且部署本地博客

1. 使用 docker 下载 nginx 镜像 docker pull nginx

2. 启动 nginx

```sh
docker run --name nginx -p 80:80 -d nginx
```

这样就简单的把 nginx 启动了，但是我们想要改变配置文件 nginx.conf ，进入容器,命令：

```sh
docker exec -it nginx bash
```

nginx.conf 配置文件在 /etc/nginx/ 下面，但是你使用 vim nginx.conf 或者 vi nginx.conf

会发现 vi 或者 vim 命令没有用，解决办法：apt-get update 完成之后 apt-get install vim

此时你就可以自己定制 nginx.con 文件了，改好配置文件之后重启容器，步骤，先把容器停了

`docker stop nginx` 然后重启` docker start nginx`

这样不是很方便，还有第二种方式，挂载配置文件，就是把装有 docker 宿主机上面的 nginx.conf 配置文件映射到启动的 nginx 容器里面，这需要你首先准备好 nginx.con 配置文件,如果你应经准备好了，下一步是启动 nginx

> 开始前参考文章：https://developer.aliyun.com/article/1529549

> docker cp nginx:/etc/nginx/nginx.conf /usr/local/nginxConfig/nginx/conf/nginx.conf

> docker cp nginx:/etc/nginx/conf.d/default.conf /usr/local/nginxConfig/nginx/conf.d/default.conf

```sh
docker run --name nginx -p 80:80 \
  -v /Users/micro/config/nginxConfig/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
  -v /Users/micro/config/nginxConfig/nginx/conf.d:/etc/nginx/conf.d \
  -v /Users/micro/config/nginxConfig/nginx/logs:/var/log/nginx \
  -v /Users/micro/config/nginxConfig/nginx/html:/usr/share/nginx/html \
  --privileged=true  \
  -d nginx
```

> 解释下上面的命令：
>
> --name 给你启动的容器起个名字，以后可以使用这个名字启动或者停止容器
>
> -p 映射端口，将 docker 宿主机的 80 端口和容器的 80 端口进行绑定
>
> -v 挂载文件用的，第一个-v 表示将你本地的 nginx.conf 覆盖你要起启动的容器的 nginx.conf 文件，第二个表示将日志文件进行挂载，就是把 nginx 服务器的日志写到你 docker 宿主机的/home/docker-nginx/log/下面
>
> 第三个-v 表示的和第一个-v 意思一样的。
>
> -d 表示启动的是哪个镜像

> docker 报错日记：
>
> https://blog.csdn.net/weixin_46336532/article/details/135058355
