//require is not defined in ES module scope, you can use import instead. / SOLUTION:
//https://dev.to/caspergeek/how-to-use-require-in-ecmascript-modules-1l42
import { createRequire } from "module";
const require = createRequire(import.meta.url);
//------------------------------------------
/*
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import { input } from "@inquirer/prompts"; //ESM
import { confirm } from "@inquirer/prompts"; //ESM
var qr = require('qr-image'); //CJS
import {createWriteStream} from "node:fs"; //ESM

let continueBoolean;

do{
    let answer = await input({message: 'Enter your URL'});
    console.log("Sua URL é: " + answer);
    var qr_svg = qr.image(answer, { type: 'svg' });
    qr_svg.pipe(createWriteStream(`${answer}.svg`));

    continueBoolean = await confirm({message: 'Continue? '});
}while(continueBoolean);



