const express = require('express')
const db = require('./db') //连接数据库
const cookieParser = require('cookie-parser')
const accountRouter = require('./account')
const moment = require('moment')
// import "moment/locale/zh-cn";

const app = express()

const port = 81

app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

app.listen(port, () => {
    console.log('now listning on port', port)
})

app.use(cookieParser('cookieSecret')) // cookie签名的密码
app.use(express.json()) // 解析json请求体的中间件
app.use(express.urlencoded({ extended: true })) // 解析url编码请求体的中间件

//登录功能
app.use('/account', accountRouter)

//添加todo
app.use('/todosData/:scope/addtodo', (req, res, next) => {
    console.log('add add');
    let user = req.signedCookies.logined_user
    let todoitem = req.body
    db.prepare(`insert into data_todos (userId,title, date) values ( ?, ?, ?)`).run(user.userId, todoitem.title, todoitem.date)
    next()
})

//修改todo
app.use('/todosData/:scope/changeTodoData', (req, res, next) => {
    let user = req.signedCookies.logined_user
    let todoitem = req.body
    console.log(user.userId, todoitem);
    db.prepare(`update data_todos set ${todoitem.att} = ? where todoId = ?`).run(todoitem.val, todoitem.todoId)
    next()
})

//请求数据
app.use('/todosData/:scope', (req, res, next) => {
    let Today = (todo) => {
        let date = moment().format("YYYY-M-D");
        return todo.date === date;
    };
    let Recent = (todo) => {
        let date = moment().format("YYYY-M-D");
        let dateLater = moment().add(7, "days").format("YYYY-MM-D");
        return todo.date >= date && todo.date <= dateLater;
    };
    let { scope } = req.params

    let user = req.signedCookies.logined_user
    let userData = db.prepare(`select * from data_todos where userId = ?`).all(user.userId)
    if (scope === ':Today') {
        res.json(userData.filter(Today))
    } else if (scope === ':Recent') {
        res.json(userData.filter(Recent))
    } else {
        res.json(userData)
    }
})

app.use(((req, res, next) => {
    res.end('OK')
}))
