const dogUrl = 'http://localhost:3000/dogs'

const registeredDogTable = document.getElementById('table-body')

const editNameField = document.getElementById('edit-dog-name')
const editBreedField = document.getElementById('edit-dog-breed')
const editSexField = document.getElementById('edit-dog-sex')

// fetch data and render registered dogs
fetch(dogUrl)
    .then(r => r.json())
    .then(dogData => renderDogs(dogData))

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

        registeredDogTable.appendChild(dogRow)
    })
}

// render dog data in "edit existing dog" form
function editDog(singleDog) {
    editNameField.value = singleDog.name
    editBreedField.value = singleDog.breed
    editSexField.value = singleDog.sex
}