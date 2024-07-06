let employees = [];
let selectedEmployeeId;
let selectedEmployee;

const employeesList = document.querySelector(".employee--list__employees");
const employeeDetails = document.querySelector(".employee--info__view");
const addEmployeeModal = document.querySelector(".add--employee--modal");
const addEmployeeButton = document.querySelector(".header__add--employee");
const addEmployeeForm = document.querySelector(
  ".add--employee--modal__employee--form"
);

const dobInput = document.querySelector(
  ".add--employee--modal__employee--form__fields--container__dob"
);

(async function () {
  const employeesData = await fetch("./employees.json");

  employees = await employeesData.json();

  selectedEmployee = employees?.[0];
  selectedEmployeeId = employees?.[0].id;

  renderEmployeeList();
  renderSelectedEmployee();
})();

function renderEmployeeList() {
  employeesList.innerHTML = "";

  employees.forEach((employee) => {
    const employeeRecord = document.createElement("span");
    employeeRecord.classList.add("employee--list__employees__employee--record");
    employeeRecord.setAttribute("id", employee.id);

    employeeRecord.innerHTML = `
    ${employee.firstName} ${employee.lastName}
    <i>❌</i>
    `;

    if (employee.id === selectedEmployeeId) {
      selectedEmployee = employee;
      employeeRecord.classList.add(
        "employee--list__employees__employee--selected"
      );
    }

    employeesList.appendChild(employeeRecord);
  });
}

// actions on employee record
employeesList.addEventListener("click", (e) => {
  const tagName = e.target.tagName;
  const recordId = tagName === "SPAN" ? +e.target.id : +e.target.parentNode.id;

  // select an employee
  if (tagName === "SPAN" && recordId !== selectedEmployeeId) {
    selectedEmployeeId = recordId;
    renderEmployeeList();
    renderSelectedEmployee();
  }

  // delete an employee
  if (tagName === "I") {
    employees = employees.filter((employee) => employee.id != recordId);
    if (recordId === selectedEmployeeId) selectedEmployeeId = employees[0]?.id;
    renderEmployeeList();
    renderSelectedEmployee();
  }
});

function renderSelectedEmployee() {
  employeeDetails.innerHTML = "";
  if (!selectedEmployeeId) return;

  const employeeImage = document.createElement("img");
  employeeImage.setAttribute("src", selectedEmployee.imageUrl);
  employeeImage.classList.add("employee--info__view__image");

  const employeeNameWithAge = document.createElement("h2");
  employeeNameWithAge.innerHTML = `${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})`;

  const employeeAddress = document.createElement("p");
  employeeAddress.innerHTML = selectedEmployee.address;

  const employeePhoneNumber = document.createElement("p");
  employeePhoneNumber.innerHTML = `Phone number - ${selectedEmployee.phoneNumber}`;

  const employeeDateOfBirth = document.createElement("p");
  employeeDateOfBirth.innerHTML = `Date of birth - ${selectedEmployee.dateOfBirth}`;

  employeeDetails.appendChild(employeeImage);
  employeeDetails.appendChild(employeeNameWithAge);
  employeeDetails.appendChild(employeeAddress);
  employeeDetails.appendChild(employeePhoneNumber);
  employeeDetails.appendChild(employeeDateOfBirth);
}

// open add employee modal
addEmployeeButton.addEventListener("click", () => {
  addEmployeeModal.style.display = "flex";
});

// close add employee modal
function closeAddEmployeeModal() {
  addEmployeeModal.style.display = "none";
  addEmployeeForm.reset();
}

// add event listener on modal to close it
addEmployeeModal.addEventListener("click", (e) => {
  if (e.target.className === addEmployeeModal.className) {
    closeAddEmployeeModal();
  }
});

// add employee
addEmployeeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const formEntries = [...formData.entries()];

  const newEmployee = {
    id: employees.length ? employees[employees.length - 1].id + 1 : 1001,
  };
  formEntries.forEach((formEntry) => {
    newEmployee[formEntry[0]] = formEntry[1];
  });

  newEmployee.age =
    new Date().getFullYear() - new Date(newEmployee.dateOfBirth).getFullYear();
  newEmployee.imageUrl =
    newEmployee.imageUrl ||
    "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600";

  employees = [...employees, newEmployee];

  if (employees.length === 1) {
    selectedEmployeeId = employees[0].id;
    selectedEmployee = newEmployee;
  }
  renderEmployeeList();
  renderSelectedEmployee();
  closeAddEmployeeModal();
});

// apply max date on Date of birth input
dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
  .toISOString()
  .slice(5, 10)}`;
