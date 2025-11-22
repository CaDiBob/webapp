function setLinks () {
    document.querySelectorAll('.js--set-key').forEach((el) => {
        el.addEventListener('click', ()=> {
            const key = el.dataset.linkKey;
            const item = config.links.find(l => l.app_name === key);
            if (!item) return;

            const app_link = el.parentElement.querySelector('a').href;
            const api_link = item.link;

            document.querySelector('.js--api-link').href = api_link;
            document.querySelector('.js--app-link').href = app_link;

            try {
                clipboardCopy(api_link);
            } catch (error) {
                console.log(error);
            }
        });
    });
}

function copyLinks () {
    document.querySelectorAll('.js--copy').forEach((el) => {
        el.addEventListener('click', ()=> copyClipboard(el.dataset.linkKey));
    });
}

async function copyClipboard(key) {
    const item = config.links.find(l => l.app_name === key);
    if (!item) return;

    const link = item.link;
    try {
        await clipboardCopy(link);
        modalCopy();
    } catch (error) {
        document.querySelector('.input').value = link;
        document.querySelector('.js--modal_error').classList.add('active');
        console.log(error);
    }
    console.log(config.links, link);
}
