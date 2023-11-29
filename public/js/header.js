function getQueryParamValue(url, paramName) {
    const searchParams = new URL(url).searchParams;
    return searchParams.get(paramName);
}

function cancelOrder(orderNumber) {
    fetch('/booking-page/cancelOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_number: orderNumber }),
    })
    .then(() => {
        console.log('Đã xóa order');
    })
    .catch(err => {
        console.error(err);
    });
}

function logOut(event) {
    event.preventDefault();
    const orderNumber = getQueryParamValue(window.location.href, 'order_number');
    cancelOrder(orderNumber);
    const url = '/logout';
    window.location.href = url;
}

function goToUserPage(event) {
    event.preventDefault();
    const orderNumber = getQueryParamValue(window.location.href, 'order_number');
    cancelOrder(orderNumber);
    const url = '/user-page';
    window.location.href = url;
}

const logOutBtnE = document.getElementById('logout');
const goToUserPageBtnE = document.querySelector('.linkToUser');

function init() {
    try {
        logOutBtnE.addEventListener('click', logOut);
        goToUserPageBtnE.addEventListener('click', goToUserPage);
    } catch (error) {
        console.error('Error in init:', error);
    }
}

init();
