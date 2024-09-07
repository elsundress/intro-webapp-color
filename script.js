// script.js

// Seleccionar los elementos del DOM
const redRange = document.getElementById('redRange');
const greenRange = document.getElementById('greenRange');
const blueRange = document.getElementById('blueRange');
const redInput = document.getElementById('redInput');
const greenInput = document.getElementById('greenInput');
const blueInput = document.getElementById('blueInput');
const colorBox = document.getElementById('colorBox');
const hexValue = document.getElementById('hexValue');
const copyHexButton = document.getElementById('copyHex');
const randomColorButton = document.getElementById('randomColor');

// Función para actualizar el color
function updateColor() {
    const red = parseInt(redRange.value);
    const green = parseInt(greenRange.value);
    const blue = parseInt(blueRange.value);

    // Sincronizar las entradas numéricas con los controles deslizantes
    redInput.value = red;
    greenInput.value = green;
    blueInput.value = blue;

    // Actualizar el color del recuadro
    const rgbColor = `rgb(${red}, ${green}, ${blue})`;
    colorBox.style.backgroundColor = rgbColor;

    // Convertir a hexadecimal y mostrarlo
    const hexColor = rgbToHex(red, green, blue);
    hexValue.value = hexColor;
}

// Función para actualizar los controles deslizantes desde los inputs
function updateSlidersFromInputs() {
    let red = parseInt(redInput.value);
    let green = parseInt(greenInput.value);
    let blue = parseInt(blueInput.value);

    // Validar los valores
    red = isNaN(red) || red < 0 ? 0 : red > 255 ? 255 : red;
    green = isNaN(green) || green < 0 ? 0 : green > 255 ? 255 : green;
    blue = isNaN(blue) || blue < 0 ? 0 : blue > 255 ? 255 : blue;

    // Actualizar los inputs con valores validados
    redInput.value = red;
    greenInput.value = green;
    blueInput.value = blue;

    // Sincronizar los controles deslizantes con los valores ingresados manualmente
    redRange.value = red;
    greenRange.value = green;
    blueRange.value = blue;

    // Actualizar el color del recuadro
    const rgbColor = `rgb(${red}, ${green}, ${blue})`;
    colorBox.style.backgroundColor = rgbColor;

    // Convertir a hexadecimal y mostrarlo
    const hexColor = rgbToHex(red, green, blue);
    hexValue.value = hexColor;
}

// Función para convertir RGB a Hexadecimal
function rgbToHex(r, g, b) {
    const toHex = (num) => {
        const hex = num.toString(16).toUpperCase();
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Función para copiar el código hexadecimal al portapapeles
function copyHex() {
    hexValue.select();
    hexValue.setSelectionRange(0, 99999); // Para dispositivos móviles
    navigator.clipboard.writeText(hexValue.value)
        .then(() => {
            // Mostrar una notificación
            copyHexButton.innerHTML = '<i class="bi bi-check-circle-fill text-success"></i>';
            setTimeout(() => {
                copyHexButton.innerHTML = '<i class="bi bi-clipboard"></i>';
            }, 1500);
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
}

// Función para generar un color aleatorio
function generateRandomColor() {
    const randomValue = () => Math.floor(Math.random() * 256);
    const red = randomValue();
    const green = randomValue();
    const blue = randomValue();

    // Actualizar los controles deslizantes y inputs
    redRange.value = red;
    greenRange.value = green;
    blueRange.value = blue;
    redInput.value = red;
    greenInput.value = green;
    blueInput.value = blue;

    // Actualizar el color y el código hexadecimal
    updateColor();
}

// Añadir eventos a los sliders
redRange.addEventListener('input', updateColor);
greenRange.addEventListener('input', updateColor);
blueRange.addEventListener('input', updateColor);

// Añadir eventos a los inputs numéricos
redInput.addEventListener('input', updateSlidersFromInputs);
greenInput.addEventListener('input', updateSlidersFromInputs);
blueInput.addEventListener('input', updateSlidersFromInputs);

// Añadir evento al botón de copiar
copyHexButton.addEventListener('click', copyHex);

// Añadir evento al botón de color aleatorio
randomColorButton.addEventListener('click', generateRandomColor);

// Actualizar el color inicial al cargar la página
updateColor();
