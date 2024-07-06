let employees = [];
const employeesList = document.querySelector(".employee--list__employees");

(async function () {
  const employeesData = await fetch("./employees.json");

  employees = await employeesData.json();

  renderEmployeeList();
})();

function renderEmployeeList() {
  employeesList.innerHTML = "";

  employees.forEach((employee) => {
    const employeeRecord = document.createElement("div");
    employeeRecord.classList.add("employee--list__employees__employee--record");
    employeeRecord.setAttribute("id", employee.id);

    employeeRecord.innerHTML = `
    <span>${employee.firstName} ${employee.lastName}</span>
    <i>❌</i>
    `;

    employeesList.appendChild(employeeRecord);
  });
}
