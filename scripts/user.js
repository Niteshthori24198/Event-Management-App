
const baseUrl = `https://tired-gold-katydid.cyclic.app`

const userRegisterForm = document.getElementById('userRegisterForm')

userRegisterForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const name = userRegisterForm.name.value
    const age = userRegisterForm.age.value
    const place = userRegisterForm.place.value
    const batch_name = userRegisterForm.batch_name.value
    const profession = userRegisterForm.profession.value

    const payload = {
        name, age, place, batch_name, profession
    }

    console.log(payload);

    fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert('successfully registered')
        })
        .catch(err => {
            console.log(err);
            alert('Something Went Wrong')
        }).finally(() => {
            userRegisterForm.name.value = ''
            userRegisterForm.age.value = ''
            userRegisterForm.place.value = ''
            userRegisterForm.batch_name.value = ''
            userRegisterForm.profession.value = ''
        })

})