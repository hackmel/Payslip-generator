var url = 'http://localhost:1337';
var request = require('supertest') (url);
var assert = require('assert');

describe('PaySlipGeneratorController', function() {


  describe('#Start Test()', function() {


    it('generatePaySlip should should return 200', function (done) {
              request.post('/generatePaySlip')
             .field('extra_info', '...')
             .attach('file', '/Users/hackmel/Desktop/Test.csv')
             .expect(200)
             .end(function(err,res) {
                assert(res.status == 200);
                done();
             });

    });
    it('downloadPaySlip should should return 200', function (done) {
            request.get('/downloadPaySlip')
            .expect(200)
            .end(function(err,res) {

              assert(res.status == 200);
              done();
            });

  });


  });




});
