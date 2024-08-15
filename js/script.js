let step = 1;

const handleSubmit = (event) => {
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

  let form = document.getElementById("form");
  const topics = [];
  form.querySelectorAll('input[name="topics"]:checked').forEach((checkbox) => {
    topics.push(checkbox.value);
  });

  const data = new FormData(event.target);
  data.set("topics", topics);
  const name = data.get("name");
  const email = data.get("email");

  // const topics = data.get("topics");
  console.log(`Name: ${name}, Email: ${email}`);
  console.log(`Topics: ${data.get("topics")}`);
  return true;
};

let form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
