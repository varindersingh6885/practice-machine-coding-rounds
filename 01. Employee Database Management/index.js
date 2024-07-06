let employees = [];
let selectedEmployeeId;
let selectedEmployee;

const employeesList = document.querySelector(".employee--list__employees");

(async function () {
  const employeesData = await fetch("./employees.json");

  employees = await employeesData.json();

  selectedEmployee = employees?.[0];
  selectedEmployeeId = employees?.[0].id;

  renderEmployeeList();
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

  // select an employee record
  employeesList.addEventListener("click", (e) => {
    const tagName = e.target.tagName;
    const recordId = +e.target.id;

    if (tagName === "SPAN" && recordId !== selectedEmployeeId) {
      selectedEmployeeId = recordId;
      renderEmployeeList();
    }
  });
}
