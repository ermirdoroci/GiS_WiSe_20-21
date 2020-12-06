namespace Abgabe {


    interface Auswahl {
        oben: string;
        mitte: string;
        unten: string;
    }

    interface Speicher {
        koepfe: [{ name: string, link: string }];
        ruempfe: [{ name: string, link: string }];
        beine: [{ name: string, link: string }];
    }
    export interface Bild {
        link: string;
    }
    interface ServerAntwort {

        message: string;
        error: string;
    }

    export let auswahl: Auswahl = {
        oben: undefined,
        mitte: undefined,
        unten: undefined
    };
    communicate("./data.json");
    async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        let speicher: Speicher = JSON.parse(JSON.stringify(await response.json()));




        if (window.location.href.match("./kopf.html")) {
            speicher.koepfe.forEach(kopf => {

                let imgi1: HTMLImageElement = document.createElement("img");
                imgi1.src = kopf.link;
                imgi1.addEventListener("click", function (): void {
                    auswahl.oben = kopf.link;
                    localStorage.setItem("auswahlOben", auswahl.oben);
                    location.href = "./rumpf.html";
                });
                document.body.appendChild(imgi1);


            });
        }
        if (window.location.href.match("./rumpf.html")) {
            let imgi4: HTMLImageElement = document.createElement("img");
            imgi4.src = localStorage.getItem("auswahlOben");
            imgi4.height = 58;
            imgi4.width = 231;
            document.body.appendChild(imgi4);

            speicher.ruempfe.forEach(rumpf => {

                let imgi2: HTMLImageElement = document.createElement("img");
                imgi2.src = rumpf.link;
                imgi2.addEventListener("click", function (): void {
                    console.log("hallo");
                    auswahl.mitte = rumpf.link;
                    localStorage.setItem("auswahlMitte", auswahl.mitte);
                    location.href = "./beine.html";
                });
                document.body.appendChild(imgi2);


            });
        }
        if (window.location.href.match("./beine.html")) {
            let imgi4: HTMLImageElement = document.createElement("img");
            imgi4.src = localStorage.getItem("auswahlOben");
            imgi4.height = 58;
            imgi4.width = 231;
            document.body.appendChild(imgi4);

            let imgi5: HTMLImageElement = document.createElement("img");
            imgi5.src = localStorage.getItem("auswahlMitte");
            imgi5.height = 85;
            imgi5.width = 231;
            document.body.appendChild(imgi5);
            
            speicher.beine.forEach(beine => {

                let imgi3: HTMLImageElement = document.createElement("img");
                imgi3.src = beine.link;
                imgi3.addEventListener("click", function (): void {
                    auswahl.unten = beine.link;
                    localStorage.setItem("auswahlUnten", auswahl.unten);
                    location.href = "./ergebnis.html";
                });
                document.body.appendChild(imgi3);


            });
        }
        if (window.location.href.match("./ergebnis.html")) {
            schicken("https://gis-communication.herokuapp.com/");

            async function schicken(_url: RequestInfo): Promise<void> {
                let query: URLSearchParams = new URLSearchParams(<any>localStorage);
                _url = _url + "?" + query.toString();
                await fetch(_url);
                empfangen(_url);
                async function empfangen(_url: RequestInfo): Promise<void> {
                    let response: Response = await fetch(_url);
                    let antwort: ServerAntwort = JSON.parse(JSON.stringify(await response.json()));
                    console.log(antwort);
                    if (antwort.message == undefined) {
                        let ausgabe: HTMLElement = document.createElement("div");
                        ausgabe.innerText = antwort.error;
                        document.body.appendChild(ausgabe);

                    }
                    if (antwort.message != undefined) {
                        let ausgabe: HTMLElement = document.createElement("div");
                        ausgabe.innerText = antwort.message;
                        document.body.appendChild(ausgabe);
                    }

                    let imgi4: HTMLImageElement = document.createElement("img");
                    imgi4.src = localStorage.getItem("auswahlOben");
                    document.body.appendChild(imgi4);

                    let imgi5: HTMLImageElement = document.createElement("img");
                    imgi5.src = localStorage.getItem("auswahlMitte");
                    document.body.appendChild(imgi5);

                    let imgi6: HTMLImageElement = document.createElement("img");
                    imgi6.src = localStorage.getItem("auswahlUnten");
                    document.body.appendChild(imgi6);
                }
            }

        }
    }
}
