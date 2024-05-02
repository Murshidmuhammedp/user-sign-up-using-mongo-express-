var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/userSchema")


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/users", async (req, res) => {
  const datas = await User.find()
  res.status(200).send(datas)
})

router.post('/submit', async (req, res) => {
  // console.log(req.body);

  const { first_name, last_name, email, pw, pw_confirm } = req.body;

  const newUser = new User({
    first_name,
    last_name,
    email,
    pw,
    pw_confirm
  })

  await newUser.save()

  res.status(201).send("User created Successfully")

});

router.put("/users/edit/:id", async (req, res) => {
  const id = req.params.id
  const userid = await User.findById(id);
  const { first_name, last_name, email, pw, pw_confirm } = req.body;

  if (first_name) userid.first_name = first_name
  if (last_name) userid.last_name = last_name
  if (email) userid.email = email
  if (pw) userid.pw = pw

  userid.save()
  res.status(200).send("update successfully")
})

router.delete("/users/delete/:id",async (req,res)=>{
  const id = req.params.id;
  await User.findByIdAndDelete(id)
  res.status(200).send("Delete successfully");
})

mongoose.connect('mongodb://localhost:27017/store')
  .then(() => console.log("DB connected"))

  .catch((error) => console.log(error))
module.exports = router;
