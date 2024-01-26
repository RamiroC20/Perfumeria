// CLASE CONSTRUCTORA //
class Perfume {
    constructor(nombre,marca,precio,imagen,genero,id){
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.imagen = imagen;
        this.genero = genero;
        this.id = id;
    }
}

// OBJETOS //
const perfume1 = new Perfume ("Sauvage","Dior",82000,"dior_sauvage.jpg","hombre",1)
const perfume2 = new Perfume ("Flower","Kenzo",74000,"kenzo_flower.webp","mujer",2)
const perfume3 = new Perfume ("Eros","Versace",94500,"versace_eros.jpg","hombre",3)
const perfume4 = new Perfume ("The icon","Antonio Banderas",18000,"antoniobanderas_theicon.jpg","hombre",4)
const perfume5 = new Perfume ("212 Vip Rose","Carolina Herrera",67000,"carolinaherrera_212viprose.jpg","mujer",5)
const perfume6 = new Perfume ("Legend","Police",35000,"police_legend.jpg","mujer",6)

// ARRAYS //
let catalogo =  []
catalogo.push(perfume1,perfume2,perfume3,perfume4,perfume5,perfume6)
let productosCarrito = JSON.parse(localStorage.getItem("carrito")) ?? []

// CAPTURA DOM //
let containerPerfumes = document.getElementById("perfumes")
let orden = document.getElementById("orden")
let buscador = document.getElementById("buscador")
let coincidenciasDOM = document.getElementById("coincidencias")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let precioTotal = document.getElementById("precioTotal")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")

// FUNCIONES //

function cargarProductosCarrito(array) {
    modalBodyCarrito.innerHTML = ""
    array.forEach( (productoCarrito) => {
        modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3 w-100" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
             <div class="card-body d-flex justify-content-between align-items-center">
                <div>
                <h4 class="card-title">${productoCarrito.nombre}</h4>
                <p class="card-text">${productoCarrito.marca}</p>
                <p class="card-text">$${productoCarrito.precio}</p> 
                </div> 

                <div>
                    <button class= "btn" id="botonEliminar${productoCarrito.id}"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg></button>
                </div> 

             </div>    
        </div>
        `
    })
    array.forEach(
        (productoCarrito) => {
            document.getElementById(`botonEliminar${productoCarrito.id}`).
            addEventListener("click",() => {
                let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
                cardProducto.remove()
                let posicion = array.indexOf(productoCarrito)
                array.splice(posicion,1)
                console.log(array)
                localStorage.setItem("carrito", JSON.stringify(array))
                calcularTotal(array)
            })
        }
    )

    calcularTotal(array)
}

function mostrarInfoCatalogo() {
    console.log(`El perfume fue creado por ${this.marca} su nombre es ${this.nombre} y su precio es de $ ${this.precio}`)
}

function exponerEnCatalogo() {
    console.log(this.nombre,this.marca,this.precio)
}

function mostrarCatalogoDOM(array){
    containerPerfumes.innerHTML = ""
    for(let perfume of array){
        
        let cardPerfume= document.createElement("div")
        cardPerfume.className = "col-3"
        cardPerfume.innerHTML = `
            <div id="${perfume.id}" class="card" >
            <img src="./img/${perfume.imagen}" alt="">
            <h3>${perfume.nombre}</h3>
            <h5>${perfume.marca}</h5>
            <h5>100ml</h5>
            <h5>${perfume.precio}</h5>
            <button id="agregarBtn${perfume.id}" class="colorprincipal w-100 rounded mb-2">Agregar al carrito</button>
            </div>`

        containerPerfumes.append(cardPerfume)
        let agregarBtn = document.getElementById(`agregarBtn${perfume.id}`)
        console.log(agregarBtn)
        agregarBtn.addEventListener("click", () => {
            agregarAlCarrito(perfume)
         })
    }
}


function agregarAlCarrito(elemento) {
    let perfumeAgregado = productosCarrito.find((perfume) => perfume.id == elemento.id)
    if(perfumeAgregado == undefined ) {
        productosCarrito.push(elemento)
        localStorage.setItem("carrito", JSON.stringify(productosCarrito))
        Toastify({
            text: "Se ha agregado un producto a tu carrito",
            duration: 3000
            }).showToast();
    } else {
        Toastify({
            text: "Este producto ya existe en tu carrito",
            duration: 3000
            }).showToast();
    }
}

function ordenarMayorMenor(array) {

    let mayorMenor = array.concat()
    mayorMenor.sort( (a,b) => b.precio - a.precio)
    mostrarCatalogoDOM(mayorMenor)
}   

function ordenarMenorMayor(array) {

    let menorMayor = array.concat()
    menorMayor.sort( (a,b) => a.precio - b.precio)
    mostrarCatalogoDOM(menorMayor)
}   

function ordenarAlfabeticamenteTitulo(array){

    let ordenadoAlf = array.concat()
    ordenadoAlf.sort(
        (a,b) => {
            if(a.nombre > b.nombre){
                return 1
            }
            if(a.nombre < b.nombre){
                return -1
            }
            return 0
        }
    )
    mostrarCatalogoDOM(ordenadoAlf)
}

function buscarPerfume(buscado,array) {
    let coincidencias = array.filter (
        (perfume) => { return perfume.marca.toLowerCase().includes(buscado.toLowerCase()) || perfume.nombre.toLowerCase().includes(buscado.toLowerCase()) }
    )

    coincidencias.length > 0 ? mostrarCatalogoDOM(coincidencias) : mostrarCatalogoDOM(catalogo)
}

function calcularTotal(array) {
    const total = array.reduce(
        (acumulador, elemento) => acumulador + elemento.precio ,
        0)
    total > 0 ? precioTotal.innerHTML = `<h5 class= "ms-3">El precio total es de ${total}</h5>` 
    : precioTotal.innerHTML = `<h5 class= "ms-3"> No hay productos en el carrito</h5>` 
    return total
}

function finalizarCompra(array) {
    let total = calcularTotal(array)
    Swal.fire({
        icon: 'success',
        title: 'Felicitaciones',
        text: 'Su compra se realizo correctamente!',
        footer: `Usted ha gastado $${total}`
      })

    productosCarrito = []
    localStorage.removeItem("carrito")
}

// EVENTOS //
orden.addEventListener("change",() => {
    switch(orden.value){
    case "1":
        ordenarMayorMenor(catalogo)
    break
    case "2":
        ordenarMenorMayor(catalogo)
    break
    case "3":
        ordenarAlfabeticamenteTitulo(catalogo)
    break
    default:
        mostarCatalogo(catalogo)
    break
    }
})

buscador.addEventListener("input", () => {
    buscarPerfume(buscador.value,catalogo)
})

botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosCarrito)
})

botonFinalizarCompra.addEventListener("click", () => {
    finalizarCompra(productosCarrito)
})


// CODIGO //

mostrarCatalogoDOM(catalogo)



