"use strict";
var Abgabe;
(function (Abgabe) {
    Abgabe.auswahl = {
        oben: undefined,
        mitte: undefined,
        unten: undefined
    };
    communicate("./data.json");
    async function communicate(_url) {
        let response = await fetch(_url);
        let speicher = JSON.parse(JSON.stringify(await response.json()));
        if (window.location.href.match("./kopf.html")) {
            speicher.koepfe.forEach(kopf => {
                let imgi1 = document.createElement("img");
                imgi1.src = kopf.link;
                imgi1.addEventListener("click", function () {
                    Abgabe.auswahl.oben = kopf.link;
                    localStorage.setItem("auswahlOben", Abgabe.auswahl.oben);
                    location.href = "./rumpf.html";
                });
                document.body.appendChild(imgi1);
            });
        }
        if (window.location.href.match("./rumpf.html")) {
            let imgi4 = document.createElement("img");
            imgi4.src = localStorage.getItem("auswahlOben");
            imgi4.height = 58;
            imgi4.width = 231;
            document.body.appendChild(imgi4);
            speicher.ruempfe.forEach(rumpf => {
                let imgi2 = document.createElement("img");
                imgi2.src = rumpf.link;
                imgi2.addEventListener("click", function () {
                    console.log("hallo");
                    Abgabe.auswahl.mitte = rumpf.link;
                    localStorage.setItem("auswahlMitte", Abgabe.auswahl.mitte);
                    location.href = "./beine.html";
                });
                document.body.appendChild(imgi2);
            });
        }
        if (window.location.href.match("./beine.html")) {
            let imgi4 = document.createElement("img");
            imgi4.src = localStorage.getItem("auswahlOben");
            imgi4.height = 58;
            imgi4.width = 231;
            document.body.appendChild(imgi4);
            let imgi5 = document.createElement("img");
            imgi5.src = localStorage.getItem("auswahlMitte");
            imgi5.height = 85;
            imgi5.width = 231;
            document.body.appendChild(imgi5);
            speicher.beine.forEach(beine => {
                let imgi3 = document.createElement("img");
                imgi3.src = beine.link;
                imgi3.addEventListener("click", function () {
                    Abgabe.auswahl.unten = beine.link;
                    localStorage.setItem("auswahlUnten", Abgabe.auswahl.unten);
                    location.href = "./ergebnis.html";
                });
                document.body.appendChild(imgi3);
            });
        }
        if (window.location.href.match("./ergebnis.html")) {
            schicken("https://gis-communication.herokuapp.com/");
            async function schicken(_url) {
                let query = new URLSearchParams(localStorage);
                _url = _url + "?" + query.toString();
                await fetch(_url);
                empfangen(_url);
                async function empfangen(_url) {
                    let response = await fetch(_url);
                    let antwort = JSON.parse(JSON.stringify(await response.json()));
                    console.log(antwort);
                    if (antwort.message == undefined) {
                        let ausgabe = document.createElement("div");
                        ausgabe.innerText = antwort.error;
                        document.body.appendChild(ausgabe);
                    }
                    if (antwort.message != undefined) {
                        let ausgabe = document.createElement("div");
                        ausgabe.innerText = antwort.message;
                        document.body.appendChild(ausgabe);
                    }
                    let imgi4 = document.createElement("img");
                    imgi4.src = localStorage.getItem("auswahlOben");
                    document.body.appendChild(imgi4);
                    let imgi5 = document.createElement("img");
                    imgi5.src = localStorage.getItem("auswahlMitte");
                    document.body.appendChild(imgi5);
                    let imgi6 = document.createElement("img");
                    imgi6.src = localStorage.getItem("auswahlUnten");
                    document.body.appendChild(imgi6);
                }
            }
        }
    }
})(Abgabe || (Abgabe = {}));
//# sourceMappingURL=script.js.map