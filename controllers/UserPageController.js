const db = require("../database/server");

class UserPageController {
    // [GET] /user-page
    index(req, res) {
        res.render('pages/user-page', { isLoggedIn: req.session.isLoggedIn, user: req.session.user });
    }

    deposit(req, res) {
        // console.log(req.body);
        var { ma_khach_hang, amount } = req.body;
        var sql = `UPDATE customers
            SET balance = balance + ${amount}
            WHERE ma_khach_hang = ${ma_khach_hang};`;

        db.execute(sql)
            .then(() => {
                db.execute(`INSERT transactions(ma_khach_hang, loai_giao_dich, amount)
                VALUES (${ma_khach_hang}, 'payment', ${amount});`)
                    .then(() => {
                        res.json(true);
                    })
            })
    }

    getBalance(req, res) {
        // console.log(req.body);
        var { ma_khach_hang } = req.body;
        var sql = `SELECT balance
            FROM customers
            WHERE ma_khach_hang = ${ma_khach_hang}`;

        db.execute(sql)
            .then(result => {
                res.json(result);
            })
    }

    getTicket(req, res) {
        // console.log(req.body);

        var ma_khach_hang = req.body.ma_khach_hang;

        var sql = `SELECT order_number,
        ma_khach_hang,
		ma_ve,
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
        so_luong_nguoi_lon + so_luong_tre_em as totalSeat,
        so_luong_nguoi_lon * gia_ve_nguoi_lon + so_luong_tre_em * gia_ve_tre_em as totalAmount,
        trang_thai
        FROM orders
        INNER JOIN customers USING(ma_khach_hang)
        INNER JOIN tickets USING(ma_ve)
        INNER JOIN flights USING(ma_chuyen_bay)
        INNER JOIN planes USING(ma_may_bay)
        WHERE ma_khach_hang = ${ma_khach_hang}
        HAVING datediff(ngay_di, now()) >= 0
        ORDER BY ngay_di ASC`;

        db.execute(sql)
            .then(result => {
                // console.log(result[0]);
                res.json(result[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    payTicket(req, res) {
        console.log(req.body)
        var { ma_khach_hang, order_number } = req.body;
        var sql = `SELECT ma_ve, trang_thai, so_luong_nguoi_lon * gia_ve_nguoi_lon + so_luong_tre_em * gia_ve_tre_em as totalAmount
                    FROM orders
                    INNER JOIN tickets USING(ma_ve)
                    WHERE order_number = ${order_number};`
        db.execute(sql)
            .then(result => {
                var { ma_ve, trang_thai, totalAmount } = result[0][0];
                return result[0][0];
            })
            .then((data) => {
                var { ma_ve, trang_thai, totalAmount } = data;
                var q1 = `INSERT transactions(ma_khach_hang, order_number, loai_giao_dich, amount)
                            VALUES (${ma_khach_hang}, ${order_number}, 'payment', ${totalAmount});`

                var q2 = `UPDATE orders
                        SET trang_thai = 'paid'
                        WHERE order_number = ${order_number};`

                var q3 = `UPDATE customers
                        SET balance = balance - ${totalAmount}
                        WHERE ma_khach_hang = ${ma_khach_hang};`

                var q4 = `UPDATE tickets
                        SET so_luong_con = so_luong_con - 1
                        WHERE ma_ve = ${ma_ve}`

                db.execute(q1)
                    .catch(err => {
                        console.log(err)
                    })

                db.execute(q2)
                    .catch(err => {
                        console.log(err)
                    })

                db.execute(q3)
                    .catch(err => {
                        console.log(err)
                    })

                db.execute(q4)
                    .catch(err => {
                        console.log(err)
                    })

                return true;
            })
            .then(result => {
                res.json(result);
            })
    }

    deleteTicket(req, res) {
        console.log(req.body)
        var { ma_khach_hang, order_number } = req.body;
        var sql = `SELECT ma_ve, trang_thai, so_luong_nguoi_lon * gia_ve_nguoi_lon + so_luong_tre_em * gia_ve_tre_em as totalAmount
                    FROM orders
                    INNER JOIN tickets USING(ma_ve)
                    WHERE order_number = ${order_number};`
        db.execute(sql)
            .then(result => {
                var { ma_ve, trang_thai, totalAmount } = result[0][0];
                return result[0][0]
            })
            .then(result => {
                var { ma_ve, trang_thai, totalAmount } = result;
                console.log(result)
                var q1 = `INSERT transactions(ma_khach_hang, order_number, loai_giao_dich, amount)
                            VALUES (${ma_khach_hang}, ${order_number}, 'return', ${totalAmount});`

                var q2 = `DELETE FROM orders
                        WHERE order_number = ${order_number};`

                var q3 = `UPDATE customers
                        SET balance = balance + ${totalAmount}
                        WHERE ma_khach_hang = ${ma_khach_hang};`

                var q4 = `UPDATE tickets
                        SET so_luong_con = so_luong_con + 1
                        WHERE ma_ve = ${ma_ve}`

                db.execute(q1)
                    .catch(err => {
                        console.log(err)
                    })

                db.execute(q2)
                    .catch(err => {
                        console.log(err)
                    })

                if (trang_thai == 'paid') {
                    db.execute(q3)
                        .catch(err => {
                            console.log(err)
                        })

                    db.execute(q4)
                        .catch(err => {
                            console.log(err)
                        })
                }


                return true;
            })
            .then(result => {
                res.json(result);
            })
    }
};

module.exports = new UserPageController;
