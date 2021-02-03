import * as Http from "http";
import * as Mongo from "mongodb";
import * as url from "url";

export namespace P_3_1Server {

    interface Daten {

        [type: string]: string | string[];

    }

    export interface Artikel {
        Name: string;
        Beschreibung: string;
        Bild: string;
        Ausleihgebühr: string;
    }


    interface AlleDaten {
        // Bild: string;
        _id: string;
        Fname: string;
        Sname: string;
        EMail: string;
        Password: string;
    }

    interface LoginDaten {
        Bild: string;
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

            _response.write(await bilder(await alleAbrufen()));
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
    async function alleAbrufen(): Promise<Artikel[]> {
        let alleArtikel: Artikel[] = await daten.find().toArray();

        return alleArtikel;
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
    // async function communicate(_url: RequestInfo): Promise<void> {
    //     let response: Response = await fetch(_url);
    //     // let speicher: Speicher = JSON.parse(JSON.stringify(await response.json()));




    // }
    async function bilder(alleArtikel: Artikel[]): Promise<String> {
        // let pics: Array<string> = [""];
        // export type MyItemList = [Artikel]
        alleArtikel = await daten.find().toArray();

        // let pics: Array<string> = type;
        // alleArtikel = JSON.parse(alleArtikel);
        // alleArtikel;
        console.log("was geeeeeht");

        let kiki: string = JSON.stringify(alleArtikel);
        console.log(kiki);
        // for (let x: number = 0; x < alleArtikel.length; x++) {
        //     pics[x] = alleArtikel[x].Bild;

        //     console.log(alleArtikel[6].Bild);
        //     // console.log(pics);
        //     // pics[0] = alleArtikel[6].Bild;
        // }
        // console.log("huhu");
        // console.log(pics[5]);
        // let x: number = 0;
        // if (x < 10) {
        // for (x = 0; x < 10; x++) { 
        
        //     // return pics;
        // }}
        // console.log(kiki);
        return kiki;
        // let alleArtikel = alle[];
    }
    // async function registrierung(alleDaten: AlleDaten[], storeDaten: Daten): Promise<string> {

    //     // let speicher: Artikel = JSON.parse(daten);
    //     let alleArtikel1: Artikel[] = await daten.find().toArray();
    //     // for (let x: number = 0; x < alleArtikel.length; x++) {
    //     // alleArtikel1.Artikelliste.forEach(element => {
    //     return "huhu";
    //     // });
    //     // bilder(alleArtikel);



    //     // }
    //     let alleDaten1: AlleDaten[] = await daten.find().toArray();
    //     let daten1: string = JSON.stringify(storeDaten);
    //     let datenObjekt: AlleDaten = JSON.parse(daten1);



    // // if (alleDaten.length > 0) {

    // for (let x: number = 0; x < alleDaten.length; x++) {
    //     // return alleDaten[6].Bild;
    //     // if (alleDaten[x].Bild == datenObjekt.EMail) { return "email ist schon in datenbank"; }

    //     // }

    //     //   #  }

    //     //    daten.insertOne(storeDaten);
    //     return "erfolgreich registriert";
    //     // for (let i: number; i < alleDaten.length; i++) {
    // return alleDaten1[6].Bild;
}




    // }







// }