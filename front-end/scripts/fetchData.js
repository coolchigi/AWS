var apiUrl = "https://1i6ummbb99.execute-api.us-east-1.amazonaws.com/Prod/counter";
      fetch(apiUrl, {method: 'PUT'})
      .then(() => fetch("https://1i6ummbb99.execute-api.us-east-1.amazonaws.com/Prod/counter"))
      .then(response => response.json())
      .then(data =>{
          document.getElementById('visitorNumber').innerHTML = data
    console.log(data)});