const db = require("../database/server");

class FilterTicketController {
    async index(req, res) {
        try {
            if (req.session.isLoggedIn) {
                var query = req.query;
                res.render('./pages/filter-ticket', { isLoggedIn: req.session.isLoggedIn, user: req.session.user, query });
            } else {
                res.redirect('/login');
            }
        } catch (error) {
            console.error("Error in index:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async filter(req, res) {
        try {
            const reqFilter = req.query;

            const ma_diem_di = reqFilter.airportDepart;
            const ma_diem_den = reqFilter.airportArrive;
            const dateDepartBegin = reqFilter.dateDepartBegin;
            const dateDepartEnd = reqFilter.dateDepartEnd;
            const totalSeat = parseInt(reqFilter.totalSeat);

            const qMaDiemDi = (ma_diem_di === '0') ? '' : `AND ma_diem_di = '${ma_diem_di}'\n`;
            const qMaDiemDen = (ma_diem_den === '0') ? '' : `AND ma_diem_den = '${ma_diem_den}'\n`;
            const qSoluongGhe = `AND so_luong_con >= ${totalSeat}\n`;
            const qTuNgay = (dateDepartBegin === '') ? '' : `AND ngay_di >= '${dateDepartBegin}'\n`;
            const qDenNgay = (dateDepartEnd === '') ? '' : `AND ngay_di <= '${dateDepartEnd}'\n`;

            const sql = `SELECT ma_ve,
                loai_ve,
                ma_chuyen_bay,
                ngay_di, 
                ngay_den, 
                gio_bay,
                gia_ve_nguoi_lon,
                gia_ve_tre_em,
                so_luong_con,
                ma_diem_di,
                (SELECT ten_thanh_pho FROM citys WHERE f.ma_diem_di = ma_thanh_pho) as ten_diem_di,
                ma_diem_den,
                (SELECT ten_thanh_pho FROM citys WHERE f.ma_diem_den = ma_thanh_pho) as ten_diem_den,
                ma_chuyen_bay,
                ten_may_bay
                FROM tickets
                INNER JOIN flights as f USING(ma_chuyen_bay)
                INNER JOIN planes as p USING(ma_may_bay)
                WHERE 1 = 1\n`
                + qMaDiemDi
                + qMaDiemDen
                + qSoluongGhe
                + qTuNgay
                + qDenNgay
                + `ORDER BY DATE(ngay_di) ASC, ma_ve ASC, loai_ve ASC
                LIMIT 100`;

            const result = await db.execute(sql);
            res.json(result[0]);
        } catch (error) {
            console.error("Error in filter:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = new FilterTicketController;
