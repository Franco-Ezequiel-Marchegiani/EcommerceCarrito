// *** Variables ***
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


// *** Listeners ***
cargarEventListeners();

function cargarEventListeners(){
     // Dispara cuando se presiona 'Agregar Carrito'
     cursos.addEventListener('click', comprarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al vaciar todo el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

     // Al cargar el documento, muestra el LocalStorage
     document.addEventListener('DOMContentLoaded', leerLocalStorage);
}



// *** Funciones ***


//Función que añade el curso al carrito
function comprarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito (selección para elegir el curso)
     if(e.target.classList.contains('agregar-carrito')){ 
          
          const curso = e.target.parentElement.parentElement;
          //Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
     };
}

// Lee los datos del curso (id, imagen, precio y titulo)

function leerDatosCurso(curso) {

     const infoCurso = {
          id: curso.querySelector('a').getAttribute('data-id'), 
          imagen: curso.querySelector('img').src,
          precio: curso.querySelector('.precio span').textContent,
          titulo: curso.querySelector('h4').textContent
          
     }

     insertarCarrito(infoCurso);
}

//Muestra el curso seleccionado en el carrito

function insertarCarrito(curso) {

     const row = document.createElement('tr');
     row.innerHTML = `
          <td>
               <img src="${curso.imagen}" width=100>
          </td>
          <td>${curso.titulo}</td>
          <td>${curso.precio}</td>
          <td>
          <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
          </td>
     `;
     listaCursos.appendChild(row);

     //Variable de guardar cursos en Local Storage
     guardarCursoLocalStorage(curso);
}


// Elimina el curso del carrito en el DOM

function eliminarCurso(e) {
     e.preventDefault();

     let curso,
         cursoId;
     if(e.target.classList.contains('borrar-curso') ){
          e.target.parentElement.parentElement.remove();
          curso = e.target.parentElement.parentElement;
          cursoId = curso.querySelector('a').getAttribute('data-id');

     }

      eliminarCursoLocalStorage(cursoId);
}


// Elimina los cursos del carrito en el DOM 
function vaciarCarrito() {

     /*Forma lenta, recomendable usar "while"
     //listaCursos.innerHTML = '';
     */
     // Forma rápida y recomendada
     while(listaCursos.firstChild){
          listaCursos.removeChild(listaCursos.firstChild);
          
     }
     

     //Vaciar local Storage
    vaciarLocalStorage();
    
    return false;
}


// Funcion almacena cursos del carrito en Local Storage

function guardarCursoLocalStorage(curso) {
     let cursos;

     // Toma el valor de un arreglo co ndatos de LS O vacío
     cursos = obtenerCursosLocalStorage();

     // El curso seleccionado se agrega al arreglo
     cursos.push(curso);     

     localStorage.setItem('cursos', JSON.stringify(cursos) );
}


// Comprueba que haya elementos en LocalStorage

function obtenerCursosLocalStorage() {
     let cursosLS;

     //Comprueba si hay algo en localStorage
     if(localStorage.getItem('cursos') === null) {
          cursosLS = [];
     } else {
          cursosLS = JSON.parse( localStorage.getItem('cursos') );
     }
     return cursosLS;
}


// Imprime los cursos de LocalStorage en el carrito

function leerLocalStorage() {
     let cursosLS;

     cursosLS = obtenerCursosLocalStorage();

     cursosLS.forEach(function(curso){
          //Construye el template (modelo)
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>
               <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          listaCursos.appendChild(row);          
     })
}


// Elimina el curso por el ID en local Storage

function eliminarCursoLocalStorage(curso) {
     let cursosLS;
     // Obtenemos el array de cursos

     cursosLS = obtenerCursosLocalStorage();

     // Se compara el ID del curso borrado con los del Local Storage (LS) 
     cursosLS.forEach(function(cursoLS, index){
          if(cursoLS.id === curso) {
               cursosLS.splice(index, 1);
          }
     });

     //Se añade el array actual al storage
     localStorage.setItem('cursos', JSON.stringify(cursosLS) );
}


// Elimina todos los cursos de Local Storage

function vaciarLocalStorage() {
     localStorage.clear();
}