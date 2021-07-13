const UNCOMPLETED_LIST_BOOK_ID = "books";
const COMPLETED_LIST_BOOK_ID = "completed-books";
const BOOK_ITEMID = "itemId";

function makeBook(title, author, year, isCompleted) {
 
    const textTitle = document.createElement("h3");    
    textTitle.setAttribute("class", "hTitle");
    textTitle.innerText = title;
 
    const textAuthor = document.createElement("p");
    textAuthor.setAttribute("class", "pAuthor");
    textAuthor.innerText = author;
 
    const textYear = document.createElement("p");
    textYear.setAttribute("class", "pYear");
    textYear.innerText = year;
 
    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textAuthor, textYear);
 
    const container = document.createElement("article");    
    container.setAttribute("class", "article");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if(isCompleted){
        container.append(
            createUndoButton(),
            createTrashButton(),
            createEditButton()
            );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton(),
            createEditButton()
            );
    }
 
    return container;
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function(event){
         addTaskToCompleted(event.target.parentElement);
    });
}

function createEditButton() {
    return createButton("edit-button", function(event){
         editTaskToForm(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBook() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

    const textTitle = document.getElementById("title").value;
    const textAuthor = document.getElementById("author").value;
    const textYear = document.getElementById("year").value;

    const book = makeBook(textTitle, textAuthor, textYear);
    const bookObject = composeBookObject(textTitle, textAuthor, textYear, false);
  
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    uncompletedBOOKList.append(book);
    updateDataToStorage();
}

function addTaskToCompleted(taskElement) {
    const taskTitle = taskElement.querySelector(".inner > h3").innerText;
    const taskAuthor = taskElement.querySelector(".pAuthor").innerText;
    const taskYear = taskElement.querySelector(".pYear").innerText;

    const newBook = makeBook(taskTitle, taskAuthor, taskYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
} 

function removeTaskFromCompleted(taskElement) {

    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function undoTaskFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const taskTitle = taskElement.querySelector(".inner > h3").innerText;
    const taskAuthor = taskElement.querySelector(".pAuthor").innerText;
    const taskYear = taskElement.querySelector(".pYear").innerText;

    const newBook = makeBook(taskTitle, taskAuthor, taskYear, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  
  
    for(book of books){
        const newBook = makeBook(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;
  
  
        if(book.isCompleted){
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
 }

 function addBookIsComplete() {
    const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const textTitle = document.getElementById("title").value;
    const textAuthor = document.getElementById("author").value;
    const textYear = document.getElementById("year").value;

    const newBook = makeBook(textTitle, textAuthor, textYear);
    const completeBookObject = composeBookObject(textTitle, textAuthor, textYear, true);
  
    newBook[BOOK_ITEMID] = completeBookObject.id;
    books.push(completeBookObject);

    completedBOOKList.append(newBook);
    updateDataToStorage();
}

function undoTaskFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const taskTitle = taskElement.querySelector(".inner > h3").innerText;
    const taskAuthor = taskElement.querySelector(".pAuthor").innerText;
    const taskYear = taskElement.querySelector(".pYear").innerText;

    const newBook = makeBook(taskTitle, taskAuthor, taskYear, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}