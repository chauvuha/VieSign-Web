const User = require("../models/user");
const bcrypt = require("bcrypt");
const nodeMailer = require("nodemailer");
const template = require("../utils/emailResetPass");

exports.createUser = (req, res, next) => {
  User.find({ email: req.body.email })
    .then((user) => {
      if (user.length > 0) {
        res.status(400).json({ error: "Email existed!" });
      } else {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const user = new User({
            username: req.body.username,
            password: hash,
            email: req.body.email,
            role: req.body.role,
            dob: req.body.dob,
            url: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=",
            country: null,
            city: null,
            address: null,
            zipcode: null,
            phone: null,
            score: [],
            topic: 1,
            part: 1,
          });

          user
            .save()
            .then(() => {
              res.status(200).json({
                message: "Create user successfully!",
              });
            })
            .catch((error) => {
              res.status(400).json({
                error: error,
              });
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error("User not found!"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error("Incorrect password!"),
            });
          }
          res.status(200).json({
            userId: user._id,
            token: "token",
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.getUserById = (req, res, next) => {
  User.findOne({
    _id: req.query.id,
  })
    .then((user) => {
      res.status(200).json({
        message: "Get user sucessfully!",
        user: user,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.updateUser = (req, res, next) => {
  if (req.body.password !== undefined) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const user = new User({
        _id: req.body._id,
        username: req.body.username,
        password: hash,
        email: req.body.email,
        dob: req.body.dob,
        url: req.body.url,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        zipcode: req.body.zipcode,
        phone: req.body.phone,
        score: req.body.score,
        topic: req.body.topic,
        part: req.body.part,
      });

      User.updateOne({ _id: req.body._id }, user)
        .then(() => {
          res.status(200).json({
            message: "update user sucessfully",
          });
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    });
  } else {
    const user = new User({
      _id: req.body._id,
      username: req.body.username,
      email: req.body.email,
      dob: req.body.dob,
      url: req.body.url,
      country: req.body.country,
      city: req.body.city,
      address: req.body.address,
      zipcode: req.body.zipcode,
      phone: req.body.phone,
      score: req.body.score,
      topic: req.body.topic,
      part: req.body.part,
    });
    User.updateOne({ _id: req.body._id }, user)
      .then(() => {
        res.status(200).json({
          message: "update user sucessfully",
        });
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const transporter = nodeMailer.createTransport({
      // config mail serve
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "viesign.noreply@gmail.com",
        pass: "ozefludmehigiaps",
      },
      from: "viesign.noreply@gmail.com",
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const mainOptions = {
      from: "viesign.noreply@gmail.com",
      to: req.body.email,
      subject: "Reset password",
      text: "",
      html: template(
        req.body.email,
        `http://localhost:3000/reset-password/${user._id.toString()}`
      ),
    };
    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Send mail failed!" });
      } else {
        console.log("Message sent: " + info.response);
        res.status(200).json({ message: "Send mail success!" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
};

exports.resetPassword = (req, res) => {
  try {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      User.findOneAndUpdate({ _id: req.body.id }, { password: hash })
        .then(() => {
          res.status(200).json({
            message: "update user sucessfully",
          });
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    });
  } catch (err) {
    res.status(400).json(error);
  }
};

//Admin
exports.getAllUser = (req, res, next) => {
  User.find({}).then((users) => {
    res.status(200).json({
      message: "get all user successfully",
      allUser: users,
    });
  });
};
