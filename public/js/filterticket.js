function submitFilterForm(event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    // Lấy thông tin từ form
    var airportDepart = document.querySelector('[name="airportDepart"]').value;
    var airportArrive = document.querySelector('[name="airportArrive"]').value;
    var dateDepartBegin = document.querySelector('[name="dateDepartBegin"]').value;
    var dateDepartEnd = document.querySelector('[name="dateDepartEnd"]').value;
    var numOfAdult = document.querySelector('[name="numOfAdult"]').value;
    var numOfChildren = document.querySelector('[name="numOfChildren"]').value;
    var totalSeat = parseInt(numOfAdult) + parseInt(numOfChildren);

    // Tạo URL với tham số truyền đi
    var url = "/booking-page" 
              + "?airportDepart=" + encodeURIComponent(airportDepart)
              + "&airportArrive=" + encodeURIComponent(airportArrive)
              + "&dateDepartBegin=" + encodeURIComponent(dateDepartBegin)
              + "&dateDepartEnd=" + encodeURIComponent(dateDepartEnd)
              + "&totalSeat=" + encodeURIComponent(totalSeat);

    // Chuyển hướng đến trang hiển thị vé với tham số
    window.location.href = url;
}