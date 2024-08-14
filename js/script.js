// Add some interactivity to the website
let step = 1;

const handleSubmit = () => {
  event.preventDefault();
  if (step === 1) {
    let subForm1 = document.getElementById("step1");
    let subForm2 = document.getElementById("step2");
    subForm1.style.display = "none";
    subForm2.style.display = "block";
    step++;
    return false;
  }
  if (step === 2) {
    let subForm3 = document.getElementById("step3");
    let subForm2 = document.getElementById("step2");
    subForm2.style.display = "none";
    subForm3.style.display = "block";
    step++;
    return false;
  }
};
