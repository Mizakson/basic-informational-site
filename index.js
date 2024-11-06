const http = require("http")
const fs = require("fs")
const url = require("url")

const e404 = fs.readFileSync("./404.html", "utf-8", (err, data) => {
    if (err) console.log(err)
    return data
})

http.createServer((req, res) => {
    const q = url.parse(req.url, true)
    let filename = ""
    if (q.pathname === "/") filename = "." + "/index.html"
    else filename = "." + q.pathname

    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, {"Content-Type": "text/html"})
            res.write(e404)
            return res.end()
        } else {
        res.writeHead(200, {"Content-Type": "text/html"})
        res.write(data)
        return res.end()}
    })

}).listen(8080)