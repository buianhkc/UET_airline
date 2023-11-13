INSERT INTO payment(ma_khach_hang, order_number, amount)
SELECT ma_khach_hang, order_number, (so_luong_nguoi_lon * gia_ve_nguoi_lon + so_luong_tre_em * gia_ve_tre_em) as amount
FROM orders as o
INNER JOIN ticket as t on t.ma_ve = o.ma_ve
INNER JOIN flight as f on f.ma_chuyen_bay = t.ma_chuyen_bay
WHERE o.trang_thai = 'paid'
ORDER BY ma_khach_hang

-- chạy 1 lần cái này thôi