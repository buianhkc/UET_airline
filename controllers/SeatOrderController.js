const db = require("../database/server");

class SeatOrderController {

    // [GET] /login
    index(req, res) {
        if (req.session.isLoggedIn) {
            var query = req.query;
            // console.log(req.query);
            res.render('./pages/seat-order', { isLoggedIn: req.session.isLoggedIn, user: req.session.user, query });
        } else {
            res.redirect('/login');
        }
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
}

module.exports = new SeatOrderController;