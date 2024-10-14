const ENDPOINT = 'http://localhost:3000/dogs';


// Add event listener to the "Add" button to handle form submission
let addButton = document.getElementById('addButton');
addButton.addEventListener('click', function(e) {
    e.preventDefault();
    let breed = document.getElementById('breed').value;
    let name = document.getElementById('name').value;
    addDog(breed, name);
});


// Fetch the list of dogs from the API and display them
const getDogs = async () => {
    try {
        let response = await fetch(ENDPOINT);
        let data = await response.json();
        console.log(data);
        showDogs(data);
    } catch (error) {
        console.log(error);
    }
};


// Add a new dog to the database via the API
const addDog = async (breed, name) => {
    let newDog = {
        breed: breed,
        name: name
    };
    try {
        let response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDog)
        });
        let data = await response.json();
        console.log(data);
        getDogs(); // Refresh the list of dogs
    } catch (error) {
        console.error('Error:', error);
    }
};


// Delete a dog from the database via the API
const deleteDog = async (e, id) => {
    e.preventDefault();
    try {
        let response = await fetch(ENDPOINT + "/" + id, {
            method: 'DELETE'
        });
        let data = await response.json();
        console.log(data); // Log the response
        getDogs(); // Refresh the list of dogs
    } catch (error) {
        console.error('Error:', error);
    }
};


// Initial fetch to get the list of dogs
getDogs();


function showDogs(data) {
    let container = document.getElementById('showData');
    let table = document.createElement('table');
    table.innerHTML = '';
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');


    // Create header row
    let headerRow = document.createElement('tr');
    let breedHeader = document.createElement('th');
    breedHeader.innerText = 'Breed';
    let nameHeader = document.createElement('th');
    nameHeader.innerText = 'Name';
    let actionHeader = document.createElement('th');
    actionHeader.innerText = 'Actions';


    headerRow.appendChild(breedHeader);
    headerRow.appendChild(nameHeader);
    headerRow.appendChild(actionHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);


    // Create rows for each dog
    for (let dog of data) {
        let row = document.createElement('tr');


        let breedCell = document.createElement('td');
        breedCell.innerText = dog.breed;
        let nameCell = document.createElement('td');
        nameCell.innerText = dog.name;


        let actionCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function(e) {
            deleteDog(e, dog.id);
        });


        actionCell.appendChild(deleteButton);
        row.appendChild(breedCell);
        row.appendChild(nameCell);
        row.appendChild(actionCell);
        tbody.appendChild(row);
    }


    table.appendChild(tbody);
    container.appendChild(table);
}
