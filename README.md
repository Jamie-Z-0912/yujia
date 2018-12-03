
=======
# 小清柠saas平台3.0版本
## 项目说明
主要为前后端初步分离的前端代码 
===============

新增页面放到./src/pages下面，webpack会自动检测，一个js生成一个html，less不管。

因为pages下面的目录受到webpack监控，
所以自用组件的js文件请放到./src/components目录中；
接口js文件请放到./src/service目录中；

状态及数据管理 mobx。

webpack只有在启动的时候会读取pages文件夹，所以新增页面请重启webpack：「npm start」

由于静态资源是用webpack做了充命名处理，如运行 「npm start」看不到图片，请再执行命令 npm run buildTest

=============================

正式环境打包命令： npm run buildTest
测试环境打包命令： npm run buildProd

============================
