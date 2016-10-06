
/* Service provider for the paySlip application
*  Call web service API
*/
 angular
    .module('paySlipApp')
    .service('MockPaySlipService',['Upload','$http',function(Upload,$http){
      var self =this;
      /**
       * Upload the csv (input) file into the server.
       * @name upload
       * @param {file} file - The csv file to upload.
       * @return {promise} Promise
      */
      self.upload = function (file) {
            return Upload.upload({
                url: 'http://localhost:1337/generatePaySlip', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            });
      }
      /**
       * Upload the csv (input) file into the server.
       * @name upload
       * @return {promise} Promise
      */
      self.downloadFile = function () {
          return $http({
              method: 'GET',
              url: 'http://localhost:1337/downloadPaySlip',
              params: { name: name },
              responseType: 'arraybuffer'
          });
      }
}]);
