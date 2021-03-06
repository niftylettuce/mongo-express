var db = require('./setupDatabase');
var expect = require('chai').expect;
var Browser = require('zombie');
var browser = new Browser();

describe('Home Page', function() {
  before(function(done) {
    db.open(function(err, conn) {
      db = conn;
      done();
    });
  });

  describe('Server Status', function() {
    it('should show MongoDB version', function(done) {

      db.admin(function(err, adminDb) {
        adminDb.serverStatus(function(err, info) {
          browser.visit('http://localhost:8081/', function() {
            expect(browser).to.have.property('success').to.be.true;

            //Check database version is being displayed
            expect(browser.text('#dbVersion')).to.be.string(info.version);

            done();
          });
        });
      });

    });
  });
});
