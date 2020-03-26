
// axios.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22')
//   .then(res => {
//     console.log(res)
// }


axios({
  method: 'get',
  url: 'https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22',
  headers: {'Access-Control-Allow-Origin': '*'}
}).then(res => {
  console.log(res)
})