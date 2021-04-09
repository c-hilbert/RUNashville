const router = require('express').Router();
const controller = require('./controllers');

router.post('/login', controller.login.post);
router.post('/signup', controller.signup.post);
router.get('/user/:id/type', controller.user.getType);
router.get('/user/:id', controller.user.getDetails);
router.get('/friends/:uid', controller.user.getFriends);
router.get('/users/banned', controller.user.getBannedUsers);
router.get('/users', controller.user.getAll);
router.get('/post/reported', controller.post.getAllReportedPosts);
router.put('/users/ban', controller.user.putUpdateBanManyUsers);
router.put('/user', controller.user.putUpdateUserInfo);
router.get('/post', controller.post.getUserPost);
router.get('/post/:id/reported', controller.post.getUserReportedPosts);
router.get('/post/:postId/stats', controller.post.getUserPostStats);
router.get('/post/:postId/comments', controller.post.getUserPostComments);
router.get('/events', controller.events.getAllEvents);
router.get('/events/promoted', controller.events.getAllPromotedEvents);
router.get('/events/hidden', controller.events.getHiddenEvents);
router.get('/events/:id', controller.events.getEventsCreatedByUser);
router.post('/events', controller.events.postNewEvent);

module.exports = router;
