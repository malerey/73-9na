// Agregar una operacion 

// Paso previo:
// Tener maquetada la tarjera de operaciones
// Tener maquetado el formulario de agregar operaciones 
// Existir las categorias para poder crear el select 

// Cuando el usuario rellena todos los campos del formulario y da click en "Agregar", 

//      Crear un objeto con esa info 
//      Acceder a cada uno de los elementos del formulario y leer su valor (value)
//      Crear un objeto nuevo donde cada propiedad sea el valor puesto por el usuario
//       Agregar el objeto a un array de operaciones en js
//       Convertir ese array a un json 
//       Guardar ese array en Local Storage 
//       Leer el local storage 
//       Convertirlo a JS 
//       Convertirlo a HTML 


// el js
// el local storage 

// const operaciones = []

// formularioNuevaOperacion.onsubmit = () => {
//   const descripcion = inputDescripcion.value 
//   const monto = inputMonto.value

//   const nuevoObjeto = {
//     monto: monto, 
//     tipo: "Ganancia", 
//     categoria: "Alimentos", 
//     fecha: new Date(), 
//     descripcion: descripcion
//   }

//   operaciones.push(nuevoObjeto)


// }


// se crea una nueva categoria
// se guarda en local storage 
// al momento de crear el select
// leo las categorias en Local storage
// y creo el select con esas categorias


const botonAgregarCategoria = document.querySelector("#agregar")
const inputAgregarCategoria = document.querySelector("#agregar-categoria")
const categorias = ["Alimentos", "Mascotas", "Sueldo", "Transporte"]

const obtenerCategorias = () => {
  const categoriasEnLocalStorage = localStorage.getItem("categorias")
  if (categoriasEnLocalStorage === null) {// no hay nada en local storage
    return categorias
  } 
  else { // hay algo en local storage
    return JSON.parse(categoriasEnLocalStorage)
  }
}

const agregarCategoriasAlSelect = () => {
  const categorias = obtenerCategorias()
  const select = document.querySelector("#categoria-select")

  const categoriasString = categorias.reduce((acc, elemento) => {
    return acc + `<option value="${elemento}">${elemento}</option>`
  }, "")
  
  select.innerHTML = categoriasString
}

const agregarCategoriasAHTML = () => {
  const categorias = obtenerCategorias()
  const lista = document.querySelector("#lista-categorias")

  const categoriasString = categorias.reduce((acc, elemento, index) => {
    return acc + `<div>${elemento} <button id="borrar-${index}" class="boton-borrar">Borrar</button></div>`
  }, "")
  
  lista.innerHTML = categoriasString
}



agregarCategoriasAlSelect()
agregarCategoriasAHTML()

botonAgregarCategoria.onclick = () => {
  const nuevaCategoria = inputAgregarCategoria.value
  const categorias = obtenerCategorias()
  categorias.push(nuevaCategoria)
  inputAgregarCategoria.value = ""

  const categoriasAJSON = JSON.stringify(categorias)
  localStorage.setItem("categorias", categoriasAJSON)
  
  agregarCategoriasAlSelect()
  agregarCategoriasAHTML()
}


const botonesBorrar = document.querySelectorAll(".boton-borrar")


for (let i = 0; i < botonesBorrar.length; i++) {
  botonesBorrar[i].onclick = () => {
    const id = botonesBorrar[i].id
    console.log(id)
    const indice = id.charAt(7)  // slice // split 
    const categoriasFiltradas = categorias.filter((elemento, index) => {
        return index != indice
      })

    console.log(categoriasFiltradas)
    // despues de esto, actualizar las categorias en local storage
  }
}
