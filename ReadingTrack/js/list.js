export function review(data) {
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
        let reviewButton = document.createElement('button');
        reviewButton.textContent = 'Review';
        reviewButton.classList.add('review-button');
        reviewButton.addEventListener('click', function() {
            reviewDirect(book);
        });
        bookDiv.appendChild(reviewButton);

        // Append the bookDiv to the booksContainer
        booksContainer.appendChild(bookDiv);
    });
}

function reviewDirect(book) {
    console.log("done");åå
}