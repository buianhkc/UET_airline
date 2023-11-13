class UserPageController {
    // [GET] /user-page
    index(req, res) {
        res.render('pages/user-page');
    }
};

module.exports = new UserPageController;
