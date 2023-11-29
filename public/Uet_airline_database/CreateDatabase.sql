DROP DATABASE UET_Airline;

CREATE DATABASE UET_Airline;
USE UET_Airline;

CREATE TABLE citys (	
	ma_thanh_pho VARCHAR(3) NOT NULL PRIMARY KEY,
    ten_thanh_pho NVARCHAR(30) NOT NULL,
    linkImg VARCHAR(500)
);

CREATE TABLE planes (	
	ma_may_bay INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ten_may_bay VARCHAR(30) NOT NULL,
    kich_thuoc DECIMAL(20, 2),
    so_ghe_pho_thong INT NOT NULL,
    so_ghe_thuong_gia INT NOT NULL,
    tong_so_ghe INT NOT NULL
);

CREATE TABLE flights (	
	ma_chuyen_bay INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	ma_may_bay INT NOT NULL,
    ngay_di DATETIME NOT NULL,
    ngay_den DATETIME NOT NULL,
    ma_diem_den VARCHAR(3) NOT NULL,
    ma_diem_di VARCHAR(3) NOT NULL,
    gio_bay TIME,
    ghi_chu TEXT
);

CREATE TABLE tickets (	
	ma_ve INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	ma_chuyen_bay INT NOT NULL,
    loai_ve VARCHAR(20) NOT NULL,
    so_luong_con INT,
    gia_ve_nguoi_lon  INT NOT NULL,
    gia_ve_tre_em INT NOT NULL,
    ten_ve TEXT
);

CREATE TABLE orders (	
	order_number INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	ma_ve INT NOT NULL,
	ma_khach_hang INT NOT NULL,
    order_date DATETIME NOT NULL,
    so_luong_nguoi_lon INT NOT NULL DEFAULT 1,
    so_luong_tre_em INT DEFAULT 0,
    trang_thai VARCHAR(10)
);

CREATE TABLE customers (	
	ma_khach_hang INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ten_khach_hang NVARCHAR(30) NOT NULL,
    sdt VARCHAR(20),
    dia_chi NVARCHAR(500),
    cmnd VARCHAR(10),
    gioi_tinh VARCHAR(10),
    ngay_sinh DATE,
    ten_dang_nhap VARCHAR(50) NOT NULL,
    mat_khau VARCHAR(50) NOT NULL,
    email NVARCHAR(50),
    balance DECIMAL(20, 2) NOT NULL DEFAULT 100000000000.00
);

CREATE TABLE transactions (
	ma_thanh_toan INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	ma_khach_hang INT NOT NULL,
    order_number INT,
    loai_giao_dich VARCHAR(10),
    amount DECIMAL(20, 2) NOT NULL
);

CREATE TABLE seat_details (
	ma_chuyen_bay INT NOT NULL,
    ma_ghe INT NOT NULL,
    loai_ghe VARCHAR(20),
    trang_thai VARCHAR(20)
);

CREATE TABLE order_seats (
	order_number INT NOT NULL,
	ma_chuyen_bay INT NOT NULL,
    ma_ghe INT NOT NULL
);

CREATE TABLE passengers (
	order_number INT NOT NULL,
    ma_hanh_khach INT NOT NULL,
    ten NVARCHAR(100),
    gioi_tinh NVARCHAR(10),
    do_tuoi NVARCHAR(20),
    ngay_sinh DATE
);

ALTER TABLE transactions
	ADD CONSTRAINT fk_transactions_customers FOREIGN KEY (ma_khach_hang) REFERENCES customers(ma_khach_hang) ON UPDATE CASCADE ON DELETE CASCADE;
    
ALTER TABLE orders
	ADD CONSTRAINT fk_orders_customers FOREIGN KEY (ma_khach_hang) REFERENCES customers(ma_khach_hang) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE orders
	ADD CONSTRAINT fk_orders_tickets FOREIGN KEY (ma_ve) REFERENCES tickets(ma_ve) ON UPDATE CASCADE ON DELETE CASCADE;
    
ALTER TABLE tickets
	ADD CONSTRAINT fk_tickets_flights FOREIGN KEY (ma_chuyen_bay) REFERENCES flights(ma_chuyen_bay) ON UPDATE CASCADE ON DELETE CASCADE;
    
ALTER TABLE flights
	ADD CONSTRAINT fk_flights_planes FOREIGN KEY (ma_may_bay) REFERENCES planes(ma_may_bay) ON UPDATE CASCADE ON DELETE CASCADE;
    
ALTER TABLE passengers
    ADD CONSTRAINT fk_passengers_orders FOREIGN KEY (order_number) REFERENCES orders(order_number) ON UPDATE CASCADE ON DELETE CASCADE;
    
ALTER TABLE order_seats
    ADD CONSTRAINT fk_seat_orders FOREIGN KEY (order_number) REFERENCES orders(order_number) ON UPDATE CASCADE ON DELETE CASCADE;
    
ALTER TABLE seat_details
    ADD CONSTRAINT fk_seatdetail_flight FOREIGN KEY (ma_chuyen_bay) REFERENCES flights(ma_chuyen_bay) ON UPDATE CASCADE ON DELETE CASCADE;
    
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES = 0;