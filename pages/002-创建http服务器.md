## 创建HTTP服务器
1. 创建server.js，键入如下代码：

```
// 引入http模块
var http = require("http");
// 创建http服务器并监听3000端口
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(3000);

```

2.进入server.js文件所在目录，按住SHIFT键，鼠标右击，打开命令板，输入 node server.js,回车

3.打开浏览器，访问 http://localhost:3000, 页面输出“Hello World”

4. 创建一个稍微复杂点的服务器---[请看源码]()

*[参考资料-https://www.nodebeginner.org/index-zh-cn.html](https://www.nodebeginner.org/index-zh-cn.html)


