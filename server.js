//creating server with nodejs

//http module

const http = require("http");
const fs = require('fs');
const _ = require('lodash');
const server = http.createServer((req, res) => {
    console.log("request from browser to server");
    // console.log(req.method)
    // console.log(req.url)
    res.setHeader('Content-Type', 'text/html');
    // res.write("<h1>Hello World</h1>");
    // res.write("<h2>I am ready for you</h2>");
    // res.end("<h3>Testing res.end</h3>");
    //using lodash
    let greet = _.once(() => {
        console.log("How are you?");
    });

    greet();
    greet();
    let path = './views';
    switch (req.url) {
      case "/":
        path += "/index.html";
        res.statusCode = 200;
        break;
      case "/about":
        path += "/about.html";
        res.statusCode = 200;
        break;
        case "/aboutus":
            res.statusCode = 301;
            res.setHeader('Location','/about')
            res.end();
            break;
      default:
        path += "/404.html";
        res.statusCode = 404;
        break;
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


