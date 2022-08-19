const DEFAULT_COLOR = "#333"
const DEFAULT_MODE = "color"
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE


const colorPicker = document.querySelector("#colorPicker")
const colorBtn = document.querySelector("#colorBtn")
const rainbowBtn = document.querySelector("#rainbowBtn")
const eraserBtn = document.querySelector("#eraserBtn")
const clearBtn = document.querySelector("#clearBtn")
const sizeValue = document.querySelector("#sizeValue")
const container = document.querySelector(".grid-container")
const sizeDisplay = document.querySelector(".sizeDisplay")





function clearGrid() {
    container.innerHTML = ""
}

function setCurrentColor(color) {
    currentColor = color
}

function setCurrentSize(size) {
    currentSize = size
}

function setCurrentMode(mode) {
    activateButton(mode)
    currentMode = mode
}

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
    sizeDisplay.innerHTML = `${value}x${value}`
    sizeValue.value = ""
}

function reloadGrid() {
    clearGrid()
    createGrid(currentSize)
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function createGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        container.appendChild(gridElement)
    }


}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
    }
}


function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
        colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active')
    }

    if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
        colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active')
    }
}


colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
eraserBtn.onclick = () => setCurrentMode('eraser')
clearBtn.onclick = () => reloadGrid()
sizeBtn.onclick = () => changeSize(sizeValue.value)


window.onload = () => {
    createGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
}