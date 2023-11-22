UPDATE customer
SET balance = balance + 1000000
WHERE ma_khach_hang = 100037;

INSERT transactions(ma_khach_hang, order_number, loai_giao_dich, amount)
VALUES (234, 234234, 'deposit', 34234);