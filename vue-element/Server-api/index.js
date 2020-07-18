const routerApi = require('./router');
const bodyParser = require('body-parser'); // post 数据需要 ，req.body
const express = require('express'); //数据库服务插件
const app = express(); // 创建 express 实例
// 定义一个前端值的形式
app.use(bodyParser.json());

// 后端api路由
app.use('/api', routerApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
