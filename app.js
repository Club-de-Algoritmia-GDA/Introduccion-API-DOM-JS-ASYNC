// Arrow funciton

// let decirHola2 = () => {
//   console.log("====================================");
//   console.log("hola de arrow function");
//   console.log("====================================");
// };

// function decirHola(message) {
//   console.log(message);
// }

// console.log(1);
// console.log(2);
// setTimeout(() => {
//   console.log(3);
// }, 1000);
// console.log(4);

// const miPromesa = new Promise((reject, resolve) => {
//   let a = 1 + 2;
//   if (a === 2) {
//     resolve("tuvimos exito");
//   } else {
//     reject("hubo un error");
//   }
// });

// miPromesa
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Elementos html

const quotePlaceHolder = document.getElementById("quote");
const authorPlaceHolder = document.getElementById("author");
const buttonNextQuote = document.getElementById("new-quote");
const buttonTwitter = document.getElementById("twitter");

// Funcion que hace peticion al api y regresa una promesa
async function getQuote() {
  try {
    const apiURL = "https://programming-quotes-api.herokuapp.com/quotes/random";

    const response = await fetch(apiURL);
    return await response.json();
  } catch (error) {
    getQuote();
  }
}

// Cuando se da click
buttonNextQuote.addEventListener("click", () => {
  getQuote()
    .then((response) => {
      updateInterface(response);
    })
    .catch((error) => {
      console.log("====================================");
      console.log("hubo un error");
      console.log("====================================");
    });
});

// Cuando se quiere twittear
buttonTwitter.addEventListener("click", tweetQuote);

// Twittearla

function tweetQuote() {
  const quote = quotePlaceHolder.innerText;
  const author = authorPlaceHolder.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Cuando carga la pagina
document.addEventListener("DOMContentLoaded", () => {
  getQuote().then((response) => {
    updateInterface(response);
  });
});

// Funcion para actualizar el html
function updateInterface(data) {
  quotePlaceHolder.innerHTML = data.en;
  authorPlaceHolder.innerHTML = data.author;
}
