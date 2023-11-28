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
        .then(() => {
            console.log(quantity[0]);
            initFormSubmitInfo();
            // addToDataBase();
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
            <div class="form-info adult">
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
                <label for="gender">Giới tính:</label>
                <select id="gender" class="form-control">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Không biết">Không biết</option>
                </select>
                </div>
            </div>`;
    }

    html4 += `<div class="quantity-children">
        <p>Số lượng trẻ em: ${quantity[0].so_luong_tre_em}</p>
    </div>`
    for (var i = 0; i < quantity[0].so_luong_tre_em; i++) {
        html4 += `
            <div class="form-info children">
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
                <label for="gender">Giới tính:</label>
                <select id="gender" class="form-control">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Không biết">Không biết</option>
                </select>
                </div>
            </div>`;
    }

    adultinfo.innerHTML = html3;
    childreninfo.innerHTML = html4;

}

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
            fetch('/booking-page/cancelOrder', {
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

    addToDataBase();
    // Tạo URL với tham số truyền đi
    var url = "/seat-order"
        + "?order_number=" + encodeURIComponent(order_number);

    window.location.href = url;
    
}

function addToDataBase() {
    var data = [];

    var listFormInfoAdultE = document.querySelectorAll('.form-info.adult');
    var listFormInfoChildrenE = document.querySelectorAll('.form-info.children');
    // console.log(listFormInfoAdultE);
    // console.log(listFormInfoChildrenE);
    // Lặp qua mỗi phần tử trong danh sách thông tin người lớn
    listFormInfoAdultE.forEach(function(formInfoElement, i) {
    // Lấy các trường dữ liệu từ form-info
    var name = formInfoElement.querySelector('.input-group input[type="text"]').value;
    var birthDate = formInfoElement.querySelector('.input-group input[type="date"]').value;
    var gender = formInfoElement.querySelector('.input-group select').value;

    // Tạo một đối tượng người dùng và thêm vào mảng data
    var user = {
        order_number: order_number,
        ma_hanh_khach: i + 1,
        ten: name,
        gioi_tinh: gender,
        do_tuoi: 'nguoi_lon',
        ngay_sinh: birthDate
    };
    data.push(user);
});
    // var a = listFormInfoAdultE.length;
    // Lặp qua mỗi phần tử trong danh sách thông tin trẻ em
    
    listFormInfoChildrenE.forEach(function(formInfoElement, i) {
    // Lấy các trường dữ liệu từ form-info
    var name = formInfoElement.querySelector('.input-group input[type="text"]').value;
    var birthDate = formInfoElement.querySelector('.input-group input[type="date"]').value;
    var gender = formInfoElement.querySelector('.input-group select').value;

    // Tạo một đối tượng người dùng và thêm vào mảng data
    var user = {
        order_number: order_number,
        ma_hanh_khach: i + 1 + quantity[0].so_luong_nguoi_lon,
        ten: name,
        gioi_tinh: gender,
        do_tuoi: 'tre_em',
        ngay_sinh: birthDate
    };
    data.push(user);
});    

// Hiển thị mảng data trong console
    console.log(data);
    fetch('/info-passenger/insertInfoPassenger', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

