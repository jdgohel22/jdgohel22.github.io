// adding the note will store the note in the local storage
showNotes();
fadeAnimation();

// Add Button JS==========================================================

document.getElementById('clear').addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function() {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notesbody = localStorage.getItem("notesbody");
    if (notesbody == null) {
        let notesObj = [];
    } else {
        notesObj = JSON.parse(notesbody);
    }
    if (validate()) {
        notesObj.push({ title: addTitle.value, body: addTxt.value })
        localStorage.setItem("notesbody", JSON.stringify(notesObj));
        addTxt.value = "";
        addTitle.value = "";
    }
    showNotes();
})

// Function To Validate Notes

function validate() {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    if (addTitle.value == null || addTitle.value === '' || addTxt.value === '' || addTxt.value == null) {

        alert("Kuch Likh To Sahi Bhai.......Khali Note Ka Kya Karega !!!!!!!");
        return false;
    } else {
        return true;
    }
}

// function to show the notes from localStorage

function showNotes() {

    document.getElementById('all-notes').classList.add('text-decoration-underline');
    document.getElementById('marked-notes').classList.remove('text-decoration-underline');
    let notesbody = localStorage.getItem("notesbody");
    let notesbox = document.getElementById("notes");
    if (notesbody == null) {
        notesObj = [];
        notesbox.innerHTML = "Click add notes to add a note";
    } else {
        notesObj = JSON.parse(notesbody);
        let html1 = "";
        notesObj.forEach(function(element, index) {
            html1 += `
            <div class="card col-lg-4 my-2 p-2 note-card border-3">
            <div class="card-body">
            <div class="heading d-flex">
                <h4 class="card-title">${element.title}</h4>
                <div class="star btn btn-warning d-flex justify-content-center align-items-center" id="star">Star</div>
            </div>
                <hr>
                    <p class="card-text">${element.body}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-primary" id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
                        <button class="btn btn-danger" id="${index}" onclick="dow(this.id)">Download</button>
                    </div>
                </div>
            </div>`
        });
        if (notesObj.length > 0) {
            notesbox.innerHTML = html1;
        }
        if (notesbox.innerHTML == '') {
            notesbox.innerHTML = "Click add notes to add a note";
        }

    }
    mark();
    let star = document.getElementsByClassName('star');
    Array.from(star).forEach(function(element, index) {
        element.addEventListener("click", function() {
            notesObj[index].mark = true;
            localStorage.setItem("notesbody", JSON.stringify(notesObj));
            // location.reload();
            mark();
        })

    })
}

// Function To show Marked Notes

function mark() {
    let star = document.querySelectorAll('.star');
    Array.from(star).forEach(function(element, index) {
        if (notesObj[index].mark == true) {
            element.parentElement.parentElement.parentElement.classList.add('yellow');
        }
    })
}

// Function To Delete NOte

function deleteNote(index) {
    let notesbody = localStorage.getItem("notesbody");
    if (notesbody == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notesbody);
    }
    // console.log(index + " You selected");
    notesObj.splice(index, 1);
    localStorage.setItem("notesbody", JSON.stringify(notesObj));
    showNotes();
}

// Searching js

let search = document.getElementById('search');
search.addEventListener("input", function() {
    let searchVal = search.value.toLowerCase();
    if (searchVal == "") {
        showNotes();
    }

    let note_card = document.getElementsByClassName("note-card");
    Array.from(note_card).forEach(function(element) {
        let cardTxt = element.getElementsByClassName('card-text')[0].innerText.toLowerCase();
        let cardTitle = element.getElementsByClassName('card-title')[0].innerText.toLowerCase();
        if (cardTxt.includes(searchVal) || cardTitle.includes(searchVal)) {
            element.classList.add("d-block");
        } else {
            element.classList.add("d-none");
        }
    })
})

// Animation of fade-in

function fadeAnimation() {
    let NoteCard = document.getElementsByClassName("note-card");
    Array.from(NoteCard).forEach(function(element) {
        element.classList.add('fade-in');
    })
    document.getElementById('notes').addEventListener("animationend", function() {
        Array.from(NoteCard).forEach(function(element) {
            element.classList.remove('fade-in');
        })
    })
}

document.getElementById('marked-notes').addEventListener('click', markedNote);
document.getElementById('all-notes').addEventListener('click', allNotes);

function allNotes() {
    showNotes();
    fadeAnimation();

}
//Show Only marked notes

function markedNote() {
    fadeAnimation();
    document.getElementById('marked-notes').classList.add('text-decoration-underline')
    document.getElementById('all-notes').classList.remove('text-decoration-underline')
    var NoteCard = document.getElementsByClassName("note-card");
    Array.from(NoteCard).forEach(function(element) {
        if (element.className.includes("yellow")) {
            element.classList.add('d-block');
        } else {
            element.classList.add('d-none');
        }
    })
}
// Downloading Js
function dow(index) {
    let notesbody = localStorage.getItem("notesbody");
    if (notesbody == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notesbody);
    }
    let data = `
Title:-
${notesObj[index].title}

Your Note:-
${notesObj[index].body}
    `;
    const blob = new Blob([data], {
        type: "text/plain"
    });
    const href = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
        href,
        style: "display:none",
        download: `${notesObj[index].title}.txt`,
    });
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(href);
    a.remove();
}

$(document).ready(function() {
    $(document).scroll(function() {
        if (window.pageYOffset > 80) {
            $('.navbar').addClass('bg-info').removeClass('bg-transparent');
        } else {
            $('.navbar').addClass('bg-transparent').removeClass('bg-info');
        }
    })
})