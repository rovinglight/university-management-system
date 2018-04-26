# 项目配置

- 在运行之前先要安装好docker
- 下载数据库模拟数据并将data文件夹解压至项目根目录

[模拟数据点击这里下载](https://pan.baidu.com/s/1egXmSiXQeoHKwils6vhSHQ)  
[Docker安装地址](https://store.docker.com/search?type=edition&offering=community)

```
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
