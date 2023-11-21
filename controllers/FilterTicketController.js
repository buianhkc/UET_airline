// const danhSachTinhThanh = [
//     "VTB", "BDI", "CMU", "CTH", "DNA", "DLA", "DBI", "GLA", "HNO", "HPG",
//     "HCM", "KHA", "KGI", "LDG", "NAN", "PYE", "QBI", "QNA", "QNH", "THA", "TTH"
// ];

const db = require("../database/server");

class FilterTicketController {
    // [GET] /user-page
    index(req, res) {
        if (req.session.isLoggedIn) {
            var query = req.query;
            console.log(req.query);
            res.render('./pages/filter-ticket', { isLoggedIn: req.session.isLoggedIn, user: req.session.user, query });
        } else {
            res.redirect('/login');
        }
    }

    filter(req, res) {
        // console.log(req.query);
        const reqFilter = req.query;

        var ma_diem_di = reqFilter.airportDepart;
        var ma_diem_den = reqFilter.airportArrive;
        var dateDepartBegin = reqFilter.dateDepartBegin;
        var dateDepartEnd = reqFilter.dateDepartEnd;
        var totalSeat = parseInt(reqFilter.totalSeat);
        // var typeTicket = (reqFilter.typeTicket === 'Hạng phổ thông') ? 'pho_thong' : 'thuong_gia';

        // console.log(ma_diem_den, ma_diem_di, totalSeat, dateDepartBegin, dateDepartEnd);

        var qMaDiemDi = (ma_diem_di == '0') ? '' : `AND ma_diem_di = \'${ma_diem_di}\'\n`;
        var qMaDiemDen = (ma_diem_den == '0') ? '' : `AND ma_diem_den = \'${ma_diem_den}\'\n`;
        var qSoluongGhe = `AND so_luong_con >= ${totalSeat}\n`;
        var qTuNgay = (dateDepartBegin == '') ? '' : `AND ngay_di >= \'${dateDepartBegin}\'\n`;
        var qDenNgay = (dateDepartEnd == '') ? '' : `AND ngay_di <= \'${dateDepartEnd}\'\n`;

        var sql = `SELECT ma_ve,
            loai_ve,
            ma_chuyen_bay,
            ngay_di, 
            ngay_den, 
            gio_bay,
            gia_ve_nguoi_lon,
            gia_ve_tre_em,
            so_luong_con,
            ma_diem_di,
            (SELECT ten_thanh_pho FROM city WHERE f.ma_diem_di = ma_thanh_pho) as ten_diem_di,
             ma_diem_den,
            (SELECT ten_thanh_pho FROM city WHERE f.ma_diem_den = ma_thanh_pho) as ten_diem_den,
            ma_chuyen_bay,
            ten_may_bay
            FROM ticket
            INNER JOIN flight as f USING(ma_chuyen_bay)
            INNER JOIN plane as p USING(ma_may_bay)
            WHERE 1 = 1\n`
            + qMaDiemDi
            + qMaDiemDen
            + qSoluongGhe
            + qTuNgay
            + qDenNgay
            + `ORDER BY ma_chuyen_bay`

        console.log(sql);
        
        db.execute(sql)
            .then((result) => {
                // console.log(result[0]);
                res.json(result[0]);
            })
    }
};

module.exports = new FilterTicketController;
