(function loadDoc() {
  const key = '2003fc368e5207dda7404e4e4f733e3b'
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //  document.getElementById("demo").innerHTML = this.responseText;
      // console.log(this.responseText)
      console.log(this.status)
    }
  };
  xhttp.open("GET", "https://api.darksky.net/forecast/2003fc368e5207dda7404e4e4f733e3b/37.8267,-122.4233", true);
  xhttp.send();
})()