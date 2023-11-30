# UET_airline
Đây là project bài tập lớn của môn học Cơ sở dữ liệu, mục tiêu project giúp cho sinh viên có thể áp dụng kiến thức tạo database tương tác database qua website, chủ đề chúng tôi chọn là website đặt vé máy bay 



Trang web được code trên Code editor Visual Studio Code

FontEnd: sử dụng Html, Css, JavaScript

BackEnd: sử dụng NodeJs, frame work Express

Database tự sinh nhờ code

Nguồn tham khảo chính của web là https://www.vietnamairlines.com/

### Hướng dẫn chạy project localhost

1. Clone project

2. Khởi tạo database (ở đây chúng tôi dùng ngôn ngữ MySQL)
  * MySQL Workbench mở các file .sql trong folder theo đường dẫn UET_airline\public\Uet_airline_database

  * Chạy lần lượt theo thứ tự CreateDataBase, dataCity, dataCustomer, dataFlight, dataSeatDetails, dataPlane, dataTicket, dataOrders, dataOrderSeat, dataPassenger, dataPayment, updateCustomer, updateTicket,      updateSeat, fixConnect (lưu ý file này sẽ thay đổi mật khẩu đăng nhập root của bạn thành 'password')

3. Install nodejs version 20.9 https://nodejs.org/en/download/

  * Cần cài đặt một dependencies, gõ lệnh trên terminal
  ```
  npm init 
  
  npm install express --save
  
  npm install --save mysql2
  
  npm install ejs
  
  npm install --save-dev nodemon
  
  npm install dotenv --save
  
  npm install express-session 
  ```
  
  * Để chạy localhost web nhập: npm start
