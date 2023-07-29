const dogUrl = 'http://localhost:3000/dogs'

const registeredDogTable = document.getElementById('table-body')

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

        const dogBtnCell = document.createElement('td')
        dogBtnCell.appendChild(dogEditBtn)

        const dogRow = document.createElement('tr')
        dogRow.append(dogName, dogBreed, dogSex, dogBtnCell)

        registeredDogTable.appendChild(dogRow)
    })
}