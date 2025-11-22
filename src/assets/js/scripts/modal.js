function modal () {
    document.querySelectorAll('.js--modal').forEach((el) => {
        el.addEventListener('click', ()=> {
            document.querySelector('.js--modal_confirm').classList.toggle('active');
        });
    });
}

function modalError () {
    document.querySelectorAll('.js--error_modal').forEach((el) => {
        el.addEventListener('click', ()=> {
            document.querySelector('.js--modal_error').classList.remove('active');
        });
    });
}

function modalCopy(){
    const el = document.querySelector('.js--modal_copy');
    document.querySelector('.js--modal_confirm').classList.remove('active');
    el.classList.add('active');
    setTimeout(() => {
        el.classList.add('hide');
    }, 1000);
    setTimeout(() => {
        el.classList.remove('hide');
        el.classList.remove('active');
    }, 4000);
}
