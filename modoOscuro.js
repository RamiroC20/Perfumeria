// CAPTURA DOM //
let btnToggle = document.getElementById("btnToggle")

// CICLO //
if(localStorage.getItem("modoOscuro")){
    
}else{
    localStorage.setItem("modoOscuro", false)
}

if(JSON.parse(localStorage.getItem("modoOscuro")) == true){
    document.body.classList.toggle("darkMode")
    btnToggle.innerText = "Modo claro"
}

// EVENTO //
btnToggle.addEventListener("click", () => {
    document.body.classList.toggle("darkMode")
    if(JSON.parse(localStorage.getItem("modoOscuro")) == false){
        btnToggle.innerText = "Modo claro"
        localStorage.setItem("modoOscuro", true)
    }
    else if(JSON.parse(localStorage.getItem("modoOscuro")) == true){
        btnToggle.innerText = "Modo Oscuro"
        localStorage.setItem("modoOscuro", false)
    }
})