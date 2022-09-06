const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const videoCtrl = require('../controllers/video');
const mailCtrl = require("../controllers/sendmail");

router.post('/video/create-video', videoCtrl.createVideo);
router.get('/video/list-topic',videoCtrl.getListTopic);
router.get('/video/list-part',videoCtrl.getListPart);
router.get('/video/list-video',videoCtrl.getListVideo);
router.get('/video/all-video',videoCtrl.getAllVideo);
router.get("/video/all-video-no-topic", videoCtrl.getAllVideoNoTopic);
router.get("/video/get-list-video-by-topic", videoCtrl.getListVideoByTopic);
router.post("/video/update-video", videoCtrl.updateVideo);
router.post("/video/delete-video", videoCtrl.deleteVideo);

router.post("/user/create-user", userCtrl.createUser);
router.post("/user/login", userCtrl.login);
router.get("/user/get-user-id", userCtrl.getUserById);
router.post("/user/update-user", userCtrl.updateUser);
router.get("/user/all-user", userCtrl.getAllUser);


router.post("/send-mail", mailCtrl.sendMail);

module.exports ={routes: router}