-- UPDATE seat_details as s
-- SET trang_thai = 'empty';

UPDATE seat_details as s
INNER JOIN order_seats as os USING(ma_chuyen_bay)
INNER JOIN orders as o USING(order_number)
SET s.trang_thai = 'filled'
WHERE o.trang_thai = 'paid' AND os.ma_ghe = s.ma_ghe;
