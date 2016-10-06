
/**
 * PaySlipController
 *
 * @description: Upload and generate paylSlip file
 * @author: Rommel Suarez
 */

module.exports = {

  /**
  * Upload input files sent by the client and generate a payslip csv file
  * @name generatePaySlip
  * @param {Request} req - The http request from client .
  * @param {Response} res - The http response to client.
  */
  generatePaySlip: function (req, res) {
    var me = this,
        fs = require('fs'),
        parse = require('csv-parse'),
        parser,
        file = req.file('file');
    if (file) {
        file.upload({
          maxBytes: sails.config.constants.MAX_BYTES,
          dirname: require('path').resolve(sails.config.appPath, sails.config.constants.UPLOAD_DIR),
          saveAs: sails.config.constants.PAYSLIP_PARAM_NAME,
          },
          function (err, uploadedFiles) {
              me.validateFile(uploadedFiles,err,res);
              parser = parse({delimiter: ','},function(err,data){
                me.processFile(err,data,res,uploadedFiles);
              });
              fs.createReadStream(sails.config.constants.PAYSLIP_PARAM_PATH).pipe(parser);
         });
    }
   },
   /**
   * Validate files for errors before upload
   * @name validateFile
   * @param {File} uploadedFiles - The file to upload .
   * @param {Error} err - The error response when upload failed.
   * @param {Response} res - The http response to client.
   */
   validateFile: function(uploadedFiles,err,res) {
     if (err) {
       return res.json({
             message: err.message,
             error_code : sails.config.constants.ERROR
       });
     }
     if (uploadedFiles.length === 0){
       return res.json({
             message: sails.config.constants.NO_FILES_UPLOADED,
             error_code : sails.config.constants.ERROR
       });
     }
   },
   /**
   * Validate files for errors before upload
   * @name processFile
   * @param {Error} err - The error response when upload failed.
   * @param {Object} data - The data from the csv file.
   * @param {Response} res - The http response to client.
   * @param {File} uploadedFiles - The file to upload .
   */
   processFile: function(err,data,res,uploadedFiles) {
     var output = [],
         employee,
         salary,
         index;
     if(data === undefined || data === null) {
       return res.json({
             message: sails.config.constants.INVALID_FILES_UPLOADED,
             error_code : sails.config.constants.ERROR
       });
     }
     for(index=0;index < data.length; index ++) {

       if(data[index].length !== 5){
         return res.json({
               message: sails.config.constants.INVALID_FILES_UPLOADED,
               error_code : sails.config.constants.ERROR
         });
       }
      employee = EmployeeService
                .createEmployee(data[index][0],   //firstName
                                data[index][1],   //lastName
                                data[index][2],   //annualSalary
                                data[index][3],   //superRate
                                data[index][4]);  //payPeriod
       salary = PaySlipService.calculateSalary(employee);
       output.push(salary);
     }
     PaySlipService.generateCSV(output,sails.config.constants.PAYSLIP_FILE_PATH);
     return res.json({
           message: uploadedFiles.length + sails.config.constants.FILES_UPLOADED,
           error_code : sails.config.constants.SUCCESS
     });
   },
   /**
   * Get the file from the server and send it to the client
   * @name downloadPaySlip
   * @param {Request} req - The http request from client .
   * @param {Response} res - The http response to client.
   */
  downloadPaySlip: function (req, res) {
    var location = sails.config.constants.PAYSLIP_FILE_PATH;
    var SkipperDisk = require('skipper-disk');
    var fileAdapter = SkipperDisk(/* optional opts */);
    res.attachment(sails.config.constants.PAYSLIP_FILE_NAME);
    fileAdapter.read(location).on('error', function (err) {
    return res.serverError(err);
    }).pipe(res);
  }

}
