const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const sizeOf = require('image-size');
const syncSql = require('sync-sql');
const request = require('request');
require('date-utils');

const app = express();
app.use(bodyParser.json());
require('dotenv').config();
let conn_data = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

//buttons sql
let sql = 'SELECT * FROM buttons';
let output = syncSql.mysql(conn_data, sql);
let row_i = output.data.rows.length;
let temp = [];
for(let i=0;i<row_i;i++){
    output = syncSql.mysql(conn_data, sql);
    temp[i] = [];
    output = output.data.rows[i].button;
    let count = 0;
    let k = output.indexOf(",");
    while(k!=-1){
        k = output.indexOf(",");
        temp[i][count] = output.substr(0,k);
        output = output.substr(k+1,output.length);
        count = count+1;
    }
    temp[i][count-1] = output;
}

let buttons = temp[0];
let kinds = fs.readdirSync('foods');
kinds.push('처음으로');
let store = kinds.map((ele)=>{
  if(ele != '처음으로'){
    return fs.readdirSync('foods/'+ele);
  }
});



app.get('/keyboard',function(req,res){ // setting keyboard for first open
    let keyboard = {
        "type" : "buttons",
        "buttons" : buttons
    };
    res.send(keyboard);
});

app.post('/message', function(req,res){
    let content = decodeURIComponent(req.body.content); // user's message
    console.log(content);
    if(content=='처음으로'){
      let answer = {
          "message":{
              "text": "처음부터 다시!"
          },
          "keyboard":{
              "type": "buttons",
              "buttons": buttons
          }
      };
      res.send(answer);
    }
    //아침식단
    else if(content==buttons[0]){
        eval(fs.readFileSync('helper/meal.js')+'');
    }
    //점심식단
    else if(content==buttons[1]){
        eval(fs.readFileSync('helper/meal.js')+'');
    }
    //저녁식단
    else if(content==buttons[2]){
        eval(fs.readFileSync('helper/meal.js')+'');
    }
    //먹거리_배달음식
    else if(content==buttons[3]||kinds.includes(content)==true) {
        eval(fs.readFileSync('helper/menu_iter.js')+'');
    }
    else if(store[0].includes(content)==true||
            store[1].includes(content)==true||
            store[2].includes(content)==true||
            store[3].includes(content)==true||
            store[4].includes(content)==true||
            store[5].includes(content)==true||
            store[6].includes(content)==true||
            store[7].includes(content)==true||
            store[8].includes(content)==true&&
            content!='처음으로') {
        eval(fs.readFileSync('helper/store_iter.js')+'');
    }
    //error handling
    else {
      let answer = {
          "message":{
              "text": "잘못 입력하셨어요. 처음부터 다시!"
          },
          "keyboard":{
              "type": "buttons",
              "buttons": buttons
          }
      };
      res.send(answer);
    }
});

//배달음식 정적 이미지
let kinds_encoded = [];
for(let encode_i=0;encode_i<kinds.length;encode_i++){
    kinds_encoded[encode_i] = encodeURI(kinds[encode_i]);
    app.use('/'+kinds_encoded[encode_i], express.static('foods/'+kinds[encode_i]));
}

//파일 링크
//학사
app.use('/files', express.static('files'));
//음식
app.use('/foods', express.static('foods'));

app.listen(3000,function(){
  console.log('Connect 3000 port!')
});
