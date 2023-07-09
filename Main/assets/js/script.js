// Add an event listener to the search button
document.getElementById("searchButton").addEventListener("click", fetchBookInfo);

// Function to fetch and display book information
function fetchBookInfo(event) {
  event.preventDefault();
  // Get user input
  var userInput = document.getElementById("subjectInput").value;

  var previousSearches = localStorage.getItem("lastThreeSearches");
  previousSearches = previousSearches ? JSON.parse(previousSearches) : [];

  // Add the current search value to the array
  previousSearches.push(userInput);

  // Keep only the last three search values
  if (previousSearches.length > 3) {
    previousSearches.shift();
  }

  // Save the updated array in local storage
  localStorage.setItem("lastThreeSearches", JSON.stringify(previousSearches));

  displayFetchCallButtons();

  // Shows the loading bar
  document.getElementById("progressBar").style.display = "block";

  // This allows for multiple words with spaces to be encoded to have %20 as a space in the query parameter
  var encodedInput = encodeURIComponent(userInput);

  // Create the API URL with user input
  var apiUrl = "https://gutendex.com/books/?topic=" + encodedInput;

  // Make a GET request to the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Hides the loading bar 
      document.getElementById("progressBar").style.display = "none";

      // Clear previous book information
      document.getElementById("bookList").innerHTML = "";

      // Check if 'results' property exists in the response
      if (data.results && Array.isArray(data.results)) {

        // Iterate over each book in the response
        data.results.forEach(book => {

          // Extract the title, author, and cover photo URL
          var title = book.title;
          var author = book.authors.length > 0 ? book.authors[0].name : "Unknown Author";
          var coverPhotoUrl = book.formats && book.formats["image/jpeg"] ? book.formats["image/jpeg"] : "";

          // Create elements for book information
          var bookElement = document.createElement("div");
          bookElement.classList.add("book-card");
          var titleElement = document.createElement("h3");
          var authorElement = document.createElement("p");
          var coverPhotoElement = document.createElement("img");

          // Set values and attributes for book elements
          titleElement.textContent = "Title: " + title;
          authorElement.textContent = "Author: " + author;
          coverPhotoElement.src = coverPhotoUrl;
          coverPhotoElement.alt = "Cover Photo";

          // Append book elements to the book list
          bookElement.appendChild(titleElement);
          bookElement.appendChild(authorElement);
          bookElement.appendChild(coverPhotoElement);
          document.getElementById("bookList").appendChild(bookElement);
        });
      } else {
        // Display a message if no books are found
        var messageElement = document.createElement("p");
        messageElement.textContent = "No books found.";
        document.getElementById("bookList").appendChild(messageElement);
      }
    })
    // Handle errors
    .catch(error => {
      document.getElementById("progressBar").style.display = "none";
      console.error("Error:", error);
    });
}

function displayFetchCallButtons() {
  var previousSearches = localStorage.getItem("lastThreeSearches");
  previousSearches = previousSearches ? JSON.parse(previousSearches) : [];

  var containerElement = document.getElementById("historyButtons");
  containerElement.innerHTML = ""; // Clear the container before adding buttons

  previousSearches.forEach(function(fetchCall) {
    // Create a button element
    var buttonElement = document.createElement("button");
    buttonElement.textContent = fetchCall;

    // Add a click event listener to call the fetchBookInfo function with the saved fetch call
    buttonElement.addEventListener("click", function() {
      document.getElementById("subjectInput").value = fetchCall;
      fetchBookInfo(event);
    });

    // Append the button to the container element
    containerElement.appendChild(buttonElement);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  displayFetchCallButtons();
});
