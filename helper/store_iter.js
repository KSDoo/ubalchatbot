var count = 0;
if(store[0].includes(content)==true){
  // content==store[0]||content==store[0][1]||content==store[0][2]||content==store[0][3]||content==store[0][4]||content==store[0][5]||content==store[0][6]
    count = 0;
} else if(store[1].includes(content)==true){
    count = 1;
} else if(store[2].includes(content)==true){
    count = 2;
} else if(store[3].includes(content)==true){
    count = 3;
} else if(store[4].includes(content)==true){
    count = 4;
} else if(store[5].includes(content)==true){
    count = 5;
} else if(store[6].includes(content)==true){
    count = 6;
} else if(store[7].includes(content)==true){
    count = 7;
} else if(store[8].includes(content)==true){
    count = 8;
}
var path = kinds[count]+'/'+content+'.jpeg';

var dimensions = sizeOf('foods/'+path);
let answer = {
    "message":{
        "text":"",
        "photo": {
            "url": "http://kakaobot.ubal.kr/"+path,
            "width": dimensions.width,
            "height": dimensions.height
        },
        "message_button": {
            "label": "사진확대",
            "url": "http://kakaobot.ubal.kr/"+path
        }
    },
    "keyboard":{
        "type": "buttons",
        "buttons": buttons
    }
};
console.log(answer);
res.send(answer);
