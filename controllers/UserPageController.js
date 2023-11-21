class UserPageController {
    // [GET] /user-page
    index(req, res) {
        res.render('pages/user-page', {isLoggedIn:req.session.isLoggedIn, user: req.session.user});
    }

    deposit(req, res) {
        console.log(req.body);
    }
};

module.exports = new UserPageController;
