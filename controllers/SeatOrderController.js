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

        var sql = `SELECT  ma_ve,
		loai_ve,
		ma_chuyen_bay,
		ngay_di,
		ngay_den,
		gio_bay,
		so_luong_nguoi_lon,
		so_luong_tre_em,
        ma_diem_di,
        (SELECT ten_thanh_pho FROM citys WHERE flights.ma_diem_di = ma_thanh_pho) as ten_diem_di,
        ma_diem_den,
        (SELECT ten_thanh_pho FROM citys WHERE flights.ma_diem_den = ma_thanh_pho) as ten_diem_den,
        ma_chuyen_bay,
        ten_may_bay,
        gia_ve_nguoi_lon,
        gia_ve_tre_em,
        so_luong_nguoi_lon + so_luong_tre_em as totalSeat,
        so_luong_nguoi_lon * gia_ve_nguoi_lon + so_luong_tre_em * gia_ve_tre_em as totalAmount,
        so_ghe_pho_thong,
        so_ghe_thuong_gia
        FROM orders
        INNER JOIN tickets USING(ma_ve)
        INNER JOIN flights USING(ma_chuyen_bay)
        INNER JOIN planes USING(ma_may_bay)
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

    getAllSeat(req, res) {
        var { ma_chuyen_bay } = req.body;

        var sql = `SELECT *
                FROM seat_details
                WHERE ma_chuyen_bay = ${ma_chuyen_bay}`;

        db.execute(sql)
            .then((result) => {
                // console.log(result[0]);
                res.json(result[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = new SeatOrderController;