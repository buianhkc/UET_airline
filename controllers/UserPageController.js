const db = require("../database/server");

class UserPageController {
    // [GET] /user-page
    async index(req, res) {
        res.render('pages/user-page', { isLoggedIn: req.session.isLoggedIn, user: req.session.user });
    }

    async deposit(req, res) {
        try {
            const { ma_khach_hang, amount } = req.body;
            const updateBalanceSql = `UPDATE customers SET balance = balance + ? WHERE ma_khach_hang = ?;`;

            await db.execute(updateBalanceSql, [amount, ma_khach_hang]);

            const insertTransactionSql = `INSERT INTO transactions(ma_khach_hang, loai_giao_dich, amount) VALUES (?, 'payment', ?);`;

            await db.execute(insertTransactionSql, [ma_khach_hang, amount]);

            res.json(true);
        } catch (error) {
            console.error("Error in deposit:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getBalance(req, res) {
        try {
            const { ma_khach_hang } = req.body;
            const getBalanceSql = `SELECT balance FROM customers WHERE ma_khach_hang = ?;`;

            const result = await db.execute(getBalanceSql, [ma_khach_hang]);
            res.json(result[0]);
        } catch (error) {
            console.error("Error in getBalance:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getTicket(req, res) {
        try {
            const ma_khach_hang = req.body.ma_khach_hang;
            const getTicketSql = `
                SELECT order_number, ma_khach_hang, ma_ve, loai_ve, ma_chuyen_bay, ngay_di, ngay_den, gio_bay,
                so_luong_nguoi_lon, so_luong_tre_em, ma_diem_di,
                (SELECT ten_thanh_pho FROM citys WHERE flights.ma_diem_di = ma_thanh_pho) as ten_diem_di,
                ma_diem_den,
                (SELECT ten_thanh_pho FROM citys WHERE flights.ma_diem_den = ma_thanh_pho) as ten_diem_den,
                ma_chuyen_bay, ten_may_bay,
                so_luong_nguoi_lon + so_luong_tre_em as totalSeat,
                so_luong_nguoi_lon * gia_ve_nguoi_lon + so_luong_tre_em * gia_ve_tre_em as totalAmount,
                trang_thai
                FROM orders
                INNER JOIN customers USING(ma_khach_hang)
                INNER JOIN tickets USING(ma_ve)
                INNER JOIN flights USING(ma_chuyen_bay)
                INNER JOIN planes USING(ma_may_bay)
                WHERE ma_khach_hang = ?
                HAVING datediff(ngay_di, now()) >= 0;`;

            const result = await db.execute(getTicketSql, [ma_khach_hang]);
            res.json(result[0]);
        } catch (error) {
            console.error("Error in getTicket:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async payTicket(req, res) {
        try {
            const { ma_khach_hang, order_number } = req.body;
            const getPaymentInfoSql = `
                SELECT ma_ve, trang_thai, so_luong_nguoi_lon + so_luong_tre_em as totalHuman,
                so_luong_nguoi_lon * gia_ve_nguoi_lon + so_luong_tre_em * gia_ve_tre_em as totalAmount
                FROM orders
                INNER JOIN tickets USING(ma_ve)
                WHERE order_number = ?;`;

            const data = await db.execute(getPaymentInfoSql, [order_number]);
            const { ma_ve, totalHuman, trang_thai, totalAmount } = data[0][0];

            const q1 = `INSERT INTO transactions(ma_khach_hang, order_number, loai_giao_dich, amount) VALUES (?, ?, 'payment', ?);`;

            await db.execute(q1, [ma_khach_hang, order_number, totalAmount]);

            const q2 = `UPDATE orders SET trang_thai = 'paid' WHERE order_number = ?;`;

            await db.execute(q2, [order_number]);

            const q3 = `UPDATE customers SET balance = balance - ? WHERE ma_khach_hang = ?;`;

            await db.execute(q3, [totalAmount, ma_khach_hang]);

            res.json(data[0][0]);
        } catch (error) {
            console.error("Error in payTicket:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async deleteTicket(req, res) {
        try {
            const { ma_khach_hang, order_number } = req.body;
            const getTicketInfoSql = `
                SELECT ma_ve, trang_thai, so_luong_nguoi_lon + so_luong_tre_em as totalHuman,
                so_luong_nguoi_lon * gia_ve_nguoi_lon + so_luong_tre_em * gia_ve_tre_em as totalAmount
                FROM orders
                INNER JOIN tickets USING(ma_ve)
                WHERE order_number = ?;`;

            const data = await db.execute(getTicketInfoSql, [order_number]);
            const { ma_ve, totalHuman, trang_thai, totalAmount } = data[0][0];

            const updateSeatDetailsSql = `
                UPDATE seat_details as sd
                INNER JOIN (
                    SELECT * FROM order_seats WHERE order_number = ?
                ) as tmp ON tmp.ma_chuyen_bay = sd.ma_chuyen_bay AND tmp.ma_ghe = sd.ma_ghe
                SET trang_thai = 'empty';`;

            await db.execute(updateSeatDetailsSql, [order_number]);

            const q1 = `INSERT INTO transactions(ma_khach_hang, order_number, loai_giao_dich, amount) VALUES (?, ?, 'return', ?);`;

            await db.execute(q1, [ma_khach_hang, order_number, totalAmount]);

            const q2 = `DELETE FROM orders WHERE order_number = ?;`;

            await db.execute(q2, [order_number]);

            const q3 = `UPDATE customers SET balance = balance + ? WHERE ma_khach_hang = ?;`;

            if (trang_thai === 'paid') {
                await db.execute(q3, [totalAmount, ma_khach_hang]);
            }

            const q4 = `UPDATE tickets SET so_luong_con = so_luong_con + ? WHERE ma_ve = ?;`;

            await db.execute(q4, [totalHuman, ma_ve]);

            res.json(data[0][0]);
        } catch (error) {
            console.error("Error in deleteTicket:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = new UserPageController;
