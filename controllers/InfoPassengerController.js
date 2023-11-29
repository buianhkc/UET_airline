const db = require("../database/server");

class InfoPassengerController {
    // [GET] /login
    async index(req, res) {
        try {
            if (req.session.isLoggedIn) {
                res.render('./pages/info-passenger', { isLoggedIn: req.session.isLoggedIn, user: req.session.user });
            } else {
                res.redirect('/login');
            }
        } catch (error) {
            console.error("Error in index:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getQuantityPersonOrder(req, res) {
        try {
            const { order_number } = req.body;

            const sql = `SELECT so_luong_nguoi_lon, so_luong_tre_em
            FROM orders
            WHERE order_number = ?;`;

            const result = await db.execute(sql, [order_number]);
            res.json(result[0][0]);
        } catch (error) {
            console.error("Error in getQuantityPersonOrder:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getOrderDetails(req, res) {
        try {
            const { order_number } = req.body;

            const sql = `SELECT ma_diem_di, ma_diem_den, so_luong_nguoi_lon, so_luong_tre_em
            FROM orders
            INNER JOIN tickets USING(ma_ve)
            INNER JOIN flights USING(ma_chuyen_bay)
            WHERE order_number = ?;`;

            const result = await db.execute(sql, [order_number]);
            res.json(result[0][0]);
        } catch (error) {
            console.error("Error in getOrderDetails:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async insertInfoPassenger(req, res) {
        try {
            const listInfoPassenger = req.body;

            for (const iP of listInfoPassenger) {
                const sql = `INSERT passengers(order_number, ma_hanh_khach, ten, gioi_tinh, do_tuoi, ngay_sinh)
                            VALUES(?, ?, ?, ?, ?, ?)`;
                const values = [iP.order_number, iP.ma_hanh_khach, `'${iP.ten}'`, `'${iP.gioi_tinh}'`, `'${iP.do_tuoi}'`, `'${iP.ngay_sinh}'`];

                console.log(sql);

                await db.execute(sql, values);
            }

            res.json(true);
        } catch (error) {
            console.error("Error in insertInfoPassenger:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = new InfoPassengerController;
