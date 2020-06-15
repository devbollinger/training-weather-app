console.log('client side js loaded')


const weatherForm =  document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msg1.textContent = ''
    msg2.textContent = ''

    const location = search.value

    msg1.textContent = 'loading response'

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                msg1.textContent = data.error
                console.log(data.error)
            }else{
                msg2.textContent = data.location
                msg1.textContent = data.forecast
            }

        })
    })
})
