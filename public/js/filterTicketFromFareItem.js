function submitFilter(element) {

    console.log(element);

    var e = document.querySelector(".df");
    // Lấy thông tin từ fare item
    var airportDepart = element.classList[1];
    var airportArrive = element.classList[2];
    var dateDepartBegin = "";
    var dateDepartEnd = "";
    var numOfAdult = 1;
    var numOfChildren = 0;

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