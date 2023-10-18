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
    let status = "Read";
    if (readflag == 0) {
        status = "Pending";
    }

    library[id] = new Book(title, author, pages, status);
    displayBook(library[id]);

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

    let crossImage = document.createElement("img");
    crossImage.src = "./assets/cross.svg";
    crossImage.alt = "remove";
    crossImage.id = `remove-btn-${book.index}`;
    crossImage.addEventListener('click', removeBookOnClick);
    currCard.appendChild(crossImage);

    let currName = document.createElement('p');
    currCard.appendChild(currName);
    currName.innerHTML = `${book.title}`;
    currName.style = "font-weight:700; font-size:1.1rem;";

    currCard.appendChild(createLabelElement('Author:', book.author));
    currCard.appendChild(createLabelElement('Pages:', book.pages));
    currCard.appendChild(createLabelElement('Status:', book.readStatus));

    let statusBtn = document.createElement('button');
    statusBtn.textContent = "change status";
    statusBtn.classList.add(`status-btn-${book.index}`);

    statusBtn.addEventListener('click', readStatusUpdate)
    currCard.append(statusBtn);

    let libraryDisplay = document.getElementsByClassName('library')[0];
    currCard.classList.add(`card-${book.index}`);
    libraryDisplay.appendChild(currCard);
}

function readStatusUpdate(e) {
    let bookId = e.target.classList[0].split('-')[2];
    let bookStaus = document.querySelector(`.card-${bookId} span:nth-child(5) p:nth-child(2)`);

    if (library[bookId].readStatus == "Read") {
        library[bookId].readStatus = "Pending";
        bookStaus.innerHTML = `${library[bookId].readStatus}`;
    }
    else {
        library[bookId].readStatus = "Read";
        bookStaus.innerHTML = `${library[bookId].readStatus}`;
    }

}

function addBookOnClick(e) {
    const form = document.getElementById('form');

    const formData = new FormData(form);

    const formDataObject = {};

    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    let status = formDataObject['book-status'] == 'read' ? 1 : 0;
    console.log(status);

    if (formDataObject['book-title'].length > 0 && formDataObject['book-author'].length > 0 && formDataObject['book-pages'].length > 0) {
        addBookToLibrary(formDataObject['book-title'], formDataObject['book-author'], formDataObject['book-pages'], status);
        e.srcElement.form.reset();
        dialog.close();
    }
    else {
        alert("Invalid were given, please check the title, author and pages");
    }
    e.preventDefault();
}

function removeBookOnClick(e) {
    let index = e.srcElement.id.split('-')[2];
    library[index] = null;
    document.getElementsByClassName('library')[0].removeChild(document.getElementsByClassName(`card-${index}`)[0]);
}

let dialog = document.querySelector("dialog");
let addButton = document.getElementById('add-book');
addButton.addEventListener('click', () => {
    dialog.showModal();
})

const addBookButton = document.getElementById('add-button');
addBookButton.addEventListener('click', addBookOnClick);

function addSampleBook() {
    addBookToLibrary('Sample Book 1', 'Sample Author 1', 69, 'Flipping Pages');
    addBookToLibrary('Sample Book 2', 'Sample Author 2', 420, 'Untouched');
    addBookToLibrary('Sample Book 3', 'Sample Author 3', 26, 'Flipping Pages');
    addBookToLibrary('Sample Book 4', 'Sample Author 4', 8, 'Untouched');
    addBookToLibrary('Sample Book 5', 'Sample Author 5', 2000, 'Flipping Pages');
}

addSampleBook();