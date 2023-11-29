const db = require("../database/server");

class SeatOrderController {

    async index(req, res) {
        if (req.session.isLoggedIn) {
            try {
                const query = req.query;
                res.render('./pages/seat-order', { isLoggedIn: req.session.isLoggedIn, user: req.session.user, query });
            } catch (error) {
                console.error("Error in index:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        } else {
            res.redirect('/login');
        }
    }

    async getOrderDetails(req, res) {
        try {
            const { order_number } = req.body;

            const sql = `SELECT  ma_ve,
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
                WHERE order_number = ?;`;

            const result = await db.execute(sql, [order_number]);
            res.json(result[0][0]);
        } catch (error) {
            console.error("Error in getOrderDetails:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getAllSeat(req, res) {
        try {
            const { ma_chuyen_bay } = req.body;

            const sql = `SELECT *
                    FROM seat_details
                    WHERE ma_chuyen_bay = ?`;

            const result = await db.execute(sql, [ma_chuyen_bay]);
            res.json(result[0]);
        } catch (error) {
            console.error("Error in getAllSeat:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async addSeatOrder(req, res) {
        try {
            console.log(req.body);
            const listSeatOrder = req.body;

            for (const seatOrder of listSeatOrder) {
                const insertOrderSeatsSql = `INSERT INTO order_seats(order_number, ma_chuyen_bay, ma_ghe) VALUES (?, ?, ?);`;

                await db.execute(insertOrderSeatsSql, [seatOrder.order_number, seatOrder.ma_chuyen_bay, seatOrder.ma_ghe]);

                const updateSeatDetailsSql = `UPDATE seat_details SET trang_thai = 'filled' WHERE ma_chuyen_bay = ? AND ma_ghe = ?;`;

                await db.execute(updateSeatDetailsSql, [seatOrder.ma_chuyen_bay, seatOrder.ma_ghe]);
            }

            const updateTicketsSql = `UPDATE tickets AS t 
                INNER JOIN (
                    SELECT so_luong_nguoi_lon + so_luong_tre_em as totalHuman, ma_ve
                    FROM orders
                    INNER JOIN tickets USING(ma_ve)
                    WHERE order_number = ?
                ) AS tmp USING(ma_ve)
                SET t.so_luong_con = t.so_luong_con - tmp.totalHuman;`;

            await db.execute(updateTicketsSql, [listSeatOrder[0].order_number]);

            res.json(true);
        } catch (error) {
            console.error("Error in addSeatOrder:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = new SeatOrderController;
