const display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

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

function calculate() {

    try {

        let expression = display.value;

        // Constants
        expression = expression.replace(/π/g, Math.PI);
        expression = expression.replace(/\be\b/g, Math.E);

        // Trigonometric functions (degrees)
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

        // Logs
        expression = expression.replace(
            /log\((.*?)\)/g,
            (_, x) => Math.log10(eval(x))
        );

        expression = expression.replace(
            /ln\((.*?)\)/g,
            (_, x) => Math.log(eval(x))
        );

        // Square Root
        expression = expression.replace(
            /sqrt\((.*?)\)/g,
            (_, x) => Math.sqrt(eval(x))
        );

        // Square
        expression = expression.replace(
            /\((.*?)\)\^2/g,
            (_, x) => Math.pow(eval(x), 2)
        );

        expression = expression.replace(
            /(\d+)\^2/g,
            (_, x) => Math.pow(Number(x), 2)
        );

        // Factorial
        expression = expression.replace(
            /(\d+)!/g,
            (_, x) => factorial(x)
        );

        // Power
        expression = expression.replace(/\^/g, "**");

        const result = eval(expression);

        if (Number.isFinite(result)) {
            display.value = result.toFixed(5);
        } else {
            display.value = "Error";
        }

    } catch {
        display.value = "Error";
    }
}