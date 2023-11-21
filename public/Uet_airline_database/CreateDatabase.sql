DROP DATABASE UET_Airline;

CREATE DATABASE UET_Airline;
USE UET_Airline;

CREATE TABLE city (	
	ma_thanh_pho VARCHAR(3) NOT NULL PRIMARY KEY,
    ten_thanh_pho NVARCHAR(30) NOT NULL,
    linkImg VARCHAR(500)
);

CREATE TABLE airline (	
	ma_duong_bay INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    vi_tri VARCHAR(10) NOT NULL,
    ma_thanh_pho VARCHAR(3) NOT NULL,
    chieu_dai DECIMAL(20, 2) DEFAULT 1000,
    chieu_rong DECIMAL(20, 2) DEFAULT 100,
    trang_thai VARCHAR(10) NOT NULL DEFAULT 'good'
);

CREATE TABLE plane (	
	ma_may_bay INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ten_may_bay VARCHAR(30) NOT NULL,
    kich_thuoc DECIMAL(20, 2),
    so_ghe_pho_thong INT NOT NULL,
    so_ghe_thuong_gia INT NOT NULL,
    tong_so_ghe INT NOT NULL
);

CREATE TABLE flight (	
	ma_chuyen_bay INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	ma_may_bay INT NOT NULL,
    ma_duong_bay INT NOT NULL,
    ngay_di DATETIME NOT NULL,
    ngay_den DATETIME NOT NULL,
    ma_diem_den VARCHAR(3) NOT NULL,
    ma_diem_di VARCHAR(3) NOT NULL,
    gio_bay TIME,
    ghi_chu TEXT
);

CREATE TABLE ticket (	
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

CREATE TABLE customer (	
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
    balance DECIMAL(20, 2) NOT NULL DEFAULT 10000000000.00
);

CREATE TABLE transactions (
	ma_thanh_toan INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	ma_khach_hang INT NOT NULL,
    order_number INT,
    loai_giao_dich VARCHAR(10),
    amount DECIMAL(20, 2) NOT NULL
);

ALTER TABLE transactions
	ADD CONSTRAINT fk_transactions_customer FOREIGN KEY (ma_khach_hang) REFERENCES customer(ma_khach_hang) ON UPDATE CASCADE ON DELETE RESTRICT;
    
ALTER TABLE orders
	ADD CONSTRAINT fk_orders_customer FOREIGN KEY (ma_khach_hang) REFERENCES customer(ma_khach_hang) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE orders
	ADD CONSTRAINT fk_orders_ticket FOREIGN KEY (ma_ve) REFERENCES ticket(ma_ve) ON UPDATE CASCADE ON DELETE RESTRICT;
    
ALTER TABLE ticket
	ADD CONSTRAINT fk_ticket_flight FOREIGN KEY (ma_chuyen_bay) REFERENCES flight(ma_chuyen_bay) ON UPDATE CASCADE ON DELETE RESTRICT;
    
ALTER TABLE flight
	ADD CONSTRAINT fk_flight_plane FOREIGN KEY (ma_may_bay) REFERENCES plane(ma_may_bay) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE flight
	ADD CONSTRAINT fk_flight_airline FOREIGN KEY (ma_duong_bay) REFERENCES airline(ma_duong_bay) ON UPDATE CASCADE ON DELETE RESTRICT;
    
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES = 0;