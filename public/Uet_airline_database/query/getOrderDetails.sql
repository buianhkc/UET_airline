SELECT ma_diem_di, ma_diem_den, so_luong_nguoi_lon, so_luong_tre_em
FROM orders
INNER JOIN tickets USING(ma_ve)
INNER JOIN flights USING(ma_chuyen_bay)
WHERE order_number = 2027;