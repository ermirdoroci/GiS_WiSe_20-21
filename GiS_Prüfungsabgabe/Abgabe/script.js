"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Mongo = require("mongodb");
const url = require("url");
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
        _response.write(bildanzeige(daten));
    }
    async function login(daten1) {
        let alleDaten = await daten.find().toArray();
        let datenObjekt = JSON.parse(JSON.stringify(daten1));
        if (alleDaten.length > 0) {
            for (let i = 0; i < alleDaten.length; i++) {
                if (alleDaten[i].Bild == datenObjekt.Bild && (alleDaten[i].Password == datenObjekt.Password)) {
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
                if (alleDaten[x].Bild == datenObjekt.Bild) {
                    return "E-Mail Adresse ist bereits in unserer Datenbank.";
                }
            }
        }
        daten.insertOne(storeDaten);
        return "Daten wurden abgespeichert";
    }
    //  function bildanzeige(alleDaten: AlleDaten[], storeDaten: DatenTest): string {
    async function bildanzeige(storeDaten) {
        console.log("huhu");
        let daten1 = JSON.stringify(storeDaten);
        let datenObjekt = JSON.parse(daten1);
        // let response: Response = await fetch(_url);
        //let speicher: Speicher = JSON.parse(JSON.stringify(await response.json()));
        //       speicher.koepfe.forEach(kopf => {
        let imgi1 = document.createElement("img");
        imgi1.src = datenObjekt.Bild;
        document.body.appendChild(imgi1);
    }
}
//# sourceMappingURL=script.js.map