class FilterTicketController {
    // [GET] /user-page
    index(req, res) {
        if (req.session.isLoggedIn) {
            res.render('pages/filter-ticket');
        } else {
            res.redirect('/login');
        }
    }
};

module.exports = new FilterTicketController;
