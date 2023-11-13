var toggleBtnEs = document.querySelectorAll('.toggleElement--buton');

var ltrE1 = document.querySelector(`.ltr.ltrRoute`);
var ltrE2 = document.querySelector(`.ltr.ltrBudget`);

function showLtr(e) {
    //console.log(e.classList[1]);

    //console.log(ltrE);
    if (e.classList[1] === 'Route') {
        ltrE2.style.display = 'none';

        if (ltrE1.style.display == 'none') {
            ltrE1.style.display = 'flex';
        } else {
            ltrE1.style.display = 'none';
        }
    } else {
        ltrE1.style.display = 'none';

        if (ltrE2.style.display == 'none') {
            ltrE2.style.display = 'flex';
        } else {
            ltrE2.style.display = 'none';
        }
    }
}