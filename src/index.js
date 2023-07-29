const dogUrl = 'http://localhost:3000/dogs'

// elements needed for functions
const registeredDogTable = document.getElementById('table-body')

const editDogForm = document.getElementById('dog-form')
editDogForm.onsubmit = (e) => {
    e.preventDefault()
    updateDog()
}

const editNameField = document.getElementById('edit-dog-name')
const editBreedField = document.getElementById('edit-dog-breed')
const editSexField = document.getElementById('edit-dog-sex')

// core deliverable functions
fetchDogData()

// fetch data and render registered dogs
function fetchDogData() {
    fetch(dogUrl)
    .then(r => r.json())
    .then(dogData => renderDogs(dogData))
}

function renderDogs(allDogs) {
    allDogs.forEach((singleDog) => {
        const dogName = document.createElement('td')
        dogName.innerText = singleDog.name

        const dogBreed = document.createElement('td')
        dogBreed.innerText = singleDog.breed

        const dogSex = document.createElement('td')
        dogSex.innerText = singleDog.sex

        const dogEditBtn = document.createElement('button')
        dogEditBtn.innerText = "Edit Dog"
        dogEditBtn.onclick = () => editDog(singleDog)

        const dogBtnCell = document.createElement('td')
        dogBtnCell.appendChild(dogEditBtn)

        const dogRow = document.createElement('tr')
        dogRow.append(dogName, dogBreed, dogSex, dogBtnCell)
        dogRow.id = singleDog.id;

        registeredDogTable.appendChild(dogRow)
    })
}

// render dog data in "edit existing dog" form
function editDog(singleDog) {
    editDogForm.id = singleDog.id
    editNameField.value = singleDog.name
    editBreedField.value = singleDog.breed
    editSexField.value = singleDog.sex
}

// on submit, send PATCH request to update dog info
// re-render table with new dog info
function updateDog() {
    let dogId = editDogForm.id
    let newDogName = editNameField.value
    let newDogBreed =editBreedField.value
    let newDogSex = editSexField.value

    fetch(dogUrl + "/" + dogId, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accepts': 'application/json'
        },
        body: JSON.stringify( {
            name: newDogName,
            breed: newDogBreed,
            sex: newDogSex
        })
    })
    editDogForm.reset()
    registeredDogTable.innerText = ''
    fetchDogData()
}