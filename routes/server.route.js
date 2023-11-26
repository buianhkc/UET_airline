const homePageRouter = require('./homepage.route');
const loginPageRouter = require('./login.route');
const registerPageRouter = require('./register.route');
const userPageRouter = require('./userpage.route');
const filterTicketRouter = require('./filterticket.route');
const bookingPageRouter = require('./booking.route');
const infoPassengerRouter = require('./info-passenger.route');
const seatOrderRouter = require('./seat-order.route');

function route(app) {

    // Route cho đăng xuất
    app.get('/logout', (req, res) => {
        // Xoá thông tin người dùng từ phiên
        req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            // Chuyển hướng đến trang chủ sau khi đăng xuất
            res.redirect('/');
        }
        });
    });

    // home page
    app.use('/home-page', homePageRouter);

    // login page 
    app.use('/login', loginPageRouter);

    // register page
    app.use('/register', registerPageRouter);

    //user-page
    app.use('/user-page', userPageRouter);

    app.use('/filter-ticket', filterTicketRouter);

    app.use('/booking-page', bookingPageRouter);

    app.use('/info-passenger', infoPassengerRouter);

    app.use('/info-passenger', infoPassengerRouter);

    app.use('/seat-order', seatOrderRouter);

    app.use('/', homePageRouter);
}

module.exports = route;