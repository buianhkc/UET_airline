function deposit() {
  // URL endpoint for your POST request
  var url = '/user-page/deposit';

  // Data to be sent in the POST request (you can customize this)

  var data = {
    ma_khach_hang: document.querySelector(".linkToUser").classList[2],
    amount: document.querySelector("#input-amount").value
  };

  // Fetch API to send POST request
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      resetBalance();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function resetBalance() {
  var balanceE = document.querySelector('.balance-content-wraper');
  // console.log(balanceE);

  // URL endpoint for your POST request
  var url = '/user-page/getBalance';

  // Data to be sent in the POST request (you can customize this)

  var data = {
    ma_khach_hang: document.querySelector(".linkToUser").classList[2],
  };

  // Fetch API to send POST request
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      var balance = data[0][0].balance;
      balanceE.innerHTML = `<label class="balance-title">
                            Số tiền trong tài khoản
                            </label>
                            <p class="balance">${new Intl.NumberFormat(["ban", "id"]).format(balance)} VND</p>`
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

var tickets = [];

function showTickets() {
  var listTiketE = document.querySelector(".list-ticket-item");
  // console.log(listTiketE);

  listTiketE.innerHTML = "";

  for (var i = 0; i < tickets.length; ++i) {

    var ticket = tickets[i];

    var date_depart = new Date(ticket.ngay_di);

    var day = date_depart.getDate();
    var month = date_depart.getMonth() + 1; // Tháng bắt đầu từ 0
    var year = date_depart.getFullYear();
    var hours = date_depart.getHours();
    var minutes = date_depart.getMinutes();
    var seconds = date_depart.getSeconds();

    var formattedDateTimeDepart = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    var date_arrive = new Date(ticket.ngay_den);

    day = date_arrive.getDate();
    month = date_arrive.getMonth() + 1; // Tháng bắt đầu từ 0
    year = date_arrive.getFullYear();
    hours = date_arrive.getHours();
    minutes = date_arrive.getMinutes();
    seconds = date_arrive.getSeconds();

    var formattedDateTimeArrive = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    var time = ticket.gio_bay;
    var timeArray = time.split(':');

    var hours = timeArray[0];
    var minutes = timeArray[1];

    var formattedTime = `${hours} tiếng ${minutes} phút`;

    var HTML = `<div class="ticket">
        <div class="part-left">
          <div class="flight-offer-details">
            <div class="route-date-time">
              <div class="time-airport">
                <div class="time">${formattedDateTimeDepart}
                </div>
                <div class="airport">
                  ${ticket.ma_diem_di} (${ticket.ten_diem_di})
                </div>
              </div>
              <div class="icon-arrow">
                <img src="/public/img/user/aircraft.png">
              </div>
              <div class="time-airport">
                <div class="time">${formattedDateTimeArrive}
                </div>
                <div class="airport">
                ${ticket.ma_diem_den} (${ticket.ten_diem_den})
                </div>
              </div>
            </div>

            <div class="duration-stop">
              ${formattedTime}
            </div>

            <div class="type-ticket ${(ticket.loai_ve == 'pho_thong') ? 'economyType' : 'bussinessType'}">
              Hạng: ${(ticket.loai_ve == 'pho_thong') ? 'Phổ Thông' : 'Thương Gia'}
            </div>
          </div>

          <div class="plane-details">
            <div class="details" style="display: inline-block;">
              <div style="display: flex; align-items: center;">
                <img src="/public/img/user/VN.png" style="width: 20px; height:20px; display: inline-block; align-self: center;">
                <p class="flight-code" style="display: inline-block; margin-left: 5px;">UET ${ticket.ma_chuyen_bay}</p>
              </div>
              <p class="plane-name" style="font-weight: bold;">${ticket.ten_may_bay}</p>
            </div>
          </div>
        </div>

        <div class="part-right">
          <div class="customer-order-details ${(ticket.loai_ve == 'pho_thong') ? 'economyType' : 'bussinessType'}">
            <p class="number-order">Người lớn: ${ticket.so_luong_nguoi_lon} người</p>
            <p class="number-order">Trẻ em: ${ticket.so_luong_tre_em} người</p>
            <p class="number-order">Tổng ghế: ${ticket.totalSeat} ghế</p>
            <p class="number-order">Thành giá: ${new Intl.NumberFormat(["ban", "id"]).format(ticket.totalAmount)} VND</p>
          </div>
          <div class="process-ticket">`;

    HTML += (ticket.trang_thai == 'unpaid' ? `<button class="${ticket.order_number} unpaid btnvip" onclick="payTicket(this)">Pay</button>` : `<button class="pay-ticket paid">Đã Thanh Toán</button>`);

    HTML += `<button class="${ticket.order_number} noselect cancel-btn" onclick="deleteTicket(this)">
           <span class="text">Cancel</span>
           <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
           </button>
          </div>    
        </div>
    </div>`;

    listTiketE.innerHTML += HTML;
  }
}

function getTickets() {
  return new Promise((resolve, reject) => {
    var url = '/user-page/getTicket';

    // Data to be sent in the POST request (you can customize this)

    var data = {
      ma_khach_hang: document.querySelector(".linkToUser").classList[2],
    };

    // Fetch API to send POST request
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        // console.log('Success:', data);
        tickets = data;
        showTickets();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setTimeout(() => {
      // console.log("Công việc 3 đã hoàn thành");
      resolve("haha");
    }, 1000);
  });

}

function payTicket(e) {
  // console.log(e);

  var confirmation = window.confirm("Bạn có chắc chắn muốn thanh toán vé này?");
  if (confirmation) {
    var url = '/user-page/payTicket';

    // Data to be sent in the POST request (you can customize this)

    var data = {
      ma_khach_hang: document.querySelector(".linkToUser").classList[2],
      order_number: e.classList[0]
    };

    // Fetch API to send POST request
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        getTickets();
      })
      .then(() => {
        resetBalance();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

function deleteTicket(e) {
  // console.log(e);
  var confirmation = window.confirm("Bạn có chắc chắn muốn hủy chuyến bay này này?");
  if (confirmation) {
    var url = '/user-page/deleteTicket';

    // Data to be sent in the POST request (you can customize this)

    var data = {
      ma_khach_hang: document.querySelector(".linkToUser").classList[2],
      order_number: e.classList[0]
    };

    // Fetch API to send POST request
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        getTickets();
      })
      .then(() => {
        resetBalance();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}


// Hàm để lấy giá trị của một tham số truy vấn từ URL
function getQueryParamValue(url, paramName) {
  const searchParams = new URL(url).searchParams;
  return searchParams.get(paramName);
}

function cancelOrder() {
  return new Promise((resolve, reject) => {
    // Thực hiện công việc 3 ở đây
    // Lấy đường dẫn của URL hiện tại
    const currentPath = window.location.pathname;

    // Lấy đường dẫn của trang trước đó
    const previousPath = new URL(document.referrer).pathname;

    const previousURL = document.referrer;

    // In ra console để kiểm tra
    console.log('Đường dẫn của URL hiện tại:', currentPath);
    console.log('Đường dẫn của trang trước đó:', previousPath);

    if (previousPath == '/info-passenger') {
      var data = {
        order_number: getQueryParamValue(previousURL, 'order_number')
      }

      fetch('/booking-page/cancelOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          console.log('da xoa order')
        })
        .catch(err => {
          console.log(err);
        })
    }

    if (previousPath == '/seat-order') {
      var data = {
        order_number: getQueryParamValue(previousURL, 'order_number')
      }

      console.log(data);

      fetch('/booking-page/existSeatOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(result => {
          return result.json()
        })
        .then((result) => {
          // console.log(result);
          if (result.num == 0) {
            fetch('/booking-page/cancelOrder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
              .then(() => {
                console.log('da xoa order')
              })
              .catch(err => {
                console.log(err);
              })
          }

        })
        .catch(err => {
          console.log(err);
        })


    }
    setTimeout(() => {
      // console.log("Công việc 3 đã hoàn thành");
      resolve("haha");
    }, 500);
  });

}


async function init() {
  try {
    const result1 = await cancelOrder();
    console.log(result1);

    const result2 = await getTickets();
    console.log(result2);

  } catch (error) {
    console.error("Đã xảy ra lỗi:", error);
  }
}

init();