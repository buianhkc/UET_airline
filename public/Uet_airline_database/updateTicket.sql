UPDATE ticket as t
INNER Join (SELECT t.ma_ve as ma_ve, p.so_ghe_pho_thong as total, sum(so_luong_nguoi_lon + so_luong_tre_em) as da_dat, t.loai_ve 
			FROM orders as o
			INNER JOIN ticket as t on t.ma_ve = o.ma_ve
			INNER JOIN flight as f on f.ma_chuyen_bay = t.ma_chuyen_bay
			INNER Join plane as p on f.ma_may_bay = p.ma_may_bay
			WHERE o.trang_thai = 'paid' AND t.loai_ve = 'pho_thong'
			GROUP BY p.ma_may_bay, t.ma_ve) as tmp on tmp.ma_ve = t.ma_ve
Set t.so_luong_con = tmp.total - tmp.da_dat;

UPDATE ticket as t
INNER Join (SELECT t.ma_ve as ma_ve, p.so_ghe_thuong_gia as total, sum(so_luong_nguoi_lon + so_luong_tre_em) as da_dat, t.loai_ve 
			FROM orders as o
			INNER JOIN ticket as t on t.ma_ve = o.ma_ve
			INNER JOIN flight as f on f.ma_chuyen_bay = t.ma_chuyen_bay
			INNER Join plane as p on f.ma_may_bay = p.ma_may_bay
			WHERE o.trang_thai = 'paid' AND t.loai_ve = 'thuong_gia'
			GROUP BY p.ma_may_bay, t.ma_ve) as tmp on tmp.ma_ve = t.ma_ve
Set t.so_luong_con = tmp.total - tmp.da_dat;


-- SELECT t.ma_ve as ma_ve, p.so_ghe_pho_thong as total, sum(so_luong_nguoi_lon + so_luong_tre_em) as da_dat, t.loai_ve 
-- FROM orders as o
-- INNER JOIN ticket as t on t.ma_ve = o.ma_ve
-- INNER JOIN flight as f on f.ma_chuyen_bay = t.ma_chuyen_bay
-- INNER Join plane as p on f.ma_may_bay = p.ma_may_bay
-- WHERE o.trang_thai = 'paid' AND t.loai_ve = 'pho_thong'
-- GROUP BY p.ma_may_bay, t.ma_ve;

-- SELECT t.ma_ve as ma_ve, p.so_ghe_thuong_gia as total, sum(so_luong_nguoi_lon + so_luong_tre_em) as da_dat, t.loai_ve 
-- FROM orders as o
-- INNER JOIN ticket as t on t.ma_ve = o.ma_ve
-- INNER JOIN flight as f on f.ma_chuyen_bay = t.ma_chuyen_bay
-- INNER Join plane as p on f.ma_may_bay = p.ma_may_bay
-- WHERE o.trang_thai = 'paid' AND t.loai_ve = 'thuong_gia'
-- GROUP BY p.ma_may_bay, t.ma_ve
