SELECT ma_diem_di, 
(SELECT ten_thanh_pho FROM city WHERE f.ma_diem_di = ma_thanh_pho) as ten_diem_di,
 ma_diem_den,
(SELECT ten_thanh_pho FROM city WHERE f.ma_diem_den = ma_thanh_pho) as ten_diem_den,
(SELECT linkImg FROM city WHERE f.ma_diem_den = ma_thanh_pho) as linkimg_diem_den,
t.loai_ve,
min(t.gia_ve_nguoi_lon) minPrice,
date(f.ngay_di) as date_depart,
count(*) AS quantity
FROM  orders AS o
INNER JOIN ticket AS t USING (ma_ve)
INNER JOIN flight AS f USING (ma_chuyen_bay)
WHERE 1 = 1
GROUP BY f.ma_diem_di, f.ma_diem_den, t.loai_ve, f.ngay_di
ORDER BY quantity DESC
LIMIT 40;