let write_btn = document.getElementById('write');
let upload_btn = document.getElementById('upload');
let write_inp = document.getElementById('writeinp');
let upload_inp = document.getElementById('uploadinp');
let innerWrite = document.querySelector('.innerWrite');
let innerUpload = document.querySelector('.innerUpload');

write_btn.addEventListener('click', ()=>{
    innerWrite.style.display = "block";
    innerUpload.style.display = "none";
    write_inp.checked = 'checked'
})

upload_btn.addEventListener('click', ()=>{
    innerWrite.style.display = "none";
    innerUpload.style.display = "block";
    upload_inp.checked = 'checked'
})

const uploadFormBtn = document.getElementById('uploadFormBtn');
const writeFormBtn = document.getElementById('writeFormBtn');
const booklist = document.getElementById('booklist');
const uploadForm = document.forms.uploadForm;
const writeForm = document.forms.writeForm;

if(localStorage.getItem('books')) {
    books = JSON.parse(localStorage.getItem('books'));
} else books = [];

class Book {
    constructor(i) {
        let li = document.createElement("li");
        let buttons = document.createElement("div");
        let read_button = document.createElement("button");
        let delete_button = document.createElement("button");
        let status_button = document.createElement("button");
        let edit_button = document.createElement("button");

        li.classList.add('li');
        read_button.classList.add('read_button');
        delete_button.classList.add('delete_button');
        status_button.classList.add('status_button');
        edit_button.classList.add('edit_button');
        
        li.innerHTML = JSON.parse(localStorage.getItem("books"))[i].login;
        read_button.innerText = 'Читать'
        delete_button.innerText = 'Удалить'
        status_button.innerText = 'Статус'
        edit_button.innerText = 'Изменить'

        booklist.appendChild(li);
        li.appendChild(buttons);
        buttons.appendChild(read_button);
        buttons.appendChild(delete_button);
        buttons.appendChild(status_button);
        buttons.appendChild(edit_button);

        delete_button.onclick = () => {
            li.remove();
            books.splice(i, 1);
            localStorage.setItem('books', JSON.stringify(books));
        }
        status_button.onclick = () => {
            if(li.style.background == 'green') {
                li.style.background = 'gray';
            } else {
                li.style.background = 'green';
            }
            if(books[i].readed == false) {
                books[i].readed = true
            } else {
                books[i].readed = false
            }
            localStorage.setItem('books', JSON.stringify(books));
        }
        read_button.onclick = () => {
            document.getElementById('content').innerText=books[i].text;
        }
    }
}

if(localStorage.getItem("books")) {
    for (i = 0; i < JSON.parse(localStorage.getItem("books")).length; i++) {
        new Book(i);
    }
}

uploadFormBtn.addEventListener('click', function() {
    let formData = new FormData(uploadForm);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://apiinterns.osora.ru/')
    xhr.send(formData);
    xhr.onload = function() {
        books.push({
            login:formData.get('login'),
            text:JSON.parse(this.response).text,
            readed: false
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
    setTimeout(()=> {
        let Books = new Book(JSON.parse(localStorage.getItem("books")).length - 1);
    }, 100)
})
writeFormBtn.addEventListener('click', function() {
    books.push({
        login: document.getElementById('writeInputLogin').value,
        text: document.getElementById('writeInputText').value,
        readed: false
    })
    console.log(document.getElementById('writeInputLogin').value);
    localStorage.setItem('books', JSON.stringify(books));
    let Books = new Book(JSON.parse(localStorage.getItem("books")).length - 1);
})
