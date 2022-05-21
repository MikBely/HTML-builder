const fs=require('fs');
const path = require('path');
const secretFolderPath = path.join(__dirname, 'secret-folder');
fs.readdir(secretFolderPath,{withFileTypes: true}, (err,files)=>{
  if (err){
    throw err;
  } else{
    files.forEach((file)=>{
      if(file.isFile()){
        let name = file.name.split('.')[0];
        let filesPathOfecretFolder = path.join(__dirname,'secret-folder',file.name);
        let extension = file.name.split('.')[1];
        fs.stat(filesPathOfecretFolder, (err,stats)=>{
          if (err){
            throw err;
          } else {
            let size = stats.size;  
            console.log(`${name} - ${extension} - ${size/1000}kb`);
          }
        });
        
      }
    });
  }
});