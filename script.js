let addBookButton = document.getElementById("addBooks");
let libraryContainer = document.getElementById("library");

const myLibrary = [
    {
        title:"Cat in the Hat",
        author:"Dr. Seuss",
        pages:61,
        read:true
    }
    ,
    {
        title:"Hatchet",
        author:"Gary Paulsen",
        pages:192,
        read:false,
        pagesRead:170
    }
    ,
];

function Book(title, author, pages, read, pagesRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.pagesRead = pagesRead;
}

function addBookForm() {
    const formHTML = `
        <div id="formOverlay" class="form-overlay">
            <div class="form-container">
                <button type="button" class="close-btn" onclick="closeForm()">×</button>
                <form id="bookForm">
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" required>
                    <label for="author">Author:</label>
                    <input type="text" id="author" name="author" required>
                    <label for="pages">Pages:</label>
                    <input type="number" id="pages" name="pages" required>
                    <label for="pagesRead" id="pagesReadLabel">What page am I on?:</label>
                    <input type="number" id="pagesRead" name="pagesRead">
                    <label for="read">Finished?:</label>
                    <input type="checkbox" id="read" name="read">
                    <button type="button" onclick="submitBook()">Add Book</button>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', formHTML); // Add form to the body
    document.getElementById("read").addEventListener("change", togglePagesRead);
}

function editBookForm(index) {
    const book = myLibrary[index];

    const formHTML = `
        <div id="formOverlay" class="form-overlay">
            <div class="form-container">
                <button type="button" class="close-btn" onclick="closeForm()">×</button>
                <form id="bookForm">
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" value="${book.title}" required>
                    <label for="author">Author:</label>
                    <input type="text" id="author" name="author" value="${book.author}" required>
                    <label for="pages">Pages:</label>
                    <input type="number" id="pages" name="pages" value="${book.pages}" required>
                    <label for="pagesRead" id="pagesReadLabel">What page am I on?:</label>
                    <input type="number" id="pagesRead" name="pagesRead" value="${book.pagesRead}" ${book.read ? 'style="display:none;"' : ''}>
                    <label for="read">Finished?:</label>
                    <input type="checkbox" id="read" name="read" ${book.read ? 'checked' : ''}>
                    <button type="button" onclick="submitEdit(${index})">Save Changes</button>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', formHTML); 
}

function submitEdit(index) {
    const titleInput = document.getElementById("title").value;
    const authorInput = document.getElementById("author").value;
    const pagesInput = document.getElementById("pages").value;
    const readInput = document.getElementById("read").checked;
    const pagesReadInput = document.getElementById("pagesRead").value;

    if (!titleInput || !authorInput || !pagesInput) {
        alert("Title, Author, and Pages are required fields.");
        return;
    }

    const book = myLibrary[index];

    book.title = titleInput;
    book.author = authorInput;
    book.pages = pagesInput;
    book.read = readInput;
    book.pagesRead = pagesReadInput || "";

    displayBooks();
    closeForm();
}

function submitBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    const pagesRead = document.getElementById("pagesRead").value || "";

    if (!title || !author || !pages) {
        alert("Title, Author, and Pages are required fields.");
        return;
    }

    const newBook = new Book(title, author, pages, read, pagesRead);
    myLibrary.push(newBook);

    displayBooks();
    closeForm();
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}


function closeForm() {
    const formOverlay = document.getElementById("formOverlay");
    if (formOverlay) {
        formOverlay.remove();
    }
    document.getElementById("addBooks").innerHTML = `<span class="addBookText">Add Book</span>`;
}

function displayBooks() {
    libraryContainer.innerHTML = `
        <div class="addBook" id="addBooks">
            <span class="addBookText">Add Book</span>
        </div>
    `;

    myLibrary.forEach((book, index) => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.id = `book-${index}`;
        bookElement.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p class="${book.read ? 'finished' : 'not-finished'}">${book.read ? "Finished" : "Not Finished"}</p>
            ${book.pagesRead ? `<p>Pages Read: ${book.pagesRead}</p>` : ""}
            <button class="edit-btn" onclick="editBookForm(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteBook(${index})">×</button>
        `;
        libraryContainer.appendChild(bookElement);
    });

    // Re-attach the event listener to the new "Add Book" button
    addBookButton = document.getElementById("addBooks");
    addBookButton.addEventListener("click", addBookForm);
}

// Initial event listener attachment
addBookButton.addEventListener("click", addBookForm);
displayBooks();
