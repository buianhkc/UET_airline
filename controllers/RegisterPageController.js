const db = require("../database/server");

function addUserToDataBase(user) {
    var sql = `INSERT INTO customers(ten_khach_hang, sdt, dia_chi, gioi_tinh, ten_dang_nhap, mat_khau, email)
    VALUES (\'${user.name}\', \'${user.phonenumber}\', \'${user.address}\', \'${user.gender}\', \'${user.username}\', \'${user.password}\', \'${user.email}\');`
    db.execute(sql)
        .then(function(result) {
            console.log(result);
            console.log("dang ky thanh cong");
        })
        .catch(err => {
            console.log(err);
        })
}

class RegisterPageController {

    // [GET] /register
    index(req, res) {
        res.render('./pages/register');
    }

    register(req, res) {
        // console.log(req.body);
    
        const {username, password, passwordconfirm, name, email, phonenumber, address, gender } = req.body;
        const userData = req.body;

        db.query(`SELECT ten_dang_nhap, email FROM customers WHERE email = \'${email}\' or ten_dang_nhap = \'${username}\'`)
            .then(function(result) {
                var data = result[0];

                if (data.length > 0) {
                    if (data[0].ten_dang_nhap == username) {
                        return res.render('./pages/register', {
                            alertText: 'Tài khoản đã tồn tại'
                        })
                    } else if (data[0].email == email) {
                        return res.render('./pages/register', {
                            alertText: 'Email đã tồn tại'
                        })
                    }
                } else if (password !== passwordconfirm) {
                    return res.render('./pages/register', {
                        alertText: 'Password do not match'
                    })
                } else {
                    addUserToDataBase(userData);
                    return res.render('./pages/login', {
                        alertText: 'Success register'
                    });
                }
            })
    }
}

module.exports = new RegisterPageController;