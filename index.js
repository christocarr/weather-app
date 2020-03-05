(function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //  document.getElementById("demo").innerHTML = this.responseText;
      // console.log(this.responseText)
      console.log(this.status)
    }
  };
  xhttp.open("GET", "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22", true);
  xhttp.send();
})()