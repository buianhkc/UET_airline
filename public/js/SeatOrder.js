const urlParams = new URLSearchParams(window.location.search);

const order_number = urlParams.get('order_number');

const container = document.querySelector('.seat-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

populateUI();

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
}

// Seat click event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
  }
});


var Orderdetails = [];
var currentNumberSelection = [];
var currentMaChuyenBay = [];
var currentLoaiVe = [];
var seatList = [];
var so_ghe_pho_thong = [];
var so_ghe_thuong_gia = [];

function getOrderDetails() {
  var data = {
    order_number: order_number
  };

  // Tạo một yêu cầu fetch với phương thức POST
  fetch('/seat-order/getOrderdetails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      Orderdetails.push(data);
      currentNumberSelection.push(data.totalSeat);
      currentLoaiVe.push(data.loai_ve);
      currentMaChuyenBay.push(data.ma_chuyen_bay);
      so_ghe_pho_thong.push(data.so_ghe_pho_thong);
      so_ghe_thuong_gia.push(data.so_ghe_thuong_gia);
    })
    .then(() => {
      console.log(Orderdetails);
      // console.log(currentNumberSelection);
      initFlightDetails();
      setNumberSeatSelection();
      getAllSeat();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function initFlightDetails() {

  var infoFlightE = document.querySelector('.info-flight');

  var date_depart = new Date(Orderdetails[0].ngay_di);

  var day = date_depart.getDate();
  var month = date_depart.getMonth() + 1; // Tháng bắt đầu từ 0
  var year = date_depart.getFullYear();
  var hours = date_depart.getHours();
  var minutes = date_depart.getMinutes();
  var seconds = date_depart.getSeconds();

  var formattedDateTimeDepart = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  var time = Orderdetails[0].gio_bay;
  var timeArray = time.split(':');

  var hours = timeArray[0];
  var minutes = timeArray[1];

  var formattedTime = `${hours} tiếng ${minutes} phút`;

  infoFlightE.innerHTML = `<p style="font-size: 30px">Thông tin chuyến bay</p>
                        <div class="flight ${(Orderdetails[0].loai_ve == 'thuong_gia') ? 'flight-bussiness' : ''}">
                          <p style="font-size: 25px; font-weight: bold;">Từ ${Orderdetails[0].ten_diem_di} đến ${Orderdetails[0].ten_diem_den}</p>
                          <p style="font-size: 20px; ">Hạng ghế ${(Orderdetails[0].loai_ve == 'thuong_gia') ? 'Thương Gia' : 'Phổ Thông'}</p>
                          <p>Ngày bay : ${formattedDateTimeDepart}</p>
                          <p>Giờ bay : ${formattedTime}</p>
                        </div>

                        <div class="price">
                          <p>Giá vé dành cho người lớn : ${new Intl.NumberFormat(["ban", "id"]).format(Orderdetails[0].gia_ve_nguoi_lon)} VND</p>
                          <p>Số lượng người lớn : ${Orderdetails[0].so_luong_nguoi_lon}</p>
                          <p>Giá vé dành cho trẻ em : ${new Intl.NumberFormat(["ban", "id"]).format(Orderdetails[0].gia_ve_tre_em)} VND</p>
                          <p>Số lượng trẻ em : ${Orderdetails[0].so_luong_tre_em}</p>
                          <p style="font-size: 20px; font-weight: bold;">Tổng tiền : ${new Intl.NumberFormat(["ban", "id"]).format(Orderdetails[0].totalAmount)} VND</p>
                        </div>`
}

function setNumberSeatSelection() {
  var numberOfSelectE = document.querySelector('.number-of-select');

  numberOfSelectE.innerHTML = `<p style="font-size: 20px;">Bạn còn  ${currentNumberSelection[0]} lần chọn ghế</p>`
}

function getAllSeat() {
  var data = {
    ma_chuyen_bay: currentMaChuyenBay[0]
  };

  // Tạo một yêu cầu fetch với phương thức POST
  fetch('/seat-order/getAllSeat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      for (var i = 0; i < data.length; ++i) {
        seatList.push(data[i]);
      }
    })
    .then(() => {
      initSeat();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function initSeat() {
  console.log(seatList);

  console.log(so_ghe_pho_thong[0]);

  var bussinessClassE = document.querySelector('.business-class');
  var economyClassE = document.querySelector('.economy-class');

  var html1 = ``;
  var html2 = ``;
  for (var i = 0; i < so_ghe_thuong_gia[0] / 6; ++i) {
    html1 += `<div class="row-seat">
                  <div class="${i * 6 + 1} seat seat-bussiness ${(seatList[i * 6 + 0].trang_thai == 'filled') ? 'occupied' : ''}">${i + 1}A</div>
                  <div class="${i * 6 + 2} seat seat-bussiness ${(seatList[i * 6 + 1].trang_thai == 'filled') ? 'occupied' : ''}">${i + 1}B</div>
                  <div class="${i * 6 + 3} seat seat-bussiness ${(seatList[i * 6 + 2].trang_thai == 'filled') ? 'occupied' : ''}">${i + 1}C</div>
                  <div class="row-seat-number">${i + 1}</div>
                  <div class="${i * 6 + 4} seat seat-bussiness ${(seatList[i * 6 + 3].trang_thai == 'filled') ? 'occupied' : ''}">${i + 1}D</div>
                  <div class="${i * 6 + 5} seat seat-bussiness ${(seatList[i * 6 + 4].trang_thai == 'filled') ? 'occupied' : ''}">${i + 1}E</div>
                  <div class="${i * 6 + 6} seat seat-bussiness ${(seatList[i * 6 + 5].trang_thai == 'filled') ? 'occupied' : ''}">${i + 1}F</div>
                </div>`;
  }

  for (var i = 0; i < so_ghe_pho_thong[0] / 6; ++i) {
    html2 += `<div class="row-seat">
                  <div class="${so_ghe_thuong_gia[0] + i * 6 + 1} seat seat-economy ${(seatList[so_ghe_thuong_gia[0] + i * 6 + 0].trang_thai == 'filled') ? 'occupied' : ''}">${so_ghe_thuong_gia[0] / 6 + i + 1}A</div>
                  <div class="${so_ghe_thuong_gia[0] + i * 6 + 2} seat seat-economy ${(seatList[so_ghe_thuong_gia[0] + i * 6 + 1].trang_thai == 'filled') ? 'occupied' : ''}">${so_ghe_thuong_gia[0] / 6 + i + 1}B</div>
                  <div class="${so_ghe_thuong_gia[0] + i * 6 + 3} seat seat-economy ${(seatList[so_ghe_thuong_gia[0] + i * 6 + 2].trang_thai == 'filled') ? 'occupied' : ''}">${so_ghe_thuong_gia[0] / 6 + i + 1}C</div>
                  <div class="row-seat-number">${so_ghe_thuong_gia[0] / 6 + i + 1}</div>
                  <div class="${so_ghe_thuong_gia[0] + i * 6 + 4} seat seat-economy ${(seatList[so_ghe_thuong_gia[0] + i * 6 + 3].trang_thai == 'filled') ? 'occupied' : ''}">${so_ghe_thuong_gia[0] / 6 + i + 1}D</div>
                  <div class="${so_ghe_thuong_gia[0] + i * 6 + 5} seat seat-economy ${(seatList[so_ghe_thuong_gia[0] + i * 6 + 4].trang_thai == 'filled') ? 'occupied' : ''}">${so_ghe_thuong_gia[0] / 6 + i + 1}E</div>
                  <div class="${so_ghe_thuong_gia[0] + i * 6 + 6} seat seat-economy ${(seatList[so_ghe_thuong_gia[0] + i * 6 + 5].trang_thai == 'filled') ? 'occupied' : ''}">${so_ghe_thuong_gia[0] / 6 + i + 1}F</div>
                </div>`;
  }

  // console.log(html1);
  bussinessClassE.innerHTML = html1;
  economyClassE.innerHTML = html2;
}

getOrderDetails();