class FilterTicketController {
    // [GET] /user-page
    index(req, res) {
        if (req.session.isLoggedIn) {
            res.render('./pages/filter-ticket', {isLoggedIn:req.session.isLoggedIn, user: req.session.user});
        } else {
            res.redirect('/login');
        }
    }
};

module.exports = new FilterTicketController;
