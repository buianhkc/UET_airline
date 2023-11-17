UPDATE ticket as t
INNER Join (SELECT t.ma_ve as ma_ve, p.tong_so_ghe as total, sum(so_luong_nguoi_lon + so_luong_tre_em) as da_dat
			FROM orders as o
			INNER JOIN ticket as t on t.ma_ve = o.ma_ve
			INNER JOIN flight as f on f.ma_chuyen_bay = t.ma_chuyen_bay
			INNER Join plane as p on f.ma_may_bay = p.ma_may_bay
			WHERE o.trang_thai = 'paid' 
			GROUP BY p.ma_may_bay, t.ma_ve) as tmp on tmp.ma_ve = t.ma_ve
Set t.so_luong_con = tmp.total - tmp.da_dat;


-- SELECT t.ma_ve as ma_ve, p.tong_so_ghe as total, sum(so_luong_nguoi_lon + so_luong_tre_em) as da_dat
-- FROM orders as o
-- INNER JOIN ticket as t on t.ma_ve = o.ma_ve
-- INNER JOIN flight as f on f.ma_chuyen_bay = t.ma_chuyen_bay
-- INNER Join plane as p on f.ma_may_bay = p.ma_may_bay
-- WHERE o.trang_thai = 'paid'
-- GROUP BY p.ma_may_bay, t.ma_ve
