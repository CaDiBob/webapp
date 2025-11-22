function getOS() {
    const userAgent = navigator.userAgent;
    if (/android/i.test(userAgent)) {
        return {
            user_agent: userAgent,
            app_platform: 'android',
            real_platform: 'Android',
        };
    }

    if (/iPad|iPhone|iPod/i.test(userAgent) && !window.MSStream) {
        return {
            user_agent: userAgent,
            app_platform: 'ios',
            real_platform: 'IOS',
        };
    }

    if (/Mac/i.test(userAgent)) {
        return {
            user_agent: userAgent,
            app_platform: 'ios',
            real_platform: 'MacOS',
        };
    }

    if (/Win/i.test(userAgent)) {
        return {
            user_agent: userAgent,
            app_platform: 'win',
            real_platform: 'Windows',
        };
    }
    return {
        user_agent: userAgent,
        app_platform: 'other',
        real_platform: 'Other',
    };
}
