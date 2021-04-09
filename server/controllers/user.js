const models = require('../models');

module.exports = {
  getDetails(req, res) {
    models.user.getUserDetails(req.params.id, (result) => {
      if (result.length !== 0) {
        res.status(200).json(result);
      } else {
        res.status(404).send('User Not Found');
      }
    });
  },
  getFriends(req, res) {
    models.user.getUserFriends(req.params.uid, (result) => {
      if (result.length !== 0) {
        res.status(200).json(result);
      } else {
        res.status(404).send('User Not Found');
      }
    });
  },
  getAll(req, res) {
    models.user.getAllUsers((result) => {
      if (result.length !== 0) {
        res.status(200).json(result);
      } else {
        res.status(404).send('User Not Found');
      }
    });
  },
  getType(req, res) {
    models.user.getUserType(req.params.id, (result) => {
      if (result.length !== 0) {
        res.status(200).json(result);
      } else {
        res.status(404).send('User Not Found');
      }
    });
  },
  getBannedUsers(req, res) {
    models.user.getBannedUsers((result) => {
      if (result.length !== 0) {
        res.status(200).json(result);
      } else {
        res.status(404).send('User Not Found');
      }
    });
  },
  putUpdateUserInfo(req, res) {
    /*
      {
        update: 'banned',
        value: true
        userId: id,
      }
    */
    const { update, value, userId } = req.body;
    const data = [value, userId];
    if (update === 'banned') {
      models.user.putUpdateUserBanned(data, (err, result) => {
        if (err) {
          res.status(404).send('User Not Found');
        } else {
          res.status(204).send(result);
        }
      });
    }
    if (update === 'name') {
      models.user.putUpdateUserName(data, (err, result) => {
        if (err) {
          res.status(404).send('User Not Found');
        } else {
          res.status(204).send(result);
        }
      });
    }
    if (update === 'profile_picture') {
      models.user.putUpdateUserProfilePicture(data, (err, result) => {
        if (err) {
          res.status(404).send('User Not Found');
        } else {
          res.status(204).send(result);
        }
      });
    }
    if (update === 'profile_banner') {
      models.user.putUpdateUserBannerPicture(data, (err, result) => {
        if (err) {
          res.status(404).send('User Not Found');
        } else {
          res.status(204).send(result);
        }
      });
    }
    if (update === 'last_name') {
      models.user.putUpdateUserLastName(data, (err, result) => {
        if (err) {
          res.status(404).send('User Not Found');
        } else {
          res.status(204).send(result);
        }
      });
    }
    if (update === 'address_user') {
      models.user.putUpdateUserAddress(data, (err, result) => {
        if (err) {
          res.status(404).send('User Not Found');
        } else {
          res.status(204).send(result);
        }
      });
    }
  },
  putUpdateBanManyUsers(req, res) {
    /*
      userId: [id1,id2,id3],
      value: true
    */
    const { userId, value } = req.params;
    const count = userId.length;
    let i = 0;
    userId.forEach((uid) => {
      const data = [uid, value];
      models.user.putUpdateUserBanned(data, (err) => {
        if (count === i) {
          if (err) {
            res.status(404).send('User Not Found');
          } else {
            res.status(204).send('Updated Ban Status');
          }
        } else {
          i += 1;
        }
      });
    });
  },
};
