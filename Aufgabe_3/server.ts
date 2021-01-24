import * as Http from "http";
import * as querystring from "querystring";
import * as Mongo from "mongodb";

export namespace P_3_1Server {

  interface Daten {

    [type: string]: string | string[];

  }


  interface AlleDaten {
    _id: string;
    Fname: string;
    Sname: string;
    EMail: string;
    Password: string;
    City: string;
  }

  interface LoginDaten {

    EMail: string;
    Password: string;

  }


  let daten: Mongo.Collection;


  let port: number = Number(process.env.PORT);
  if (!port)
    port = 8100;

  let pfadDatenbank: string = "mongodb+srv://babo:passwort@ermir.jqdwu.mongodb.net/Daten?retryWrites=true&w=majority"; //mongodb+srv://<username>:<password>@ermir.jqdwu.mongodb.net/<dbname>?retryWrites=true&w=majority;


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

    daten = mongoClient.db("Daten").collection("Collection");
  }


  function handleListen(): void {
    console.log("Listening");
  }


  function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {

    if (_request.method == "POST") {
      //    console.log("fehlermeldung");
      //    else {
      let body: string = "";
      _request.on("data", data => {
        body += data.toString();
        //   }
      });



      _request.on("end", async () => {



        let daten: Daten = querystring.parse(body);
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

  async function login(daten1: Daten): Promise<string> {
    let alleDaten: AlleDaten[] = await daten.find().toArray();



    let datenObjekt: LoginDaten = JSON.parse(JSON.stringify(daten1));

    if (alleDaten.length > 0) {

      for (let i: number = 0; i < alleDaten.length; i++) {

        if (alleDaten[i].EMail == datenObjekt.EMail && (alleDaten[i].Password == datenObjekt.Password)) { return "Erfolgreich angemeldet. Willkommen zurück "; }

      }

    }

    return "Die Kombination aus Email und Passwort ist leider nicht in unserer Datenbank. Versuchen Sie es bitte erneut.";
  }
  async function alleAbrufen(): Promise<AlleDaten[]> {
    let alleDaten: AlleDaten[] = await daten.find().toArray();

    return alleDaten;
  }



  async function namenAbrufen(): Promise<string> {
    let alleDaten: AlleDaten[] = await daten.find().toArray();
    let alleNamen: string = "";
    let zahl: number = 1;

    if (alleDaten.length < 1) { return "Momentan befindet sich noch kein registrierter Nutzer in unserer Datenbank  "; }

    for (let x: number = 0; x < alleDaten.length; x++) {
      alleNamen = alleNamen + zahl + ". " + alleDaten[x].Fname + " " + alleDaten[x].Sname + ", ";
      zahl++;
    }

    return alleNamen;
  }

  
  function registrierung(alleDaten: AlleDaten[], storeDaten: Daten): string {

    let daten1: string = JSON.stringify(storeDaten);
    let datenObjekt: AlleDaten = JSON.parse(daten1);



    if (alleDaten.length > 0) {

      for (let x: number = 0; x < alleDaten.length; x++) {

        if (alleDaten[x].EMail == datenObjekt.EMail) { return "Die benutze Email befindet sich bereits in unserer Datenbank. Loggen Sie sich ein oder registrieren Sie sich mit einer anderen."; }

      }

    }
    daten.insertOne(storeDaten);
   // storeData(storeDaten);
    return "Ihre Daten wurden erfolgreich gespeichert";



  }


 // function storeData(_daten: Daten): void {
  //  daten.insertOne(_daten);
  //}









}