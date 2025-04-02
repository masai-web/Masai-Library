document.addEventListener("DOMContentLoaded", () => {
});
document.getElementById("searchBtn").addEventListener("click", () => {
  let query = document.getElementById("searchInput").value.trim();
  if (query !== "") {
    searchBooks(query);
  }
});
document.getElementById("searchInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    let query = event.target.value.trim();
    if (query !== "") {
      searchBooks(query);
    }
  }
});
function searchBooks(query) {
  
  document.getElementById("booksContainer").innerHTML = "Loading...";


  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayBooks(data.docs);
    })
    .catch(error => {
      console.error("Error fetching books:", error);
      document.getElementById("booksContainer").innerHTML = "An error occurred.";
    });
}

function displayBooks(books) {
  const container = document.getElementById("booksContainer");
  container.innerHTML = "";

  if (books.length === 0) {
    container.innerHTML = "<p>No books found. Try a different search.</p>";
    return;
  }

  
  books.slice(0, 10).forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

   
    let coverImage = book.cover_i 
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
      : "https://dummyimage.com/200x300/cccccc/000000.png&text=No+Cover"; 

    bookCard.innerHTML = `
      <img src="${coverImage}" alt="Cover image of ${book.title}">
      <h3>${book.title}</h3>
      <p>${book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
    `;

    container.appendChild(bookCard);
  });
}