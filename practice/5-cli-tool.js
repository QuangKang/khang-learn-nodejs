const args = process.argv.slice(2);

if (args.length === 0) {
    console.log("Please insert a math problem");
    console.log("Use +, -, x, /");
    process.exit(1);
}

const left = parseFloat(args[0]);
const operation = args[1];
const right = parseFloat(args[2]);

if (isNaN(left) || isNaN(right)) {
    console.log("Must be numbers.");
    process.exit(1);
}

console.log(`Problem: ${left} ${operation} ${right}`);

switch (operation) {
    case '+':
        console.log(`Result: ${left + right}`);
        break;
    case '-':
        console.log(`Result: ${left - right}`);
        break;
    case 'x':
        console.log(`Result: ${left * right}`);
        break;
    case '/':
        if (right === 0) {
            console.log("Error: divide by 0.");
        } else {
            console.log(`Result: ${left / right}`);
        }
        break;
    default:
        console.log(`Unidentified: ${operation}`);
        console.log("Use +, -, x, /");
}

