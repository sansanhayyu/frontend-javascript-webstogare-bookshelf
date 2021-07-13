document.addEventListener("DOMContentLoaded", function () {
 
    const submitForm = document.getElementById("form");

    const checkboxBook = document.getElementById("checkbox-book-is-complete");
 
    submitForm.addEventListener("submit", function (event) {
        if(checkboxBook.checked) {
            addBookIsComplete();
        } else {
            event.preventDefault();
            addBook();
        }
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    alert("Data berhasil disimpan.");
 });

 document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
 });