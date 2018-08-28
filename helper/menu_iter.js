const async = require('async');

let task = [
  _choice,
  _answer
];


store = kinds.map((ele)=>{
  if(ele != '처음으로'){
    return fs.readdirSync('foods/'+ele);
  }
});
for(let i=0; i<(kinds.length-1); i++){
  store[i].push('처음으로');
}

async.waterfall(task, (err, result)=>{
  if(err){
    console.log(err);
  } else {
    res.send(result);
  }
});

function _choice(callback){
  let choice = [];
  if(content=='배달음식'){
      choice = kinds;
      console.log(store);
  } else if(content==kinds[0]){
      choice = store[0];
  } else if(content==kinds[1]){
      choice = store[1];
  } else if(content==kinds[2]){
      choice = store[2];
  } else if(content==kinds[3]){
      choice = store[3];
  } else if(content==kinds[4]){
      choice = store[4];
  } else if(content==kinds[5]){
      choice = store[5];
  } else if(content==kinds[6]){
      choice = store[6];
  } else if(content==kinds[7]){
      choice = store[7];
  } else if(content==kinds[8]){
      choice = store[8];
  }


  let k = choice.length;
  let text = "아래에서 골라주세요"+"\n";
  if(content!='배달음식'){
      let j = [];
      for(let choice_i=0;choice_i<k;choice_i++){
        if(choice[choice_i] != '처음으로'){
          j[choice_i] = choice[choice_i].indexOf(".");
          choice[choice_i] = choice[choice_i].substr(0,j[choice_i]);
        }
     }
  }

  for(let text_i=0;text_i<k;text_i++){
      text = text+(text_i+1)+"."+choice[text_i]+"\n";
  }
  text = text.substr(0,(text.length-1));
  callback(null, choice, text);
}

function _answer(arg1, arg2, callback){
  let answer ={
  "message":{
      "text":arg2 // in case 'text'
  },
  "keyboard":{
      "type": "buttons",
      "buttons": arg1
  }};
  callback(null, answer);
}
