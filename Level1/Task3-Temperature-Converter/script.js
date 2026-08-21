// Get elements from the HTML
const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");

const convertBtn = document.getElementById("convertBtn");
const clearBtn = document.getElementById("clearBtn");

const resultValue = document.getElementById("resultValue");
const errorMessage = document.getElementById("errorMessage");


// Convert temperature
convertBtn.addEventListener("click", function () {

    // Get input value
    const temperature = parseFloat(temperatureInput.value);

    // Get selected unit
    const unit = unitSelect.value;


    // Clear previous error
    errorMessage.style.display = "none";
    errorMessage.textContent = "";


    // Check for empty or invalid input
    if (temperatureInput.value.trim() === "" || isNaN(temperature)) {

        showError("Please enter a valid temperature.");

        return;
    }


    // Check absolute zero
    if (unit === "celsius" && temperature < -273.15) {

        showError(
            "Celsius temperature cannot be below -273.15°C."
        );

        return;
    }


    if (unit === "fahrenheit" && temperature < -459.67) {

        showError(
            "Fahrenheit temperature cannot be below -459.67°F."
        );

        return;
    }


    if (unit === "kelvin" && temperature < 0) {

        showError(
            "Kelvin temperature cannot be below 0 K."
        );

        return;
    }


    // Variables for converted values
    let celsius;
    let fahrenheit;
    let kelvin;


    // Celsius conversion
    if (unit === "celsius") {

        celsius = temperature;

        fahrenheit = (celsius * 9 / 5) + 32;

        kelvin = celsius + 273.15;
    }


    // Fahrenheit conversion
    else if (unit === "fahrenheit") {

        fahrenheit = temperature;

        celsius = (fahrenheit - 32) * 5 / 9;

        kelvin = celsius + 273.15;
    }


    // Kelvin conversion
    else if (unit === "kelvin") {

        kelvin = temperature;

        celsius = kelvin - 273.15;

        fahrenheit = (celsius * 9 / 5) + 32;
    }


    // Display result
    resultValue.textContent =
        `${formatNumber(celsius)} °C | ` +
        `${formatNumber(fahrenheit)} °F | ` +
        `${formatNumber(kelvin)} K`;

});


// Clear button
clearBtn.addEventListener("click", function () {

    temperatureInput.value = "";

    unitSelect.value = "celsius";

    resultValue.textContent = "—";

    errorMessage.textContent = "";

    errorMessage.style.display = "none";

});


// Show error message
function showError(message) {

    errorMessage.textContent = message;

    errorMessage.style.display = "block";

    resultValue.textContent = "—";
}


// Format numbers
function formatNumber(number) {

    return Number(number.toFixed(2));
}