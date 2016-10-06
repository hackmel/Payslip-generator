module.exports = {

  /**
  * Calculate the salary of an employee
  * @name calculateSalary
  * @param {Employee} employee - The employee object to calculate the salary.
  */
    calculateSalary: function (employee) {
      var salary = {
        firstName: null,
        lastName: null,
        payPeriod:'',
        grossIncome:0,
        incomeTax:0,
        netIncome:0,
        super:0
      }
      salary.firstName = employee.firstName;
      salary.lastName = employee.lastName;
      salary.payPeriod = this.formatPayPeriod(employee.payPeriod);
      salary.grossIncome = Math.round(this.calculateGrossIncome(parseFloat(employee.annualSalary)));
      salary.incomeTax = Math.round(this.getIncomeTax(parseFloat(employee.annualSalary)));
      salary.netIncome = Math.round(this.calculateNetIncome(salary.grossIncome,salary.incomeTax));
      salary.super = Math.round(this.calculateSuper(salary.grossIncome, parseFloat(employee.superRate)));

      return salary;
    },
    /**
    * Calculate the gross income of an employee
    * @name calculateSalary
    * @param {Number} annualSalary - The annual salary of an employee.
    */
    calculateGrossIncome : function(annualSalary) {
      return annualSalary / 12;
    },
    /**
    * Get the income tax of an employee based on annualSalary
    * @name getIncomeTax
    * @param {Number} annualSalary - The annual salary of an employee.
    */
    getIncomeTax: function (annualSalary) {
      var incomeTax = 0;
      switch (true) {
        case (annualSalary >= 18201 && annualSalary <= 37000):
          incomeTax = this.calculateIncomeTax (0, annualSalary, 18200, 9);
          break;
        case (annualSalary >= 37001 && annualSalary <= 80000 ):
          incomeTax = this.calculateIncomeTax (3572, annualSalary, 37000, 32.5);
           break;
        case (annualSalary >= 80001 && annualSalary <= 180000  ):
          incomeTax = this.calculateIncomeTax (17547, annualSalary, 80000, 37);
          break;
        case (annualSalary >= 180001):
          incomeTax = this.calculateIncomeTax (54547, annualSalary, 180000, 45);
          break;
        default:
          break;
      }
        return incomeTax;
    },
    /**
    * Calculate the income tax of an employee based on tax, annualSalary,taxableIncome and additionalCent
    * @name calculateIncomeTax
    * @param {Number} tax - The tax of an employee.
    * @param {Number} annualSalary - The annual salary of an employee.
    * @param {Number} taxableIncome - The taxable income of an employee.
    * @param {Number} additionalCent - The additional cent of an employee.
    */
    calculateIncomeTax: function(tax,annualSalary, taxableIncome,additionalCent) {
      return (tax + (annualSalary - taxableIncome) * (additionalCent /100)) / 12;
    },
    /**
    * Calculate the net income of an employee based on grossIncome and incomeTax
    * @name calculateNetIncome
    * @param {Number} grossIncome - The annual gross salary of an employee.
    * @param {Number} incomeTax - The income tax of an employee.
    */
    calculateNetIncome : function (grossIncome, incomeTax){
      return grossIncome - incomeTax;
    },
    /**
    * Calculate the super of an employee based on grossIncome and superRate
    * @name calculateSuper
    * @param {Number} grossIncome - The annual gross salary of an employee.
    * @param {Number} superRate - The super rate of an employee.
    */
    calculateSuper : function(grossIncome, superRate) {
      return grossIncome * (superRate / 100);
    },
    /**
    * Generate CSV file in the specified file path
    * @name generateCSV
    * @param {Array} salaries - The array of salary objects.
    * @param {String} filepath - The path to generate the csv file .
    */
    generateCSV: function(salaries, filepath){
      var csv = require('ya-csv'),
          fs = require('fs'),
          writer = csv.createCsvStreamWriter(fs.createWriteStream(filepath));

          writer.writeRecord(['Name','Pay Period','Gross Income','Income Tax','Net Income','Super']);
          for(index=0; index < salaries.length; index++)    {
              writer.writeRecord([salaries[index].firstName + ' ' + salaries[index].lastName,
                                  salaries[index].payPeriod,
                                  salaries[index].grossIncome,
                                  salaries[index].incomeTax,
                                  salaries[index].netIncome,
                                  salaries[index].super]);
          }
    },
    /**
    * Format the payPeriod
    * @name formatPayPeriod
    * @param {String} payPeriod - The payment start date.
    */
    formatPayPeriod : function(payPeriod){
      var moment = require('moment'),
        lastDay = moment(payPeriod, "MM-DD-YY").daysInMonth(),
        month = moment(payPeriod, "MM-DD-YY").format('MMMM');
        return '01 ' + month +'- ' + lastDay +' '+month;
    }
}
