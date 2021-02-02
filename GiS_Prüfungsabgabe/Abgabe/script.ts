namespace Abgabe_3 {





  //Registrierung und Login
  if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html" || window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "login.html") {

    let submit: HTMLElement = document.getElementById("submit");
    let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    let antwort: HTMLElement = document.getElementById("antwort");

    submit.addEventListener("click", function (): void { send(); });



    async function send(): Promise<void> {

      let _url: string = "https://ermir-abgabe.herokuapp.com/";

      let formdata: FormData = new FormData(form);
      let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);


      if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html") {
        _url = _url + "/index";
      }
      else { _url = _url + "/login"; }

      _url = _url + "?" + query.toString();

      let response: Response = await fetch(_url);

      let data: string = await response.text();

      antwort.innerText = data;
      console.log(data);
    }

  }


  if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "benutzerliste.html") {


    let submit: HTMLElement = document.getElementById("submit");
    let antwort: HTMLElement = document.getElementById("antwort");



    submit.addEventListener("click", send);



    async function send(): Promise<void> {

      let _url: string = "https://ermir-abgabe.herokuapp.com/";
      antwort.innerText = "";

      _url = _url + "/benutzerliste";

      let response: Response = await fetch(_url);

      let data: string = await response.text();

      antwort.innerText = data;

    }

  }

}