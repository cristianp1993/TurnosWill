document.getElementById("btn-registrar-paciente").onclick = (event)=>{

   document.getElementById("form-registro").style.display="block"
   document.getElementById("form-turno").style.display="none"

}

document.getElementById("btn-solicitar-turno").onclick = (event)=>{

    document.getElementById("form-turno").style.display="block"
    document.getElementById("form-registro").style.display="none"
 
 }
