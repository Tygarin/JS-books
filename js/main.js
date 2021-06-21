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
const uploadForm = document.forms.uploadForm;
const writeForm = document.forms.writeForm;

if(localStorage.getItem('books')) {
    books = JSON.parse(localStorage.getItem('books'));
} else books = [];

uploadFormBtn.addEventListener('click', function() {
    let formData = new FormData(uploadForm);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://apiinterns.osora.ru/')
    xhr.send(formData);
    xhr.onload = function() {
        books.push({
            login:formData.get('login'),
            text:JSON.parse(this.response).text
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
})
writeFormBtn.addEventListener('click', function() {
    books.push({
        login: document.getElementById('writeInputLogin').value,
        text: document.getElementById('writeInputText').value
    })
    console.log(document.getElementById('writeInputLogin').value);
    localStorage.setItem('books', JSON.stringify(books));
})
