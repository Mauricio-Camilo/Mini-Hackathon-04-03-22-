
const API = "http://api.openweathermap.org/data/2.5/weather?";
const chave = "appid=056ac55ba477e7e036e90e45e4265f56";
let latitude = "";
let longitude = "";
let temperatura = "";
let umidade = "";
let pressao = "";
let climaPrincipal = "";
let climaDescrição = "";

function localizarManualmente () {
  mudarPagina();
   const latitude = document.querySelector(".latitude");
   const latitudeDigitada = latitude.value;
   console.log(latitudeDigitada);
   const longitude = document.querySelector(".latitude");
   const longitudeDigitada = longitude.value;
   console.log(longitudeDigitada);
   chamarGeoLocalizacao(latitudeDigitada,longitudeDigitada);
}

function buscarLocalizacao() {
    mudarPagina()
    console.log ("entrou na função")
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarPosicao);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function mostrarPosicao(position) {
   latitude = position.coords.latitude;
   longitude = position.coords.longitude;
   latitude = Math.trunc(latitude);
   longitude = Math.trunc(longitude);

   chamarGeoLocalizacao(latitude,longitude);
}

function chamarGeoLocalizacao (lat,lon) {

let promise = axios.get(`${API}lat=${lat}&lon=${lon}&${chave}`)
promise.then (pegarDadosServidor);
promise.catch (tratarErro);

}

function pegarDadosServidor (resposta) {
let dados = resposta.data.main
    // console.log ("deu muito bom");
    // console.log(dados);
    temperatura = (dados.temp-273).toFixed(2);
    umidade = dados.humidity;
    pressao = dados.pressure;
let clima = resposta.data.weather;
  console.log (clima);
    climaPrincipal = clima[0].main;
    climaDescrição = clima[0].description;
    console.log (climaPrincipal);
    console.log (climaDescrição);

    mostrarDadosnaTela ();
}

function tratarErro (erro) {
    console.log ("deu ruim");
}

function mudarPagina () {
  const paginaPrincipal = document.querySelector("main");
  paginaPrincipal.classList.add("escondido")
  // const paginaDados = document.querySelector(".pagina-dados");
  // paginaDados.classList.remove("escondido")
}

function mostrarDadosnaTela () {
  const paginaDados = document.querySelector(".pagina-dados")
  paginaDados.innerHTML = `
    <li class="parametro">Clima: ${climaPrincipal} </li>
    <li class="parametro">Descrição do clima: ${climaDescrição} </li>
    <li class="parametro">Temperatura: ${temperatura} ºC</li>
    <li class="parametro">Umidade: ${umidade} %</li>
    <li class="parametro">Pressao: ${pressao} hPa</li>
  `
}



