/* 
1- Recuperar todos los personajes de la primera página y mostrarlos en la barra de navegación.
2- Poder pulsar en los li de los personajes.
3- Cuando pulse en el personaje descargar de la API su información.
4- Toda la información del personaje, pintarla en el main de la página.
5- Descargamos los datos de las películas donde aparece el personaje.
6- Manejar el paginado del menu de personajes.

 */
obtenerPersonajes()
btnNext.addEventListener('click', pageChanger)
btnPrev.addEventListener('click', pageChanger)

function pageChanger(event) {
    obtenerPersonajes(event.target.dataset.url)
}