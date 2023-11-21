SELECT ma_ve,
		loai_ve,
		ma_chuyen_bay,
		ngay_di,
		ngay_den,
		gio_bay,
		so_luong_nguoi_lon,
		so_luong_tre_em
(SELECT ten_thanh_pho FROM city WHERE f.ma_diem_di = ma_thanh_pho) as ten_diem_di,
ma_diem_den,
(SELECT ten_thanh_pho FROM city WHERE f.ma_diem_den = ma_thanh_pho) as ten_diem_den,
ma_chuyen_bay,
ten_may_bay,
 so_luong_nguoi_lon * gia_ve_nguoi_lon + so_luong_tre_em * gia_ve_tre_em as totalAmount
FROM orders
INNER JOIN customer USING(ma_khach_hang)
INNER JOIN ticket USING(ma_ve)
INNER JOIN flight USING(ma_chuyen_bay)

SELECT 		ma_ve,
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
            WHERE 1 = 1
AND ma_diem_di = 'NAN'
AND ma_diem_den = 'HCM'
AND so_luong_con >= 1
ORDER BY ma_chuyen_bay