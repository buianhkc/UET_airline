const db = require("../database/server");

class BookingPageController {
    async index(req, res) {
        if (req.session.isLoggedIn) {
            res.render('./pages/booking-page', { isLoggedIn: req.session.isLoggedIn, user: req.session.user });
        } else {
            res.redirect('/login');
        }
    }

    async book(req, res) {
        try {
            const { ma_ve, ma_khach_hang, order_date, so_luong_nguoi_lon, so_luong_tre_em, trang_thai } = req.body;

            const sql = `INSERT INTO orders(ma_ve, ma_khach_hang, order_date, so_luong_nguoi_lon, so_luong_tre_em, trang_thai)
                        VALUES (?, ?, ?, ?, ?, ?);`;

            await db.execute(sql, [ma_ve, ma_khach_hang, order_date, so_luong_nguoi_lon, so_luong_tre_em, trang_thai]);

            res.json(true);
        } catch (error) {
            console.error("Error in book:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getOrderNumber(req, res) {
        try {
            const { ma_khach_hang } = req.body;

            const sql = `SELECT MAX(order_number) as order_number
                FROM orders
                WHERE ma_khach_hang = ?;`;

            const result = await db.execute(sql, [ma_khach_hang]);
            res.json(result[0][0]);
        } catch (error) {
            console.error("Error in getOrderNumber:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async cancelOrder(req, res) {
        try {
            const { order_number } = req.body;

            const sql = `DELETE FROM orders
                WHERE order_number = ?;`;

            await db.execute(sql, [order_number]);
            res.json(true);
        } catch (error) {
            console.error("Error in cancelOrder:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async existSeatOrder(req, res) {
        try {
            const { order_number } = req.body;

            const sql = `SELECT COUNT(*) as num
                        FROM order_seats
                        WHERE order_number = ?;`;

            const result = await db.execute(sql, [order_number]);
            res.json(result[0][0]);
        } catch (error) {
            console.error("Error in existSeatOrder:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = new BookingPageController;
