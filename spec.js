var request = require('supertest');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('../server');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /status/', function testStatus(done) {
  request(server)
    .get('/status/')
    .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/not-found')
      .expect(404, done);
  });
});
