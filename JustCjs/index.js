//JUST CJS
const inquirer = require("inquirer"); 
const prompt = inquirer.createPromptModule();
const qr  = require('qr-image');

qrCode();

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
        qr_svg.pipe(require('fs').createWriteStream(`${answer.url}.svg`));
        if(answer.continue){
            qrCode();
        }
    });
}

