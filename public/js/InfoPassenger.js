var urlParams = new URLSearchParams(window.location.search);

var order_number = urlParams.get('order_number');

// Kiểm tra nếu người dùng đang ở trang điền thông tin
if (window.location.pathname === '/info-passenger') {

    window.removeEventListener('beforeunload', handleUnload());

    window.addEventListener('beforeunload', handleUnload());
}

function handleUnload() {
    // Thực hiện các hành động kiểm tra trước khi người dùng rời khỏi trang

    var destinationURL = window.location.href;

    // Kiểm tra xem người dùng đang chuyển đến trang nào
    if (!(destinationURL.includes('/info-passenger') || destinationURL.includes('/seat-order'))) {
        var confirmation = window.confirm("Xác nhận hủy đặt chuyến bay!!!");
        if (confirmation) {
            deleteUserDataFromDatabase();
        }
    }

    // Không cần thiết hiện bất kỳ hành động nào nếu người dùng chuyển đến các trang khác
}

function deleteUserDataFromDatabase() {
    var data = {
        order_number: order_number
    };

    // Tạo một yêu cầu fetch với phương thức POST
    fetch('/info-passenger/cancelOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .catch(err => {
            console.log(err);
        })
}

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
        .then(() => {
            console.log(quantity[0]);
            initFormSubmitInfo();     
          })
        .catch((error) => {
            console.error('Error:', error);
        });
}


getQuantityPersonOrder();

function initFormSubmitInfo() {
    console.log(quantity[0].so_luong_nguoi_lon);
    console.log(quantity[0].so_luong_tre_em);
    
    var adultinfo = document.querySelector('.adult-info');
    var childreninfo = document.querySelector('.children-info');
    var html3 = ``;
    var html4 = ``;
    html3 += `<div class="quantity-adult">
        <p>Số lượng người lớn: ${quantity[0].so_luong_nguoi_lon}</p>
    </div>`
    for (var i = 0; i < quantity[0].so_luong_nguoi_lon; i++) {
        html3 += `
            <div class="form-info">
                <div class="number">
                    <p>STT: ${i + 1}</p>
                </div>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Họ tên">
                </div>
                <div class="input-group">
                    <input type="date" class="form-control" placeholder="Ngày sinh" min="1940-01-01" max="2007-12-30">
                </div>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Giới tính">
                </div>
            </div>`;
    }

    html4 += `<div class="quantity-children">
        <p>Số lượng trẻ em: ${quantity[0].so_luong_tre_em}</p>
    </div>`
    for (var i = 0; i < quantity[0].so_luong_tre_em; i++) {
        html4 += `
            <div class="form-info">
                <div class="number">
                    <p>STT: ${i + 1}</p>
                </div>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Họ tên">
                </div>
                <div class="input-group">
                    <input type="date" class="form-control" placeholder="Ngày sinh" min="2008-01-01" max="2023-10-30">
                </div>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Giới tính">
                </div>
            </div>`;
    }

    adultinfo.innerHTML = html3;
    childreninfo.innerHTML = html4;
   
}

function backToBookingPage() {
    window.removeEventListener('beforeunload', handleUnload());

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
            fetch('/info-passenger/cancelOrder', {
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
    // Lặp qua mỗi form thông tin người lớn
    for (var i = 0; i < quantity[0].so_luong_nguoi_lon; i++) {
        var nameInput = document.querySelector('.adult-info .form-info:nth-child(' + (i + 2) + ') input[type="text"]');
        var dobInput = document.querySelector('.adult-info .form-info:nth-child(' + (i + 2) + ') input[type="date"]');

        // Kiểm tra nếu bất kỳ ô nào chưa được điền thông tin
        if (!nameInput.value || !dobInput.value) {
            alert('Vui lòng điền đầy đủ thông tin cho tất cả người lớn.');
            return; // Dừng việc chuyển tiếp nếu có ô không được điền thông tin
        }
    }

    // Lặp qua mỗi form thông tin trẻ em
    for (var i = 0; i < quantity[0].so_luong_tre_em; i++) {
        var nameInput = document.querySelector('.children-info .form-info:nth-child(' + (i + 2) + ') input[type="text"]');
        var dobInput = document.querySelector('.children-info .form-info:nth-child(' + (i + 2) + ') input[type="date"]');

        // Kiểm tra nếu bất kỳ ô nào chưa được điền thông tin
        if (!nameInput.value || !dobInput.value) {
            alert('Vui lòng điền đầy đủ thông tin cho tất cả trẻ em.');
            return; // Dừng việc chuyển tiếp nếu có ô không được điền thông tin
        }
    }

    // Nếu mọi thứ hợp lệ, thực hiện chuyển tiếp đến trang tiếp theo
    
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
