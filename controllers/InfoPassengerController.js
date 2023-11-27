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

    insertInfoPassenger(req, res) {
        var listInfoPassenger = req.body;

        for (var i = 0; i < listInfoPassenger.length; ++i) {
            var iP =listInfoPassenger[i];
            var sql = `INSERT passengers(order_number, ma_hanh_khach, ten, gioi_tinh, do_tuoi, ngay_sinh)
                        VALUES(${iP.order_number}, ${iP.ma_hanh_khach}, ${iP.ten}, ${iP.gioi_tinh}, ${iP.do_tuoi}, ${iP.ngay_sinh})`
            db.execute(sql)
                .catch(err => {
                    console.log(err);
                })
        }
    }

    cancelOrder(req, res) {
        var { order_number } = req.body;
        // console.log(order_number);
        console.log("huy ve");

        var sql1 = `DELETE FROM orders
        WHERE order_number = ${order_number};`;

        db.execute(sql1)
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = new InfoPassengerController;