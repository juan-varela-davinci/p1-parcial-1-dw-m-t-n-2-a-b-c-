let discos = []
let cantidadDiscos = 0

function Cargar() {

  let nombreDisco = validarString("Ingrese el nombre del disco")
  
  cantidadDiscos++

  let autorBandaDisco = validarString("Ingrese el autor o la banda del disco")


  let id = validacionEIngresoId()


  let pistas = []

  do {
    let pista = CargarPistas()
    pistas.push(pista)
  } while (confirm("Desea agregar otra pista?"))

  let disco = {
    nombre: nombreDisco,
    autorBanda: autorBandaDisco,
    codigoNumericoUnico: id,
    pistas: pistas
  }

  console.log(disco)
  discos.push(disco)

  disco.mostrar = function() {
    const infoDiscos = document.getElementById("info-discos") 

    let html = ''
    html = `
    <div class="discos-container">
      <div>
        <h3>Disco: ${this.nombre}</h3>
        <h4>Banda: ${this.autorBanda}</h4>
      </div>
      <ul class="pistas-container"> 
    `

    for(let pista of this.pistas){
      html += `
      <li>Nombre:${this.nombre}</li>
      <li>Duracion:${this.duracion} s</li>
      </br>
      `
    }

    html +=`
      </ul>
    </div>
    `
    infoDiscos.innerHTML += html
    
  }
  return cantidadDiscos
  
}



function Mostrar(){
  document.getElementById('info-discos').innerHTML='';
  document.getElementById('cantidadDiscos').innerHTML=`La cantidad de discos es de: ${cantidadDiscos}`

  for(let i in discos){
    discos[i].mostrar()
  }
}






function CargarPistas() {
  
  let nombrePista = validarString("Ingrese nombre de la pista")

  let duracionPermitida = false
  do{
    let duracionPista = validarNumber(`Ingrese la duracion de la pista ${nombrePista}`)
    if(duracionPista > 0 && duracionPista < 7200){
      duracionPermitida = true
      return {nombre: nombrePista, duracion:duracionPista}
    }else{
      alert('Vuelta a ingresar la duracion con valores mayores a 0 y menores a 7200')
    }
  }while(duracionPermitida === false)
}


function validacionEIngresoId() {
  let id;
  let repetido
  let idRangoApto

  do {
    repetido = false
    idRangoApto = false
    id = 0;
    id = validarNumber("Ingrese el codigo unico")

    if (id >= 1 && id <= 9999) {
      for (let i in discos) {
        if (discos[i].codigoNumericoUnico === id) {
          repetido = true;
        }
      }
      if (repetido) {
        alert('El ID ingresado ya existe. Intente nuevamente.');
      } else{
        return id
      }
    } else {
      alert(
        'El codigo numerico unico es menor a 1 o mayor a 9999, por favor, ingrese algun codigo que cumpla con los requisitos'
      );
      idRangoApto = true;
    }
  } while (repetido == true || idRangoApto == true);
}





function validarString(mensaje) {
  let string
  do {
    string = prompt(mensaje)
  } while (!isNaN(string) || string === null)
  return string
}

function validarNumber(mensaje) {
  let number
  do {
    number = parseInt(prompt(mensaje))
  } while (isNaN(number))
  return number
}