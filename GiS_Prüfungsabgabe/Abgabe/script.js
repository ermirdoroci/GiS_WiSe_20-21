"use strict";
var Abgabe_3;
(function (Abgabe_3) {
    //Registrierung und Login
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html" || window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "login.html") {
        let submit = document.getElementById("submit");
        let form = document.getElementById("form");
        let antwort = document.getElementById("antwort");
        submit.addEventListener("click", function () { send(); });
        async function send() {
            let _url = "https://ermir-abgabe.herokuapp.com/";
            let formdata = new FormData(form);
            let query = new URLSearchParams(formdata);
            if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html") {
                _url = _url + "/index";
            }
            else {
                _url = _url + "/login";
            }
            _url = _url + "?" + query.toString();
            let response = await fetch(_url);
            let data = await response.text();
            antwort.innerText = data;
            console.log(data);
        }
    }
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "benutzerliste.html") {
        let submit = document.getElementById("submit");
        let antwort = document.getElementById("antwort");
        submit.addEventListener("click", send);
        async function send() {
            let _url = "https://ermir-abgabe.herokuapp.com/";
            antwort.innerText = "";
            _url = _url + "/benutzerliste";
            let response = await fetch(_url);
            let data = await response.text();
            antwort.innerText = data;
        }
    }
})(Abgabe_3 || (Abgabe_3 = {}));
//# sourceMappingURL=script.js.map