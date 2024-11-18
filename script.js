// Sample book data
const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description: 'A novel about the American Dream.', rating: 4, id: 1 },
    { title: '1984', author: 'George Orwell', genre: 'Dystopian', description: 'A totalitarian regime controls everything.', rating: 5, id: 2 },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Drama', description: 'A coming-of-age story in the racially segregated South.', rating: 5, id: 3 },
    { title: 'Moby Dick', author: 'Herman Melville', genre: 'Adventure', description: 'A sea captain’s obsessive quest for revenge on a white whale.', rating: 3, id: 4 },
];

// Function to display books
function displayBooks(filteredBooks = books) {
    const bookList = document.querySelector('.book-list');
    bookList.innerHTML = '';

    filteredBooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-id', book.id);
        
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Description:</strong> ${book.description}</p>
            <div class="rating">
                <span class="stars">${'★'.repeat(book.rating)}${'☆'.repeat(5 - book.rating)}</span>
            </div>
            <button onclick="viewDetails(${book.id})">View Details</button>
        `;
        bookList.appendChild(bookCard);
    });
}

// Search function
function searchBooks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchInput));
    displayBooks(filteredBooks);
}

// Filter books by genre
function filterByGenre() {
    const genreSelect = document.getElementById('genreSelect');
    const selectedGenre = genreSelect.value;
    const filteredBooks = selectedGenre === 'all' 
        ? books 
        : books.filter(book => book.genre === selectedGenre);
    displayBooks(filteredBooks);
}

// View book details
function viewDetails(bookId) {
    const book = books.find(book => book.id === bookId);
    alert(`Title: ${book.title}\nAuthor: ${book.author}\nDescription: ${book.description}`);
}

// Toggle add book form
function toggleAddBookForm() {
    const form = document.getElementById('addBookForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Add new book
document.getElementById('newBookForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('newTitle').value;
    const author = document.getElementById('newAuthor').value;
    const genre = document.getElementById('newGenre').value;
    const description = document.getElementById('newDescription').value;

    const newBook = {
        title,
        author,
        genre,
        description,
        rating: 0,  // Default rating
        id: books.length + 1,
    };

    books.push(newBook);
    displayBooks();
    toggleAddBookForm(); // Hide the form after adding the book
});

// Initial call to display books
displayBooks();
