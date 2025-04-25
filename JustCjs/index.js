//JUST CJS
const fs = require("fs");
const inquirer = require("inquirer"); 
const prompt = inquirer.createPromptModule();
const qr  = require('qr-image');

qrCode();
let urls = [];

function qrCode(){
    prompt([
        {
            type: "input",
            message: "Enter your URL:",
            name: "url"
        },
        {
            type: "confirm",
            message: "Continue?",
            name: "continue"
        }
    ])
    .then((answer) => {
        var qr_svg = qr.image(answer.url, { type: 'svg' });
        qr_svg.pipe(fs.createWriteStream(`${answer.url}.svg`));
        urls.push(answer.url);
        if(answer.continue){
            qrCode();
        }else{
            writeFile();
        }
    });
}

function writeFile(){
    const writeStream = fs.createWriteStream('urls.txt');
    const pathName = writeStream.path;
    urls.forEach(value => writeStream.write(`${value}
`));

    writeStream.on('finish', () => {
        console.log(`wrote all the array data to file ${pathName}`);
    });
    
    writeStream.on('error', (err) => {
        console.error(`There is an error writing the file ${pathName} => ${err}`)
    });
    
    writeStream.end();
}