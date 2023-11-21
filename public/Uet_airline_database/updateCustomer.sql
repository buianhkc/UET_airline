UPDATE customer as c
INNER JOIN (SELECT ma_khach_hang, sum(amount) as amount
			FROM transactions
			GROUP BY ma_khach_hang) as p on c.ma_khach_hang = p.ma_khach_hang
SET c.balance = c.balance - p.amount;

-- SELECT ma_khach_hang, sum(amount) as amount
-- FROM payment
-- GROUP BY ma_khach_hang