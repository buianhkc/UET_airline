SELECT ma_ve, trang_thai, so_luong_nguoi_lon * gia_ve_nguoi_lon + so_luong_tre_em * gia_ve_tre_em as totalAmount
FROM orders
INNER JOIN ticket USING(ma_ve)
WHERE order_number = 945843;