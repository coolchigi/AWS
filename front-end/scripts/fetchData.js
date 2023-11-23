updateViewCount()

function updateViewCount() {
  const apiUrl = 'https://98obvtmtb1.execute-api.us-east-1.amazonaws.com/Prod/counter';
  fetch(apiUrl)
    .then(res => res.json())
    .then(res => {
      const visitorNumberElement = document.getElementById("visitorNumber");
      const visitorCount = parseInt(res);
      let currentCount = 0;
      const interval = setInterval(() => {
        if (currentCount < visitorCount) {
          currentCount++;
          visitorNumberElement.textContent = currentCount;
        } else {
          clearInterval(interval);
        }
      }, 10); // Adjust this value to change the speed of the animation
    });
}
