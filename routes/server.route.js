const homePageRouter = require('./homepage.route');
const loginPageRouter = require('./login.route');

function route(app) {

    // home page
    app.use('/home-page', homePageRouter);

    // login page 
    app.use('/login', loginPageRouter);

    app.use('/', homePageRouter);
}

module.exports = route;