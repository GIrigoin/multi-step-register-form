let step = 1;

const initializeForm = () => {
  step = 1;
  let stepSpan = document.getElementById("step");
  stepSpan.innerText = step;

  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let topicsInput = document.getElementsByName("topics");
  nameInput.value = "";
  emailInput.value = "";
  topicsInput.forEach((topics) => (topics.checked = false));

  let subForm1 = document.getElementById("step1");
  let subForm2 = document.getElementById("step2");
  let subForm3 = document.getElementById("step3");
  subForm1.style.display = "block";
  subForm2.style.display = "none";
  subForm3.style.display = "none";

  let stepper1 = document.getElementById("stepper-1");
  stepper1.className = "stepper-active";
  let stepper2 = document.getElementById("stepper-2");
  stepper2.className = "stepper-next";
  let stepper3 = document.getElementById("stepper-3");
  stepper3.className = "stepper-next";
  let submitButton = document.getElementById("submit");
  submitButton.disabled = true;
};

const validate = (name, value) => {
  if (name === "name") {
    if (value === "") {
      return "The name field can't be empty";
    }
    if (value.length >= 50) {
      return "Name must be less than 50 characters long";
    }
    return "";
  }
  if (name === "email") {
    const mailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!mailValidation.test(value)) {
      return "Enter a valid email";
    }
    if (value.length >= 50) {
      return "Email must be less than 50 characters long";
    }
    return "";
  }
  if (name === "topics") {
    return "";
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  let submitButton = document.getElementById("submit");
  let stepSpan = document.getElementById("step");

  if (step === 1) {
    let subForm1 = document.getElementById("step1");
    let subForm2 = document.getElementById("step2");
    subForm1.style.display = "none";
    subForm2.style.display = "block";
    step++;
    submitButton.disabled = true;
    stepSpan.innerText = step;

    let stepper1 = document.getElementById("stepper-1");
    stepper1.className = "stepper-prev";
    let stepper2 = document.getElementById("stepper-2");
    stepper2.className = "stepper-active";

    return false;
  }
  if (step === 2) {
    let subForm2 = document.getElementById("step2");
    let subForm3 = document.getElementById("step3");

    subForm2.style.display = "none";
    subForm3.style.display = "block";
    submitButton.innerText = "Confirm";
    step++;
    stepSpan.innerText = step;

    let form = document.getElementById("form");
    const topics = [];
    form
      .querySelectorAll('input[name="topics"]:checked')
      .forEach((checkbox) => {
        topics.push(checkbox.value);
      });
    const data = new FormData(event.target);
    const name = data.get("name");
    const email = data.get("email");

    let nameSpan = document.getElementById("summary-name");
    nameSpan.innerText = name;
    let emailSpan = document.getElementById("summary-email");
    emailSpan.innerText = email;

    let topicsList = document.createElement("ul");
    topicsList.className = "topics-list";
    topics.forEach((topic) => {
      const item = document.createElement("li");
      item.className = "summary-item";
      item.innerText = topic;
      topicsList.append(item);
    });

    subForm3.append(topicsList);

    let stepper2 = document.getElementById("stepper-2");
    stepper2.className = "stepper-prev";
    let stepper3 = document.getElementById("stepper-3");
    stepper3.className = "stepper-active";

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

  // const data = new FormData(event.target);
  // const name = data.get("name");
  // const email = data.get("email");
  // const topics = data.get("topics");
  console.log(`Name: ${name}, Email: ${email}`);
  console.log(`Topics: ${topics}`);
  alert("✅ Success");

  let subForm3 = document.getElementById("step3");

  let topicsList = subForm3.getElementsByClassName("topics-list");
  if (topicsList) {
    subForm3.removeChild(topicsList[0]);
  }
  initializeForm();
  return true;
};

const handleInputChange = (event) => {
  const name = event.target.name;
  const value = event.target.value;

  let submitButton = document.getElementById("submit");
  let nameError = document.getElementById("name-error");
  let emailError = document.getElementById("email-error");
  let topicsError = document.getElementById("topics-error");

  const errorMessage = validate(name, value);
  if (name === "name") {
    nameError.innerText = errorMessage;
  }
  if (name === "email") {
    emailError.innerText = errorMessage;
  }
  if (name === "topics") {
    topicsError.innerText = errorMessage;
  }
  //SI PASO 1

  if (step === 1) {
    let nameInput = document.getElementById("name");
    let emailInput = document.getElementById("email");

    if (
      nameError.innerText === "" &&
      emailError.innerText === "" &&
      nameInput.value !== "" &&
      emailInput.value !== ""
    )
      submitButton.disabled = false;
    else submitButton.disabled = true;
  }

  if (step === 2) {
    let topicsInput = document.getElementsByName("topics");
    let someChecked = false;
    topicsInput.forEach((topics) => {
      if (topics.checked) someChecked = true;
    });

    if (topicsError.innerText === "" && someChecked) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }
};
initializeForm();

let form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

let inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("input", handleInputChange);
});
