
const baseUrl = `https://tired-gold-katydid.cyclic.app`


const token = JSON.parse(localStorage.getItem('token')) || null;
if(!token){
    alert('Kindly Login First')
    location.href = '../Admin/login.html'
}


let dataDB = []

let totalNumGuest = document.getElementById('totalNumGuest')
let totalNumStudent = document.getElementById('totalNumStudent')
let totalNumWorker = document.getElementById('totalNumWorker')
let avgOfGuest = document.getElementById('avgOfGuest')

fetchAllData()

function fetchAllData() {

    fetch(`${baseUrl}/users`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data);
            dataDB = data
            calculateReport(data)
        })
        .catch(err => {
            console.log(err);
        })

}

function calculateReport(data){
    let guestCount = data.length
    let studentCount = 0
    let professionalCount = 0
    let avg = 0
    let sum = 0

    for(let user of data){
        if(user.profession==='Student'){
            studentCount++
        }else{
            professionalCount++
        }
        sum += +user.age
    }
    avg = (sum/guestCount).toFixed(2)

    totalNumGuest.innerHTML = guestCount
    totalNumStudent.innerHTML = studentCount
    totalNumWorker.innerHTML = professionalCount
    avgOfGuest.innerHTML = avg

}
