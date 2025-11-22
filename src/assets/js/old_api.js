const osNameElement = document.querySelector('#osName');
const getKeyButton  = document.querySelector('#getKeyButtonVpn');
const getKeyButtonText = getKeyButton.querySelector('span');

const linkButtonModal = document.querySelector('#open_ss_modal');
const btnsClipboard = document.querySelectorAll('.js-clipboard-ss');

const log = document.querySelector('#log');
const modal = document.querySelector('#modal');

const installAppButton = href => document.querySelectorAll('.installAppButton').forEach( link => link.href = href );

const getOS = ()=> {

    const userAgent = navigator.userAgent;

    if (/android/i.test(userAgent)) {

        installAppButton("https://play.google.com/store/apps/details?id=org.outline.android.client");
        return "Android";

    }

    if (/iPad|iPhone|iPod/i.test(userAgent) && !window.MSStream) {

        installAppButton("https://apps.apple.com/us/app/outline-app/id1356177741");
        return "IOS";

    }

    if (/Mac/i.test(userAgent)) {

        installAppButton("https://apps.apple.com/us/app/outline-app/id1356178125");
        return "MacOS";

    }

    if (/Win/i.test(userAgent)) {

        installAppButton("https://s3.amazonaws.com/outline-releases/client/windows/stable/Outline-Client.exe");
        return "Windows";

    }

    return "Unknown OS";

}

const osName = getOS();
const urlParams = new URLSearchParams(window.location.search);
const telegram_id = urlParams.get('telegram_id');
const zone_id = urlParams.get('zone_id');
const url_windows = `https://${window.location.hostname}/redirect-windows?telegram_id=${telegram_id}&zone_id=${zone_id}`;

log.innerHTML = `${telegram_id}<br>${zone_id}<br>`;

let ss = null;

const modalShow = (id) => {

    document.querySelectorAll('.js-modal-item').forEach( item => item.classList.toggle('displayNone', item.id !== id ) );

    modal.classList.remove('displayNone');

}

const modalErrorGetkeyShow = ()=> {

    modalShow('modal-error-getkey');

    getKeyButtonText.textContent = getKeyButtonText.getAttribute('data-error');
    getKeyButton.classList.add('is-error');

}

// запрос ss

fetch(url_windows)
    .then( data => data.text() )
    .then( data => data.replace(/"/g, '') )
    .then( data => {

        if( data.startsWith("ss://") ) {

            ss = data;

            linkButtonModal.href = ss;
            getKeyButtonText.textContent = getKeyButtonText.getAttribute('data-done');
            getKeyButton.classList.add('is-done');

            log.append('ok');

        }
        else {
            log.append('error');
            modalErrorGetkeyShow();
        }

    }).catch( (error)=> {
    log.append('request failed');
    console.error(error);
    modalErrorGetkeyShow();
});

// detect OS
osNameElement.textContent = osName;

// копирование в буфер обмена
btnsClipboard.forEach( btn => btn.addEventListener('click', ()=>{
    navigator.clipboard.writeText(ss)
        .catch( (error)=> {
            console.error(error);
            modalText.textContent = ss;
        })
        .finally( ()=> {

            if ( btn === getKeyButton ) {

                if ( getKeyButton.classList.contains('is-error') ) {

                    modalShow('modal-support');

                } else if (getKeyButton.classList.contains('is-done')) {

                    // на IOS, Android, MacOS показать окно "Вы установили Outline"

                    if ( ["Android","IOS","MacOS"].includes(osName) ) {
                        modalShow('modal-outline');
                    }
                    else {
                        modalShow('modal-clipboard');
                    }

                }

            }

        });
}));

// закрытие модалки

modal.addEventListener('click', event => event.target.closest('.js-modal-close') && modal.classList.add('displayNone'));

// отправка информации об устройстве

const devise = {
    ip : 'not_set',
    telegram_id : telegram_id,
    userAgent   : navigator.userAgent,
    language    : navigator.language,
    platform    : navigator.platform
}

fetch("https://api.ipify.org/")
    .then( data => data.text() )
    .then( ip => {
        devise.ip = ip;
    }).finally( ()=> {
    fetch('/devise_webapp_api', {
        method: 'POST',
        body: JSON.stringify(devise),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
});
