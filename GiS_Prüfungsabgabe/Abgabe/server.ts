import * as Http from "http";
import * as Mongo from "mongodb";
import * as url from "url";

export namespace P_3_1Server {

    interface Daten {

        [type: string]: string | string[];

    }


    interface AlleDaten {
        Bild: string;
        _id: string;
        Fname: string;
        Sname: string;
        EMail: string;
        Password: string;
    }

    interface LoginDaten {

        EMail: string;
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
        console.log("test123");
        let adresse: url.UrlWithParsedQuery = url.parse(_request.url, true);
        let urlpath: string | null = adresse.pathname;

        let daten: Daten = adresse.query;


        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        // let daten: Daten = querystring.parse(body);
        //Alle User abfragen
        if (urlpath == "//benutzerliste") {
            _response.write(await namenAbrufen());
            _response.end();
        }
        //Login
        else if (urlpath == "//login") {
            _response.write(await login(daten));
            _response.end();

        }
        //Registrierung
        else if (urlpath == "//index") {

            _response.write(registrierung(await alleAbrufen(), daten));
            _response.end();
        }






    }

    async function login(daten1: Daten): Promise<string> {
        let alleDaten: AlleDaten[] = await daten.find().toArray();

        let datenObjekt: LoginDaten = JSON.parse(JSON.stringify(daten1));

        if (alleDaten.length > 0) {

            for (let i: number = 0; i < alleDaten.length; i++) {

                if (alleDaten[i].EMail == datenObjekt.EMail && (alleDaten[i].Password == datenObjekt.Password)) { return "Erfolgreich angemeldet."; }

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

    function registrierung(alleDaten: AlleDaten[], storeDaten: Daten): string {
        // let alleDaten1: AlleDaten[] = await daten.find().toArray();
        let daten1: string = JSON.stringify(storeDaten);
        let datenObjekt: AlleDaten = JSON.parse(daten1);



        if (alleDaten.length > 0) {

            for (let x: number = 0; x < alleDaten.length; x++) {

                if (alleDaten[x].EMail == datenObjekt.EMail) { return "email ist schon in datenbank"; }

            }

        }

        daten.insertOne(storeDaten);
        return "erfolgreich registriert";
       // return alleDaten1[0].Bild;



    }







}