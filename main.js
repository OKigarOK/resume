"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form')

    form.addEventListener('submit', formSend)

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form)
        console.log(formData)

        if(!error) {

            form.classList.add('_sending');

            sendLetter()

            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });

            if(response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
            form.classList.remove('_sending');

            } else {
                alert('ОШИБКА ОТПРАКИ :(');
            form.classList.remove('_sending');
            }

        } else {
            getAlarm()
        }

        function formValidate(form) {
            let error = 0
            let formReq = document.querySelectorAll('._req');

            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index];
                formRemoveError(input);

                if (input.classList.contains('_email')) {
                    if (emailCheck(input)) {
                        formAddError(input);
                        error++;
                    }
                } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                    formAddError(input);
                    error++;
                } else {
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
            }
            return error;
        }

        function formAddError(input) {
            input.parentElement.classList.add('_error');
            input.classList.add('_error')
        }

        function formRemoveError(input) {
            input.parentElement.classList.remove('_error');
            input.classList.remove('_error')
        }

        function emailCheck(input) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
        }
    }
});

function sendLetter() {
    alert('ВСЁ В ПОРЯДКЕ :)');
}

function getAlarm() {
    alert('ЗАПОЛНИТЕ ПОЖАЛУЙСТА ПОЛЯ :(');
}