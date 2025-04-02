// Event listener to handle page load
document.addEventListener("DOMContentLoaded", () => {
  // Optionally, display a default search or a welcome message.
});

// Event listener for the search button click
document.getElementById("searchBtn").addEventListener("click", () => {
  let query = document.getElementById("searchInput").value.trim();
  if (query !== "") {
    searchBooks(query);
  }
});

// Optional: Allow search on Enter key press
document.getElementById("searchInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    let query = event.target.value.trim();
    if (query !== "") {
      searchBooks(query);
    }
  }
});

// Function to fetch books from the Open Library API
function searchBooks(query) {
  // Clear previous results
  document.getElementById("booksContainer").innerHTML = "Loading...";

  // Open Library Search API endpoint
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

// Function to display books on the page
function displayBooks(books) {
  const container = document.getElementById("booksContainer");
  container.innerHTML = "";

  if (books.length === 0) {
    container.innerHTML = "<p>No books found. Try a different search.</p>";
    return;
  }

  // Display only the first 10 books for simplicity
  books.slice(0, 10).forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    // Use cover_i property to display a cover image if available
    let coverImage = book.cover_i 
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
      : "https://dummyimage.com/200x300/cccccc/000000.png&text=No+Cover"; // Updated placeholder

    bookCard.innerHTML = `
      <img src="${coverImage}" alt="Cover image of ${book.title}">
      <h3>${book.title}</h3>
      <p>${book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
    `;

    container.appendChild(bookCard);
  });
}