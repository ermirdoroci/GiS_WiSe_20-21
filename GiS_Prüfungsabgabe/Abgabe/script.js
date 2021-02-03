"use strict";
var Modulprüfung;
(function (Modulprüfung) {
    // if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html" || window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "login.html") {
    let submit = document.getElementById("submit");
    let form = document.getElementById("form");
    let antwort = document.getElementById("antwort");
    //submit.addEventListener("click", function (): void { send(); });
    bilder();
    async function bilder() {
        let _url = "http://localhost:8100/";
        // let _url: string = "https://ermir-gis.herokuapp.com/";
        _url = _url + "/index";
        let response = await fetch(_url);
        let data = await response.text();
        let speicher = JSON.parse(data);
        console.log(speicher.length);
        data = JSON.stringify(speicher);
        antwort.innerText = data;
        speicher.forEach(pic => {
            let imgi1 = document.createElement("img");
            imgi1.src = pic.Bild;
            document.body.appendChild(imgi1);
        });
    }
    async function send() {
        let _url = "http://localhost:8100/";
        // let _url: string = "https://ermir-gis.herokuapp.com/";
        let formdata = new FormData(form);
        let query = new URLSearchParams(formdata);
        // let speicher: Speicher = JSON.parse(JSON.stringify(await response.json()));
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html") {
            _url = _url + "/index";
        }
        else {
            _url = _url + "/login";
        }
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        //   ;
        let data = await response.text();
        //antwort.innerText = data;
        //  let response: Response = await fetch(_url);
        //  let data: string = await response.text();
    }
    // await fetch();
    // }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "benutzerliste.html") {
        let submit = document.getElementById("submit");
        let antwort = document.getElementById("antwort");
        submit.addEventListener("click", send);
        async function send() {
            console.log("2");
            let _url = "http://localhost:8100/";
            // let _url: string = "https://ermir-gis.herokuapp.com/";
            antwort.innerText = "";
            _url = _url + "/benutzerliste";
            let response = await fetch(_url);
            let data = await response.text();
            antwort.innerText = data;
        }
    }
})(Modulprüfung || (Modulprüfung = {}));
//# sourceMappingURL=script.js.map