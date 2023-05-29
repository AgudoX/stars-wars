const baseUrl = 'https://swapi.dev/api'
const divFilmCharacter = document.getElementById('peliculaPersonajes')
const main = document.querySelector('main')
const h2peliculas = document.createElement('h2')
const ul = document.getElementById('menu')
const btnPrev = document.getElementById('btnPrev')
const btnNext = document.getElementById('btnNext')


async function obtenerPersonajes(url = `${baseUrl}/people/?format=json` /* si no le paso el valor de url coge el valor al que está igualado. */) {
    ul.innerHTML = ' '
    /* Borra los personajes de la página previo, sino lo borro se acumulan los personajes en el nav. */

    const response = await fetch(url);
    const json = await response.json();
    pintarPersonajes(json);

    btnNext.dataset.url = json.next;
    btnPrev.dataset.url = json.previous;

    if (!json.previous /* Esto significa si es nulo o undefined, cuando hay una string el hecho de que existe es true. */) {
        btnPrev.style.display = 'none'
    } else {
        btnPrev.style.display = 'block'
    }
    if (!json.next) {
        btnNext.style.display = 'none'
    } else {
        btnNext.style.display = 'block'
    }


}


function pintarPersonajes(datos) {

    for (let character of datos.results) {

        const li = document.createElement('li');
        li.innerText = character.name;
        li.dataset.url = character.url
        // IMPORTANTE: Esto captura la character.url y se la lleva al atributo del li llamado url. Este atributo no es natural de los li, pero con la propiedad dataset puedo crear un atributo que to quiera, en este caso se llama url, pero el nombre da igual.
        // Así sería el li <li url="el valor de character.url">


        // Agregamos evento de click, lo agregamos aquí dentro pq aún no está creado el elemento y es un evento que sin el elemento no tiene sentido
        li.addEventListener('click', pressCharacter);
        ul.appendChild(li);
    }
}

async function pressCharacter(event) {
    const response = await fetch(event.target.dataset.url);
    //dataset es un atributo para meter url en html
    const jsonCharacters = await response.json();


    printCharacter(jsonCharacters)
    printFilms(jsonCharacters.films)
}

const printCharacter = function (json) {
    const divInfoCharacter = document.getElementById('datosPersonaje')

    divInfoCharacter.innerHTML = ' '

    const article = document.createElement('article')
    const h2 = document.createElement('h2')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const p2 = document.createElement('p')
    const p3 = document.createElement('p')
    const p4 = document.createElement('p')
    const p5 = document.createElement('p')

    h2.innerText = json.name
    h3.innerHTML = '<strong>Gender: </strong>' + json.gender
    p.innerHTML = '<strong>Hair Color: </strong>' + json.hair_color
    p2.innerHTML = '<strong>Skin Color: </strong>' + json.skin_color
    p3.innerHTML = '<strong>Eyes Color: </strong>' + json.eye_color
    p4.innerHTML = '<strong>Birth Year: </strong>' + json.birth_year
    p5.innerHTML = '<strong>Weight: </strong>' + json.mass + 'kg'

    article.append(h2, h3, p, p2, p3, p4, p5);
    divInfoCharacter.appendChild(article);
}

const printFilms = async (films) => {
    divFilmCharacter.innerHTML = ' '
    h2peliculas.innerText = 'Character,s Films';
    main.append(h2peliculas, divFilmCharacter)
    for (let film of films) {
        const response = await fetch(film)
        const json = await response.json();
        //json son los datos de la pelicula;
        printFilm(json)
    }
}

const printFilm = function (json) {

    const article = document.createElement('article')
    const h2 = document.createElement('h2')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const p2 = document.createElement('p')


    h2.innerText = json.title
    h3.innerHTML = '<strong>Director: </strong>' + json.director
    p.innerHTML = '<strong>Release Date: </strong>' + json.release_date
    p2.innerHTML = '<strong>Producer: </strong>' + json.producer


    article.append(h2, h3, p, p2);
    divFilmCharacter.append(article);
}




