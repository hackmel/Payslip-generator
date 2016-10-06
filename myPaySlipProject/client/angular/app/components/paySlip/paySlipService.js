'use strict';

/* Service provider for the paySlip application
*  Call web service API
*/
 angular
    .module('paySlipApp')
    .service('PaySlipService',['Upload','$http','$q',function(Upload,$http,$q){
      var self =this;
      /**
       * Upload the csv (input) file into the server.
       * @name upload
       * @param {file} file - The csv file to upload.
       * @return {promise} Promise
      */
      self.upload = function (file) {
           var deferred = $q.defer();
             Upload.upload({
                url: 'http://localhost:1337/generatePaySlip', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).success(function(data) {
                deferred.resolve(data);
              }).error(function(data) {
                  deferred.reject(data);
              });
              return deferred.promise;
      }
      /**
       * Upload the csv (input) file into the server.
       * @name upload
       * @return {promise} Promise
      */
      self.downloadFile = function () {
          var deferred = $q.defer();
          return $http({
              method: 'GET',
              url: 'http://localhost:1337/downloadPaySlip',
              //params: { name: name },
              responseType: 'arraybuffer'
          }).success(function (data) {
                deferred.resolve(data)
          }).error(function (data) {
              console.log(data);
          });

          return deferred.promise;
      }
}]);
