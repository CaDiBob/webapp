function displayPlatform() {
    document.querySelectorAll('.link_wrapper').forEach((el) => {
        const el_protocol = el.dataset.protocol;
        const el_platform = el.dataset.platform;
        let is_visible = true;
        is_visible = (is_visible && el_platform === 'all' || el_platform === config.platform);
        is_visible = (is_visible && (el_protocol === 'all' || el_protocol === config.protocol));

        el.style.display = is_visible ? 'flex' : 'none';
    });

    document.querySelector('.js--checkbox').checked = config.protocol === 'ss';
    document.querySelector('.js--protocol').style.display = config.switch_on ? 'flex' : 'none';
}

function setPlatform(protocol) {
    config.protocol = protocol;
    displayPlatform();
}

function observeElPlatform() {
    document.querySelector('.js--checkbox').addEventListener('change', (e) => {
        const new_protocol = (e.currentTarget.checked) ? 'ss' : 'vless';
        setPlatform(new_protocol);
    });
}
