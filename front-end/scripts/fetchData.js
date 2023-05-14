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

