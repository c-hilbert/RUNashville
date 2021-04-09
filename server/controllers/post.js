const models = require('../models');

module.exports = {
  getUserPost(req, res) {
    models.post.getUserPost(req.query.id, (result) => {
      if (result.length !== 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Not Found');
      }
    });
  },
  getUserReportedPosts(req, res) {
    models.post.getUserReportedPost(req.params.id, (result) => {
      if (result.length !== 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Not Found');
      }
    });
  },
  getAllReportedPosts(req, res) {
    models.post.getAllReportedPosts((result) => {
      if (result.length !== 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Not Found');
      }
    });
  },
  getUserPostStats(req, res) {
    models.post.getPostStats(req.params.postId, (result) => {
      if (result.length !== 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Not Found');
      }
    });
  },
  getUserPostComments(req, res) {
    models.post.getPostComments(req.params.postId, (result) => {
      if (result.length !== 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Not Found');
      }
    });
  },
  getUserPostReactions(req, res) {
    models.post.getPostReactions(req.query.id, (result) => {
      if (result.length !== 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Not Found');
      }
    });
  },
};
