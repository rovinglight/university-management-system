# 项目配置
## 运行步骤
首次运行时需按步骤执行，而之后需要重启服务时只需执行第4步即可
-  在运行之前先要安装好docker，具体如何安装可见如下链接：
[Docker安装](https://store.docker.com/search?type=edition&offering=community)

2. 在docker客户端中配置文件共享  

3. 配置dockerStore的国内镜像（可以先跳过这一步，如果镜像下载太慢再回头做也可）

4. 运行docker容器（在第一次配置完成后运行以下代码即可重新启动容器）  

```
#运行三个容器
#在项目根目录运行
docker-compose up

# 运行后端
# 打开一个新的terminal
docker exec -it ums_web_container /bin/bash
cd /usr/src/app
npm i
npm start

# 运行前端
# 打开一个新的terminal
docker exec -it ums_app_container /bin/bash
cd /usr/src/app
npm i
npm run dev
```

- 首次运行时导入数据库

```
docker exec -it ums_db_container /bin/bash
cd /data
mongorestore -d ums ./export
```
