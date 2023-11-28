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