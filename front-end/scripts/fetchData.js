updateViewCount()

function updateCounter() {
    fetch("http://127.0.0.1:3000/counter")
      .then(res => res.json())
	    .then(res => {
		  document.getElementById("visitorNumber").innerHTML = res;
	});
      
}

function updateViewCount() {
  const apiUrl = 'http://127.0.0.1:3000/counter';
  fetch("http://127.0.0.1:3000/counter")
      .then(res => res.json())
	    .then(res => {
		  document.getElementById("visitorNumber").innerHTML = res;
	});
      
}