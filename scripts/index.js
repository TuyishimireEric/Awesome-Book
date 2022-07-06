/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// local Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
}
// Display Books
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('.book-list');
    const addedbook = document.createElement('tr');
    addedbook.innerHTML = `
      <td class="cols1">"${book.title}" by ${book.author}</td>
      <td class="cols2"><button type="submit" class="delete">Remove</button></td>
      `;
    list.appendChild(addedbook);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const book = new Book(title, author);
  UI.addBookToList(book);
  Store.addBook(book);
  UI.clearFields();
});
document.querySelector('.book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
// Make website into a complete Single Page Application
const tableSection = document.getElementById('table-section');
const addSection = document.getElementById('addbook');
const contactSection = document.getElementById('contact');
const listLink = document.querySelector('.nav-item1');
const addLink = document.querySelector('.nav-item2');
const contactLink = document.querySelector('.nav-item3');

listLink.addEventListener('click', () => {
  addSection.style.display = 'none';
  tableSection.style.display = 'block';
  contactSection.style.display = 'none';
});
addLink.addEventListener('click', () => {
  addSection.style.display = 'block';
  tableSection.style.display = 'none';
  contactSection.style.display = 'none';
});
contactLink.addEventListener('click', () => {
  addSection.style.display = 'none';
  tableSection.style.display = 'none';
  contactSection.style.display = 'block';
});

document.getElementById('date-time').innerHTML = new Date();
/* eslint-enable max-classes-per-file */
