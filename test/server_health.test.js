const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);

const expect = chai.expect;
const should = chai.should();


describe('Server health tests', () => {
  it('Should receive a response from the server', (done) => {
    chai.request(app)
    .get('/api/welcome')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});