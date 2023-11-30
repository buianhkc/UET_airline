# UET Airline - Bài tập lớn Cơ sở dữ liệu

Đây là bài tập lớn của môn học Cơ sở dữ liệu tại trường Đại học Công nghệ - Đại học Quốc gia Hà Nội (UET). Mục tiêu của dự án là giúp sinh viên áp dụng kiến thức về tạo database và tương tác với database thông qua một trang web. Chủ đề chúng tôi lựa chọn là một trang web đặt vé máy bay.

## Công nghệ sử dụng

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js với framework Express
- **Database:** MySQL

## Hướng dẫn chạy dự án trên localhost

1. **Clone dự án:**
    ```bash
    git clone https://github.com/your-username/UET_airline.git
    ```

2. **Khởi tạo database:**
    - Sử dụng MySQL Workbench để mở các file `.sql` trong đường dẫn `UET_airline\public\Uet_airline_database`.
    - Chạy lần lượt theo thứ tự: `CreateDataBase`, `dataCity`, `dataCustomer`, `dataFlight`, `dataSeatDetails`, `dataPlane`, `dataTicket`, `dataOrders`, `dataOrderSeat`, `dataPassenger`, `dataPayment`, `updateCustomer`, `updateTicket`, `updateSeat`, `fixConnect`. Lưu ý: file `fixConnect` sẽ thay đổi mật khẩu đăng nhập root của bạn thành 'password'.

3. **Cài đặt Node.js:**
    - Cài đặt Node.js phiên bản 20.9 từ [nodejs.org](https://nodejs.org/en/download/).

4. **Cài đặt dependencies:**
    ```bash
    npm init 
    npm install express --save
    npm install --save mysql2
    npm install ejs
    npm install --save-dev nodemon
    npm install dotenv --save
    npm install express-session 
    ```

5. **Chạy dự án trên localhost:**
    - Nhập lệnh sau trong terminal:
    ```bash
    npm start
    ```

    - Truy cập trang web qua địa chỉ [http://localhost:3000](http://localhost:3000).

Mọi ý kiến đóng góp và báo lỗi đều được hoan nghênh. Để biết thêm thông tin về cách sử dụng và phát triển dự án, hãy mail cho tôi buianhkc112004@gmail.com

Chúc bạn thành công!
