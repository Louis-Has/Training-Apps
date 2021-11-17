//账户系统路由中间件
const express = require('express')
const db = require('./db')
const cookieParser = require('cookie-parser')

const app = express.Router()
app.use(express.json()) //解析json请求体
app.use(cookieParser('cookie sign secert')) //给cookie签名


//注册
app.post('/register', (req, res, next) => {
    let regInfo = req.body

    //验证用户名只由数字和字母组成
    let nameCheck = /^[0-9a-z_]+$/i
    if (!nameCheck.test(regInfo.name)) {
        res.status(400).json({
            code: -1,
            msg: 'userName isnot invalid...',
        })
        //必须输入密码
    } else if (regInfo.password == 0) {
        res.status(400).json.apply({
            code: -1,
            msg: 'password may not be ampty...',
        })
    } else {
        let adduser = db.prepare('insert into users (name, password, email) values (?, ?, ?)')
        let result = adduser.run(regInfo.name, regInfo.password, regInfo.email)
        console.log(result)
        res.json({
            code: 0,
            result: result,
        })
    }
})


//登录
app.post('/login', (req, res, next) => {
    let regInfo = req.body
    let userStmt = db.prepare('select * from users where name = ? and password = ?')
    // console.log(regInfo, userStmt);
    let user = userStmt.get(regInfo.name, regInfo.password)
    if (user) {
        console.log('login success  user is:', user.name)
        res.cookie('logined_user', { userId: user.userId, name: user.name }, {
            signed: true
        })
        res.json({
            code: 0,
            result: user,
        })
    } else {
        res.status(400).json({
            code: -1,
            msg: 'username or password incorrect',
        })
    }
})

module.exports = app
