var subjectList = ["young-adult-paperback-monthly",
"travel",
"sports",
"science",
"hardcover-political-books",
"family",
"religion-spirituality-and-faith",
"paperback-business-books",
"Love and Relationships",
"humor",
"health",
"games-and-activities",
"fashion-manners-and-customs",
"education",
"culture",
"business-books",
"animals",
"young-adult",
"childrens-middle-grade",
"series-books"];

var randomNum;
var popularSubject = [];
// Generate a random number between 0-19
// in order to get a random subject from the list
function generateRandomSubj(){
    randomNum = Math.floor(Math.random()*20);
    popularSubject = subjectList[randomNum];
}

// function displayPopularBooks(){
//     // event.preventDefault();
//     // New York Time API key
//     var NYTapiKey = 'jde9HZ7rZn2DVZCrR9PYRPoJ9ZxdF8cS';

//     generateRandomNum();
//     // URL link to fetch the data of most popular books at current time from New York Times
//     var popularBookApiUrl = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=' + NYTapiKey;
//     // var popularBookApiUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/' + popularSubject + '.json?api-key=' + NYTapiKey;
//     fetch(popularBookApiUrl)
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById("popular-books").innerHTML = "";
//         data.results.forEach(popularBooks => {
//             var popularTitle = popularBooks.title;
//             var popularAuthor = popularBooks.author;
//             var popularDescrip = popularBooks.description;
        
//             var popularBookElement = document.createElement("div");
//             var popularTitleElement = document.createElement("h3");
//             var popularAuthorElement = document.createElement("h3");
//             var popularDescripElement = document.createElement("p");
        
//             popularTitleElement.innerText = popularTitle;
//             popularAuthorElement.innerText = "Author: " + popularAuthor;
//             popularDescripElement.innerText = '"' + popularDescrip + '"';
        
//             popularBookElement.appendChild(popularTitleElement);
//             popularBookElement.appendChild(popularAuthorElement);
//             popularBookElement.appendChild(popularDescripElement);
//             document.getElementById("popular-books").appendChild(popularBookElement);
//       })
//   })
// }


  function displayTopSellerBooks(){
    // event.preventDefault();
    // New York Time API key
    var NYTapiKey = 'jde9HZ7rZn2DVZCrR9PYRPoJ9ZxdF8cS';

    generateRandomSubj();
    // URL link to fetch the data of most popular books at current time from New York Times
    // var popularBookApiUrl = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=' + NYTapiKey;
    var popularBookApiUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/' + popularSubject + '.json?api-key=' + NYTapiKey;
    fetch(popularBookApiUrl)
    .then(response => response.json())
    .then(data => {
        document.getElementById("popular-books").innerHTML = "";
        data.results.books.forEach(popularBooks => {
            var popularTitle = popularBooks.title;
            var popularAuthor = popularBooks.author;
            var popularDescrip = popularBooks.description;
        
            var popularBookElement = document.createElement("div");
            var popularTitleElement = document.createElement("h1");
            var popularAuthorElement = document.createElement("h3");
            var popularDescripElement = document.createElement("p");
            
        
            popularTitleElement.innerText = popularTitle;
            popularAuthorElement.innerText = "Author: " + popularAuthor;
            popularDescripElement.innerText = '"' + popularDescrip + '"';
        
            popularBookElement.appendChild(popularTitleElement);
            popularBookElement.appendChild(popularAuthorElement);
            popularBookElement.appendChild(popularDescripElement);
            document.getElementById("popular-books").appendChild(popularBookElement);
            document.getElementById("popular-books").classList.add('popBookSection');
      })
  })
}  

// displayPopularBooks();
displayTopSellerBooks();