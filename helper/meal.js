const mysql = require('mysql');
//날짜
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10) {
    dd='0'+dd
}
if(mm<10) {
    mm='0'+mm
}
today = yyyy+'-' + mm+'-'+dd;

//식단
const conn = mysql.createConnection(conn_data);
var sql = 'SELECT menu FROM menu WHERE today=? AND time=?';
var time ="";
if(content=='아침식단'){ time = 'break';}
else if(content=='점심식단'){ time = 'lunch';}
else if(content=='저녁식단'){ time = 'dinner';}
conn.query(sql, [today, time], function(err, menus){
    if(err){
        console.log(err);
    } else {
        var text = menus[0].menu.substr(0,(menus[0].menu.length-1));
        let answer = {
            "message":{
                "text":text // in case 'text'
            },
            "keyboard":{
                "type": "buttons",
                "buttons": buttons
            }
        };
        res.send(answer);
    }
});
conn.end((err) => {
  if(err){
    console.log(err);
  }
});
