#### 翁英浩 ——应聘前端开发

电话：17826805426

邮箱：2354949236@qq.com

#### 技术栈

切页面：HTML5、CSS3、SASS、Photohop
代码管理：Git、Github
构件工具：ESLint、babel、webpack
编程语言：JavaScript、Node.js、TypeScript
调试工具：Firebug、Chrome Dev Tools
前端标准/规范：HTTP/1.1/2、ECMAScript5/6、W3C:DOM、BOM、XML、JSON、CommonJS、SEO
编程知识储备：数据结构、OOP/AOP、常用的数据结构转换、RegExp、TCP/UDP
JavaScript 相关概念：闭包、高阶函数、原型/原型链/作用域链、Class、Promise、异步迭代
前端库\框架：jQuery、Bootstrap、Ant Design、原生 DOM 操作、冒泡和捕获
React：Hooks、
相关模块：React-CLI、Redux、useimmer、SWR、Moment、react-contenteditable、Axios
后端模块：sqlite、cookieParser、Express

# 项目介绍

#### 腾讯投票小程序（前后端分离）

前端：React、React-router，后端：Node.js、Express、sqlite

项目描述：投票小程序是工作组对于搜集组员不同意向的实用工具，发起人可以选择发起新建单选/多选投票，并且可以添加多个选择项，可以完美满足工作、团建等意见采集工作。投票本身支持设置截止日期、匿名投票、限制传播（需要拿到工作组的组身份识别）。在投票建立后，组员可以访问投票结果，结果可以展示出当前投票各选项的投票人数与投票占比，且在非匿名投票下可以显示出投票人员的头像等个人信息。在投票简历后，若发起人发现选项描述错误，也支持更改选项信息，改选项已投票记录会被清除。

技术点： 1.用户请求页面时先读取本地的 cookie，检查用户的登录信息，无 cookie 则用 Redirect 重定向至'/account/login'页面。 2.注册用户时用正则'/^[0-9a-z_]+$/i'限制用户名只能用字母和数字组合，防止 xss 攻击。请求注册用 axios 把用户信息发送到后端，且保证用户名唯一，用 sqlite 把用户信息储存到 user 表。 3.登录成功后把用户名用 cookieParser 处理后返回，且'signed:true'加密，防止用户信息明文暴露。 4.在创建投票页面即可选择新建单选/多选投票，若选择创建多选，则导航至"/create-vote?multiple=1"记录下多选的信息，方便后续一起发请求到后端。 5.在创建投票页面封装'useInput'，return {value, onChange}，即可方便地实现可控组件。 6.把选项信息储存在'let [options, setOptions] = useImmer(['', ''])'中，当点击'添加选项'添加选项按钮时向其中添加''，引发页面更新添加选项。 7.在发送完投票无报错后让用户定向至''/view-vote/' + createdVote.voteId'，再想后端数据库请求此次的投票信息，后端收到请求后 select 出投票相关的选项，投各个选项的 userId，对应的 userId 的基本信息。 8.在拿到这次投票的所有信息后，用 Lodash 的 groupBy 和 uniqBy 分出各个选项的投票人信息，及本次投票的参与人数，再在各个投票旁展示出票数和占比数，按是否匿名投票展示用户信息。

#### 仿滴答清单项目（前后端分离）

前端：React、React-router，后端：Node.js、Express、sqlite

技术点： 1.用户请求页面时先读取本地的 cookie，检查用户的登录信息，无 cookie 则用 Redirect 重定向至'/account/login'页面。 2.注册用户时用正则'/^[0-9a-z_]+$/i'限制用户名只能用字母和数字组合，防止 xss 攻击。请求注册用 axios 把用户信息发送到后端，且保证用户名唯一，用 sqlite 把用户信息储存到 user 表。 3.登录成功后把用户名用 cookieParser 处理后返回，且'signed:true'加密，防止用户信息明文暴露,改善用户登录体验。账户验证成功即把用户导航至'wepapp/{scope}/all'。 4.主页面分成'all','today','recent','completed'几个 scope,在路由时把不同的 scope 传入同一个渲染组件，记录在 props 里，随 axios 一起发送至后端，由后端筛选数据后返回所需数据。 5.在创建 todo 组件封装'useInput'，return {value, onChange}，即可方便地实现可控组件。 6.在页面中间用 swr 拿到所需的用户数据后用 map 呈现出所有的 todo 信息。当点击任一 todo 时，currentTodo 改为这个 todo 的 idx ，在右侧的详细信息中，展现出 todo 的全部信息，且 date，title ，content 支持在市区焦点和按'Enter'时触发，把数据传输到数据库同步，再调用 mutate()同步数据实现实时更新。 7.在右侧详细信息里 content 边有转为待办按钮，点击即把 todo 的 isList 设为 true， content 信息即填入 todoLists 信息中，记录所属的 todoId 信息。 8.在 scope 的下方会显示出所有 todo 的标签，支持筛选出某标签的所有 todo。 9.在 'wepapp/{scope}/calendar' 实现月视图，可以在 'REACT-CALENDAR' 相应的日期上展示出当时日期的 todo。

#### 正则解析铁路图（静态 HTML）

解析匹配字符或字符串，且记录预测信息，用多维数组记录“|”，再使用原生 DOM 操绘制出各组件间关系及信息

用多维数组解析正则表达式，把每个匹配字符用数组记录，字符串用递归解析继续填入

技术点： 1.遇到'\'，即把'\'和下一个字符记录为匹配字符串，可以按照匹配表替换。 2.遇到'('，即递归解析后续的字符串，遇到')'结束递归。 3.遇到'['和'[^'，即把后续字符记录为匹配字符集合'dv.type = 'character classes''，直到遇到']'。 4.遇到'(?:'和'(?='和'(?<='和'(?<!',即把后续'type'标记为'look ahead positive assert'或'negative assert'等等，递归解析内部字符串。 5.遇到'^'、'$'、'_'、'+'、'?'，即填入前一项匹配字符的 'des' 属性。 6.遇到'{'，把一直到'}'的一个或两个数字记录在前一项匹配字符的 'des' 属性。 7.为了支持'|'功能，数组在记录时，如果没遇到过'|'，就存入 node.vals[pa] 中，遇到'|'，就存入 node.vals 中。 8.用 svg 绘制出铁路图，每个数组都有边框， assert 类型用虚线框表示。node.vals 的元素之间是上下并列的，node。vals[pa] 的元素是横向排列，且之间连接，如果元素是数组，则应该用 svg 的'path'一一连接。 9.各匹配字符的'type'和'des'渲染在各匹配字符下侧，补充解释匹配字符，如果是'{2,8}'、'_'之类的，用 svg 的'path'绘制围绕自己的圆来表示。
