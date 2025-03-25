const express = require("express");
const path = require("path");
const userModel = require("./models/user");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/read", async function (req, res) {
  let users = await userModel.find();
  res.render("read", { users: users });
});

app.get("/delete/:id", async function (req, res) {
  let users = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.get("/edit/:id", async function (req, res) {
  let users = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { users: users });
});

app.post("/update/:id", async function (req, res) {
  let { name, email, imageUrl } = req.body;
  let users = await userModel.findOneAndUpdate({ _id: req.params.id }, { name, email, imageUrl }, { new: true });
  res.redirect("/read");
});

app.post("/create", async function (req, res) {
  let { name, email, imageUrl } = req.body;

  let createdUser = await userModel.create({
    name,
    email,
    imageUrl,
  });

  res.redirect("/read");
});

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
