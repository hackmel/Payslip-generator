'use strict';
 angular
    .module('paySlipApp')
    .controller('PaySlipController', paySlipController);

function paySlipController() {
  var self = this;

  self.hello = 'hello world';

  self.calculatePaySlip = function(){
     self.annualSalary = 1000.00;

  }
}
