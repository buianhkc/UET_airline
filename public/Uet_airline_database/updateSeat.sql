-- UPDATE seat_details as s
-- SET trang_thai = 'empty';

UPDATE seat_details as s
INNER JOIN order_seats as os ON s.ma_chuyen_bay = os.ma_chuyen_bay AND s.ma_ghe = os.ma_ghe
INNER JOIN orders as o USING(order_number)
SET s.trang_thai = 'filled'
-- WHERE o.trang_thai = 'paid'
