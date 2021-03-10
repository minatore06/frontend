function start()
{
var xhr = new XMLHttpRequest()
  xhr.open("GET", "http://localhost:8080/api/tutorial/1.0/employees", true)
  xhr.setRequestHeader("Accept", "*/*")

  xhr.onreadystatechange = function() {
  	if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      let risposta = JSON.parse(xhr.response)
      document.getElementById("tabella").innerHTML += "<tr><td>"+risposta[0].firstName+" "+risposta[0].lastName+"</td></tr>"
		}
  };
  xhr.send();
}