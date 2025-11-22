function userLog() {
    const el_log = document.querySelector('.js--log');
    el_log.innerHTML = `${config.real_platform}<br>${config.telegram_id}<br>post status - ${config.send_data_status}<br>get status - ${config.get_status}`;
}
