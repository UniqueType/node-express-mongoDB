###  Request Head 和 Response Head

本章我们将学习http请求的头部信息，http头可以看作一个键值对。原则上，http头也是一种数据，我们可以自有定义http头和值。不过在http规范中，规定了一些特殊的http头，我们现在来了解一下它们。

http请求包含 Request Head 和 Response Head 两种，我们先来看看 Request Header.



|   Request Head    |                             规定                             |
| :---------------: | :----------------------------------------------------------: |
|      Accept       |                       浏览器接收的格式                       |
|  Accept-Encoding  |                    浏览器端接收的编码格式                    |
|  Accept-Language  |          l浏览器端接收的语言，用于服务端判断多语言           |
|   Cache-Control   |                       控制缓存的时效性                       |
|    Connection     |    l连接方式。如果是keep-alive，且服务端支持，则复用连接     |
|       Host        |                        HTTP访问的域名                        |
| if-Modified-Since | 上次访问时的更改时间，如果服务端认为此时间后自己没有更新，则会给出304响应 |
|   if-None-Match   | 上次访问时使用的E-Tag,通常是页面信息摘要，这个比更改时间更准确一些 |
|    User-Agent     |                         k客户端标识                          |
|      Cookie       |                   客户端存储的cookie字符串                   |



接下来我们看一下Response Header。

![Response Header](../images/httpResponse.PNG)

这里仅仅列出了常见的HTTP头，这些头前端工程师应该做到不需要查阅，看到就可以知道意思的HTTP头，完成的列表还是参考 [rfc2616标准](https://tools.ietf.org/html/rfc2616)