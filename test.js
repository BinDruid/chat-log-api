const startTime = new Date().toLocaleTimeString;
console.log(startTime);
setTimeout(doNothing, 30000);

const doNothing = () => {
  console.log("Called Function in");
  console.log(new Date().toLocaleTimeString);
};
