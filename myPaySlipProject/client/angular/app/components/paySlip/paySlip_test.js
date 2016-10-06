'use strict';

describe('paySlipApp module', function() {

  var $scope,  paySlipService, $q, controller,  deferred;
 beforeEach(angular.mock.module('paySlipApp'));


  describe('Test for PaySlipController', function(){
    beforeEach(inject(function (_$rootScope_, $controller,_PaySlipService_,_$q_) {
       $scope = _$rootScope_.$new();
       $q=_$q_;
      deferred = _$q_.defer();
       paySlipService = _PaySlipService_;


       controller = $controller('PaySlipController', { $scope: $scope, PaySlipService:paySlipService});
     }));

    it('should define PaySlipController', function(){
      expect(controller).toBeDefined();
    });

    it('upload should be resolved', function(){
        spyOn(paySlipService, 'upload').and.callFake(function() {
              deferred.resolve({error_code:0, message:'OK'});
              return deferred.promise;
        });

         $scope.$apply(function() {
            controller.upload(null);
        });
        expect(paySlipService.upload).toHaveBeenCalled();
        expect(controller.error_code).toBeDefined();
        expect(controller.error_code).toBe(0);
    });

    it('upload should be rejected', function(){
         spyOn(paySlipService, 'upload').and.callFake(function() {
              deferred.reject();
              return deferred.promise;
        });

         $scope.$apply(function() {
            controller.upload(null);
        });
        expect(paySlipService.upload).toHaveBeenCalled();
        expect(controller.error_code).toBeDefined();
        expect(controller.error_code).toBe(2);

    });


    it('download should be resolved', function(){
        spyOn(paySlipService, 'downloadFile').and.callFake(function() {
              deferred.resolve();
              return deferred.promise;
        });

         spyOn(controller, 'download').and.callFake(function() {
               return;
        });

         $scope.$apply(function() {
            controller.downloadFile();
        });
        expect(paySlipService.downloadFile).toHaveBeenCalled();

    });
  });


  describe("Test for PaySlipService", function () {

         var service, $httpBackend;

         beforeEach(inject(function($injector) {
             service = $injector.get('PaySlipService');
             $httpBackend = $injector.get('$httpBackend');
         }));

         afterEach(function() {
             $httpBackend.verifyNoOutstandingExpectation();
             $httpBackend.verifyNoOutstandingRequest();
         });

         it('upload - should return an OK message', function () {
             $httpBackend.when('POST', "http://localhost:1337/generatePaySlip").respond({error_code:0, message:'OK'});
             service.upload(null).then(function(response) {
                 expect(response.message).toEqual('OK'); //the response is null
             });
             $httpBackend.flush();
         });

         it('download - should return an OK message', function () {
             $httpBackend.when('GET', "http://localhost:1337/downloadPaySlip").respond({error_code:0, message:'OK'});
             service.downloadFile().then(function(response) {
                 expect(response.data.message).toEqual('OK'); //the response is null
                 //setTimeout(done, 0)
             });
             $httpBackend.flush();
         });



     });

});
