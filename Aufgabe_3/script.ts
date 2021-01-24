
namespace Abgabe3 {





    //Registrierung und Login
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html" || window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "registrierung.html") {
      
      let submit: HTMLElement = document.getElementById("submit");
      let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
      let antwort: HTMLElement = document.getElementById("antwort");
  
      if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html") {
        submit.addEventListener("click", function (): void { checkForm(4); });
      }
      else { submit.addEventListener("click", function (): void { checkForm(2); }); }
  
  
      function checkForm(_formSize: number): void {
        let formdata: FormData = new FormData(form);
        let formstring: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);
        let x: number = 0;
        antwort.innerText = "";
  
        for (let entry of formstring.values()) {
          if (entry != "") { x++; }
        }
  
        if (x < _formSize) { antwort.innerText = "Bitte füllen Sie das Formular vollständig aus"; }
        else { send(); }
      }
  
      async function send(): Promise<void> {
  
        let formdata: FormData = new FormData(form);
        let formstring: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);
  
  
  
        //Senden und fetchen der Antwort
        
        let response: Response = await fetch("https://nameless-plateau-49705.herokuapp.com/", {
          method: "POST",
  
          body: formstring
        });
  
        let data: string = await response.text();
  
        antwort.innerText = data;
  
        
      
  
      }
  
    }
  
    //Alle User abfragen
    if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "benutzerliste.html") {
  
  
      let submit: HTMLElement = document.getElementById("submit");
      let antwort: HTMLElement = document.getElementById("antwort");
      submit.addEventListener("click", send);
  
  
  
      async function send(): Promise<void> {
  
        antwort.innerText = "";
        //Senden und fetchen der Antwort
  
        let response: Response = await fetch("https://nameless-plateau-49705.herokuapp.com/", {
          method: "POST"
  
        });
  
        let data: string = await response.text();
  
        antwort.innerText = data.slice(0, -2) + ".";
          
      }
  
    }
  
  }