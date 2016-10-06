

module.exports = {
  /**
  * Create an employee object
  * @name createEmployee
  * @param {String} firstName - The employee firstName.
  * @param {String} lastName - The employee lastName.
  * @param {Number} annualSalary - The employee object annualSalary.
  * @param {Number} superRate - The employee superRate.
  * @param {String} payPeriod - The employee payPeriod.
  */
  createEmployee : function (firstName,lastName,annualSalary,superRate,payPeriod) {
    var employee = {
      firstName: null,
      lastName: null,
      annualSalary:0,
      superRate:0,
      payPeriod:'',
    }
    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.annualSalary = annualSalary;
    employee.superRate = superRate.replace(/%/ig,'');
    employee.payPeriod = payPeriod;
    return employee;
  }

}
