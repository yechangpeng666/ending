

"use strict";
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const USERS = [
    { id: "01", userName: "张三", web: "80", java: '99' },
    { id: "02", userName: "李四", web: '70', java: '88' },
    { id: "03", userName: "王五", web: '77', java: '66' }
];
const Account = [
    { userName: 'aaa', password: '1234567' }
]
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();//解决跨域问题

});

app.get('/hello', function (req, resp) {
    resp.send("哈哈");
    resp.end();
});

app.get("/users", function (req, resp) {
    resp.send(USERS)
    resp.end();
})

app.get('/users/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS) {
        if (user.id === id) {
            resp.send([user]);
            break
        }
    }
    resp.end();
});
//post请求表示添加用户
app.post('/user', function (req, resp) {//req表示请求,resp表示应答
    //url-encoded
    //form-date
    //json
    USERS.push(req.body)
    resp.send({ succ: true })
    resp.end();
});
app.post('/Account', function (req, resp) {

    const userName = req.body.userName;
    const password = req.body.password;
    console.log(true)
    let founded = false;
    for (let user of Account) {
        if (user.userName === userName && user.password === password) {
            founded = true;
        }
    }
    if (founded) resp.send({ succ: true });
    else resp.send({ succ: false });
    resp.end();

});
//修改用户
app.put('/user', function (req, resp) {//req表示请求,resp表示应答
    //url-encoded
    //form-date
    //json
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.web = req.body.web;
            user.java = req.body.java;
            founded = true
            break
        }
    }
    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: "没有找到用户" })
    }
    resp.end();
});
app.delete('/user/:id', function (req, resp) {//req表示请求,resp表示应答
    let founded = false;
    let index = 0
    console.log(req.params);
    for (let user of USERS) {
        if (user.id === req.params.id) {
            USERS.splice(index, 1);
            founded = true
            break
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
        console.log(USERS);
    } else {
        resp.send({ succ: false, msg: "没有找到用户" })
    }
    resp.end();
});

app.listen(8080, function () {
    console.log("服务器在8080端口启动！")
})