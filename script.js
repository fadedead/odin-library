const library = [];
let id = 0;

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readFlag = readStatus;
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
    currStatus.innerHTML = `Status: ${book.readFlag}`;

    let libraryDisplay = document.getElementsByClassName('library')[0];
    currCard.classList.add('card'); 
    libraryDisplay.appendChild(currCard);

}

for(let i = 0; i < 22; i++)
    addBookToLibrary('Meditations', 'Marcus Aurelius', 173, 'have not read yet');



library.forEach((val) => displayBook(val));