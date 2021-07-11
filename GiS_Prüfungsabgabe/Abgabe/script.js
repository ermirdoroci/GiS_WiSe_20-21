"use strict";
var Modulprüfung;
(function (Modulprüfung) {
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "spiel.html") {
        spielen();
        async function spielen() {
            let sekunden = 1;
            let _url = "https://ermir-modul.herokuapp.com/";
            let response = await fetch(_url);
            let data = await response.text();
            let timer = document.getElementById("counter");
            let speicher = JSON.parse(data);
            let eineAufgedeckt = false;
            let ersteKarte;
            let zweiteKarte;
            let erste;
            let zweite;
            let mischen = [0, 1, 2, 3, 4, 5, 6, 7];
            let matchCounter = 0;
            for (let i = 0; i < 60; i++) {
                timen();
            }
            function timen() {
                window.setInterval(() => {
                    timer.innerHTML = Math.round((sekunden / 60)).toString();
                    sekunden++;
                }, 1000);
            }
            //    mischen.sort( () => .5 - Math.random() );
            for (let y = 0; y < 2; y++) {
                //   mischen.sort( () => .5 - Math.random() );
                for (let x = 0; x < speicher.length - 1; x++) {
                    let aufgedeckt = document.createElement("img");
                    let verdeckt = document.createElement("img");
                    aufgedeckt.src = speicher[mischen[x]].Bild;
                    verdeckt.src = speicher[8].Bild;
                    document.getElementById("spiel").appendChild(verdeckt);
                    verdeckt.addEventListener("click", function () {
                        verdeckt.src = aufgedeckt.src;
                        if (!eineAufgedeckt) {
                            eineAufgedeckt = true;
                            ersteKarte = aufgedeckt.src;
                            verdeckt.style.display = "";
                            erste = verdeckt;
                        }
                        else {
                            eineAufgedeckt = false;
                            zweiteKarte = aufgedeckt.src;
                            zweite = verdeckt;
                            verdeckt.style.display = "";
                        }
                        if (ersteKarte == zweiteKarte && zweiteKarte != null) {
                            matchCounter++;
                            setTimeout(() => {
                                erste.style.display = "none";
                                zweite.style.display = "none";
                            }, 1500);
                            if (matchCounter == 8) {
                                let ergebnis = (sekunden / 60).toString();
                                localStorage.setItem("score", (ergebnis));
                                location.href = "./deinHighscore.html";
                            }
                        }
                        if (ersteKarte != zweiteKarte && zweiteKarte != null) {
                            setTimeout(() => {
                                erste.src = speicher[8].Bild;
                                zweite.src = speicher[8].Bild;
                            }, 1500);
                        }
                        if (ersteKarte != null && zweiteKarte != null) {
                            ersteKarte = null;
                            zweiteKarte = null;
                        }
                    });
                }
            }
        }
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "deinHighscore.html") {
        let score = document.getElementById("deinscore");
        score.innerText = "Dein Ergebnis:" + localStorage.getItem("score") + " Sekunden!";
        let submit2 = document.getElementById("submit2");
        submit2.addEventListener("click", deinScore);
        function deinScore() {
            let formData = new FormData(document.forms[0]);
            localStorage.setItem("name", formData.get("name").toString());
            submit_highscore();
        }
        async function submit_highscore() {
            let _url = "https://ermir-modul.herokuapp.com/highscore" + "?" + "name=" + localStorage.getItem("name") + "&" + "score=" + localStorage.getItem("score");
            let response = await fetch(_url);
            let data = await response.text();
            if (data == "saved") {
                location.href = "./highscore.html";
            }
        }
    }
})(Modulprüfung || (Modulprüfung = {}));
if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "highscore.html") {
    get_highscore();
    async function get_highscore() {
        let _url = "https://ermir-modul.herokuapp.com/gethighscore";
        let response = await fetch(_url);
        let text = await response.text();
        let data = JSON.parse(text);
        let i = 1;
        let antwort = document.getElementById("antwort");
        for (let x = 0; x < 10; x++) {
            antwort.innerHTML += i + ". " + "Name: " + data[i].name + " Deine Zeit: " + data[i].highscore + " Sekunden" + "<br>" + "<br>";
            i++;
        }
    }
}
if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "admin.html") {
    let submit = document.getElementById("submitsave");
    let submit1 = document.getElementById("submit1");
    submit1.addEventListener("click", function () {
        loeschen();
    });
    submit.addEventListener("click", function () {
        hinzufuegen();
    });
    let ausgewählt = "";
    admin();
    async function admin() {
        let _url = "https://ermir-modul.herokuapp.com/";
        let response = await fetch(_url);
        let data = await response.text();
        let speicher = JSON.parse(data);
        for (let i = 0; i < speicher.length; i++) {
            let bildersammlung = document.createElement("p");
            bildersammlung.innerHTML = speicher[i].Bild;
            document.body.appendChild(bildersammlung);
            bildersammlung.addEventListener("click", function () {
                ausgewählt = bildersammlung.innerText;
            });
        }
    }
    async function loeschen() {
        let antwort = document.getElementById("antwort");
        let _url = "https://ermir-modul.herokuapp.com/loeschen" + "?" + "name=" + ausgewählt;
        let response = await fetch(_url);
        let text = await response.text();
        antwort.innerText = text;
    }
    async function hinzufuegen() {
        let form = document.getElementById("name");
        let formData = new FormData(form);
        let antwort = document.getElementById("antwort");
        let _url = "https://ermir-modul.herokuapp.com/hinzufuegen" + "?" + "name=" + formData.get("name").toString();
        let response = await fetch(_url);
        let text = await response.text();
        antwort.innerText = text;
    }
}
//# sourceMappingURL=script.js.map