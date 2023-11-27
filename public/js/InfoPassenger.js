var urlParams = new URLSearchParams(window.location.search);

var order_number = urlParams.get('order_number');

var quantity = [];

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

function createInputElement(type, placeholder, minDate, maxDate) {
    var input = document.createElement('input');
    input.type = type;
    input.className = 'form-control';
    input.placeholder = placeholder;

    if (type === 'date') {
        input.min = minDate;
        input.max = maxDate;
    }

    return input;
}

// Hàm tạo form cho người lớn hoặc trẻ em
function createForm(container, formNumber) {
    var numberDiv = document.createElement('div');
    numberDiv.className = 'number';
    numberDiv.innerHTML = '<p>STT: ' + formNumber + '</p>';

    var nameInput = createInputElement('text', 'Họ tên');
    var birthDateInput = createInputElement('date', 'Ngày sinh', '1950-01-01', '2023-12-30');
    var genderInput = createInputElement('text', 'Giới tính');

    var inputGroupDiv = document.createElement('div');
    inputGroupDiv.className = 'input-group';
    inputGroupDiv.appendChild(nameInput);
    inputGroupDiv.appendChild(birthDateInput);
    inputGroupDiv.appendChild(genderInput);

    container.appendChild(numberDiv);
    container.appendChild(inputGroupDiv);
}

function createAdultForm(number) {
    var adultFormContainer = document.querySelector('.information_customer.adults');

    for (let i = 1; i <= number; i++) {
        createForm(adultFormContainer, i);
    }
}

function createChildForm(number) {
    var childFormContainer = document.querySelector('.information_customer.children');

    for (let i = 1; i <= number; i++) {
        createForm(childFormContainer, i);
    }
}

// Sử dụng hàm để tạo form cho người lớn và trẻ em
createAdultForm(adultsQuantity); // Gọi hàm để tạo form cho người lớn
createChildForm(childrenQuantity); // Gọi hàm để tạo form cho trẻ em

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

