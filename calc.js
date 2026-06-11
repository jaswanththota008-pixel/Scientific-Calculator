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

        // Constants
        expression = expression.replace(/π/g, Math.PI);
        expression = expression.replace(/\be\b/g, Math.E);

        // sin(x)
        expression = expression.replace(
            /sin\((.*?)\)/g,
            (_, x) => Math.sin(eval(x) * Math.PI / 180)
        );

        // cos(x)
        expression = expression.replace(
            /cos\((.*?)\)/g,
            (_, x) => Math.cos(eval(x) * Math.PI / 180)
        );

        // tan(x)
        expression = expression.replace(
            /tan\((.*?)\)/g,
            (_, x) => Math.tan(eval(x) * Math.PI / 180)
        );

        // log(x)
        expression = expression.replace(
            /log\((.*?)\)/g,
            (_, x) => Math.log10(eval(x))
        );

        // ln(x)
        expression = expression.replace(
            /ln\((.*?)\)/g,
            (_, x) => Math.log(eval(x))
        );

        // sqrt(x)
        expression = expression.replace(
            /sqrt\((.*?)\)/g,
            (_, x) => Math.sqrt(eval(x))
        );

        // (x)^2
        expression = expression.replace(
            /\((.*?)\)\^2/g,
            (_, x) => Math.pow(eval(x), 2)
        );

        // x^2
        expression = expression.replace(
            /(\d+)\^2/g,
            (_, x) => Math.pow(Number(x), 2)
        );

        // factorial
        expression = expression.replace(
            /(\d+)!/g,
            (_, x) => factorial(x)
        );

        // powers
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