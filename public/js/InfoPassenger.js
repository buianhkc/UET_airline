var urlParams = new URLSearchParams(window.location.search);

var order_number = urlParams.get('order_number');

var quantity = [];
// var oj = quantity[0];
function getQuantityPersonOrder() {
    var data = {
        order_number: order_number
    };

    // Tạo một yêu cầu fetch với phương thức POST
    fetch('/info-passenger/getQuantityPersonOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            quantity.push(data);
            // console.log(quantity);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

getQuantityPersonOrder();

function backToBookingPage() {

    var data = {
        order_number: order_number
    };

    // Tạo một yêu cầu fetch với phương thức POST
    fetch('/info-passenger/getOrderDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            var body = {
                order_number: order_number
            };
            fetch('/info-passenger/backToBookingPage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
            return result;
        })
        .then(data => {
            var { ma_diem_di, ma_diem_den, so_luong_nguoi_lon, so_luong_tre_em } = data;

            // Tạo URL với tham số truyền đi
            var url = "/booking-page"
                + "?airportDepart=" + encodeURIComponent(ma_diem_di)
                + "&airportArrive=" + encodeURIComponent(ma_diem_den)
                + "&dateDepartBegin=" + encodeURIComponent('')
                + "&dateDepartEnd=" + encodeURIComponent('')
                + "&numOfAdult=" + encodeURIComponent(so_luong_nguoi_lon)
                + "&numOfChildren=" + encodeURIComponent(so_luong_tre_em);

            // Chuyển hướng đến trang hiển thị vé với tham số
            window.location.href = url;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function goToSeatOrder() {
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
            var { order_number } = data;
            // Tạo URL với tham số truyền đi
            var url = "/seat-order"
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

function initFormSubmitInfo() {
   
}