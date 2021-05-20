const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require(__dirname + "/models/users.js");
const Vendor = require(__dirname + "/models/vendor.js");
const md5 = require('md5');

const app = express();

mongoose.connect("mongodb://localhost:27017/storeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));


mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to mongodb://localhost:27017/storeDB');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

const list = {
  Status: 1,
  items: [{
      Title: 'Pen',
      decription: '100 Pens in stock',
      price: 10300,
    },
    {
      Title: 'Books',
      decription: '10 Books in stock',
      price: 503,
    }
  ]
};


/*USER LOGIN AND RESITRATION*/
app.post("/user/login", function(req, res) {
  const username = req.body.username;
  const password = md5(req.body.password);
  User.findOne({
    username: username
  }, function(err, foundUser) {
    if (err) {
      console.log();
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.send("Successfully LoggedIn!");
        } else {
          res.send("Invalid Credentials");
        }
      } else {
        res.send("Invalid Credentials");
      }
    }
  });
});

app.post("/user/register", function(req, res) {
  const newUser = new User({
    username: req.body.username,
    password: md5(req.body.password)
  });
  User.findOne({
    username: req.body.username
  }, function(err, foundUser) {
    if (foundUser) {
      res.send("That user already exists");
    } else {
      newUser.save(function(err) {
        if (err) {
          res.send("Invalid Credentials");
        } else {
          res.send(newUser);
        }
      })
    }
  })
});


// VENDORS LOGIN AND REGISTRATION
app.post("/vendor/login", function(req, res) {
  const mobile = req.body.mobile;
  const password = md5(req.body.password);
  Vendor.findOne({
    mobile: mobile
  }, function(err, foundVendor) {
    if (err) {
      console.log();
    } else {
      if (foundVendor) {
        if (foundVendor.password === password) {
          res.send("Successfully LoggedIn!");
        } else {
          res.send("Invalid Credentials");
        }
      } else {
        res.send("Invalid Credentials");
      }
    }
  });
});

app.post("/vendor/register", function(req, res) {
  const newVendor = new Vendor({
    mobile: req.body.mobile,
    password: md5(req.body.password)
  });
  Vendor.findOne({
    mobile: req.body.mobile,
  }, function(err, foundVendor) {
    if (foundVendor) {
      res.send("mobile no. already exists");
    } else {
      newVendor.save(function(err) {
        if (err) {
          // console.log(err);
          res.send("Invalid Credentials");
        } else {
          res.send(newVendor);
        }
      })
    }
  })
});


app.get("/vendor/list", function(req, res) {
  res.send(list);
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
})
