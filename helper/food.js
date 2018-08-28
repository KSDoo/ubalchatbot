if(content==buttons[1]){
    let k = foods.length;
    let text = "아래에서 골라주세요"+"\n";
    for(let text_i=0;text_i<k;text_i++){
        text = text+(text_i+1)+"."+foods[text_i]+"\n";
    }
    text = text.trim();
    let answer = {
        "message":{
            "text":text // in case 'text'
        },
        "keyboard":{
            "type": "buttons",
            "buttons": foods
        }
    };
    res.send(answer);
}

else if (content==foods[0]){
    let answer = {
        "message":{
            "text":'점심/저녁 중에 골라주세요'
        },
        "keyboard":{
            "type": "buttons",
            "buttons": ['점심식단', '저녁식단', '처음으로']
        }
    };
    res.send(answer);
}

else if (content=='점심식단'||content=='저녁식단'){
    eval(fs.readFileSync('helper/meal.js')+'');
}

else if (content==foods[2]){
    let answer = {
        "message":{
            "text":"",
            "message_button": {
                "label": content,
                "url": "http://kakaobot.ubal.kr/files/18spring.pdf"
            }
        },
        "keyboard":{
            "type": "buttons",
            "buttons": buttons
        }
    };
    res.send(answer);
}
