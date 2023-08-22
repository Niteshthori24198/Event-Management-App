
const baseUrl_login = 'https://reqres.in/api/login'

const  adminLoginForm = document.getElementById('adminLoginForm')

adminLoginForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const email = adminLoginForm.email.value;
    const password = adminLoginForm.password.value;

    const payload = {
        email, password
    }

    console.log(payload);

    fetch(baseUrl_login, {
        method : "POST",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.token){
            localStorage.setItem('token', JSON.stringify(data.token))
            location.href = '../Admin/data.html'
        }else{
            localStorage.removeItem('token')
            alert(data.error)
        }
    })
    .catch(err => {
        console.log(err);
    })
    
})