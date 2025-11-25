# 3 分钟了解 MacBook m1 芯片使用 docker 安装 nginx

1、先安装 nginx

```shell
docker pull nginx
```

2、创建目录

```shell
mkdir -p /Users/benjie/software/nginx/conf mkdir -p /Users/benjie/software/nginx/logs mkdir -p /Users/benjie/software/nginx/html
```

3、启动 nginx 实例，为了复制配置

```shell
docker run --name nginx -p 80:80 -d nginx:latest
```

4、将容器内的配置文件拷贝到当前目录

```shell
docker cp nginx:/etc/nginx/nginx.conf /Users/benjie/software/nginx/conf/nginx.conf docker cp nginx:/etc/nginx/conf.d /Users/benjie/software/nginx/conf/conf.d docker cp nginx:/usr/share/nginx/html /Users/benjie/software/nginx/
```

5、终止原容器：`docker stop nginx`执行命令删除原容器：`docker rm $ContainerId`  
6、创建新的 nginx；执行以下命令

```shell
docker run -p 80:80 --name nginx \ -v /Users/benjie/software/nginx/html:/usr/share/nginx/html \ -v /Users/benjie/software/nginx/logs:/var/log/nginx \ -v /Users/benjie/software/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \ -v /Users/benjie/software/nginx/conf/conf.d:/etc/nginx/conf.d \ -d nginx:latest
```
