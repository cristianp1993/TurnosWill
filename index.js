document.getElementById("btn-registrar-paciente").onclick = (event) => {
  document.getElementById("form-registro").style.display = "block";
  document.getElementById("form-turno").style.display = "none";
};

document.getElementById("btn-solicitar-turno").onclick = (event) => {
  document.getElementById("form-turno").style.display = "block";
  document.getElementById("form-registro").style.display = "none";
};

const btnRegistrar = document.querySelector("#btn-registrar");
const btnSolicitar = document.querySelector("#btn-solicitar");

btnRegistrar.addEventListener("click", () => {
  const nombres = document.querySelector("#nombres").value;
  const apellidos = document.querySelector("#apellidos").value;
  const cedula = document.querySelector("#cedula").value;
  const telefono = document.querySelector("#telefono").value;
  const edad = document.querySelector("#edad").value;
  const condicionEspecial = document.querySelector("#condicionEspecial").value;

  // Aquí puedes usar los valores para agregar un nuevo paciente a la cola
  const registroPacientes = new RegistroPacientes();
  const solicitudTurno = new SolicitudTurno(registroPacientes);

  registroPacientes.agregarPaciente(
    new Paciente(nombres, apellidos, cedula, telefono, edad, condicionEspecial)
  );

  console.log(registroPacientes.pacientes);

  //Limpio los elementos del formulario para agregar uno nuevo
  const form = document.querySelector('#form-registro');
  const inputs = form.querySelectorAll('input, textarea');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }

});

btnSolicitar.addEventListener("click", () => {
  const cedula = document.querySelector("#documento").value;

  const solicitudTurno = new SolicitudTurno(registroPacientes);
  solicitudTurno.solicitarTurno(cedula);
});

class Paciente {
  constructor(nombre, apellidos, cedula, telefono, edad, condicionEspecial) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.cedula = cedula;
    this.telefono = telefono;
    this.edad = edad;
    this.condicionEspecial = condicionEspecial;
  }
}

class RegistroPacientes {
  constructor() {
    this.pacientes = [];
  }

  agregarPaciente(paciente) {
    this.pacientes.push(paciente);
    console.log("paciente almacenado con éxito");
  }
}

function busquedaBinaria(pacientes, cedulaBuscada) {
  let inicio = 0;
  let fin = pacientes.length - 1;

  while (inicio <= fin) {
    let medio = Math.floor((inicio + fin) / 2);

    if (pacientes[medio].cedula === cedulaBuscada) {
      return medio;
    } else if (pacientes[medio].cedula < cedulaBuscada) {
      inicio = medio + 1;
    } else {
      fin = medio - 1;
    }
  }

  return -1; // Si no se encontró el paciente
}

class SolicitudTurno {
  constructor(registroPacientes) {
    this.registroPacientes = registroPacientes;
    this.turnos = [];
  }

  solicitarTurno(cedulaBuscada) {
    const indice = busquedaBinaria(
      this.registroPacientes.pacientes,
      cedulaBuscada
    );

    if (indice === -1) {
      console.log("No se encontró al paciente");
      return;
    }

    const paciente = this.registroPacientes.pacientes[indice];

    if (paciente.condicionEspecial === "A" || paciente.edad > 62) {
      // Si tiene condición especial o es mayor a 62 años, se agrega al principio de la cola
      this.turnos.unshift(paciente); 
    } else {
      // Si no tiene condición especial ni es mayor a 62 años, se agrega al final de la cola
      this.turnos.push(paciente); 
    }

    console.log(
      `Turno asignado con éxito. Su número de turno es ${this.turnos.length}`
    );
  }
}
