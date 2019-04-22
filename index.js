"use strict";
const linebot = require('linebot');
const util = require("util")
const line = require('@line/bot-sdk');
const express = require("express");
const request = require("request");
const configGet= require('config');
const app = express();
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "medical.cg1fvo9lgals.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "12345678",
  database: "medical"
});
db.connect();

const bot = linebot({
  channelId: '1561441777',
  channelSecret: configGet.get("CHANNEL_SECRET"),
  channelAccessToken: configGet.get("CHANNEL_ACCESS_TOKEN")
});
const linebotParser = bot.parser();

app.post('/webhook', linebotParser,function (req, res) {
    console.log('webhook in')
});

// const app=function app(){
//     if (event.message.text=='掛號'){
//         event.reply({ type: 'text', text: '請問你要掛哪一科?' });
//     }
// }

bot.on('message', function (event) {
    if(event.message.text=='掛號'){
        console.log(event.message.text)
        event.reply({ type: 'text', text: '請問你要掛哪一科?' });
        console.log(event)
    }
    if(event.message.text=='牙科'){
        console.log(event.message.text)
        event.reply({ type: 'text', text: '請輸入身分證已進行驗證: '})
    }
    
});

 
    // db.query("SELECT * FROM `med_appointment_sub` WHERE `ID`= ?", [event.message.text], (error, results, fields) => {
    //     // console.log(results);
    //     if (results.length == false) {
    //         console.log('wrong input');
    //         event.reply("wrong input");
    //     } else {
    //         console.log(results[0]);
    //         event.reply(JSON.stringify(results[0]));
    //     }
    // });


//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

