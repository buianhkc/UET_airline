// Lấy thông tin lọc từ URL
var urlParams = new URLSearchParams(window.location.search);

var airportDepart = urlParams.get('airportDepart');
var airportArrive = urlParams.get('airportArrive');
var dateDepartBegin = urlParams.get('dateDepartBegin');
var dateDepartEnd = urlParams.get('dateDepartEnd');
var totalSeat = urlParams.get('totalSeat');

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
    .then((data)=>{
        console.log(data);
    })