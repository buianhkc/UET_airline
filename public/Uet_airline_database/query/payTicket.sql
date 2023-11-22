INSERT transactions(ma_khach_hang, order_number, loai_giao_dich, amount)
VALUES (234, 234234, 'payment', 34234);

UPDATE orders
SET trang_thai = 'paid'
WHERE order_number = 3847;

UPDATE customer
SET balance = balance - 495345
WHERE ma_khach_hang = 94545;

UPDATE ticket
SET so_luong_con = so_luong_con - 1
WHERE ma_ve = 304903;

