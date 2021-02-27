const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../index.js");

chai.use(chaihttp);
chai.should();

describe("Postings", () => {
  let token = null;
  //Test invalid token
  it("Create posting with invalid auth", (done) => {
    chai
      .request(app)
      .post("/posting")
      .set("Authorization", "Bearer invalid")
      .field("title", "title")
      .field("desc", "desc")
      .field("category", "category")
      .field("location", "location")
      .field("price", "price")
      .field("type", "type")
      .field("contact", "contact")
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  //Test valid token
  it("Create posting with valid auth", (done) => {
    const placeholderimage =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAOVBMVEXg4OB1dXXX19fd3d2EhIR9fX14eHjJycm2trbb29uurq6goKCZmZmIiIiBgYHNzc2np6e8vLySkpKXK8HrAAABuUlEQVR4nO3Z0bKCIBCAYQNFVCzr/R/2nHU6k8KpJi6wZf7vLu1id9gFhKYBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAb249h7pzr5jD29uhospnlfNo4L+boiLKYyZ0iblKYiu/iNER3PTquD9npPgbB98Za0/twH59JVasMtzXo1m+iHny7PrwpysSuebgxCtmOTlkma121l/TFZR2UqXxEebxEO/87QZlZ3inpeCPzVftkojUyJp2OWVgKy23qSsbg8evitBSXkUjHzYN9Is0oeWoYkkUKazsxRYlYKa6ldFSfs7K/8tsnUSLrXHAuG1SOXpp5t1LEiQxSe33ZqDJIC4TdkziRJkRN9J1CXFlpIj7J9RvNSd0kiUj1zSVjyiKr4X5yTRIx0kYlY8oinbzfFSaJWFlJSsaUpZpEqimttNkTOpo9nX4TOqbfdEFM6FgQpW7c8OofSrYo1Wwaq9nG1/NhVc2nbj2HD821kuOgeg7o3hyZBj1Hpo9D7M3K+HeIrSmPeq4Vfl3ruOhpnly9vdyEfa1KLkPF7nr66GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPjcD13rCcC3ILx/AAAAAElFTkSuQmCC";
    chai
      .request(app)
      .post("/login")
      .send({ username: "username", password: "password" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.all.keys("auth");
        token = res.body.auth;
        chai
          .request(app)
          .post("/posting")
          .set("Authorization", `Bearer ${token}`)
          .type("application/json")
          .send({
            title: "title",
            desc: "desc",
            category: "category",
            location: "location",
            image1: placeholderimage,
            image2: placeholderimage,
            image3: placeholderimage,
            image4: placeholderimage,
            price: 324,
            type: true,
            contact: "contact",
          })
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
      });
  });
});
