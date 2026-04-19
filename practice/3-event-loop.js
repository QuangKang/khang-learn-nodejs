console.log("Start");

setTimeout(() => {
    console.log("setTimeout(0)", 0);
});

Promise.resolve().then(() => {
    console.log("promise.resolve()");
});

process.nextTick(() => {
    console.log("process.nextTick()");
});

console.log("End");