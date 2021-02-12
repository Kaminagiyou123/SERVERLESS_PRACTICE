const form = document.querySelector('.form')
const emailInput = document.querySelector('.email-input')
const alert = document.querySelector('.alert')
alert.style.display = 'none'

form.addEventListener('submit', async function (e){
    e.preventDefault();
    form.classList.add('loading')
    alert.style.display='none'
    const email=emailInput.value
    try{
        await axios.post('/api/6-newsletter',{email})
    form.innerHTML=`<h4>Success! Please check your email</h4>`

    } catch (error){
        console.log(error.response)
        alert.style.display='block'
        alert.textContent=error.response.data.email[0]
    }
    form.classList.remove('loading')

})