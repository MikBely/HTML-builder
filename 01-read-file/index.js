const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'text.txt');
const readText = fs.createReadStream(dir);
readText.on('data', (data, err)=>{
  if(err){
    throw err;
  }
  console.log (data.toString());});