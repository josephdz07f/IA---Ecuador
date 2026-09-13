const comenzar = document.getElementById("comenzar");
const juego = document.getElementById("juego");

const pregunta = document.getElementById("pregunta");
const contador = document.getElementById("contador");

const botonSi = document.getElementById("si");
const botonNo = document.getElementById("no");

const resultado = document.getElementById("resultado");
const botones = document.querySelector(".botones");


let personajes = [];
let preguntas = [];
let candidatos = [];

let indice = 0;
async function cargarDatos() {

    const respuestaPersonajes = await fetch("personajes.json");
    personajes = await respuestaPersonajes.json();

    const respuestaPreguntas = await fetch("preguntas.json");
    preguntas = await respuestaPreguntas.json();

}
function mostrarPregunta() {

    pregunta.textContent = preguntas[indice].texto;

    contador.textContent =
        `Pregunta ${indice + 1} de ${preguntas.length}`;

}
function filtrarPersonajes(respuestaUsuario) {

    const preguntaActual = preguntas[indice];

    if (respuestaUsuario) {
        candidatos = candidatos.filter(personaje =>
            personaje[preguntaActual.atributo] === preguntaActual.valor
        );

    } else {
        candidatos = candidatos.filter(personaje =>
            personaje[preguntaActual.atributo] !== preguntaActual.valor
        );
    }

}
function mostrarResultado() {

    botones.style.display = "none";
    contador.style.display = "none";

    pregunta.textContent = "";

    resultado.style.display = "block";

    if (candidatos.length === 1) {

        const personaje = candidatos[0];

        resultado.innerHTML = `
            <h2>Creo que estás pensando en...</h2>

            <h1>${personaje.nombre}</h1>

            <p><strong>Profesión:</strong> ${personaje.profesion}</p>

            <p><strong>Categoría:</strong> ${personaje.categoria}</p>

            <p><strong>Provincia:</strong> ${personaje.provincia}</p>

            <p><strong>Región:</strong> ${personaje.region}</p>

            <p><strong>Nacimiento:</strong> ${personaje.nacimiento}</p>
        `;

    }

    else if (candidatos.length > 1) {

        resultado.innerHTML = `
            <h2>Todavía no estoy seguro.</h2>

            <p>Quedan ${candidatos.length} posibles personajes.</p>
        `;

    }

    else {

        resultado.innerHTML = `
            <h2>No encontré ningún personaje.</h2>

            <p>Intenta agregar más personajes o revisar las preguntas.</p>
        `;

    }

}
function revisarResultado() {

    if (candidatos.length === 1) {
        mostrarResultado();
        return true;

    }
    return false;
}
comenzar.addEventListener("click", async () => {

    await cargarDatos();

    candidatos = [...personajes];

    indice = 0;

    comenzar.style.display = "none";

    juego.style.display = "block";

    botones.style.display = "flex";

    contador.style.display = "block";

    resultado.style.display = "none";

    mostrarPregunta();

});
botonSi.addEventListener("click", () => {

    filtrarPersonajes(true);

    if (revisarResultado()) return;
    indice++;

    if (indice < preguntas.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
})
botonNo.addEventListener("click", () => {

    filtrarPersonajes(false);

    if (revisarResultado()) return;
    indice++;
    if (indice < preguntas.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
});