class LoginPageController {

    // [GET] /login
    index(req, res) {
        res.render('./pages/login');
    }
}

module.exports = new LoginPageController;