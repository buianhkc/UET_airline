const db = require("../database/server");

class LoginPageController {

    // [GET] /login
    index(req, res) {
        res.render('./pages/login');
    }

    // [POST] /auth/login
    login(req, res) {
        // console.log(req.body);

        const { useraccount, password, item } = req.body;
        var sql = `SELECT * FROM customers WHERE email = \'${useraccount}\' or ten_dang_nhap = \'${useraccount}\'`;

        // console.log(sql);

        db.execute(sql)
            .then(function (result) {
                var data = result[0];
                // console.log(data[0]);

                if (data.length == 0) {
                    return res.render('./pages/login', {
                        alertText: 'Tài khoản không tồn tại'
                    })
                } else if (password !== data[0].mat_khau) {
                    return res.render('./pages/login', {
                        alertText: 'Mật khẩu không đúng'
                    })
                }

                // req.session.userId = data[0].ma_khach_hang;
                req.session.user = data[0];
                req.session.isLoggedIn = true;

                res.redirect('/')
            })
    }
}

module.exports = new LoginPageController;