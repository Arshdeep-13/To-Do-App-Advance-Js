let container = document.getElementById('text');
let input = document.getElementById('input');
let addButton = document.getElementById('add');

//function to add key and values in localstorage
const addLocalValues = (key, value) => {
    let newContainer = document.createElement('div');
    newContainer.setAttribute('id', 'newContainer');

    let left = document.createElement('div');
    left.setAttribute('id', 'left');

    let right = document.createElement('div');
    right.setAttribute('id', 'right');

    let newPencil = document.createElement('button');
    newPencil.setAttribute('id', 'newPencil');
    newPencil.innerHTML = '<i class="fa-solid fa-pencil fa-2xl"></i>';

    let newCheck = document.createElement('input');
    newCheck.setAttribute('id', 'newCheck');
    newCheck.setAttribute('type', 'checkbox');

    let newButton = document.createElement('button');
    newButton.setAttribute('id', 'newButton');
    newButton.innerHTML = '<i class="fa-solid fa-trash fa-bounce fa-2xl" style="color: black;"></i>';

    // Set the checkbox's checked property based on the value from localStorage
    let isChecked = localStorage.getItem(key) === "true";
    newCheck.checked = isChecked;
    left.innerHTML = key;
    newContainer.appendChild(left);
    // update the task is done or not
    right.appendChild(newPencil);
    right.appendChild(newCheck);
    right.appendChild(newButton);


    newContainer.appendChild(right);
    container.appendChild(newContainer);

    newButton.addEventListener('click', () => {
        localStorage.removeItem(key); // Use the key, not innerText
        container.removeChild(newContainer);
    })
}

//function to check whether localStorage is empty or not
if (localStorage.length != 0) {
    for (let i = 0; i < localStorage.length; i++) {
        addLocalValues(Object.keys(localStorage)[i], Object.values(localStorage)[i]);
        // console.log(Object.keys(localStorage)[i], Object.values(localStorage)[i]);
        // console.log(Object.keys(localStorage)[i]);
        // console.log(Object.values(localStorage)[i]);        
    }
}

input.addEventListener('keypress', (e) => {
    if (e.key === "Enter" && input.value != "") {
        let newContainer = document.createElement('div');
        newContainer.setAttribute('id', 'newContainer');

        let left = document.createElement('div');
        left.setAttribute('id', 'left');

        let right = document.createElement('div');
        right.setAttribute('id', 'right');
        let newCheck = document.createElement('input');
        newCheck.setAttribute('id', 'newCheck');
        newCheck.setAttribute('type', 'checkbox')
        let newButton = document.createElement('button');
        newButton.setAttribute('id', 'newButton');
        newButton.innerHTML = '<i class="fa-solid fa-trash fa-bounce fa-2xl" style="color: black;"></i>';
        let newPencil = document.createElement('button');
        newPencil.setAttribute('id', 'newPencil');
        newPencil.innerHTML = '<i id="newPencil" class="fa-solid fa-pencil fa-2xl"></i>';


        left.innerHTML = input.value;
        newContainer.appendChild(left);
        right.appendChild(newPencil);
        right.appendChild(newCheck);
        right.appendChild(newButton);
        newContainer.appendChild(right);
        container.appendChild(newContainer);

        //adding to local Storage
        localStorage.setItem(input.value, false);
        input.value = "";

        newButton.addEventListener('click', () => {
            localStorage.removeItem(newButton.parentElement.parentElement.innerText);
            container.removeChild(newContainer);
        })
    }
})

// function to update localStorage on the based on task complete
container.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        const isChecked = e.target.checked;
        const textContent = e.target.parentElement.parentElement.querySelector('#left').textContent;
        localStorage.setItem(textContent, isChecked);
    }
});

//function to edit div text by using pencil symbol
container.addEventListener('click', (e) => {
    if (e.target.id === 'newPencil') {
        const taskContainer = e.target.parentElement.parentElement.parentElement;
        const taskTextElement = taskContainer.querySelector('#left');
        // Store the old value before editing
        const oldValue = taskTextElement.textContent;
        taskTextElement.contentEditable = true;
        taskTextElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                taskTextElement.contentEditable = false;
                const newValue = taskTextElement.textContent;
                // Remove the old value from localStorage
                localStorage.removeItem(oldValue);
                // Set the updated value in localStorage
                localStorage.setItem(newValue, false);
                // Update the task text content
                taskTextElement.textContent = newValue;
            }
        });
    }
});

addButton.addEventListener('click', (e) => {
    if (input.value == '') {
        alert("Plz add enter something to add");
    } else {
        let newContainer = document.createElement('div');
        newContainer.setAttribute('id', 'newContainer');

        let left = document.createElement('div');
        left.setAttribute('id', 'left');

        let right = document.createElement('div');
        right.setAttribute('id', 'right');
        let newCheck = document.createElement('input');
        newCheck.setAttribute('id', 'newCheck');
        newCheck.setAttribute('type', 'checkbox')
        let newButton = document.createElement('button');
        newButton.setAttribute('id', 'newButton');
        newButton.innerHTML = '<i class="fa-solid fa-trash fa-bounce fa-2xl" style="color: black;"></i>';
        let newPencil = document.createElement('button');
        newPencil.setAttribute('id', 'newPencil');
        newPencil.innerHTML = '<i class="fa-solid fa-pencil fa-2xl"></i>';


        left.innerHTML = input.value;
        newContainer.appendChild(left);
        right.appendChild(newPencil);
        right.appendChild(newCheck);
        right.appendChild(newButton);
        newContainer.appendChild(right);
        container.appendChild(newContainer);

        //adding to local Storage
        localStorage.setItem(input.value, false);
        input.value = "";

        newButton.addEventListener('click', () => {
            localStorage.removeItem(newButton.parentElement.parentElement.innerText);
            container.removeChild(newContainer);
        })
    }
    // function to update localStorage on the based on task complete
    const list = document.querySelectorAll("input[type=checkbox]");

    for (const checkbox of list) {
        checkbox.addEventListener('click', () => {
            const isChecked = checkbox.checked;
            const textContent = checkbox.parentElement.parentElement.textContent;

            localStorage.setItem(textContent, isChecked);
        });

        // Initialize the checkbox state based on localStorage
        const textContent = checkbox.parentElement.parentElement.textContent;
        const isChecked = localStorage.getItem(textContent) === 'true';

        checkbox.checked = isChecked;
    }
});