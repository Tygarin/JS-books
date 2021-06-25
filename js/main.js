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
        let liName = document.createElement("p");
        let buttons = document.createElement("div");
        let read_button = document.createElement("button");
        let delete_button = document.createElement("button");
        let status_button = document.createElement("button");
        let edit_button = document.createElement("button");

        liName.classList.add('liName')
        li.classList.add('li');
        read_button.classList.add('read_button');
        delete_button.classList.add('delete_button');
        status_button.classList.add('status_button');
        edit_button.classList.add('edit_button');
        
        liName.innerHTML = JSON.parse(localStorage.getItem("books"))[i].login;
        read_button.innerText = 'Читать'
        delete_button.innerText = 'Удалить'
        status_button.innerText = 'Статус'
        edit_button.innerText = 'Изменить'
        li.draggable = 'true'

        booklist.appendChild(li);
        li.appendChild(liName);
        li.appendChild(buttons);
        buttons.appendChild(read_button);
        buttons.appendChild(delete_button);
        buttons.appendChild(status_button);
        buttons.appendChild(edit_button);

        delete_button.onclick = () => {
            li.remove();
            console.log(books[i]);
            books.splice(i, 1);
            localStorage.setItem('books', JSON.stringify(books));
        }
        status_button.onclick = () => {
            books[i].readed == false ? books[i].readed = true : books[i].readed = false
            books[i].readed == true ? li.style.background = 'green' : li.style.background = 'gray'
            // if(books[i].readed == true) {
            //     books.unshift(books[i]);
            //     books.splice((i+1), 1);
            // }
            localStorage.setItem('books', JSON.stringify(books));
        }
        read_button.onclick = () => {
            document.getElementById('content').innerText=books[i].text;
        }
        edit_button.onclick = () => {
            const edit_form = document.getElementById('edit_form');
            const editLogin = document.getElementById('EditInputLogin');
            const editText = document.getElementById('EditInputText');
            const editModalBtn = document.getElementById('EditFormBtn');

            edit_form.style.display = 'block';
            editLogin.value = books[i].login;
            editText.innerHTML = books[i].text.split('\n').join('');

            editModalBtn.onclick = () => {
                books[i].login = editLogin.value;
                books[i].text = editText.value;
                localStorage.setItem('books', JSON.stringify(books));
                liName.innerText = books[i].login;
                edit_form.style.display = 'none';
                document.getElementById('content').innerText = books[i].text;
            }
        }

        //grag and drop
        const bestBookZone = document.getElementById('bestBookZone');
        const booklistZone = document.querySelector('.booklist')
        li.addEventListener('dragstart', (event) => {
            event.target.classList.add('selected');
        })
        li.addEventListener('dragend', (event) => {
            event.target.classList.remove('selected');
            if(li.parentElement == bestBookZone) {
                books[i].isfavourite = true
                console.log(books[i].isfavourite);
            } else books[i].isfavourite = false
            localStorage.setItem('books', JSON.stringify(books));
        })
        bestBookZone.ondragover = allowDrop;
        booklistZone.ondragover = allowDrop;
        booklistZone.ondrop = drop;
        bestBookZone.ondrop = drop;
        
        function allowDrop(event) {
            event.preventDefault();
        }
        
        function drop(event) {
            localStorage.setItem('books', JSON.stringify(books));
            event.target.append(document.querySelector('.selected'));
            console.log('drop');
        }
        books[i].isfavourite == true ? bestBookZone.appendChild(li) : booklistZone.appendChild(li)
    }
}

function render() {
    if(localStorage.getItem("books")) {
        for (i = 0; i < JSON.parse(localStorage.getItem("books")).length; i++) {
            new Book(i);
        }
    }
}
render()

let li = document.querySelectorAll('.li');
for(i = 0; i<li.length; i++) {
    books[i].readed == true ? li[i].style.background = 'green' : li[i].style.background = 'gray'
    localStorage.setItem('books', JSON.stringify(books));
}

uploadFormBtn.addEventListener('click', function() {
    let formData = new FormData(uploadForm);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://apiinterns.osora.ru/')
    xhr.send(formData);
    xhr.onload = function() {
        let answer = this.response;
        books.push({
            login:formData.get('login'),
            text:JSON.parse(answer).text,
            readed: false
        })
        localStorage.setItem('books', JSON.stringify(books));
        let Books = new Book(JSON.parse(localStorage.getItem("books")).length - 1);
    }
})

writeFormBtn.addEventListener('click', function() {
    books.push({
        login: document.getElementById('writeInputLogin').value,
        text: document.getElementById('writeInputText').value,
        readed: false,
        isfavourite: false
    })
    console.log(document.getElementById('writeInputLogin').value);
    localStorage.setItem('books', JSON.stringify(books));
    let Books = new Book(JSON.parse(localStorage.getItem("books")).length - 1);
})

