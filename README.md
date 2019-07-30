# remote-read-by-line
NodeJs - Read remote file line by line using streams

# Install package

```js
npm install remote-read-by-line
```

# 1. Initialize
Add package. Create object of RemoteReadByLine and pass remote file url to read. you can also pass saveFilePath if you want to save remote file. saveFilePath is optional
```js
const RemoteReadByLine = require("remote-read-by-line");
let read = new RemoteReadByLine({url: "<FILE-URL>", saveFilePath: "[OPTIONAL]"});
```

# 2. Set listener to receive line 
```js
read.on("line",(line)=>{
    
    //you can process line here

})
```

# 3. Set listener for end of the file.
```js
read.on("complete",()=>{
   
    //file reading is completed

})
```

# 4. last and final step start reading remote file...
```js
read.readByLine();
```

That's it!