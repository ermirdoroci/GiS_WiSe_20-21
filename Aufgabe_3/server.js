"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
const Mongo = require("mongodb");
const url = require("url");
var P_3_1Server;
(function (P_3_1Server) {
    let daten;
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let pfadDatenbank = "mongodb+srv://babo:gis2021@ermir.jqdwu.mongodb.net/Daten?retryWrites=true&w=majority";
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
        console.log("Database connected");
        daten = mongoClient.db("Daten").collection("Collection");
    }
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        let adresse = url.parse(_request.url, true);
        let urlpath = adresse.pathname;
        let daten = adresse.query;
        // let daten: Daten = querystring.parse(body);
        //Alle User abfragen
        if (urlpath == "//benutzerliste") {
            _response.setHeader("content-type", "text/html; charset=utf-8");
            _response.setHeader("Access-Control-Allow-Origin", "*");
            _response.write(await namenAbrufen());
            _response.end();
        }
        //Login
        else if (urlpath == "//login") {
            _response.setHeader("content-type", "text/html; charset=utf-8");
            _response.setHeader("Access-Control-Allow-Origin", "*");
            _response.write(await login(daten));
            _response.end();
        }
        //Registrierung
        else if (urlpath == "//index") {
            _response.setHeader("content-type", "text/html; charset=utf-8");
            _response.setHeader("Access-Control-Allow-Origin", "*");
            _response.write(registrierung(await alleAbrufen(), daten));
            _response.end();
        }
    }
    async function login(daten1) {
        let alleDaten = await daten.find().toArray();
        let datenObjekt = JSON.parse(JSON.stringify(daten1));
        if (alleDaten.length > 0) {
            for (let i = 0; i < alleDaten.length; i++) {
                if (alleDaten[i].EMail == datenObjekt.EMail && (alleDaten[i].Password == datenObjekt.Password)) {
                    return "Erfolgreich angemeldet.";
                }
            }
        }
        return "Falsche E-Mail Adresse oder Passwort.";
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
            return "Keine Nutzer";
        }
        for (let x = 0; x < alleDaten.length; x++) {
            alleNamen = alleNamen + zahl + ". " + alleDaten[x].Fname + " " + alleDaten[x].Sname + ". ";
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
                    return "E-Mail Adresse ist bereits in unserer Datenbank.";
                }
            }
        }
        daten.insertOne(storeDaten);
        return "Daten wurden abgespeichert";
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=server.js.map