var fareListE = document.querySelector('.fare-list-content');
console.log(fareListE);

var fares = [
    {
        nameJourney: 'HN to HCM',
        departDate: '12/12/2023',
        price: 1000000,
        typeJourney: 'Một chiều / Phổ Thông',
        linkImgCity: './assets/Uet_airline_database/imgCity/ca_mau.webp'
    },

    {
        nameJourney: 'jsdlkf',
        departDate: '12/11/2023',
        price: 20000050,
        typeJourney: 'Một chiều / Thương Gia',
        linkImgCity: './assets/Uet_airline_database/imgCity/binh_dinh.jpeg'
    },
    {
        nameJourney: 'sdfsh',
        departDate: '12/12/2024',
        price: 100067000,
        typeJourney: 'Một chiều / Phổ Thông',
        linkImgCity: './assets/Uet_airline_database/imgCity/quang_binh.jpg' 
    },
    {
        nameJourney: 'dhcvdt',
        departDate: '12/6/2023',
        price: 10540000,
        typeJourney: 'Một chiều / Phổ Thông',
        linkImgCity: './assets/Uet_airline_database/imgCity/nghe_an.jpg' 
    },
    {
        nameJourney: 'sdfsdfdsf',
        departDate: '12/12/2024',
        price: 3000000,
        typeJourney: 'Một chiều / Thương Gia',
        linkImgCity: './assets/Uet_airline_database/imgCity/can_tho.jpg' 
    },

];

for (var i = 0; i < fares.length; ++i) {
    fareListE.innerHTML += `
    <div class="fare-item">
    <div class="fare-item--content fare-img" style="background-image: url('${fares[i].linkImgCity}')">
        <div class="fareItem--number">
            ${i+1}/8
        </div>
        <div class="fareItem--info">
            <div style="position: relative; width: 100%; height: 100%;">
                <div class="name-journey">
                    <p>${fares[i].nameJourney}</p>
                </div>
                <p class="depart-date">${fares[i].departDate}</p>

                <div class="price">
                    <p style="margin: 0; text-align: right;">Từ</p>
                    <p style="font-size: 30px; font-weight: bold;">${fares[i].price} VND</p>
                </div>
                <p class="type-journey">
                ${fares[i].typeJourney}
                </p>
            </div>
        </div>
    </div>
</div>
`;
}