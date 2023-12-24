function searchBooks() {
    let query = document.getElementById('searchInput').value;
    query = query.toLowerCase(); 
    query = query.replace(/[^a-z]/g, '');
    let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayBooks(data));
}

function displayBooks(data) {
    let booksContainer = document.getElementById('booksContainer');
    booksContainer.innerHTML = ''; // Clear existing books

    data.items.forEach(book => {
        // Create elements for book cover, title, and author
        // Append these elements to booksContainer
        
        // creating a container for each book
        let bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        // create an image element for the book cover
        let coverImage = document.createElement('img');
        coverImage.src = book.volumeInfo.imageLinks?.thumbnail;
        coverImage.alt = book.volumeInfo.title;
        bookDiv.appendChild(coverImage);

        // creating a paragraph element for the title
        let title = document.createElement('p');
        title.textContent = book.volumeInfo.title;
        bookDiv.appendChild(title);

        // creating a paragraph element for the author
        let author = document.createElement('p');
        author.textContent = book.volumeInfo.authors?.join(', ') || 'Unknown Author';
        bookDiv.appendChild(author);

        // append the bookDiv to the bookContainer
        booksContainer.appendChild(bookDiv);
    });
}
