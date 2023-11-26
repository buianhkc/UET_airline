const db = require("../database/server");

class InfoPassengerController {

    // [GET] /login
    index(req, res) {
        if (req.session.isLoggedIn) {
            res.render('./pages/info-passenger', { isLoggedIn: req.session.isLoggedIn, user: req.session.user });
        } else {
            res.redirect('/login');
        }
    }

    getQuantityPersonOrder(req, res) {
        var { order_number } = req.body;

        var sql = `SELECT so_luong_nguoi_lon, so_luong_tre_em
        FROM orders
        WHERE order_number = ${order_number};`;

        db.execute(sql)
            .then((result) => {
                // console.log(result[0][0]);
                res.json(result[0][0]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    getOrderDetails(req, res) {
        var { order_number } = req.body;

        var sql = `SELECT ma_diem_di, ma_diem_den, so_luong_nguoi_lon, so_luong_tre_em
        FROM orders
        INNER JOIN tickets USING(ma_ve)
        INNER JOIN flights USING(ma_chuyen_bay)
        WHERE order_number = ${order_number};`;

        db.execute(sql)
            .then((result) => {
                // console.log(result[0][0]);
                res.json(result[0][0]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    backToBookingPage(req, res) {
        var { order_number } = req.body;
        // console.log(order_number);

        var sql1 = `DELETE FROM orders
        WHERE order_number = ${order_number};`;

        var sql2 = `DELETE FROM passengers
        WHERE order_number = ${order_number};`;

        db.execute(sql1)
            .catch(err => {
                console.log(err);
            })

        db.execute(sql2)
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = new InfoPassengerController;