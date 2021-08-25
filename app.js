// Book class: represents a book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class: Handle UI tasks
class UI{
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach((book) => {
            UI.addBookToList(book);
        })
    }

    static addBookToList(book){
        const list = document.getElementById('book-list');
        const newBook = document.createElement('tr');
        newBook.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(newBook);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static removeBook(row){
        if(row.classList.contains('delete')){
            if(confirm('Are you sure?')){
                row.parentElement.parentElement.remove();
            }
        }
    }

    static showAlert(msg, alertClass){
        const alert = document.createElement('div');
        alert.className = `alert alert-${alertClass}`
        alert.setAttribute('role', 'alert');
        alert.appendChild(document.createTextNode(`${msg}`));
        console.dir(alert.textContent);
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(alert, form);
        // Make the alert vanish after 2 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000)
    }
}

// Store class: Handles storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent default action of submit
    e.preventDefault();
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    // Validate values
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please Fill In All Fields B*tch!', 'danger');
    }else{
        // Show success alert
        UI.showAlert('Book Added Successfully!', 'success')
        // Instantiate Book
        const book = new Book(title, author, isbn);
        // Add book to UI
        UI.addBookToList(book);
        // Add book to storage
        Store.addBook(book);
        // Clear input fields
        UI.clearFields();
    }
})

// Event: Remove a book
const bookList = document.getElementById('book-list');
bookList.addEventListener('click', (e) => {
    // Remove book from UI
    UI.removeBook(e.target);
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});

console.log(JSON.parse(localStorage.getItem('books')));



