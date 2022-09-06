/*const nodemailer = require("nodemailer");

exports.sendMail = (req, res, next) => {
  var transporter = nodemailer.createTransport({
    // config mail server
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "viesign.team@gmail.com", //Tài khoản gmail vừa tạo
      pass: "viesign2021", //Mật khẩu tài khoản gmail vừa tạo
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  var content = "";
  content += `
       ${req.body.content}
    `;
  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: `${req.body.from}`,
    to: "viesign.team@gmail.com",
    subject: "Ý kiến người dùng",
    text: "", //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
    html: content, //Nội dung html mình đã tạo trên kia :))
  };
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.status(500).json({message:"Gửi mail thất bại"});
    } else {
      console.log("Message sent: " + info.response);
      res.status(200).json({ message: "Gửi mail thành công" });
    }
  });
};
*/

const sendmail = require("sendmail")({silent:true});

exports.sendMail = (req, res, next) => {
  sendmail(
    {
      from: req.body.from,
      to: "viesign.team@gmail.com",
      subject: "Ý kiến người dùng",
      html: req.body.content,
    },
    function (err, reply) {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Gửi mail thất bại" });
      } else {
        console.log("Message sent: " + info.response);
        res.status(200).json({ message: "Gửi mail thành công" });
      }
    }
  );
};
