const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../index.js");

chai.use(chaihttp);
chai.should();

describe("/search", () => {
  it("Should return list of postings", (done) => {
    chai
      .request(app)
      .get("/search")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
