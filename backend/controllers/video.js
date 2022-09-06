const Video = require("../models/video");

exports.createVideo = (req, res, next) => {
  const video = new Video({
    content: req.body.content,
    url: req.body.url,
    numberTopic: req.body.numberTopic,
    nameTopic: req.body.nameTopic,
    numberPart: req.body.numberPart,
    type: req.body.type
  });

  video
    .save()
    .then(() => {
      res.status(200).json({
        message: "create video successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getListTopic = (req, res, next) => {
  Video.find({}).then((topics) => {
    const arr = topics.map((item) => {
      return { numberTopic: item.numberTopic, nameTopic: item.nameTopic };
    });
    const unique = arr.filter(
      (thing, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.numberTopic === thing.numberTopic &&
            t.nameTopic === thing.nameTopic
        )
    );
    res.status(200).json({
      message: "get list topic successfully",
      listTopic: unique,
    });
  });
};

exports.getListPart = (req, res, next) => {
  Video.find({}).then((topics) => {
    const arr = topics.map((item) => {
      return { numberTopic: item.numberTopic, numberPart: item.numberPart };
    });
    const arr2 = arr.filter(
      (item) => item.numberTopic === parseInt(req.query.numberTopic)
    );
    const unique = arr2.filter(
      (thing, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.numberTopic === thing.numberTopic &&
            t.numberPart === thing.numberPart
        )
    );
    res.status(200).json({
      message: "get list part successfully",
      listPart: unique,
    });
  });
};

exports.getListVideo = (req, res, next) => {
  Video.find({}).then((topics) => {
    const arr = topics.map((item) => {
      return {
        numberTopic: item.numberTopic,
        numberPart: item.numberPart,
        url: item.url,
        content: item.content,
        type: item.type,
      };
    });
    const arr2 = arr.filter(
      (item) => item.numberTopic === parseInt(req.query.numberTopic)
    );
    const arr3 = arr2.filter(
      (item) => item.numberPart === parseInt(req.query.numberPart)
    );
    console.log(arr3);
    res.status(200).json({
      message: "get list video successfully",
      listVideo: arr3,
    });
  });
};

exports.getAllVideo = (req, res, next) => {
  Video.find({}).then((topics) => {
    const arr = topics.map((item) => {
      return {
        numberTopic: item.numberTopic,
        url: item.url,
        content: item.content,
        type: item.type
      };
    });
    const arr2 = arr.filter(
      (item) => item.numberTopic === parseInt(req.query.numberTopic)
    );
    console.log(arr2);
    res.status(200).json({
      message: "get all video successfully",
      allVideo: arr2,
    });
  });
};

exports.getAllVideoNoTopic = (req, res, next) => {
  Video.find({}).then((videos) => {
    res.status(200).json({
      message: "get all video without topic successfully",
      allVideo: videos,
    });
  });
};

exports.getListVideoByTopic = (req, res, next) => {
  Video.find({}).then((topics) => {
    const arr = topics.map((item) => {
      return {
        numberTopic: item.numberTopic,
        url: item.url,
        content: item.content,
        type: item.type,
      };
    });
    const arr2 = arr.filter(
      (item) => item.numberTopic <= parseInt(req.query.numberTopic)
    );
    
    res.status(200).json({
      message: "get list video by topic successfully",
      listVideo: arr2,
    });
  });
}

//Admin
exports.updateVideo = (req, res, next) => {
  const video = new Video({
    _id: req.body._id,
    content: req.body.content,
    url: req.body.url,
    numberTopic: req.body.numberTopic,
    nameTopic: req.body.nameTopic,
    numberPart: req.body.numberPart,
    type: req.body.type
  });

  Video.updateOne({ _id: req.body._id }, video)
    .then(() => {
      res.status(200).json({
        message: "update video sucessfully",
      });
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

exports.deleteVideo = (req, res, next) => {
  Video.remove({ _id: req.body._id })
    .then(() => {
      res.status(200).json({
        message: "delete video sucessfully",
      });
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};
