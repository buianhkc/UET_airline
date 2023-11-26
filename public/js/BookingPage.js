var urlParams = new URLSearchParams(window.location.search);

var airportDepart = urlParams.get('airportDepart');
var airportArrive = urlParams.get('airportArrive');
var dateDepartBegin = urlParams.get('dateDepartBegin');
var dateDepartEnd = urlParams.get('dateDepartEnd');
var numOfAdult = parseInt(urlParams.get('numOfAdult'));
var numOfChildren = parseInt(urlParams.get('numOfChildren'));
var totalSeat = numOfAdult + numOfChildren;

function initTicket() {
    // Lấy thông tin lọc từ URL
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
        .then((data) => {
            console.log(data);

            var panelContentE = document.querySelector('.panel-content');
            // console.log(panelContentE);

            for (var i = 0; i < data.length;) {
                var ticket1 = {};
                var ticket2 = {};
                if (data[i].loai_ve == 'pho_thong') {
                    ticket1 = data[i];
                    i++;
                }
                if (i < data.length && data[i].loai_ve == 'thuong_gia') {
                    ticket2 = data[i];
                    i++;
                }

                // console.log(ticket1);
                // console.log(ticket2);

                var infoComonTicket = (ticket1.loai_ve) ? ticket1 : ticket2;

                var date_depart = new Date(infoComonTicket.ngay_di);

                var day = date_depart.getDate();
                var month = date_depart.getMonth() + 1; // Tháng bắt đầu từ 0
                var year = date_depart.getFullYear();
                var hours = date_depart.getHours();
                var minutes = date_depart.getMinutes();
                var seconds = date_depart.getSeconds();

                var formattedDateTimeDepart = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

                var date_arrive = new Date(infoComonTicket.ngay_den);

                day = date_arrive.getDate();
                month = date_arrive.getMonth() + 1; // Tháng bắt đầu từ 0
                year = date_arrive.getFullYear();
                hours = date_arrive.getHours();
                minutes = date_arrive.getMinutes();
                seconds = date_arrive.getSeconds();

                var formattedDateTimeArrive = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

                var time = infoComonTicket.gio_bay;
                var timeArray = time.split(':');

                var hours = timeArray[0];
                var minutes = timeArray[1];

                var formattedTime = `${hours} tiếng ${minutes} phút`;

                html = `<div class="ticket">
            <div class="part-left">
            <div class="flight-offer-details">
                <div class="route-date-time">
                <div class="time-airport">
                    <div class="time">${formattedDateTimeDepart}
                    </div>
                    <div class="airport">
                    ${infoComonTicket.ma_diem_di} (${infoComonTicket.ten_diem_di})
                    </div>
                </div>
                <div class="icon-arrow">
                    <img src="/public/img/user/aircraft.png">
                </div>
                <div class="time-airport">
                    <div class="time">${formattedDateTimeArrive}
                    </div>
                    <div class="airport">
                    ${infoComonTicket.ma_diem_den} (${infoComonTicket.ten_diem_den})
                    </div>
                </div>
                </div>

                <div class="duration-stop">
                    ${formattedTime}
                </div>
            </div>

            <div class="plane-details">
                <div class="details" style="display: inline-block;">
                <div style="display: flex; align-items: center;">
                    <img src="/public/img/user/VN.png" style="width: 20px; height:20px; display: inline-block; align-self: center;">
                    <p class="flight-code" style="display: inline-block; margin-left: 5px;">UET ${infoComonTicket.ma_chuyen_bay}</p>
                </div>
                <p class="plane-name" style="font-weight: bold;">${infoComonTicket.ten_may_bay}</p>
                </div>
            </div>
            </div>
            <div class="part-right"> `;

                html += (Object.keys(ticket1).length > 0)
                    ? `<div class="price-content-wrapper">
                    <button class="buy-ticket-btn economy ${ticket1.ma_ve}" onclick="buyTicket(this)">
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
                </div>` : ``;

                html += (Object.keys(ticket2).length > 0)
                    ? `<div class="price-content-wrapper">
                    <button class="buy-ticket-btn business ${ticket2.ma_ve}" onclick="buyTicket(this)">
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
                </div>`
                    : ``;

                html += `</div>
            </div>` ;

                panelContentE.innerHTML += html;
            }
            return true;
        })
}

initTicket();

// Sticky Bar
window.onscroll = function () { makeSticky() };

var stickyBar = document.querySelector(".sticky-inner-wrapper");
var stickyOffset = stickyBar.offsetTop;

function makeSticky() {
    if (window.scrollY >= stickyOffset) {
        stickyBar.classList.add("fixed");
    } else {
        stickyBar.classList.remove("fixed");
    }
}

function initInfoFlight() {
    var infoFlight = document.querySelector(".infoFlight");

    infoFlight.innerHTML = `<div class="indicator-item">
    <img src="/public/img/booking-page/plane.png" class="indicator-item-icon">
    <div class="${airportDepart} ${airportArrive} indicator-item-title travel">
    <p>${airportDepart} -> ${airportArrive}</p>
    </div>
    </div>
    <div class="indicator-item">
    <img src="/public/img/booking-page/traveler-with-a-suitcase.png" class="indicator-item-icon">
    <div class="${numOfAdult} ${numOfChildren} indicator-item-title human">
    <p>Người lớn: ${numOfAdult}</p>
    <p>Trẻ em: ${numOfChildren}</p>
    </div>
    </div>`
}

initInfoFlight();

function buyTicket(element) {
    var confirmation = window.confirm("Bạn có chắc chắn muốn mua vé này?");
    if (confirmation) {
        var currentTime = new Date();

        // Format lại thành chuỗi theo định dạng MySQL
        var formattedTime = currentTime.toISOString().slice(0, 19).replace("T", " ");

        var data = {
            ma_ve: element.classList[2],
            ma_khach_hang: document.querySelector(".linkToUser").classList[2],
            order_date: formattedTime,
            so_luong_nguoi_lon: numOfAdult,
            so_luong_tre_em: numOfChildren,
            trang_thai: 'unpaid'
        };

        // Tạo một yêu cầu fetch với phương thức POST
        fetch('/booking-page/book-ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                alert("Đặt vé thành công \nBạn sẽ được chuyển hướng đến trang điền thông tin hành khách");
                console.log('Success:', data);
                // Xử lý kết quả thành công nếu cần
                goToInfoPassenger();
            })
            .catch((error) => {
                console.error('Error:', error);
                // Xử lý lỗi nếu cần
                alert("Có lỗi");
            });

    } else {
        alert("Bạn đã hủy đặt vé");
    }
}

function goToFilterTicket() {
    // Tạo URL với tham số truyền đi
    var url = "/filter-ticket"
        + "?airportDepart=" + encodeURIComponent(airportDepart)
        + "&airportArrive=" + encodeURIComponent(airportArrive)
        + "&dateDepartBegin=" + encodeURIComponent(dateDepartBegin)
        + "&dateDepartEnd=" + encodeURIComponent(dateDepartEnd)
        + "&numOfChildren=" + encodeURIComponent(numOfChildren)
        + "&numOfAdult=" + encodeURIComponent(numOfAdult);

    // Chuyển hướng đến trang hiển thị vé với tham số
    window.location.href = url;
}

function goToInfoPassenger() {
    var data = {
        ma_khach_hang: document.querySelector(".linkToUser").classList[2],
    };
    // Tạo một yêu cầu fetch với phương thức POST
    fetch('/booking-page/getOrderNumber', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            var {order_number} = data; 
            // Tạo URL với tham số truyền đi
            var url = "/info-passenger"
                + "?order_number=" + encodeURIComponent(order_number);

            // Chuyển hướng đến trang hiển thị vé với tham số
            window.location.href = url;
        })
        .catch((error) => {
            console.error('Error:', error);
            // Xử lý lỗi nếu cần
            alert("Có lỗi");
        });
}




