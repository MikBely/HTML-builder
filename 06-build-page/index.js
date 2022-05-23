const fs = require('fs');
const path = require('path');

const projectPath = path.join(__dirname,'/project-dist');
const projectPathAssets = path.join(projectPath,'/assets');
const assetsCurrent = path.join(__dirname,'/assets');
const templatePath = path.join(__dirname, 'template.html');
const projectHTMLPath = path.join(projectPath, 'index.html');
const componentsPath =path.join(__dirname, 'components');
fs.mkdir(projectPath,{recursive:true}, (err)=>{
  if(err){
    throw err;
  }
});
fs.mkdir(projectPathAssets,{recursive:true}, (err)=>{
  if(err){
    throw err;
  }
});
fs.copyFile(templatePath, projectHTMLPath, (err) => {
  if (err) {
    throw err;
  } else{
    fs.readFile(projectHTMLPath, 'utf8', (err, data) => {
      if(err) {
        throw err;
      }else{
        fs.readdir(componentsPath, {withFileTypes: true},(err, componets) => {
          if (err) {
            throw err;
          } else{
            componets.forEach((component) => {
              let componetsTemplate = path.join(componentsPath, component.name);
              fs.readFile(componetsTemplate, 'utf8', (err, componetTemplate) => {
                if(err) {
                  throw err;
                }else{
                  let template = `{{${component.name.split('.')[0]}}}`;
                  data = data.replace(template,  componetTemplate);
                  fs.writeFile(projectHTMLPath, data, (err) => {
                    if(err){
                      throw err;
                    }
                  });}
              });
          
            });}
        
        });}
      
    });}
    
});
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
                
                let dirOfFilesPath = path.join(currentHolder,file.name);
                let dirOfCopyFilesPath = path.join(copyHolder,file.name);
                fs.mkdir(dirOfCopyFilesPath, { recursive: true }, (err)=>{
                  if(err){
                    throw err;
                  }
                });
                fs.readdir(dirOfFilesPath,{withFileTypes: true}, (err,assets_files)=>{
                  if (err){
                    throw err;
                  } else{
                    assets_files.forEach((file)=>{
                      if(file.isFile()){
                        let fileOfFilesPath = path.join(dirOfFilesPath,file.name);
                        let fileOfCopyFilesPath = path.join(dirOfCopyFilesPath,file.name);
                        fs.copyFile(fileOfFilesPath,fileOfCopyFilesPath, (err)=>{
                          if(err){
                            throw err;
                          } 
                        });
                      }
                    });   
                  }
                });
                
                
              });
            }
          });
        }

      } );
    }
  });
};
copyDir(assetsCurrent,projectPathAssets);

const stylesPath = path.join(__dirname,'/styles');

const bundlePath = path.join(__dirname,'/project-dist','style.css');

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
