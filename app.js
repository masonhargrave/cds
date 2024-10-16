document.getElementById("submit").addEventListener("click", function () {
  const query = document.getElementById("query").value;
  const responseDiv = document.getElementById("response");
  const loadingText = document.getElementById("loading");

  // Clear previous response
  responseDiv.innerHTML = "";

  if (query.trim() === "") {
    alert("Please enter a question.");
    return;
  }

  // Show loading text
  loadingText.style.display = "block";

  fetch("https://bmj-rag-app-5184a3a11928.herokuapp.com/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Hide loading text
      loadingText.style.display = "none";
      // Display the answer
      responseDiv.innerHTML = `<strong>Answer:</strong><br>${data.answer}`;
    })
    .catch((error) => {
      loadingText.style.display = "none";
      responseDiv.innerHTML = "An error occurred. Please try again later.";
      console.error("Error:", error);
    });
});
