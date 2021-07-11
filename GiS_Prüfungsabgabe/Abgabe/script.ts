namespace Modulprüfung {

  export interface Speicher {
    Bild: string;
    Nr: number;
  }

  if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "spiel.html") {

    spielen();
    async function spielen(): Promise<void> {
      let sekunden: number = 1;
      let _url: string = "https://ermir-test.herokuapp.com/";
      let response: Response = await fetch(_url);
      let data: string = await response.text();
      let timer: HTMLElement = document.getElementById("counter");
      let speicher: Speicher[] = JSON.parse(data);
      let eineAufgedeckt: boolean = false;
      let ersteKarte: string;
      let zweiteKarte: string;
      let erste: HTMLImageElement;
      let zweite: HTMLImageElement;
      let mischen: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
      let matchCounter: number = 0;

      for (let i: number = 0; i < 60; i++) {
        timen();
      }
      function timen(): void {
        window.setInterval(() => {
          timer.innerHTML = Math.round((sekunden / 60)).toString();
          sekunden++;
        }, 1000);
      }

      //    mischen.sort( () => .5 - Math.random() );
      for (let y: number = 0; y < 2; y++) {
        //   mischen.sort( () => .5 - Math.random() );
        for (let x: number = 0; x < speicher.length - 1; x++) {

          let aufgedeckt: HTMLImageElement = document.createElement("img");
          let verdeckt: HTMLImageElement = document.createElement("img");

          aufgedeckt.src = speicher[mischen[x]].Bild;
          verdeckt.src = speicher[8].Bild;
          document.getElementById("spiel").appendChild(verdeckt);
          verdeckt.addEventListener("click", function (): void {

            verdeckt.src = aufgedeckt.src;
            if (!eineAufgedeckt) {
              eineAufgedeckt = true;
              ersteKarte = aufgedeckt.src;
              verdeckt.style.display = "";
              erste = verdeckt;
            } else {
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
                let ergebnis: string = (sekunden / 60).toString();
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
    let score: HTMLElement = document.getElementById("deinscore");
    score.innerText = "Dein Ergebnis:" + localStorage.getItem("score") + " Sekunden!";
    let submit2: HTMLElement = document.getElementById("submit2");

    submit2.addEventListener("click", deinScore);
    function deinScore(): void {

      let formData: FormData = new FormData(document.forms[0]);
      localStorage.setItem("name", formData.get("name").toString());
      submit_highscore();

    }

    async function submit_highscore(): Promise<void> {


      let _url: string = "https://ermir-test.herokuapp.com/highscore" + "?" + "name=" + localStorage.getItem("name") + "&" + "score=" + localStorage.getItem("score");
      let response: Response = await fetch(_url);
      let data: string = await response.text();

      if (data == "saved") {
        location.href = "./highscore.html";
      }
    }


  }
}

interface Highscore {

  name: string;
  highscore: string;

}

if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "highscore.html") {

  get_highscore();
  async function get_highscore(): Promise<void> {

    let _url: string = "https://ermir-test.herokuapp.com/gethighscore";
    let response: Response = await fetch(_url);
    let text: string = await response.text();
    let data: Highscore[] = JSON.parse(text);
    let i: number = 1;
    let antwort: HTMLElement = document.getElementById("antwort");
    for (let x: number = 0; x < 10; x++) {

      antwort.innerHTML += i + ". " + "Name: " + data[i].name + " Deine Zeit: " + data[i].highscore + " Sekunden" + "<br>" + "<br>";
      i++;
    }
  }


}
if (window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) == "admin.html") {



  let submit: HTMLElement = document.getElementById("submitsave");
  let submit1: HTMLElement = document.getElementById("submit1");

  submit1.addEventListener("click", function (): void {
    loeschen();
  });
  submit.addEventListener("click", function (): void {
    hinzufuegen();
  });
  let ausgewählt: string = "";

  admin();
  async function admin(): Promise<void> {


    let _url: string = "https://ermir-test.herokuapp.com/";

    let response: Response = await fetch(_url);

    let data: string = await response.text();
    let speicher: any[] = JSON.parse(data);

    for (let i: number = 0; i < speicher.length; i++) {


      let bildersammlung: HTMLParagraphElement = document.createElement("p");
      bildersammlung.innerHTML = speicher[i].Bild;
      document.body.appendChild(bildersammlung);
      bildersammlung.addEventListener("click", function (): void {
        ausgewählt = bildersammlung.innerText;
      });
    }

  }
  async function loeschen(): Promise<void> {

    let antwort: HTMLElement = document.getElementById("antwort");

    let _url: string = "https://ermir-test.herokuapp.com/loeschen" + "?" + "name=" + ausgewählt;
    let response: Response = await fetch(_url);
    let text: string = await response.text();


    antwort.innerText = text;

  }

  async function hinzufuegen(): Promise<void> {

    let form: HTMLFormElement = <HTMLFormElement>document.getElementById("name");
    let formData: FormData = new FormData(form);

    let antwort: HTMLElement = document.getElementById("antwort");

    let _url: string = "https://ermir-test.herokuapp.com/hinzufuegen" + "?" + "name=" + formData.get("name").toString();
    let response: Response = await fetch(_url);
    let text: string = await response.text();
    antwort.innerText = text;


  }


}
