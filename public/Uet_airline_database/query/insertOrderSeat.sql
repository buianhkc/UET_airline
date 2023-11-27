INSERT order_seats(order_number, ma_chuyen_bay, ma_ghe)
VALUES (100, 1, 2);

UPDATE seat_details
SET trang_thai = 'filled'
WHERE ma_chuyen_bay = 1 AND ma_ghe = 1;

UPDATE tickets as t 
INNER JOIN (SELECT so_luong_nguoi_lon + so_luong_tre_em as totalHuman, ma_ve
			FROM orders
			INNER JOIN tickets USING(ma_ve)
			WHERE order_number = 3) as tmp USING(ma_ve)
SET t.so_luong_con = t.so_luong_con - tmp.totalHuman
