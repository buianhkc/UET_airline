function submitFilterForm(event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    // Lấy thông tin từ form
    var airportDepart = document.querySelector('[name="airportDepart"]').value;
    var airportArrive = document.querySelector('[name="airportArrive"]').value;
    var dateDepartBegin = document.querySelector('[name="dateDepartBegin"]').value;
    var dateDepartEnd = document.querySelector('[name="dateDepartEnd"]').value;
    var numOfAdult = document.querySelector('[name="numOfAdult"]').value;
    var numOfChildren = document.querySelector('[name="numOfChildren"]').value;
    var numOfChildren = parseInt(numOfChildren);
    var numOfAdult = parseInt(numOfAdult);

    // Tạo URL với tham số truyền đi
    var url = "/booking-page"
        + "?airportDepart=" + encodeURIComponent(airportDepart)
        + "&airportArrive=" + encodeURIComponent(airportArrive)
        + "&dateDepartBegin=" + encodeURIComponent(dateDepartBegin)
        + "&dateDepartEnd=" + encodeURIComponent(dateDepartEnd)
        + "&numOfAdult=" + encodeURIComponent(numOfAdult)
        + "&numOfChildren=" + encodeURIComponent(numOfChildren)

    // Chuyển hướng đến trang hiển thị vé với tham số
    window.location.href = url;
}

// Hàm để lấy giá trị của một tham số truy vấn từ URL
function getQueryParamValue(url, paramName) {
    const searchParams = new URL(url).searchParams;
    return searchParams.get(paramName);
}

function cancelOrder() {
    // Lấy đường dẫn của URL hiện tại
    const currentPath = window.location.pathname;

    // Lấy đường dẫn của trang trước đó
    const previousPath = new URL(document.referrer).pathname;

    const previousURL = document.referrer;

    // In ra console để kiểm tra
    console.log('Đường dẫn của URL hiện tại:', currentPath);
    console.log('Đường dẫn của trang trước đó:', previousPath);

    if (previousPath == '/info-passenger' || previousPath == '/seat-order') {

        // var urlParams = new URLSearchParams();

        // var order_number = urlParams.get('order_number');

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
}

cancelOrder();