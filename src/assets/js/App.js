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
    links: [],
};

class App {
    constructor() {
        this.init();
    }

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

        config.platform = url_param.get('platform') || os_data.app_platform;
        config.protocol = url_param.get('def_protocol') || 'ss';
        config.switch_on = (url_param.get('switch_off') === null || url_param.get('switch_off') === 'false');
        config.telegram_id = url_param.get('telegram_id');
        config.zone_id = url_param.get('zone_id');
        config.real_platform = os_data.real_platform;
        config.user_agent = os_data.user_agent;
    }

    async initLinkApi() {
        const links = [
            {
                app_name: 'foxray',
                platform: 'ios',
                protocol: 'vless',
                link: 'https://example.com/foxray'
            },
            {
                app_name: 'outline',
                platform: 'all',
                protocol: 'ss',
                link: 'https://example.com/outline'
            },
            {
                app_name: 'streisand',
                platform: 'android',
                protocol: 'vless',
                link: 'https://example.com/streisand'
            }
        ];

        config.links = links;
        config.get_status = 'ok';
        return links;
    }


    async getUserIp() {
        return fetch('https://api.ipify.org/')
            .then((response) => response.text())
            .catch((error) => console.log(error));
    }

    async sendData() {
        const res = await this.getUserIp();
        const ip = res || 'not_set';

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
                if (!res.ok) throw new Error('Network response was not OK');
                config.send_data_status = 'ok';
            })
            .catch((error) => {
                config.send_data_status = 'error';
                console.log(error);
            });
    }
}

new App();
