"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
const Mongo = require("mongodb");
const url = require("url");
var P_3_1Server;
(function (P_3_1Server) {
    let daten;
    let highscore;
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let pfadDatenbank = "mongodb+srv://babo:gis2021@ermir.jqdwu.mongodb.net/Daten?retryWrites=true&w=majority";
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    verbindungDatenbank(pfadDatenbank);
    async function verbindungDatenbank(pfad) {
        let optionen = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(pfad, optionen);
        await mongoClient.connect();
        console.log("Database connected");
        daten = mongoClient.db("Daten").collection("Collection");
        highscore = mongoClient.db("Daten").collection("highscore");
    }
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        if (_request.method == "GET") {
            let body = "";
            body = body;
            _request.on("data", data => {
                body += data;
            });
            _request.on("end", async () => {
                console.log("test123");
                let adresse = url.parse(_request.url, true);
                let urlpath = adresse.pathname;
                console.log(urlpath);
                let data = adresse.query;
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                if (urlpath == "/index") {
                    _response.write(await bilder(await alleAbrufen()));
                    _response.end();
                }
                else if (urlpath == "/highscore") {
                    console.log(data.score);
                    await highscore.insertOne({ name: data.name, highscore: data.score });
                    _response.write("saved");
                    _response.end();
                }
                else if (urlpath == "/gethighscore") {
                    _response.write(JSON.stringify(await highscore.find().sort({ highscore: 1 }).toArray()));
                    _response.end();
                }
                else if (urlpath == "/loeschen") {
                    await daten.findOneAndDelete({ Bild: data.name });
                    _response.write("Gelöscht");
                    _response.end();
                }
                else if (urlpath == "/hinzufuegen") {
                    await daten.insertOne({ Bild: data.name });
                    _response.write("Hinzugefügt");
                    _response.end();
                }
            });
        }
    }
    async function alleAbrufen() {
        let alleArtikel = await daten.find().toArray();
        return alleArtikel;
    }
    async function bilder(alleArtikel) {
        alleArtikel = await daten.find().toArray();
        let kiki = JSON.stringify(alleArtikel);
        return kiki;
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=server.js.map