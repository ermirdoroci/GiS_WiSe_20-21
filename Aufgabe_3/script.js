"use strict";
var Abgabe3;
(function (Abgabe3) {
    //Registrierung und Login
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html" || window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "registrierung.html") {
        let submit = document.getElementById("submit");
        let form = document.getElementById("form");
        let antwort = document.getElementById("antwort");
        if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html") {
            submit.addEventListener("click", function () { checkForm(4); });
        }
        else {
            submit.addEventListener("click", function () { checkForm(2); });
        }
        function checkForm(_formSize) {
            let formdata = new FormData(form);
            let formstring = new URLSearchParams(formdata);
            let x = 0;
            antwort.innerText = "";
            for (let entry of formstring.values()) {
                if (entry != "") {
                    x++;
                }
            }
            if (x < _formSize) {
                antwort.innerText = "Bitte füllen Sie das Formular vollständig aus";
            }
            else {
                send();
            }
        }
        async function send() {
            let formdata = new FormData(form);
            let formstring = new URLSearchParams(formdata);
            //Senden und fetchen der Antwort
            let response = await fetch("https://nameless-plateau-49705.herokuapp.com/", {
                method: "POST",
                body: formstring
            });
            let data = await response.text();
            antwort.innerText = data;
        }
    }
    //Alle User abfragen
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "benutzerliste.html") {
        let submit = document.getElementById("submit");
        let antwort = document.getElementById("antwort");
        submit.addEventListener("click", send);
        async function send() {
            antwort.innerText = "";
            //Senden und fetchen der Antwort
            let response = await fetch("https://nameless-plateau-49705.herokuapp.com/", {
                method: "POST"
            });
            let data = await response.text();
            antwort.innerText = data.slice(0, -2) + ".";
        }
    }
})(Abgabe3 || (Abgabe3 = {}));
//# sourceMappingURL=script.js.map