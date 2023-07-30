const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const listBin = document.getElementById("dialog-list")

function addTask() {
    if (inputBox.value === "") {
        alert("You must enter your text!");
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        
        // Create a cross icon
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener('click', function(e) {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName == "SPAN") {

        // Debug
        console.log("Content của thẻ <li>: " + e.target.parentElement.childNodes[0].textContent)
        
        // Thêm task vào trash bin
        let li = document.createElement('li');
        li.innerHTML = e.target.parentElement.childNodes[0].textContent;
        addToBin(li);

        // Add remove and restore button
        let closeSpan = document.createElement('div');
        closeSpan.id = 'close-span';
        let restoreSpan = document.createElement('div');
        restoreSpan.id = 'restore-span'
        let span = document.createElement('span');
        closeSpan.innerHTML = '\u00d7';
        restoreSpan.innerHTML = '\u267a';
        span.appendChild(restoreSpan);
        span.appendChild(closeSpan);
        li.appendChild(span);

        // Xóa task khỏi danh sách
        e.target.parentElement.remove();
        saveData();
    }
}, false)

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
function addToBin(task) {
    listBin.appendChild(task);
    localStorage.setItem("trash", listBin.innerHTML);
}
function showTasks() {
    listContainer.innerHTML = localStorage.getItem("data");
}

function openBinDialog() {
    
}

showTasks();

// Trash bin script
// 1. Declare selector variables
// 2. Add listener to the open-modal button for each click for opening
// 3. Create function to active modal
// 4. Create function to deactive modal
// 5. Add listener to the close-modal button for closing the modal
// 6. Add listener to the overlay for closing the modal by clicking outside of the modal

const openBinButtons = document.querySelectorAll('[data-modal-target]');
const closeBinButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openBinButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    })
    console.log('Click open button');
})

closeBinButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.dialog-container');
        closeModal(modal);
    })
    console.log('Click close button');
})

overlay.addEventListener('click', () => {
    // const modal = overlay.parentNode;
    // closeModal(modal);
    const modals = document.querySelectorAll('.dialog-container.active');
    modals.forEach(modal => {
        closeModal(modal);
    })
    console.log('Click overlay');
})

function openModal(modal) {
    if (modal === null) {
        console.log("modal is null");
        return;
    };
    modal.classList.add('active');
    overlay.classList.add('active');
    console.log('Open modal');
}

function closeModal(modal) {
    if (modal === null) {
        console.log("modal is null");
        return;
    };
    modal.classList.remove('active');
    overlay.classList.remove('active');
    console.log('Close modal');
}