'use strict';
/* Controller for the paySlip application
*  Call service provider
*  Display output and accept input
*/
 angular
    .module('paySlipApp')
    .controller('PaySlipController',['PaySlipService','$window',function(PaySlipService,$window){
        var self = this;

      /**
       * Event fired when the upload button is clicked
       * @name submit
       *
      */
      self.submit = function(){ //function to call on form submit
            if (self.upload_form.file.$valid && self.file) { //check if from is valid
                self.upload(self.file); //call upload function
            }else{
               $window.alert('You have uploaded an invalid file');
            }
       }
       /**
        * Upload the csv (input) file into the server.
        * @name upload
        * @param {file} file - The csv file to upload.
       */
      self.upload = function (file) {
           var progressPercentage = 0;
            PaySlipService.upload(file)
            .then(function (resp) { //upload function returns a promise
                $window.alert(resp.message);
                self.error_code = resp.error_code;
                self.response_status = resp.status;
                self.response_message = resp.message;
            }, function (resp) { //catch error
                self.error_code = 2;
                $window.alert('An error has occured.');
            }, function (evt) {
                progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                self.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
      }
      /**
       * Download the payslip csv file from the server.
       * @name downloadFile
       *
      */
      self.downloadFile = function () {
          PaySlipService.downloadFile().
          then(function (resp) {
                 self.download(resp)
          },function (resp) {
              console.log(resp);
          });
      }

      /**
       * Generate the payslip csv file tha was dwonloaded rom the server.
       * @name download
       * @param {object} resp - The csv file .
      */
       self.download = function(resp) {
            var filename = 'paySlip',
                headers = resp.headers(),
                contentType = headers['content-type'],
                linkElement = document.createElement('a'),
                blob,
                url,
                clickEvent;
            try {
              blob = new Blob([resp.data], { type: contentType });
              url = window.URL.createObjectURL(blob);
              linkElement.setAttribute('href', url);
              linkElement.setAttribute("download", filename);
              clickEvent = new MouseEvent("click", {
                   "view": window,
                   "bubbles": true,
                   "cancelable": false
              });
              linkElement.dispatchEvent(clickEvent);
            } catch (ex) {
               console.log(ex);
            }
       }
    }]);
