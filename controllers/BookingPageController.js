const db = require("../database/server");

class BookingPageController {
    // [GET] /user-page
    index(req, res) {
        if (req.session.isLoggedIn) {
            res.render('./pages/booking-page', { isLoggedIn: req.session.isLoggedIn, user: req.session.user });
        } else {
            res.redirect('/login');
        }
    }

    book(req, res) {
        // console.log(req.body);

        var { ma_ve, ma_khach_hang, order_date, so_luong_nguoi_lon, so_luong_tre_em, trang_thai } = req.body;

        var sql = `INSERT orders(ma_ve, ma_khach_hang, order_date, so_luong_nguoi_lon, so_luong_tre_em, trang_thai)
                    VALUES (${ma_ve}, ${ma_khach_hang}, '${order_date}', ${so_luong_nguoi_lon}, ${so_luong_tre_em}, '${trang_thai}');`;

        db.execute(sql)
            .then((result) => {
                res.json(true)
            })
            .catch(err => {
                console.log(err);
            })
    }

    getOrderNumber(req, res) {
        // console.log(req.body);

        var { ma_khach_hang } = req.body;

        var sql = `SELECT MAX(order_number) as order_number
        FROM orders
        WHERE ma_khach_hang = ${ma_khach_hang};`;

        db.execute(sql)
            .then((result) => {
                // console.log(result[0][0]);
                res.json(result[0][0]);
            })
            .catch(err => {
                console.log(err);
            })
    }
};

module.exports = new BookingPageController;
