const fs = require('fs');
const path = require('path');

const filesPath = path.join(__dirname,'/files');
const copyPath = path.join(__dirname,'/files-copy');
const  copyDir= (currentHolder,copyHolder)=> {
  fs.rm(copyHolder,{ recursive:true,force:true}, (err)=>{
    if (err){
      throw err;
    } else{
      fs.mkdir(copyHolder,{recursive:true}, (err)=>{
        if(err){
          throw err;
        }else{
          fs.readdir(currentHolder,{withFileTypes: true}, (err,files)=>{
            if (err){
              throw err;
            } else{
              files.forEach((file)=>{
                if(file.isFile()){
                  let fileOfFilesPath = path.join(currentHolder,file.name);
                  let fileOfCopyFilesPath = path.join(copyHolder,file.name);
                  fs.copyFile(fileOfFilesPath,fileOfCopyFilesPath, (err)=>{
                    if(err){
                      throw err;
                    } 
                  });
                }
              });
              console.log('Copying...');}
          });
        }

      } );
    }
  });
};
copyDir(filesPath,copyPath);