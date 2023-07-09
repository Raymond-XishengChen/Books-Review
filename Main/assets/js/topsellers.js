  // Store 20 different subjects in an array so that we can pick a random subject at startup
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

  function displayTopSellerBooks(){
    // event.preventDefault();
    // New York Time API key
    var NYTapiKey = 'jde9HZ7rZn2DVZCrR9PYRPoJ9ZxdF8cS';

    generateRandomSubj();
    // URL link to fetch the data of most popular books of a specific subject from New York Times
    var popularBookApiUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/' + popularSubject + '.json?api-key=' + NYTapiKey;
    fetch(popularBookApiUrl)
    .then(response => response.json())

    .then(data => {
      // Display the subject name of the top sellers
      var popularSubjectElement = document.getElementById("bestSellers");
      popularSubjectElement.textContent = "New York Times Best Sellers List in " + '"' + data.results.list_name + '"';
        
      document.getElementById("popular-books").innerHTML = "";
      data.results.books.forEach(popularBooks => {      
        // Create elements for top seller book information
        // Including titles, authors, book cover image and an Amazon buying link connect to the
        // book covers      
        var popularTitle = popularBooks.title;
        var popularAuthor = popularBooks.author;
        var popularDescrip = popularBooks.description;            
        var popularPhotoUrl = popularBooks.book_image;
        var popularBuyUrl = popularBooks.buy_links[0].url;
        
        var popularBookElement = document.createElement("div");
        popularBookElement.classList.add('popBooksSection');
        popularBookElement.classList.add("book-card");

        var popularTitleElement = document.createElement("h1");
        popularTitleElement.classList.add('popBooksTitle');

        var popularAuthorElement = document.createElement("h3");
        popularAuthorElement.classList.add('popBooksAuthor');

        var popularDescripElement = document.createElement("p");
        popularDescripElement.classList.add('popBooksDescrip');

        var popularPhotoElement = document.createElement("img");
        popularPhotoElement.classList.add('popBooksPhoto');

        var popularBuyElement = document.createElement("a");
        popularBuyElement.classList.add('popBooksBuyLink');

        popularBuyElement.href = popularBuyUrl;
        popularTitleElement.innerText = popularTitle;
        popularAuthorElement.innerText = "Author: " + popularAuthor;
        popularDescripElement.innerText = popularDescrip;
        popularPhotoElement.src = popularPhotoUrl;
        popularPhotoElement.alt = "Cover Photo";
        popularPhotoElement.style = "width:128px;height:168px";
           
        popularBuyElement.appendChild(popularPhotoElement);
        popularBookElement.appendChild(popularTitleElement);
        popularBookElement.appendChild(popularAuthorElement);
        popularBookElement.appendChild(popularBuyElement);
        popularBookElement.appendChild(popularDescripElement);


        document.getElementById("popular-books").appendChild(popularBookElement);
        document.getElementById("popular-books").classList.add('popBookSection');
      })
  })
}  

displayTopSellerBooks();