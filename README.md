# my-project

## Project setup
```
npm install
```
# 建议用cnpm install 安装。如因node-sass 安装不上，手动安装 cnpm i node-sass --save
### 本地启服务指令
```
npm run serve
```

### 打包指令
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 注意事项
# 目前联调情况： 整体图形统计/自助业务数据模块 均已根据华为云联调完。运维数据模块除了未提供的接口部分，其余均已调试完毕。

#  地图注意事项
#  因后端未返回各个社区/镇的经纬度情况，所以地图数据是在前端维护。 文件在src/assets/map/dgMap.json，另一个在src/utils/map.js
#  前端定义的镇/社区名称要跟后端返回的officeName 一致，如不一致会导致在地图上展示不出来。如要变更名称，以上两个文件（dgMap.json, map.js)均需要修改
#  地图显示的点 是根据经纬度定位的，有些位置可能不太精确，如要修改，修改src/utils/map.js里对应的经纬度即可。

#  关于打包
#  执行打包指令(npm run build) 后会生成一个dist文件夹，将该文件夹里的文件上传到服务器上，配置nginx。建议nginx配置开启gzip压缩。
#  默认不带后缀，如需要带后缀，比如： http:xxx:port/后缀名。需要在vue.config.js 里找到publicPath属性，修改值为 /后缀名

#  更改后端接口地址
#  在项目根目录下 有一个config.js文件，修改 PROXY_TARGET字段值即可。
