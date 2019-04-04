## 题目

**已知一个数组a,其中存在空字符串，去除空字符串后，截取一段生成数组b,**

**如何用js判断b中的元素在a中是相邻的？**

**例如 a = ['', 1, 2, 3, 4, 5]   b = [3, 4]    相邻**

​        **a = [1, 2, 3, '', 4, 5]   b = [3, 4]    不相邻**

## 答案

```javascript
function isAdjoin(a, b) {
            const aStr = a.join('-');
            const bStr = b.join('-');

            // es5
            // if (aStr.indexOf(bStr) > -1) {
            //     return true; // 相邻
            // }
            // return  false; // 不相邻
            
            // es6
            return aStr.includes(bStr);
        }
        const c1 = ['', 1, 2, 3, 4, 5], d1 = [3, 4];
              c2 = ['', 1, 2, 3, '', 4, 5], d2 = [3, 4];
        console.log(isAdjoin(c1, d1)); // true
        console.log(isAdjoin(c2, d2)); // false
​```
```

* [参考资料](<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes>) 



