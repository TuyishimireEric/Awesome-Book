// Store Book Details
const bookDetail = [
    { 
        id: 1
    }
]
// Book Class: Represents a Book
class book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }
  class UI {
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach((book) => UI.addBookToList(book));
    }
  
    static addBookToList(book) {
      const list = document.querySelector('.book-list');
      const addedbook = document.createElement('div');
      addedbook.innerHTML = `
        <p>${bookDetail.title}</p>
        <p>${bookDetail.author}</p>
        <a href="#" class="btn btn-danger btn-sm delete">Remove</a>
      `;
  
      list.appendChild(addedbook);
    }
  
    static deleteBook(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#form');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
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
  
    static removeBook(isbn) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  // Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // Event: Add a Book
  document.querySelector('form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
  
      // Add Book to UI
      UI.addBookToList(book);
  
      // Add book to store
      Store.addBook(book);
  
      // Show success message
      UI.showAlert('Book Added', 'success');
  
      // Clear fields
      UI.clearFields();
    });
  
  // Event: Remove a Book
  document.querySelector('.book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);
  
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Book Removed', 'success');
  });