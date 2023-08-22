
const mytoken = JSON.parse(localStorage.getItem('token')) || null;


let loginLogoutBtn = document.getElementById('loginLogoutBtn');

if(mytoken){
    loginLogoutBtn.innerText = 'Logout'
}else{
    loginLogoutBtn.innerText = 'Login'
}


loginLogoutBtn.addEventListener('click', ()=>{
    if(loginLogoutBtn.innerText == 'Login'){
        location.href = '../Admin/login.html'
    }else{
        localStorage.removeItem('token')
        location.href = '../Admin/admin.html'
    }
})

