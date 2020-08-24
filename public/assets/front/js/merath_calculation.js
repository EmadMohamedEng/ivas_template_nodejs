$('#btn_cal').click(function () {
    if ($('.merath_input').val() == '') {
        //console.log('hiii');
        $('#btn_cal').attr('data-toggle', 'modal');
        $('#btn_cal').attr('data-target', '#exampleModal');
    } else {
        $('.t1').css('display', 'none');
        $('.thead2_h4').css('display', 'block');
        $('.t2').css('display', 'block');
        $('.thead1_h4').css('display', 'none');
        $('#btn_cal').removeAttr('data-toggle', 'modal');
        $('#btn_cal').removeAttr('data-target', '#exampleModal');
    }
});



function EnsureNumeric() {
    var key = window.event.keyCode;
    if (key < 48 || key > 57)
        window.event.returnValue = false;
}

function PayHesapla() {
    d = document;

    Mal = parseInt(d.getElementById('MalVarligi').value);
    var ECs = parseInt(d.getElementById('ErkekCocuk').value);
    var KCs = parseInt(d.getElementById('KizCocuk').value);
    var EKs = parseInt(d.getElementById('ErkekKardes').value);
    var KKs = parseInt(d.getElementById('KizKardes').value);
    var BabaVar = parseInt(d.getElementById('Baba').selectedIndex);
    var AnneVar = parseInt(d.getElementById('Anne').selectedIndex);
    var EsVar = parseInt(d.getElementById('Es').selectedIndex);

    var ECp = 0;
    var KCp = 0;
    var Ap = 0;
    var Bp = 0;
    var EsHesap = 0;
    var Es1p = 0;
    var Es2p = 0;
    var Es3p = 0;
    var Es4p = 0;
    var EKp = 0;
    var KKp = 0;
    var Xp = 0;
    var Mdan = 0;
    var KisiBasiPay = 0;
    var AraHesap = 0;

    if (ECs > 0) {

        ECp = ECs * (2 * (Mal / (2 * ECs + KCs)));
        KCp = (KCs > 0 ? KCs * (Mal / (2 * ECs + KCs)) : 0);
    } else if (ECs == 0 && KCs >= 2) {

        KCp = 2 * (Mal / 3);
        Mdan = Mal - KCp;
        Ap = (AnneVar == 1 ? (1 / 6) * Mdan : 0);
        Bp = (BabaVar == 1 ? (1 / 6) * Mdan : 0);
        EsHesap = (EsVar > 0 ? (1 / 8) * Mdan : 0);
    } else if (ECs == 0 && KCs == 1) {

        KCp = Mal / 2;
        Mdan = Mal - KCp;
        Ap = (AnneVar == 1 ? (1 / 6) * Mdan : 0);
        Bp = (BabaVar == 1 ? (1 / 6) * Mdan : 0);
        EsHesap = (EsVar > 0 ? (1 / 8) * Mdan : 0);
    } else if (ECs == 0 && KCs == 0 && BabaVar == 1 && EKs == 0 && KKs == 0) {

        Ap = (AnneVar == 1 ? (1 / 3) * Mal : 0);
        Mdan = Mal / 2;
        EsHesap = (EsVar > 0 ? (1 / 4) * Mdan : 0);
        Bp = Mal - (Ap + (EsHesap * EsVar));
    } else if (ECs == 0 && KCs == 0 && BabaVar == 0 && AnneVar == 1 && (EKs + KKs) >= 2) {

        Ap = (1 / 6) * Mal;
        AraHesap = (1 / 3) * Mal;
        EKp = EKs * (2 * (AraHesap / (2 * EKs + KKs)));
        KKp = KKs * (AraHesap / (2 * EKs + KKs));
        Mdan = Mal / 2;
        EsHesap = (EsVar > 0 ? (1 / 4) * Mdan : 0);
        Ap += Mal - (Ap + EKp + KKp + (EsHesap * EsVar));
    } else if (ECs == 0 && KCs == 0 && BabaVar == 0 && AnneVar == 1 && EKs == 1 && KKs == 0) {

        Ap = (1 / 3) * Mal;
        EKp = (1 / 6) * Mal;
        Mdan = Mal / 2;
        EsHesap = (EsVar > 0 ? (1 / 4) * Mdan : 0);
        Ap += Mal - (Ap + EKp + (EsHesap * EsVar));
    } else if (ECs == 0 && KCs == 0 && BabaVar == 0 && AnneVar == 1 && EKs == 0 && KKs == 1) {

        Ap = (1 / 3) * Mal;
        KKp = (1 / 6) * Mal;
        Mdan = Mal / 2;
        EsHesap = (EsVar > 0 ? (1 / 4) * Mdan : 0);
        Ap += Mal - (Ap + KKp + (EsHesap * EsVar));
    } else if (ECs == 0 && KCs == 0 && BabaVar == 0 && AnneVar == 0 && EKs == 0 && KKs == 1) {

        KKp = (1 / 2) * Mal;
        Mdan = Mal / 2;
        EsHesap = (EsVar > 0 ? (1 / 4) * Mdan : 0);
    } else if (ECs == 0 && KCs == 0 && BabaVar == 0 && AnneVar == 0 && EKs >= 1 && KKs == 0) {

        Mdan = Mal / 2;
        EsHesap = (EsVar > 0 ? (1 / 4) * Mdan : 0);
        EKp = Mal - (EsHesap * EsVar);
    } else if (ECs == 0 && KCs == 0 && BabaVar == 0 && AnneVar == 0 && EKs == 0 && KKs >= 2) {

        EsHesap = (EsVar > 0 ? (1 / 4) * (Mal / 2) : 0);
        Mdan = Mal - (EsHesap * EsVar);
        KKp = (2 / 3) * Mdan;
    } else if (ECs == 0 && KCs == 0 && BabaVar == 0 && AnneVar == 0 && EKs > 0 && KKs > 0) {

        Mdan = Mal / 2;
        EsHesap = (EsVar > 0 ? (1 / 4) * Mdan : 0);
        Mdan = Mal - (EsHesap * EsVar);
        EKp = EKs * (2 * (Mdan / (2 * EKs + KKs)));
        KKp = KKs * (Mdan / (2 * EKs + KKs));
    } else if (ECs == 0 && KCs == 0 && BabaVar == 0 && AnneVar == 1 && EKs == 0 && KKs == 0) {

        Ap = (1 / 3) * Mal;
        Mdan = Mal / 2;
        EsHesap = (EsVar > 0 ? (1 / 4) * Mdan : 0);
        Ap += Mal - (Ap + (EsHesap * EsVar));
    } else if (ECs == 0 && KCs == 0 && BabaVar == 0 && AnneVar == 0 && EKs == 0 && KKs == 0) {

        Mdan = Mal / 2;
        EsHesap = (EsVar > 0 ? (1 / 4) * Mdan : 0);
    } else if (ECs == 0 && KCs == 0 && BabaVar == 1 && AnneVar == 1 && (EKs + KKs) >= 2) {

        Ap = (1 / 6) * Mal;
        AraHesap = (1 / 3) * Mal;
        EKp = EKs * (2 * (AraHesap / (2 * EKs + KKs)));
        KKp = KKs * (AraHesap / (2 * EKs + KKs));
        Mdan = Mal / 2;
        EsHesap = (EsVar > 0 ? (1 / 4) * Mdan : 0);
        Bp = Mal - (Ap + EKp + KKp + (EsHesap * EsVar));
    } else if (ECs == 0 && KCs == 0 && BabaVar == 1 && AnneVar == 1 && EKs == 1 && KKs == 0) {
        Ap = (1 / 3) * Mal;
        EKp = (1 / 6) * Mal;
        Mdan = Mal / 2;
        EsHesap = (EsVar > 0 ? (1 / 4) * Mdan : 0);
        Bp = Mal - (Ap + EKp + (EsHesap * EsVar));
    } else if (ECs == 0 && KCs == 0 && BabaVar == 1 && AnneVar == 1 && EKs == 0 && KKs == 1) {
        Ap = (1 / 3) * Mal;
        KKp = (1 / 6) * Mal;
        Mdan = Mal / 2;
        EsHesap = (EsVar > 0 ? (1 / 4) * Mdan : 0);
        Bp = Mal - (Ap + KKp + (EsHesap * EsVar));
    } else if (ECs == 0 && KCs == 0 && BabaVar == 1 && AnneVar == 0 && (EKs + KKs) >= 2) {
        AraHesap = (1 / 3) * Mal;
        EKp = EKs * (2 * (AraHesap / (2 * EKs + KKs)));
        KKp = KKs * (AraHesap / (2 * EKs + KKs));
        Mdan = Mal / 2;
        EsHesap = (EsVar > 0 ? (1 / 4) * Mdan : 0);
        Bp = Mal - (Ap + EKp + KKp + (EsHesap * EsVar));
    } else if (ECs == 0 && KCs == 0 && BabaVar == 1 && AnneVar == 0 && EKs == 1 && KKs == 0) {
        EKp = (1 / 6) * Mal;
        Mdan = Mal / 2;
        EsHesap = (EsVar > 0 ? (1 / 4) * Mdan : 0);
        Bp = Mal - (Ap + EKp + (EsHesap * EsVar));
    } else if (ECs == 0 && KCs == 0 && BabaVar == 1 && AnneVar == 0 && EKs == 0 && KKs == 1) {
        KKp = (1 / 6) * Mal;
        Mdan = Mal / 2;
        EsHesap = (EsVar > 0 ? (1 / 4) * Mdan : 0);
        Bp = Mal - (Ap + KKp + (EsHesap * EsVar));
    }

    if (ECp > 0) {
        KisiBasiPay = ECp / ECs;
    }
    if (ECp > 0) {
        d.getElementById('ECp').innerHTML = Math.round(KisiBasiPay * 100) / 100 + (ECs > 1 ? " x " + ECs + "<br\> (" + Math.round(ECp * 100) / 100 + ")" : "");
    } else {
        d.getElementById('ECp').innerHTML = 0;
    }

    if (KCp > 0) {
        KisiBasiPay = KCp / KCs;
    }
    if (KCp > 0) {
        d.getElementById('KCp').innerHTML = Math.round(KisiBasiPay * 100) / 100 + (KCs > 1 ? " x " + KCs + "<br\> (" + Math.round(KCp * 100) / 100 + ")" : "");
    } else {
        d.getElementById('KCp').innerHTML = 0;
    }

    d.getElementById('Ap').innerHTML = Math.round(Ap * 100) / 100;
    d.getElementById('Bp').innerHTML = Math.round(Bp * 100) / 100;

    if (EsVar > 0 && EsHesap > 0) {
        Es1p = EsHesap;
    }
    d.getElementById('Es1p').innerHTML = Math.round(Es1p * 100) / 100;
    if (EsVar > 1 && EsHesap > 0) {
        Es2p = EsHesap;
    }
    d.getElementById('Es2p').innerHTML = Math.round(Es2p * 100) / 100;
    if (EsVar > 2 && EsHesap > 0) {
        Es3p = EsHesap;
    }
    d.getElementById('Es3p').innerHTML = Math.round(Es3p * 100) / 100;
    if (EsVar > 3 && EsHesap > 0) {
        Es4p = EsHesap;
    }
    d.getElementById('Es4p').innerHTML = Math.round(Es4p * 100) / 100;

    if (EKp > 0) {
        KisiBasiPay = EKp / EKs;
    }
    if (EKp > 0) {
        d.getElementById('EKp').innerHTML = Math.round(KisiBasiPay * 100) / 100 + (EKs > 1 ? " x " + EKs + "<br\> (" + Math.round(EKp * 100) / 100 + ")" : "");
    } else {
        d.getElementById('EKp').innerHTML = 0;
    }

    if (KKp > 0) {
        KisiBasiPay = KKp / KKs;
    }
    if (KKp > 0) {
        d.getElementById('KKp').innerHTML = Math.round(KisiBasiPay * 100) / 100 + (KKs > 1 ? " x " + KKs + "<br\> (" + Math.round(KKp * 100) / 100 + ")" : "");
    } else {
        d.getElementById('KKp').innerHTML = 0;
    }

    Xp = Mal - (ECp + KCp + Ap + Bp + Es1p + Es2p + Es3p + Es4p + EKp + KKp);

    d.getElementById('Xp').innerHTML = Math.round(Xp * 100) / 100;
}
