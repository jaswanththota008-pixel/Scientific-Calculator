const display = document.getElementById("display");

// =========================
// BASIC FUNCTIONS
// =========================

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// =========================
// FORMAT RESULT
// =========================

function formatResult(value) {
    if (!Number.isFinite(value)) {
        return "Error";
    }

    return Number(value.toFixed(5));
}

// =========================
// FACTORIAL
// =========================

function factorial(n) {
    n = Number(n);

    if (n < 0 || !Number.isInteger(n)) {
        return NaN;
    }

    let result = 1;

    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}

// =========================
// CALCULATE
// =========================

function calculate() {

    try {

        let expression = display.value;

        // =========================
        // IMPLICIT MULTIPLICATION
        // =========================

        // 7π -> 7*π
        expression = expression.replace(/(\d)π/g, "$1*π");

        // 2e -> 2*e
        expression = expression.replace(/(\d)e/g, "$1*e");

        // 2(3+4) -> 2*(3+4)
        expression = expression.replace(/(\d)\(/g, "$1*(");

        // )( -> )*(
        expression = expression.replace(/\)\(/g, ")*(");

        // π(2+3) -> π*(2+3)
        expression = expression.replace(/π\(/g, "π*(");

        // e(2+3) -> e*(2+3)
        expression = expression.replace(/e\(/g, "e*(");

        // 3sin(30) -> 3*sin(30)
        expression = expression.replace(
            /(\d)(sin|cos|tan|log|ln|sqrt)/g,
            "$1*$2"
        );

        // πsin(30) -> π*sin(30)
        expression = expression.replace(
            /π(sin|cos|tan|log|ln|sqrt)/g,
            "π*$1"
        );

        // esin(30) -> e*sin(30)
        expression = expression.replace(
            /e(sin|cos|tan|log|ln|sqrt)/g,
            "e*$1"
        );

        // =========================
        // CONSTANTS
        // =========================

        expression = expression.replace(/π/g, Math.PI);
        expression = expression.replace(/\be\b/g, Math.E);

        // =========================
        // TRIG FUNCTIONS
        // =========================

        expression = expression.replace(
            /sin\((.*?)\)/g,
            (_, x) => Math.sin(eval(x) * Math.PI / 180)
        );

        expression = expression.replace(
            /cos\((.*?)\)/g,
            (_, x) => Math.cos(eval(x) * Math.PI / 180)
        );

        expression = expression.replace(
            /tan\((.*?)\)/g,
            (_, x) => Math.tan(eval(x) * Math.PI / 180)
        );

        // =========================
        // LOG FUNCTIONS
        // =========================

        expression = expression.replace(
            /log\((.*?)\)/g,
            (_, x) => Math.log10(eval(x))
        );

        expression = expression.replace(
            /ln\((.*?)\)/g,
            (_, x) => Math.log(eval(x))
        );

        // =========================
        // SQRT
        // =========================

        expression = expression.replace(
            /sqrt\((.*?)\)/g,
            (_, x) => Math.sqrt(eval(x))
        );

        // =========================
        // SQUARE
        // =========================

        expression = expression.replace(
            /\((.*?)\)\^2/g,
            (_, x) => Math.pow(eval(x), 2)
        );

        expression = expression.replace(
            /(\d+)\^2/g,
            (_, x) => Math.pow(Number(x), 2)
        );

        // =========================
        // FACTORIAL
        // =========================

        expression = expression.replace(
            /(\d+)!/g,
            (_, x) => factorial(x)
        );

        // =========================
        // POWER
        // =========================

        expression = expression.replace(/\^/g, "**");

        const result = eval(expression);

        if (Number.isFinite(result)) {
            display.value = formatResult(result);
        } else {
            display.value = "Error";
        }

    } catch {
        display.value = "Error";
    }
}

// =========================
// KEYBOARD SUPPORT
// =========================

document.addEventListener("keydown", (event) => {

    const key = event.key;

    // Numbers
    if (!isNaN(key)) {
        appendValue(key);
    }

    // Operators
    else if (["+", "-", "*", "/", ".", "(", ")"].includes(key)) {
        appendValue(key);
    }

    // Enter
    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }

    // Backspace
    else if (key === "Backspace") {
        deleteLast();
    }

    // Escape
    else if (key === "Escape") {
        clearDisplay();
    }
});