const danhSachTinhThanh = [
    "VTB", "BDI", "CMU", "CTH", "DNA", "DLA", "DBI", "GLA", "HNO", "HPG",
    "HCM", "KHA", "KGI", "LDG", "NAN", "PYE", "QBI", "QNA", "QNH", "THA", "TTH"
];

const fareListE = document.querySelector('.fare-list-content');
const showMoreBtnE = document.querySelector('.showmore-button');


// console.log(fareListE);
//console.log([showMoreBtnE]);

const api = 'http://localhost:3000/home-page//fromMySql/getbestsellerticket';

let apiFares = api;

let currentNumFares = 0;

let fares = [];

function setApiToGetData() {
    //console.log([document.querySelector('[name="airport-depart"]').selectedIndex]);

    var e1 = document.querySelector('[name="airport-depart"]');
    var e2 = document.querySelector('[name="airport-arrive"]');
    var ma_diem_di  = (e1.selectedIndex - 1 >= 0) ? danhSachTinhThanh[e1.selectedIndex - 1] : "";
    var ma_diem_den  = (e2.selectedIndex - 1 >= 0) ? danhSachTinhThanh[e2.selectedIndex - 1] : "";
    var str = `?money=${document.querySelector('[name="total-money"]').value}&depart=${ma_diem_di}&arrive=${ma_diem_den}`;
    apiFares = api + str;
    // console.log(apiFares);
}

function changeValueFilter() {
    currentNumFares = 0;
    getDataFromApi();
}

function getDataFromApi() {
    setApiToGetData();

    fetch(apiFares)
        .then(res => res.json())
        .then(function (data) {
            while (fares.length > 0) {
                fares.pop();
            }

            for (var i = 0; i < data[0].length; ++i) {
                fares.push(data[0][i]);
            }

            // Call showMoreFares here, after the data has been fetched
            showMoreFares();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


getDataFromApi();

function showMoreFares() {
    if (currentNumFares == fares.length || currentNumFares == 40) {
        alert('Hết rồi còn đâu!!!');
        return;
    }
    // console.log(fares);
    if (currentNumFares + 8 > fares.length) {
        currentNumFares = fares.length;
    } else {
        currentNumFares += 8;
    }
    
    fareListE.innerHTML = "";

    for (var i = 0; i < currentNumFares; ++i) {
        var date = fares[i].date_depart;
        let dateDepart = new Date(date);

        var day = dateDepart.getDate();
        var month = dateDepart.getMonth() + 1; // Tháng bắt đầu từ 0
        var year = dateDepart.getFullYear();

        var formattedDate = day + '/' + month + '/' + year;

        fareListE.innerHTML += `
            <div class="fare-item" >
            <div class="fare-item--content fare-img" style="background-image: url('${fares[i].linkimg_diem_den}')">
                <div class="fareItem--number">
                    ${i + 1}/${currentNumFares}
                </div>
                <div class="fareItem--info ${fares[i].ma_diem_di} ${fares[i].ma_diem_den}" onclick="submitFilter(this)">
                    <div style="position: relative; width: 100%; height: 100%;">
                        <div class="name-journey">
                            <p>${fares[i].ten_diem_di} đến ${fares[i].ten_diem_den}</p>
                        </div>
                        <p class="depart-date">${formattedDate}</p>
        
                        <div class="price">
                            <p style="margin: 0; text-align: right;">Từ</p>
                            <p style="font-size: 30px; font-weight: bold;">${new Intl.NumberFormat(["ban", "id"]).format(fares[i].minPrice)} VND</p>
                        </div>
                        <p class="type-journey">
                        ${(fares[i].loai_ve == 'pho_thong') ? 'Phổ Thông / 1 Chiều' : 'Thương Gia / 1 Chiều'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

function deleteInfoFilter() {
   
    document.querySelector('[name="total-money"]').value = "";
    document.querySelector('[name="airport-depart"]').selectedIndex = "0";
    document.querySelector('[name="airport-arrive"]').selectedIndex = "0";

    changeValueFilter();
}
