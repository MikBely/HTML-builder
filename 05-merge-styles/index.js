const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname,'/styles');
const bundlePath = path.join(__dirname,'/project-dist','bundle.css');

const writeStream=fs.createWriteStream(bundlePath);
fs.readdir(stylesPath,{withFileTypes: true}, (err,files)=>{
  if (err){
    throw err;
  } else{
    files.forEach( file =>{
      if(file.isFile() && file.name.split('.')[1]==='css'){
        let cssPath = path.join(stylesPath,file.name);
        let readStream = fs.createReadStream(cssPath,'utf-8');
        readStream.pipe(writeStream);
      }
    });
  }
});