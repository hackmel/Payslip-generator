angular.module("paySlipApp")
   .config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl: 'components/paySlip/paySlipView.html',
      controller: 'PaySlipController'
    });
});
