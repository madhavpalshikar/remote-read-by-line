const RemoteReadByLine = require("./app.js");
let read = new RemoteReadByLine({url: "<REMOTE_FILE_URL>", saveFilePath: "demo.txt"});

read.on("line",(line)=>{
    console.log("test.js: new line", line);
})

read.on("complete",()=>{
    console.log("test.js File read completed");
})

read.readByLine();