const http = require("http");

const ws = require('ws');

const clients = new Array();

const server = http.createServer((req, res)=>{
    if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
        res.setHeader("content-type","text/html");
        res.write("<h1>Hello!</h1>")
        res.end();
       return;
    }});
    
const wss = new ws.Server({server});
wss.on("connection",ws=>{
    clients.push(ws);
    ws.on("message",(e)=>{
            for(let client of clients) {
            client.send(e);
        };
    });  
});
let port = process.env.PORT || 8080;
server.listen(port, ()=>{
    console.log('Good Job!');
})