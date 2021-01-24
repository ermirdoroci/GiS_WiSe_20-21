"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
const querystring = require("querystring");
const Mongo = require("mongodb");
var P_3_1Server;
(function (P_3_1Server) {
    let daten;
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let pfadDatenbank = "mongodb+srv://babo:passwort@ermir.jqdwu.mongodb.net/Daten?retryWrites=true&w=majority"; //mongodb+srv://<username>:<password>@ermir.jqdwu.mongodb.net/<dbname>?retryWrites=true&w=majority;
    // Starte Server auf Port 8100
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    verbindungDatenbank(pfadDatenbank);
    async function verbindungDatenbank(pfad) {
        let optionen = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(pfad, optionen);
        await mongoClient.connect();
        daten = mongoClient.db("Daten").collection("Collection");
    }
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        if (_request.method == "POST") {
            //    console.log("fehlermeldung");
            //    else {
            let body = "";
            _request.on("data", data => {
                body += data.toString();
                //   }
            });
            _request.on("end", async () => {
                let daten = querystring.parse(body);
                //Login
                if (JSON.stringify(daten).startsWith("{\"EMail")) {
                    _response.setHeader("content-type", "text/html; charset=utf-8");
                    _response.setHeader("Access-Control-Allow-Origin", "*");
                    _response.write(await login(daten));
                    _response.end();
                }
                //Alle User abfragen
                else if (JSON.stringify(daten) == "{}") {
                    _response.setHeader("content-type", "text/html; charset=utf-8");
                    _response.setHeader("Access-Control-Allow-Origin", "*");
                    _response.write(await namenAbrufen());
                    _response.end();
                }
                //Registrierung
                else {
                    _response.setHeader("content-type", "text/html; charset=utf-8");
                    _response.setHeader("Access-Control-Allow-Origin", "*");
                    _response.write(registrierung(await alleAbrufen(), daten));
                    _response.end();
                }
            });
        }
    }
    async function login(daten1) {
        let alleDaten = await daten.find().toArray();
        let datenObjekt = JSON.parse(JSON.stringify(daten1));
        if (alleDaten.length > 0) {
            for (let i = 0; i < alleDaten.length; i++) {
                if (alleDaten[i].EMail == datenObjekt.EMail && (alleDaten[i].Password == datenObjekt.Password)) {
                    return "Erfolgreich angemeldet. Willkommen zurück ";
                }
            }
        }
        return "Die Kombination aus Email und Passwort ist leider nicht in unserer Datenbank. Versuchen Sie es bitte erneut.";
    }
    async function alleAbrufen() {
        let alleDaten = await daten.find().toArray();
        return alleDaten;
    }
    async function namenAbrufen() {
        let alleDaten = await daten.find().toArray();
        let alleNamen = "";
        let zahl = 1;
        if (alleDaten.length < 1) {
            return "Momentan befindet sich noch kein registrierter Nutzer in unserer Datenbank  ";
        }
        for (let x = 0; x < alleDaten.length; x++) {
            alleNamen = alleNamen + zahl + ". " + alleDaten[x].Fname + " " + alleDaten[x].Sname + ", ";
            zahl++;
        }
        return alleNamen;
    }
    function registrierung(alleDaten, storeDaten) {
        let daten1 = JSON.stringify(storeDaten);
        let datenObjekt = JSON.parse(daten1);
        if (alleDaten.length > 0) {
            for (let x = 0; x < alleDaten.length; x++) {
                if (alleDaten[x].EMail == datenObjekt.EMail) {
                    return "Die benutze Email befindet sich bereits in unserer Datenbank. Loggen Sie sich ein oder registrieren Sie sich mit einer anderen.";
                }
            }
        }
        daten.insertOne(storeDaten);
        // storeData(storeDaten);
        return "Ihre Daten wurden erfolgreich gespeichert";
    }
    // function storeData(_daten: Daten): void {
    //  daten.insertOne(_daten);
    //}
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=server.js.map