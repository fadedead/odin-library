const library = [];
let id = 0;

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.index = id;
}

function addBookToLibrary(title, author, pages, readflag) {
    let status = "Have read the book!";
    if(readflag == 0) {
        status = "Have not read the book";
    }
    
    library[id] = new Book(title, author, pages, readflag);
    id += 1;
}

function displayBook(book) {
    let currCard = document.createElement('div');

    let currName = document.createElement('p');
    currCard.appendChild(currName);
    currName.innerHTML = `${book.title}`;
    
    let currAuthor = document.createElement('p');
    currCard.appendChild(currAuthor);
    currAuthor.innerHTML = `Author: ${book.author}`;
    
    
    let currPages = document.createElement('p'); 
    currCard.appendChild(currPages);
    currPages.innerHTML = `Pages: ${book.pages}`;

    let currStatus = document.createElement('p'); 
    currCard.appendChild(currStatus);
    currStatus.innerHTML = `Status: ${book.readStatus}`;

    let statusBtn = document.createElement('button');
    statusBtn.textContent = "Read"
    statusBtn.classList.add(`status-btn-read-${book.index}`); 
    if(book.readStatus == "Have read the book!") {
        statusBtn.textContent = "Not Read!";
        statusBtn.classList.add(`status-btn-unread-${book.index}`);
    } 
    statusBtn.addEventListener('click', readStatusUpdate)
    currCard.append(statusBtn);

    let libraryDisplay = document.getElementsByClassName('library')[0];
    currCard.classList.add('card'); 
    libraryDisplay.appendChild(currCard);
}

function readStatusUpdate(e) {
    console.log(e.target.classList[0].split('-')[3]);
}

for(let i = 0; i < 80; i++)
    addBookToLibrary(`Meditations  ${i}`, 'Marcus Aurelius', 173, 'have not read yet');



library.forEach((val) => displayBook(val));