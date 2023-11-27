INSERT transactions(ma_khach_hang, order_number, loai_giao_dich, amount)
VALUES (234, 234234, 'return', 34234);

DELETE FROM orders
WHERE order_number = 2026;

UPDATE customer
SET balance = balance + 495345
WHERE ma_khach_hang = 94545;

UPDATE ticket
SET so_luong_con = so_luong_con + 1
WHERE ma_ve = 304903;

-- SELECT * 
-- FROM order_seats
-- WHERE order_number = 12;

UPDATE seat_details as sd
INNER JOIN(SELECT * 
			FROM order_seats
			WHERE order_number = 12) as tmp ON tmp.ma_chuyen_bay = sd.ma_chuyen_bay AND tmp.ma_ghe = sd.ma_ghe
SET trang_thai = 'empty'