// Lấy thông tin lọc từ URL
var urlParams = new URLSearchParams(window.location.search);

var airportDepart = urlParams.get('airportDepart');
var airportArrive = urlParams.get('airportArrive');
var dateDepartBegin = urlParams.get('dateDepartBegin');
var dateDepartEnd = urlParams.get('dateDepartEnd');
var totalSeat = urlParams.get('numOfChildren') + urlParams.get('numOfAdult');

var apiGetData = '/filter-ticket/getdata'
                + "?airportDepart=" + encodeURIComponent(airportDepart)
                + "&airportArrive=" + encodeURIComponent(airportArrive)
                + "&dateDepartBegin=" + encodeURIComponent(dateDepartBegin)
                + "&dateDepartEnd=" + encodeURIComponent(dateDepartEnd)
                + "&totalSeat=" + encodeURIComponent(totalSeat);

fetch(apiGetData)
    .then((res) => {
        return res.json();
    })
    .then((data)=>{
        console.log(data);

        var panelContentE = document.querySelector('.panel-content');
        console.log(panelContentE);

        for (var i = 0; i < data.length; i+=2) {
            var ticket2 = data[i];
            var ticket1 = data[i+1];
            panelContentE.innerHTML += `<div class="ticket">
            <div class="part-left">
              <div class="flight-offer-details">
                <div class="route-date-time">
                  <div class="time-airport">
                    <div class="time">${ticket1.ngay_di}
                    </div>
                    <div class="airport">
                      ${ticket1.ma_diem_di} (${ticket1.ten_diem_di})
                    </div>
                  </div>
                  <div class="icon-arrow">
                    <img src="/public/img/user/aircraft.png">
                  </div>
                  <div class="time-airport">
                    <div class="time">${ticket1.ngay_den}
                    </div>
                    <div class="airport">
                    ${ticket1.ma_diem_den} (${ticket1.ten_diem_den})
                    </div>
                  </div>
                </div>

                <div class="duration-stop">
                    ${ticket1.gio_bay}
                </div>
              </div>

              <div class="plane-details">
                <div class="details" style="display: inline-block;">
                  <div style="display: flex; align-items: center;">
                    <img src="/public/img/user/VN.png" style="width: 20px; height:20px; display: inline-block; align-self: center;">
                    <p class="flight-code" style="display: inline-block; margin-left: 5px;">UET ${ticket1.ma_chuyen_bay}</p>
                  </div>
                  <p class="plane-name" style="font-weight: bold;">${ticket1.ten_may_bay}</p>
                </div>
              </div>
            </div>

            <div class="part-right">
              <div class="price-content-wrapper">
                <button class="buy-ticket-btn economy">
                    <div class="ticket-adult">
                      <label style="font-size: 15px;">Người lớn</label>
                      <p style="font-size: 20px;">${new Intl.NumberFormat(["ban", "id"]).format(ticket1.gia_ve_nguoi_lon)}VND</p>
                    </div>

                    <div class="ticket-chilren">
                      <label style="font-size: 15px;">Trẻ em</label>
                      <p style="font-size: 20px;">${new Intl.NumberFormat(["ban", "id"]).format(ticket1.gia_ve_tre_em)}VND</p>
                    </div>
                    
                    <div class="quantity-remain">
                      <p style="text-align: left; margin-left: 5px;">Còn ${ticket1.so_luong_con} ghế</p>
                    </div>
                  </button>
                  </div>

                  <div class="price-content-wrapper">
                    <button class="buy-ticket-btn business">
                        <div class="ticket-adult">
                          <label style="font-size: 15px;">Người lớn</label>
                          <p style="font-size: 20px;">${new Intl.NumberFormat(["ban", "id"]).format(ticket2.gia_ve_nguoi_lon)}VND</p>
                        </div>

                        <div class="ticket-chilren">
                          <label style="font-size: 15px;">Trẻ em</label>
                          <p style="font-size: 20px;">${new Intl.NumberFormat(["ban", "id"]).format(ticket2.gia_ve_tre_em)}VND</p>
                        </div>
                        
                        <div class="quantity-remain">
                          <p style="text-align: left; margin-left: 5px;">Còn ${ticket2.so_luong_con} ghế</p>
                        </div>
                      </button>
                  </div>
          </div>
          </div>`
        }
    })