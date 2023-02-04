// adding the note will store the note in the local storage
showNotes();
let star = document.querySelectorAll('.star');

for (let i = 0; i < star.length; i++) {

    star[i].addEventListener("click", function mark() {
        this.parentElement.parentElement.classList.add('yellow');
    })
}

let addBtn = document.getElementById("addBtn");
document.getElementById('clear').addEventListener("click", function() {
    localStorage.clear();
    location.reload();

})

addBtn.addEventListener("click", function(e) {
    let addTxt = document.getElementById("addTxt");
    let notesbody = localStorage.getItem("notesbody");
    let notestitle = localStorage.getItem("notestitle");
    if (notesbody == null) {
        notesObj = [];
        notesTitleobj = [];
    } else {
        notesObj = JSON.parse(notesbody);
        notesTitleobj = JSON.parse(notestitle);
    }
    notesObj.push(addTxt.value);
    notesTitleobj.push(addTitle.value);
    localStorage.setItem("notesbody", JSON.stringify(notesObj));
    localStorage.setItem("notestitle", JSON.stringify(notesTitleobj));
    addTxt.value = "";
    addTitle.value = ""
        // console.log(notesObj);
        // console.log(notesTitleobj);
    location.reload();
    showNotes();
})

// function to show the notes from localStorage

function showNotes() {
    let notesbody = localStorage.getItem("notesbody");
    let notestitle = localStorage.getItem("notestitle");
    let notesbox = document.getElementById("notes");
    if (notesbody == null) {
        notesObj = [];
        notesTitleobj = [];
        notesbox.innerHTML = "Click add notes to add a note";
    } else {
        notesObj = JSON.parse(notesbody);
        notesTitleobj = JSON.parse(notestitle);

        let html1 = "";
        let html2 = "";

        notesObj.forEach(function(element, index) {
            html1 += `<div class="card col-lg-3 m-2 note-card">
            <div class="card-body">
            <div class="star btn btn-warning" id="star">Star</div>
                <h3 class="card-title">${notesTitleobj[index]}</h3>
                <hr>
                    <p class="card-text">${element}</p>
                    <div class="px-0">
                        <button class="btn btn-primary" id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
                    </div>
                </div>
            </div>`

        });
        if (notesObj.length >= 0) {
            notesbox.innerHTML = html1;
        }
        if (notesbox.innerHTML == '') {
            notesbox.innerHTML = "Click add notes to add a note";
        }
    }

}

function deleteNote(index) {
    let notesbody = localStorage.getItem("notesbody");
    let notestitle = localStorage.getItem("notestitle");
    if (notesbody == null) {
        notesObj = [];
        notesTitleobj = [];
    } else {
        notesObj = JSON.parse(notesbody);
        notesTitleobj = JSON.parse(notestitle);
    }
    notesObj.splice(index, 1);
    notesTitleobj.splice(index, 1);
    localStorage.setItem("notesbody", JSON.stringify(notesObj));
    localStorage.setItem("notestitle", JSON.stringify(notesTitleobj));
    location.reload();
    showNotes();
}


let search = document.getElementById('search');
search.addEventListener("input", function(e) {
    let searchVal = search.value.toLowerCase();
    if (searchVal == "") {
        showNotes();
    }
    let note_card = document.getElementsByClassName("note-card");
    Array.from(note_card).forEach(function(element) {
        let cardTxt = element.getElementsByClassName('card-text')[0].innerText;
        let cardTitle = element.getElementsByClassName('card-title')[0].innerText;
        if (cardTxt.includes(searchVal) || cardTitle.includes(searchVal)) {
            element.classList.add("d-block");
        } else {
            element.classList.add("d-none");
        }
    })
})