const fs = require("fs");
const http = require("http");
const https = require("https");
const readline = require('readline');
const Emitter = require('events').EventEmitter;

class RemoteReadByLine extends Emitter{
    constructor(settings = {}){
        super();
        this.url = settings.url ;
        this.saveFilePath = settings.saveFilePath || __dirname+"\\rrbl.txt";
    }

    readByLine(){
        const file = fs.createWriteStream(this.saveFilePath);
        file.on('pipe', (src) => {
            const rl = readline.createInterface({
                input: src
            });

            rl.on('line', (line) => {
                this.emit("line", line);   
            });
            
            rl.on('close', () => {
                this.emit("complete",{});
            });
        });
    
        if(this.url.indexOf('https') > -1){
            https.get(this.url, response => {
                response.pipe(file);
            });
        }else{
            http.get(this.url, response => {
                response.pipe(file);
            });
        }
    }
}

module.exports = RemoteReadByLine; 


