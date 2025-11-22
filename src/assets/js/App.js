/** app init class **/
const config = {
    real_platform: null,
    platform: null,
    user_agent: null,
    protocol: null,
    telegram_id: 0,
    zone_id: 0,
    switch_on: true,
    send_data_status: 'fetching...',
    get_status: 'fetching...',
    links: {},
};

// https://bill.ssvpnapp.win/devise_webapp_api
class App {
    /** create app **/
    constructor() {
        this.init();
    }
    /** init other modules **/
    async init() {
        this.initData();
        window.addEventListener('load', () => {
            modal();
            modalError();
            displayPlatform();
            observeElPlatform();
            userLog();
        });
        await this.initLinkApi();
        setLinks();
        copyLinks();
        await this.sendData();
        userLog();
        console.log('---------------- CONFIG: ------------------');
        console.log(config);
        console.log('---------------- CONFIG: ------------------');
    }

    initData() {
        const url_param = new URLSearchParams(location.search);
        const os_data = getOS();
        console.log(window.location);

        config.platform = url_param.get('platform') ? url_param.get('platform') : os_data.app_platform;
        config.protocol = url_param.get('def_protocol') ? url_param.get('def_protocol') : 'ss';
        config.switch_on = (url_param.get('switch_off') === null || url_param.get('switch_off') === 'false');
        config.telegram_id = url_param.get('telegram_id');
        config.zone_id = url_param.get('zone_id');
        config.real_platform = os_data.real_platform;
        config.user_agent = os_data.user_agent;
    }

    async initLinkApi() {
        const url = new URL(location.origin);
        url.pathname = '/client/subscription';
        url.search = new URLSearchParams({
            telegram_id: config.telegram_id,
            zone_id: config.zone_id,
        }).toString();
        const links = await fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not OK');
                }
                config.get_status = 'ok';
                return res.json();
            })
            .catch((error) => {
                config.get_status = 'error';
                console.log(error);
            });

        config.links = {
            ss: links.configs.outline.link,
            vless: links.configs.http_vless.link,
            hiddify: links.configs.raw_vless.link,
            foxray: links.configs.foxray.link,
            v2raytun_android: links.configs.v2raytun_android.link,
            streisand: links.configs.streisand.link,
            v2raytun: links.configs.v2raytun.link,
        };

        config.get_status = 'ok';

        return config.links;
    }

    // async initLinkApi() {
    //
    // }

    async getUserIp() {
        return fetch('https://api.ipify.org/')
            .then((response) => response.text())
            .catch((error) => console.log(error));
    }
    async sendData() {
        const res = await this.getUserIp();
        const ip = (res) ? res : 'not_set';

        const devise = {
            ip: ip,
            telegram_id: config.telegram_id,
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
        };
        return fetch('/devise_webapp_api', {
            method: 'POST',
            body: JSON.stringify(devise),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not OK');
                }
                config.send_data_status = 'ok';
            })
            .catch((error) => {
                config.send_data_status = 'error';
                console.log(error);
            });
    };
}

new App();
