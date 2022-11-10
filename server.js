//creating server with nodejs

//http module

const http = require("http");
const fs = require('fs');
const server = http.createServer((req, res) => {
    console.log("request from browser to server");
    // console.log(req.method)
    // console.log(req.url)
    res.setHeader('Content-Type', 'text/html');
    // res.write("<h1>Hello World</h1>");
    // res.write("<h2>I am ready for you</h2>");
    // res.end("<h3>Testing res.end</h3>");
    let path = './views';
    switch (req.url) {
        case '/':
            path += '/index.html'
            break;
        case '/about':
            path += "/about.html";
            break;
        default:
            path+='/404.html'
    }
    fs.readFile(path, (err, file) => {
        if (err) {
            console.log(err);
        }
        else {
            res.write(file);
            res.end();
        }
    })

});
 //port number, host name , cb
server.listen(3000, 'localhost', () => {
    console.log("server is listening on port 3000");
});


