function createEmployeeRecord(array) {
  let obj = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return obj;
}

function createEmployeeRecords(arrays) {
  return arrays.map((e) => createEmployeeRecord(e));
}

function createTimeInEvent(employee, datehour) {
  const obj = {
    type: "TimeIn",
    hour: parseInt(datehour.slice(11)),
    date: datehour.slice(0, 10),
  };
  let arr = employee.timeInEvents;
  arr.push(obj);
  return employee;
}

function createTimeOutEvent(employee, datehour) {
  const obj = {
    type: "TimeOut",
    hour: parseInt(datehour.slice(11)),
    date: datehour.slice(0, 10),
  };
  let arr = employee.timeOutEvents;
  arr.push(obj);
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const hourIn = employee.timeInEvents.find((e) => e.date == date).hour;
  const hourOut = employee.timeOutEvents.find((e) => e.date == date).hour;
  return (hourOut - hourIn) / 100;
}

function wagesEarnedOnDate(employee, date) {
  const payRate = employee.payPerHour;
  return hoursWorkedOnDate(employee, date) * payRate;
}

function allWagesFor(employee) {
  let total = 0;
  employee.timeOutEvents.forEach(
    (obj) => (total += wagesEarnedOnDate(employee, obj.date))
  );
  return total;
}

function findEmployeeByFirstName(arrays, firstName) {
  return arrays.find((e) => e.firstName === firstName);
}

function calculatePayroll(array) {
  let total = 0;
  array.forEach((e) => (total += allWagesFor(e)));
  return total;
}
