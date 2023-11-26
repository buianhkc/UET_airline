const db = require("../database/server");

class HomePageController {
    // [GET] /home-page
    index (req, res) {
        // console.log(req.session);
        res.render('./pages/home-page', {isLoggedIn:req.session.isLoggedIn, user: req.session.user});
    }

    getBestSellerTicket(req, res) {
        try {

            // console.log(req.query);

            var queryDepart = (req.query.depart == "") ? "" :`AND f.ma_diem_di = \'${req.query.depart}\'\n`;
            var queryArrive = (req.query.arrive == "") ? "" :`AND f.ma_diem_den = \'${req.query.arrive}\'\n`;
            var queryMoney = (req.query.money == "") ? "" :`HAVING minPrice <= ${req.query.money}\n`;

            var sqlQuery = `SELECT ma_diem_di, 
            (SELECT ten_thanh_pho FROM citys WHERE f.ma_diem_di = ma_thanh_pho) as ten_diem_di,
             ma_diem_den,
            (SELECT ten_thanh_pho FROM citys WHERE f.ma_diem_den = ma_thanh_pho) as ten_diem_den,
            (SELECT linkImg FROM citys WHERE f.ma_diem_den = ma_thanh_pho) as linkimg_diem_den,
            t.loai_ve,
            min(t.gia_ve_nguoi_lon) minPrice,
            date(f.ngay_di) as date_depart,
            count(*) AS quantity
            FROM  orders AS o
            INNER JOIN tickets AS t USING (ma_ve)
            INNER JOIN flights AS f USING (ma_chuyen_bay)
            WHERE 1 = 1 \n`
            + queryDepart
            + queryArrive
            + `GROUP BY f.ma_diem_di, f.ma_diem_den, t.loai_ve, f.ngay_di \n`
            + queryMoney
            + `ORDER BY quantity DESC LIMIT 40;`;

            //console.log(sqlQuery);

            db.query(sqlQuery)
                .then(data => {
                    res.json(data);
                })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new HomePageController;