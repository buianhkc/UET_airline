SELECT  ma_ve,
		loai_ve,
		ma_chuyen_bay,
		ngay_di,
		ngay_den,
		gio_bay,
		so_luong_nguoi_lon,
		so_luong_tre_em,
ma_diem_di,
(SELECT ten_thanh_pho FROM city WHERE flight.ma_diem_di = ma_thanh_pho) as ten_diem_di,
ma_diem_den,
(SELECT ten_thanh_pho FROM city WHERE flight.ma_diem_den = ma_thanh_pho) as ten_diem_den,
ma_chuyen_bay,
ten_may_bay,
so_luong_nguoi_lon + so_luong_tre_em as totalSeat,
so_luong_nguoi_lon * gia_ve_nguoi_lon + so_luong_tre_em * gia_ve_tre_em as totalAmount,
FROM orders
INNER JOIN tickets USING(ma_ve)
INNER JOIN flights USING(ma_chuyen_bay)
INNER JOIN planes USING(ma_may_bay)
WHERE order_number = 1644;