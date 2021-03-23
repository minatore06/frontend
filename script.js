var risposta
function start()
{
var xhr = new XMLHttpRequest()
  xhr.open("GET", "http://localhost:8080/api/tutorial/1.0/employees", true)
  xhr.setRequestHeader("Accept", "*/*")

  xhr.onreadystatechange = function() {
  	if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      risposta = JSON.parse(xhr.response)
      console.log(risposta)
      risposta.forEach(impiegato => {
        document.getElementById("tabella").innerHTML += "<tr><td>"+impiegato.firstName+" "+impiegato.lastName+"</td><td>"+impiegato.email+"</td><td>"+impiegato.phone+"</td><td><input type='button' value='mod' onclick='vedi("+impiegato.employeeId+")'><input type='button' value='rem' onclick='rimuovi("+impiegato.employeeId+")'></td></tr>"
      });
      
		}
  };
  xhr.send();
}

function vedi(aggiunta){
  if(aggiunta === true)document.getElementById('conferma').setAttribute("onclick","inserimento()")
  else document.getElementById('conferma').setAttribute("onclick","modifica("+aggiunta+")")
  document.getElementById('aggiungi').style.display = "block";
}

function inserimento(){
  var xhr = new XMLHttpRequest()
  xhr.open("POST", "http://localhost:8080/api/tutorial/1.0/employees", true)
  xhr.setRequestHeader("Accept", "*/*")
  xhr.setRequestHeader("Content-Type", "application/json")

  let impiegatoId = 0;
  risposta.forEach(impiegato => {
    if(impiegato.employeeId>impiegatoId)impiegatoId = impiegato.employeeId;
  })
  impiegatoId+=1;
  let nome = document.getElementById('nome').value; 
  let cognome = document.getElementById('cognome').value; 
  let email = document.getElementById('email').value; 
  let phone = document.getElementById('telefono').value; 

  let data = {
    "employeeId": impiegatoId,
    "firstName": nome,
    "lastName": cognome,
    "email": email,
    "phone": phone
  };

  xhr.onreadystatechange = function() {
  	if(xhr.readyState === xhr.DONE && xhr.status === 201) {
      window.location.reload();
      
		}else if(xhr.readyState === xhr.DONE && xhr.status !== 201){
      document.getElementById("response").innerHTML = "Errore"
      console.log(xhr.status)
    }
  };

  xhr.send(JSON.stringify(data));
}

function modifica(impiegatoId){
  let nome = document.getElementById('nome').value; 
  let cognome = document.getElementById('cognome').value; 
  let email = document.getElementById('email').value; 
  let phone = document.getElementById('telefono').value; 

  let xhr = new XMLHttpRequest()
  xhr.open("GET", "http://localhost:8080/api/tutorial/1.0/employees/"+impiegatoId, true)
  xhr.setRequestHeader("Accept", "*/*")

  xhr.onreadystatechange = function() {
  	if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      risposta = JSON.parse(xhr.response)    
      
      xhr = new XMLHttpRequest()
      xhr.open("PATCH", "http://localhost:8080/api/tutorial/1.0/employees/"+impiegatoId, true)
      xhr.setRequestHeader("Accept", "*/*")
      xhr.setRequestHeader("Content-Type", "application/json")

      let data = {}
      if(nome)data.firstName = nome;
      if(cognome)data.lastName = cognome;
      if(email)data.email = email;
      if(phone)data.phone = phone;
      console.log(data)

      xhr.onreadystatechange = function() {
        if(xhr.readyState === xhr.DONE && xhr.status === 200) {
          window.location.reload();
          
        }else if(xhr.readyState === xhr.DONE && xhr.status !== 200){
          document.getElementById("response").innerHTML = "Errore"
        }
      };

      xhr.send(JSON.stringify(data));
		}
  };
  xhr.send();

  
}

function rimuovi(impiegatoId){
  var xhr = new XMLHttpRequest()
  xhr.open("DELETE", "http://localhost:8080/api/tutorial/1.0/employees/"+impiegatoId, true)
  xhr.setRequestHeader("Accept", "*/*")

  xhr.onreadystatechange = function() {
  	if(xhr.readyState === xhr.DONE && xhr.status === 200) {
      window.location.reload();
      
		}else if(xhr.readyState === xhr.DONE && xhr.status !== 200){
      document.getElementById("response").innerHTML = "Errore"
    }
  };
  xhr.send();
}