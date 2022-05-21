const fs=require('fs');
const path = require('path');
const {stdin,stdout, exit}=require('process');
const textFile = path.join(__dirname,'text.txt');
const writeStream = fs.createWriteStream(textFile);
stdout.write('Привет. Напиши текст\n');
stdin.on('data', data => {
  if (data.toString().trim()==='exit'){
    stdout.write('Вы выбрали exit. Ввод завершен\n');
    process.exit();
  } else{
    writeStream.write(data);
  }
});
process.on('SIGINT',()=>{
  stdout.write('Вы выбрали cntl+c. Ввод завершен\n');
  exit();
}
);
