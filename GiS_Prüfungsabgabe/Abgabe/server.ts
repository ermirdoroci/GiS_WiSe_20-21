import * as Http from "http";
import * as Mongo from "mongodb";
import * as url from "url";

export namespace P_3_1Server {

    interface Daten {

        [type: string]: string | string[];

    }

    interface Artikel {
        Name: string;
        Bild: string;
    }

    let daten: Mongo.Collection;
    let highscore: Mongo.Collection;

    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    let pfadDatenbank: string = "mongodb+srv://babo:gis2021@ermir.jqdwu.mongodb.net/Daten?retryWrites=true&w=majority";

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
        highscore = mongoClient.db("Daten").collection("highscore");
    }
    function handleListen(): void {
        console.log("Listening");
    }
    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        if (_request.method == "GET") {

            let body: string = "";
            body = body;

            _request.on("data", data => {
                body += data;
            });

            _request.on("end", async () => {

                console.log("test123");
                let adresse: url.UrlWithParsedQuery = url.parse(_request.url, true);
                let urlpath: string | null = adresse.pathname;
                console.log(urlpath);
                let data: Daten = adresse.query;


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
    
    async function alleAbrufen(): Promise<Artikel[]> {
        let alleArtikel: Artikel[] = await daten.find().toArray();

        return alleArtikel;
    }
    async function bilder(alleArtikel: Artikel[]): Promise<String> {
        alleArtikel = await daten.find().toArray();
        let kiki: string = JSON.stringify(alleArtikel);
        
        return kiki;

    }
   
}

