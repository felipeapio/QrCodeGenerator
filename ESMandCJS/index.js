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
import fs from "fs"; //ESM

const writeStream = fs.createWriteStream('urls.txt');
const pathName = writeStream.path;
let continueBoolean;
let urls = [];
do{
    let answer = await input({message: 'Enter your URL:'});
    console.log("Sua URL é: " + answer);
    var qr_svg = qr.image(answer, { type: 'svg' });
    qr_svg.pipe(fs.createWriteStream(`${answer}.svg`));
    urls.push(answer);
    continueBoolean = await confirm({message: 'Continue? '});
}while(continueBoolean);

//https://stackoverflow.com/questions/17614123/node-js-how-to-write-an-array-to-file

// write each value of the array on the file breaking line
urls.forEach(value => writeStream.write(`${value}
`));
    
// the finish event is emitted when all data has been flushed from the stream
writeStream.on('finish', () => {
    console.log(`wrote all the array data to file ${pathName}`);
});

// handle the errors on the write process
writeStream.on('error', (err) => {
    console.error(`There is an error writing the file ${pathName} => ${err}`)
});

// close the stream
writeStream.end();