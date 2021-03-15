function start()
{
var xhr = new XMLHttpRequest()
  xhr.open("GET", "http://localhost:8080/api/tutorial/1.0/employees", true)
  xhr.setRequestHeader("Accept", "*/*")

  xhr.onreadystatechange = function() {
  	if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      let risposta = JSON.parse(xhr.response)
      console.log(risposta)
      risposta.forEach(impiegato => {
        document.getElementById("tabella").innerHTML += "<tr><td>"+impiegato.firstName+" "+impiegato.lastName+"</td><td>"+impiegato.email+"</td><td>"+impiegato.phone+"</td><td><input type='button' value='mod' onclick='modifica("+impiegato.employeeId+")'><input type='button' value='rem' onclick='rimuovi("+impiegato.employeeId+")'></td></tr>"
      });
      
		}
  };
  xhr.send();
}

function aggiungi(impiegatoId, nome, cognome, email, phone){
  var xhr = new XMLHttpRequest()
  xhr.open("POST", "http://localhost:8080/api/tutorial/1.0/employees", true)
  xhr.setRequestHeader("Accept", "*/*")

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
    }
  };

  xhr.send(data);
}

function modifica(impiegatoId, nome, cognome, email, phone){
  var xhr = new XMLHttpRequest()
  xhr.open("PATH", "http://localhost:8080/api/tutorial/1.0/employees/"+impiegatoId, true)
  xhr.setRequestHeader("Accept", "*/*")

  let data = {};
  if(nome)data.firstName = nome;
  if(cognome)data.lastName = cognome;
  if(email)data.email = email;
  if(phone)data.phone = phone;

  xhr.onreadystatechange = function() {
  	if(xhr.readyState === xhr.DONE && xhr.status === 200) {
      window.location.reload();
      
		}else if(xhr.readyState === xhr.DONE && xhr.status !== 200){
      document.getElementById("response").innerHTML = "Errore"
    }
  };

  xhr.send(data);
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