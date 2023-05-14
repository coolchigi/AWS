// var apiUrl = "https://1i6ummbb99.execute-api.us-east-1.amazonaws.com/Prod/counter";
//       fetch(apiUrl , {
//       method: 'PUT',
//       headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': '*',
//             'Access-Control-Allow-Credentials': '*',
//             'Content-Type': 'application/json'
//       }
//       }
//       )
//       .then(() => fetch("https://1i6ummbb99.execute-api.us-east-1.amazonaws.com/Prod/counter"))
//       .then(response => response.json())
//       .then(data =>{
//           document.getElementById('visitorNumber').innerHTML = data
//     console.log(data)});


function init(){
  updateData()
  fetchData()
}

function updateData(){
  fetch("https://1i6ummbb99.execute-api.us-east-1.amazonaws.com/Prod/counter")
}
function fetchData(){
   fetch("https://1i6ummbb99.execute-api.us-east-1.amazonaws.com/Prod/counter", )
    .then((response) => response.json())
    .then((data) => 
      document.getElementById('visitorNumber').innerHTML = data
    );
}



init()
// var apiUrl = "http://127.0.0.1:3000/counter"
// fetch(apiUrl, {
//   credentials: 'include',
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*'
//   }
// })
// .then(() => {
//   fetch(apiUrl, {
//     credentials: 'include',
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*'
//     }
//   })
//   .then(response => response.json())
//   .then(data => {
//     document.getElementById('visitorNumber').innerHTML = data
//   });
// });
