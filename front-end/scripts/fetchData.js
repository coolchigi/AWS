updateViewCount()

function updateCounter() {
    fetch("http://127.0.0.1:3000/counter")
      .then(res => res.json())
	    .then(res => {
		  document.getElementById("visitorNumber").innerHTML = res;
	});
      
}

function updateViewCount() {
  const apiUrl = 'https://98obvtmtb1.execute-api.us-east-1.amazonaws.com/Prod/counter';
  fetch("http://127.0.0.1:3000/counter")
      .then(res => res.json())
	    .then(res => {
		  document.getElementById("visitorNumber").innerHTML = res;
	});
      
}