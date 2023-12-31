import { review } from './list.js';

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
    booksContainer.innerHTML = '';

    data.items.forEach(book => {
        let bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        // Create an image element for the book cover
        let coverImage = document.createElement('img');
        coverImage.src = book.volumeInfo.imageLinks?.thumbnail || './images/default.jpg';
        coverImage.alt = book.volumeInfo.title;

        // Create a link that will redirect to the GoodReads page of the book
        let coverLink = document.createElement('a');
        // Here you need to provide the actual GoodReads link for the book
        coverLink.href = book.volumeInfo.infoLink; // This URL is from the Google Books API and often redirects to a page with more information about the book, which may include links to GoodReads or other retailers.
        coverLink.appendChild(coverImage);
        bookDiv.appendChild(coverLink);

        // Add the title and author
        let title = document.createElement('p');
        title.classList.add('book-title');
        title.textContent = book.volumeInfo.title;
        bookDiv.appendChild(title);

        let author = document.createElement('p');
        author.classList.add('book-author');
        author.textContent = book.volumeInfo.authors?.join(', ') || 'Unknown Author';
        bookDiv.appendChild(author);

        // Create 'Add to My List' button
        let myListButton = document.createElement('button');
        myListButton.textContent = 'Add to My List';
        myListButton.classList.add('my-list-button');
        myListButton.addEventListener('click', function() {
            addToMyList(book);
        });
        bookDiv.appendChild(myListButton);

        // Append the bookDiv to the booksContainer
        booksContainer.appendChild(bookDiv);
    });
}
window.searchBooks = searchBooks;


function addToMyList(book) {
    // Implement functionality to add the book to 'mylist.html' or store in local storage/session storage
    console.log('Added to My List:', book.volumeInfo.title); // Placeholder for actual add to list functionality
    review(book);
    // You can store the book data in localStorage or send it to the server or simply redirect to 'mylist.html' with book details
}

