const STORAGE_KEY = '__bool-xmas-list__'

const totalSlot = document.querySelector('.total-slot')
const giftsListElement = document.querySelector('.gifts-list')
const form = document.querySelector('#gift-form')
const nameField = document.querySelector('#name-field')
const priceField = document.querySelector('#price-field')
const descriptionField = document.querySelector('#description-field')

let gifts = []

const prevList = localStorage.getItem(STORAGE_KEY)
if (prevList) {
    gifts = JSON.parse(prevList)

    calculateToal()

    renderList()
}


form.addEventListener('submit', function(event) {
    // stop page loading
    event.preventDefault()

    // get value's field
    const name = nameField.value.trim()
    const price = priceField.value.trim()
    const description = descriptionField.value.trim()

    // add gits to list
    addGift(name, price, description)

    // clean form
    form.reset()

    // bring focus to the name
    nameField.focus()
})


function addGift(name, price, description) {
    const newGift = {
        name,
        price: Number(price),
        description
    }

    gifts.push(newGift)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts))

    calculateToal()

    renderList()
}


function calculateToal() {
    let total = 0
    for (let i = 0; i < gifts.length; i++) {
        total += gifts[i].price
    }

    totalSlot.innerText = formatAmount(total)
}


function formatAmount(value) {
    return value.toFixed(2) + '€'
}


function renderList() {
    giftsListElement.innerHTML = ''

    for (let i = 0; i < gifts.length; i++) {
        const giftElement = createListElement(i)
        giftsListElement.innerHTML += giftElement
    }

    setDeleteButtons()
}


function createListElement(giftIndex) {

    const gift = gifts[giftIndex]

    return `
    <li class="gift">
        <div class="gift-info">
            <h3>${gift.name}</h3>
            <p>${gift.description}</p>
        </div>
        <strong class="gift-price">${formatAmount(gift.price)}</strong>
        <button class="gift-button" data-index="${giftIndex}">❌</button>
    </li>
    `
}


function setDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.gift-button')

    for (let i = 0; i < deleteButtons.length; i++) {
        const button = deleteButtons[i]

        button.addEventListener('click', function() {
            const index = button.dataset.index
            removeGift(index)
        })
    }
}


function removeGift(index) {
    gifts.splice(index, 1)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts))

    calculateToal()

    renderList()
}