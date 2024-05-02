var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/userSchema")


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/users", async (req,res)=>{
  const datas = await User.find()
  res.status(200).send(datas)
})

router.post('/submit', async (req, res) => {
  console.log(req.body);

  const { first_name, last_name, email, pw, pw_confirm } = req.body;

  const newUser = new User({
    first_name,
    last_name,
    email,
    pw,
    pw_confirm
  })

  await newUser.save("")

    res.status(201).send("User created Successfully")

});

mongoose.connect('mongodb://localhost:27017/store')
  .then(() => console.log("DB connected"))

  .catch((error) => console.log(error))
module.exports = router;
