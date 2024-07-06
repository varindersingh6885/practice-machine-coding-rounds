let employees = [];
let selectedEmployeeId;
let selectedEmployee;

const employeesList = document.querySelector(".employee--list__employees");
const employeeDetails = document.querySelector(".employee--info__view");

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
