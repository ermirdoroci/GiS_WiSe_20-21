namespace Modulprüfung {

  export interface Speicher {
    _id: string;
    Name: string;
    Beschreibung: string;
    Bild: string;
    Nr: number;
    Status: string;
  }

  interface Auswahl {
    entschei: Array<string>;
  }

  export let auswahl: Auswahl = {
    entschei: []

  };
  export interface Anzeige {
    datis: [{ _id: string, Name: string, Beschreibung: string, Bild: string, Ausleihgebühr: string }];
  }


  let cartFilled: number = 0;
  let nam: Array<string> = [];
  let besch: Array<string> = [];
  let bil: Array<string> = [];
  let ausl: Array<number> = [];
  let stat: Array<string> = [];
  let einer: HTMLCollectionOf<HTMLImageElement> = <HTMLCollectionOf<HTMLImageElement>>document.getElementsByTagName("img");
  let aufgedeckt: HTMLImageElement = document.createElement("img");
  let zaehler: number = parseInt(aufgedeckt.getAttribute("data-entryCount"));

  if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "index.html") {
    let checkFormResponse: HTMLElement = document.getElementById("checkformresponse");

    let formString: URLSearchParams = new URLSearchParams(sessionStorage.getItem("data"));

    let submit: HTMLElement = document.getElementById("submit");
    let submit1: HTMLElement = document.getElementById("submit1");
    let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    let formdata: FormData = new FormData(form);
    let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);

    submit1.addEventListener("click", function (): void {
      sessionStorage.clear();
      console.log("wird alles gelöscht");





    }
    );
    datenerhebung();
    async function datenerhebung(): Promise<void> {

      let _url: string = "http://localhost:8100/index";
      console.log("huh1");
      let response: Response = await fetch(_url);
      console.log("huhu");
      let data: string = await response.text();

      let speicher: Speicher[] = JSON.parse(data);
      let div1: HTMLDivElement;
      let eineAufgedeckt: boolean = false;
      let match: boolean = false;
      let ersteKarte: string;
      let zweiteKarte: string;

      for (let x: number = 0; x < 2; x++)
        for (let x: number = 0; x < speicher.length - 1; x++) {
          let aufgedeckt: HTMLImageElement = document.createElement("img");
          let verdeckt: HTMLImageElement = document.createElement("img");
          aufgedeckt.src = speicher[x].Bild;
          verdeckt.src = speicher[8].Bild;
          document.getElementById("spiel").appendChild(verdeckt);
          verdeckt.addEventListener("click", function (): void {

            verdeckt.src = aufgedeckt.src;
            if (!eineAufgedeckt) {
              eineAufgedeckt = true;
              ersteKarte = aufgedeckt.src;
              verdeckt.style.display = "";
            } else {
              eineAufgedeckt = false;
              zweiteKarte = aufgedeckt.src;
              verdeckt.style.display = "";
            }
            if (ersteKarte == zweiteKarte && zweiteKarte != null) {
              match = true;
              console.log(aufgedeckt);
              setTimeout(() => {
                verdeckt.style.display = "none";
              }, 3000);
            }
            if (ersteKarte != zweiteKarte && zweiteKarte != null) {
              match = false;
              setTimeout(() => {
                verdeckt.src = speicher[8].Bild;
              }, 3000);
            }
            if (ersteKarte != null && zweiteKarte != null) {
              ersteKarte = null;
              zweiteKarte = null;

            }

          });
        }
      /*   function markierenUndSpeichern(_speicher: Speicher[], _aufgedeckt: HTMLImageElement): void {
    
           console.log(parseInt(_aufgedeckt.getAttribute("data-entryCount")));
           let zaehler: number = parseInt(_aufgedeckt.getAttribute("data-entryCount"));
           let dats: string = "dataEntry" + zaehler.toString();
           // console.log(sessionStorage.getItem("data"));
           if (sessionStorage.getItem(dats) != null)
             sessionStorage.removeItem(dats);
   
           else sessionStorage.setItem(dats, JSON.stringify(_speicher[zaehler]));
   
           submit.addEventListener("click", function (): void {
   
   
             location.href = "./bestaetigung.html";
           });
   
         }
       }
     }
     if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "bestaetigung.html") {
       // function send(dats: string): void {
       console.log("halololo");
   
   
       let _url: string = "http://localhost:bestaetigung";
       console.log("huhuhuhhuu");
       let speicher: Speicher[] = [];
       for (let value in sessionStorage) {
         if (value.includes("dataEntry")) {
   
           sessionStorage.getItem(value);
           speicher.push(JSON.parse(sessionStorage.getItem(value)));
         }
       }
       console.log(speicher);
       //    console.log(JSON.parse(dats));
       console.log("hahahaha");
       bil.forEach(e => {
         aufgedeckt.src = e;
       });
   
       location.href = "./erfolgreich.html";
       if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "erfolgreich.html") {
         let h2: HTMLParagraphElement = document.createElement("p");
         h2.innerText = "Artikel erfolgreich geliehen";
         document.body.appendChild(h2);
   */



      // console.log(parseInt(_aufgedeckt.getAttribute("data-entryCount")));
      // console.log(zaehler);
      // console.log(_speicher[zaehler]);
      // cartFilled++;
      // let bildpfad: string = _aufgedeckt.src;
      // console.log(bildpfad);




      // if (cartFilled == 0) { console.log(cartFilled + "Es befinden sich keine Artikel in Ihrer Auswahl"); } //Etwas ausgewählt?

      //Daten in SessionStorage

      // let aufgedeckt: HTMLImageElement = document.createElement("img");
      //   let formString: URLSearchParams = new URLSearchParams();
      //   for (let i: number = 0; i < _speicher.length; i++) {

      //     _aufgedeckt.addEventListener("click", function (): void {
      //       // aufgedeckt.src = _speicher[i].Bild;
      //       console.log(formString.toString());
      //       console.log("test hier");
      //       JSON.stringify(_speicher[i].Bild);
      //       sessionStorage.setItem("data", "1");
      //       sessionStorage.setItem("data", "2");
      //       // sessionStorage.setItem("data", formString.toString());


    }
  }






  // aufgedeckt.addEventListener("click", function (): void { checkForm(2, formString); });



  // function checkForm(_formSize: number, _formString: URLSearchParams): void {

  //   let formFilled: number = 0;
  //   let checkMail: number = 0;

  //   let formValues: FormData = new FormData(form);



  //   for (let entry of formValues.values()) {
  //     if (entry != "") { formFilled++; } //Alle felder ausgefüllt?
  //     if (entry.toString().includes("@")) { checkMail++; } //Email auf @ überprüfen




  //   if (formFilled < _formSize) { checkFormResponse.innerText = "Bitte füllen Sie das Formular vollständig aus"; }
  //   else if (checkMail != 1) { checkFormResponse.innerText = "Bitte verwenden Sie eine echte Email"; }
  //   else { send(_formString); }


  // }
  // async function send(_data: URLSearchParams): Promise<void> {
  //   let aufgedeckt: HTMLImageElement = document.createElement("img");
  //   let formData: FormData = new FormData(form);
  //   let formString: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
  //   formString.append("_id", "user");

  //   for (let entry of _data.values()) {

  //     formString.append("_id", entry);





  //   let response: Response = await fetch(_url);
  //   let data: string = await response.text();
  //   let speicher: Speicher[] = JSON.parse(data);
  //   valu.length = angeklickt.length;

  //   valu.length++;
  //   speicher.length++;
  //   //  let x: number = 0;
  //   angeklickt.length = 0;
  //   arr.length = speicher.length;


  //   for (let i: number = 0; i < arr.length; i++) {
  //     console.log(valu);

  //     console.log(zaehler[i]);



  //     aufgedeckt.setAttribute("style", "-webkit-filter: drop-shadow(5px 5px 20px #03b670");
  //     console.log("geht das überhaupt");

  //     zaehler[i] = true;
  //     angeklickt.length++;
  //     break;



  // function schicken(): void {

  //   let submit: HTMLElement = document.getElementById("submit");

  //   let antwort: HTMLElement = document.getElementById("antwort");


  //   submit.addEventListener("click", send);



}
