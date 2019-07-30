const fs = require("fs");
const http = require("http");
const readline = require('readline');
const Emitter = require('events').EventEmitter;

class RemoteReadByLine extends Emitter{
    constructor(settings = {}){
        super();
        this.url = settings.url ;
        this.saveFilePath = settings.saveFilePath || "rrbl.txt";
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
    
    
        http.get(this.url, response => {
            response.pipe(file);
        });
    }
}

module.exports = RemoteReadByLine; 


