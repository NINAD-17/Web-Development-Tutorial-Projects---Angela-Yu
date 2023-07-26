/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
    .prompt([
        {
            message: "Type in your URL: ",
            name: "URL"
        },
        {
            message: "Enter Short name for above string: ",
            name: "imgName"
        }
    ])
    .then((answers) => {
        console.log(answers);

        const url = answers.URL;
        const imgName = answers.imgName;
        
        const qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream(`QRcodes/${imgName}.png`));

        fs.writeFile(`URL \History/${imgName}.txt`, url, (err) => {
            if(err) throw err;
            console.log("URL is saved in history folder.");
        })
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });