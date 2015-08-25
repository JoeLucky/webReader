/**
 * Created by joe on 15-8-18.
 */
var http = require('http');
var fs = require('fs');
var url = require('url');
//直接进入index.html 参数 进行路由转换
var server = http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin","*");   
    var path = url.parse(req.url, true);
    var whatKind = path.pathname.match(/\.\w+$/);
    switch ('.' + whatKind) {
        case "..pdf":
            var book = 'E:\\phpStudy\\WWW\\mall' + decodeURI(path.pathname);
            fs.exists(book, function (exists) {
                if(exists){
                    res.writeHead(200, {"Content-Type": "application/pdf"});
                    fs.createReadStream(book).pipe(res);
                    console.log('successfully return a book '+book);
                } else{
                    res.end('cannot find the book on my server');
                    console.log('someone finding a nonexistent book '+book)
                }
            });
            break;
        case "..ico":
            res.end('');
            break;
        default:
            res.end('I donot know what happen...');
            console.log('someone try to do something I cannot support...');
    }

})
server.listen(3000, function () {
    console.log('server listening on port 3000');
});

