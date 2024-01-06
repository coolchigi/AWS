updateViewCount()
function updateViewCount() {
  const apiUrl = 'https://98obvtmtb1.execute-api.us-east-1.amazonaws.com/Prod/counter';
  fetch(apiUrl)
      .then(res => res.json())
	    .then(res => {
		  document.getElementById("visitorNumber").innerHTML = res;
	});
      
}