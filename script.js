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
    let status = "Flipping Pages";
    if(readflag == 0) {
        status = "Untouched";
    }
    
    library[id] = new Book(title, author, pages, readflag);
    id += 1;
}

function createLabelElement(label, content) {
    let currSpan = document.createElement('span');
    let currLabel = document.createElement('p');
    let currContent = document.createElement('p');
    currSpan.style = "display:flex; gap:.5rem; margin-top:.2rem;";
    currLabel.innerHTML = label; 
    currLabel.style = "font-weight:550; white-space: nowrap;";
    currContent.innerHTML = content;
    currSpan.appendChild(currLabel);
    currSpan.appendChild(currContent);
    return currSpan;
}

function displayBook(book) {
    let currCard = document.createElement('div');

    let currName = document.createElement('p');
    currCard.appendChild(currName);
    currName.innerHTML = `${book.title}`;
    currName.style = "font-weight:700; font-size:1.1rem;";
    
    currCard.appendChild(createLabelElement('Author:', book.author));
    currCard.appendChild(createLabelElement('Pages:', book.pages));
    currCard.appendChild(createLabelElement('Status:', book.readStatus));

    let statusBtn = document.createElement('button');
    statusBtn.classList.add(`status-btn-read-${book.index}`); 
    statusBtn.textContent = "Not Read!";
    statusBtn.classList.add(`status-btn-unread-${book.index}`); 
    if(book.readStatus == "Untouched") {
        statusBtn.textContent = "Read"
        statusBtn.classList.remove(`status-btn-unread-${book.index}`); 
        statusBtn.classList.add(`status-btn-read-${book.index}`);
    } 
    statusBtn.addEventListener('click', readStatusUpdate)
    currCard.append(statusBtn);

    let libraryDisplay = document.getElementsByClassName('library')[0];
    currCard.classList.add(`card-${book.index}`); 
    libraryDisplay.appendChild(currCard);
}

function readStatusUpdate(e) {
    let bookId = e.target.classList[0].split('-')[3];
    let bookStaus = document.querySelector(`.card-${bookId} span:nth-child(4) p:nth-child(2)`);

    if(library[bookId].readStatus == "Flipping Pages") {
        library[bookId].readStatus = "Untouched";
        bookStaus.innerHTML =  `${library[bookId].readStatus}`;
        e.srcElement.textContent = "Read";
        e.srcElement.classList.remove(`status-btn-unread-${bookId}`);
        e.srcElement.classList.add(`status-btn-read-${bookId}`); 
    }
    else{
        library[bookId].readStatus = "Flipping Pages";
        bookStaus.innerHTML = `${library[bookId].readStatus}`;
        e.srcElement.textContent = "Not Read!";
        e.srcElement.classList.remove(`status-btn-read-${bookId}`); 
        e.srcElement.classList.add(`status-btn-unread-${bookId}`);
    }

}

for(let i = 0; i < 80; i++)
    addBookToLibrary(`Meditations  ${i}`, 'Marcus Aurelius', 173, 'Untouched');

let dialog = document.querySelector("dialog");
let addButton = document.getElementById('add-book');
addButton.addEventListener('click', () => {
    dialog.showModal();
})


library.forEach((val) => displayBook(val));