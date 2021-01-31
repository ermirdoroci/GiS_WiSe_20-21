import * as Http from "http";
import * as Mongo from "mongodb";
import * as url from "url";

interface DatenTest {

    [type: string]: string | string[];

}


interface AlleDaten {
    _id: string;
    Fname: string;
    Sname: string;
    Bild: string;
    Password: string;
}

interface LoginDaten {

    Bild: string;
    Password: string;

}
let daten: Mongo.Collection;


let port: number = Number(process.env.PORT);
if (!port)
    port = 8100;

let pfadDatenbank: string = "mongodb+srv://babo:gis2021@ermir.jqdwu.mongodb.net/Daten?retryWrites=true&w=majority";


// Starte Server auf Port 8100
let server: Http.Server = Http.createServer();
server.addListener("request", handleRequest);
server.addListener("listening", handleListen);
server.listen(port);

verbindungDatenbank(pfadDatenbank);

async function verbindungDatenbank(pfad: string): Promise<void> {

    let optionen: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(pfad, optionen);

    await mongoClient.connect();

    console.log("Database connected");

    daten = mongoClient.db("Daten").collection("Collection");
}
function handleListen(): void {
    console.log("Listening");
}
async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {

    let adresse: url.UrlWithParsedQuery = url.parse(_request.url, true);
    let urlpath: string | null = adresse.pathname;

    let daten: DatenTest = adresse.query;



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





    async function login(daten1: DatenTest): Promise<string> {
        let alleDaten: AlleDaten[] = await daten.find().toArray();

        let datenObjekt: LoginDaten = JSON.parse(JSON.stringify(daten1));

        if (alleDaten.length > 0) {

            for (let i: number = 0; i < alleDaten.length; i++) {

                if (alleDaten[i].Bild == datenObjekt.Bild && (alleDaten[i].Password == datenObjekt.Password)) { return "Erfolgreich angemeldet."; }

            }

        }

        return "Falsche E-Mail Adresse oder Passwort.";
    }
    async function alleAbrufen(): Promise<AlleDaten[]> {
        let alleDaten: AlleDaten[] = await daten.find().toArray();

        return alleDaten;
    }

    async function namenAbrufen(): Promise<string> {
        let alleDaten: AlleDaten[] = await daten.find().toArray();
        let alleNamen: string = "";
        let zahl: number = 1;

        if (alleDaten.length < 1) { return "Keine Nutzer"; }

        for (let x: number = 0; x < alleDaten.length; x++) {
            alleNamen = alleNamen + zahl + ". " + alleDaten[x].Fname + " " + alleDaten[x].Sname + ". ";
            zahl++;
        }

        return alleNamen;
    }

    function registrierung(alleDaten: AlleDaten[], storeDaten: DatenTest): string {

        let daten1: string = JSON.stringify(storeDaten);
        let datenObjekt: AlleDaten = JSON.parse(daten1);



        if (alleDaten.length > 0) {

            for (let x: number = 0; x < alleDaten.length; x++) {

                if (alleDaten[x].Bild == datenObjekt.Bild) { return "E-Mail Adresse ist bereits in unserer Datenbank."; }

            }

        }

        daten.insertOne(storeDaten);

        return "Daten wurden abgespeichert";



    }
    //  function bildanzeige(alleDaten: AlleDaten[], storeDaten: DatenTest): string {



    async function bildanzeige(storeDaten: DatenTest): Promise<void> {
        console.log("huhu");
        let daten1: string = JSON.stringify(storeDaten);
        let datenObjekt: AlleDaten = JSON.parse(daten1);


        // let response: Response = await fetch(_url);
        //let speicher: Speicher = JSON.parse(JSON.stringify(await response.json()));


        //       speicher.koepfe.forEach(kopf => {

        let imgi1: HTMLImageElement = document.createElement("img");
        imgi1.src = datenObjekt.Bild;
        
        document.body.appendChild(imgi1);


    }




}