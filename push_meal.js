const Client = require('mariasql');
require('dotenv').config();
const conn = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    db: process.env.DB_NAME
});
const request = require('request');
const cron = require('node-cron');
// cron.schedule('0 0 0 * * *', function(){
//아침
request('https://api.unist.in/cafeteria/menu/break?format=debug', function (error, response, body) {
    var parsed = JSON.parse(body);
    var arr = [];
    for(var x in parsed){
        arr.push(parsed[x]);
    }
    var cafe = arr[0];
    var today = arr[1];
    var menu = arr[2];
    var time = arr[4];
    var result = today+" "+time+"\n";
    result = result+"==============="+"\n";

    //기숙사
    if(menu['dorm'] != 0){
      result = result + "["+cafe['dorm']+"]"+"\n";
      var dorm = menu['dorm'];
      var k = dorm.length;
      for(var i=0;i<k;i++){
          result = result+"("+dorm[i]['name']+")"+"\n";
          var l = dorm[i]['list'].length;
          for(var m=0;m<l;m++){
              result = result + dorm[i]['list'][m]+"\n";
          }
      }
      result = result+"==============="+"\n";
    }

    var sql = 'INSERT INTO menu (today, time, menu) VALUES(?,?,?)';
    conn.query(sql, [today, time, result], function(err, rows){
        if(err){
            console.log(err);
        } else {
            console.log(rows);
        }
    });
});

    //점심
    request('https://api.unist.in/cafeteria/menu/lunch?format=debug', function (error, response, body) {
        var parsed = JSON.parse(body);
        var arr = [];
        for(var x in parsed){
            arr.push(parsed[x]);
        }
        var cafe = arr[0];
        var today = arr[1];
        var menu = arr[2];
        var time = arr[4];
        var result = today+" "+time+"\n";
        result = result+"==============="+"\n";

        //식당동
        if(menu['2nd'] != 0){
          result = result+"["+cafe['2nd']+"]"+"\n";
          var hole = menu['2nd'];
          var k = hole.length;
          var date = new Date(today).getDay();
          if((date!=6)&&(date!=0)){
              for(var i=0;i<k;i++){
                  result = result+hole[i]['list'][0]+"\n";
              }
          } else {
              result = result+"주말영업 x"+"\n";
          }
          result = result+"==============="+"\n";
        }


        //기숙사
        if(menu['dorm'] != 0){
          result = result + "["+cafe['dorm']+"]"+"\n";
          var dorm = menu['dorm'];
          var k = dorm.length;
          for(var i=0;i<k;i++){
              result = result+"("+dorm[i]['name']+")"+"\n";
              var l = dorm[i]['list'].length;
              for(var m=0;m<l;m++){
                  result = result + dorm[i]['list'][m]+"\n";
              }
          }
          result = result+"==============="+"\n";
        }


        //교직원
        if(menu['staff'] != 0){
          result = result + "["+cafe['staff']+"]"+"\n";
          var staff = menu['staff'];
          var k = staff.length;
          if((date!=6)&&(date!=0)){
              for(var i=0;i<k;i++){
                  result = result+"("+staff[i]['name']+")"+"\n";
                  var l = staff[i]['list'].length;
                  for(var m=0;m<l;m++){
                      result = result + staff[i]['list'][m]+"\n";
                  }
              }
          } else {
              result = result+"주말영업 x"+"\n";
          }
          result = result+"==============="+"\n";
        }


        //학생회관
        if(menu['student'] != 0){
          result = result + "["+cafe['student']+"]"+"\n";
          var student = menu['student'];
          var k = student.length;
          if((date!=6)&&(date!=0)){
              for(var i=0;i<k;i++){
                  result = result+"("+student[i]['name']+")"+"\n";
                  var l = student[i]['list'].length;
                  for(var m=0;m<l;m++){
                      result = result + student[i]['list'][m]+"\n";
                  }
              }
          } else {
              result = result+"주말영업 x"+"\n";
          }
        }


        var sql = 'INSERT INTO menu (today, time, menu) VALUES(?,?,?)';
        conn.query(sql, [today, time, result], function(err, rows){
            if(err){
                console.log(err);
            } else {
                console.log(rows);
            }
        });
    });

    //저녁
    request('https://api.unist.in/cafeteria/menu/dinner?format=debug', function (error, response, body) {
        var parsed = JSON.parse(body);
        var arr = [];
        for(var x in parsed){
            arr.push(parsed[x]);
        }
        var cafe = arr[0];
        var today = arr[1];
        var menu = arr[2];
        var time = arr[4];
        var result = today+" "+time+"\n";
        result = result+"==============="+"\n";

        //식당동
        if(menu['2nd'] != 0){
          result = result+"["+cafe['2nd']+"]"+"\n";
          var hole = menu['2nd'];
          var k = hole.length;
          var date = new Date(today).getDay();
          if((date!=6)&&(date!=0)){
              result = result+"점심식단 참조"+"\n";
          } else {
              result = result+"주말영업 x"+"\n";
          }
          result = result+"==============="+"\n";
        }


        //기숙사
        if(menu['dorm'] != 0){
          result = result + "["+cafe['dorm']+"]"+"\n";
          var dorm = menu['dorm'];
          var k = dorm.length;
          for(var i=0;i<k;i++){
              result = result+"("+dorm[i]['name']+")"+"\n";
              var l = dorm[i]['list'].length;
              for(var m=0;m<l;m++){
                  result = result + dorm[i]['list'][m]+"\n";
              }
          }
          result = result+"==============="+"\n";
        }


        //교직원
        if(menu['staff'] != 0){
          result = result + "["+cafe['staff']+"]"+"\n";
          var staff = menu['staff'];
          var k = staff.length;
          if((date!=6)&&(date!=0)){
              for(var i=0;i<k;i++){
                  result = result+"("+staff[i]['name']+")"+"\n";
                  var l = staff[i]['list'].length;
                  for(var m=0;m<l;m++){
                      result = result + staff[i]['list'][m]+"\n";
                  }
              }
          } else {
              result = result+"주말영업 x"+"\n";
          }
          result = result+"==============="+"\n";
        }


        //학생회관
        if(menu['student'] != 0){
          result = result + "["+cafe['student']+"]"+"\n";
          var student = menu['student'];
          var k = student.length;
          if((date!=6)&&(date!=0)){
              for(var i=0;i<k;i++){
                  result = result+"("+student[i]['name']+")"+"\n";
                  var l = student[i]['list'].length;
                  for(var m=0;m<l;m++){
                      result = result + student[i]['list'][m]+"\n";
                  }
              }
          } else {
              result = result+"주말영업 x"+"\n";
          }
        }


        var sql = 'INSERT INTO menu (today, time, menu) VALUES(?,?,?)';
        conn.query(sql, [today, time, result], function(err, rows){
            if(err){
                console.log(err);
            } else {
                console.log(rows);
            }
        });
    });
