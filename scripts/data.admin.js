
const baseUrl = `https://tired-gold-katydid.cyclic.app`

const containe_data = document.getElementById('containe_data')
const containe_pagebtns  = document.getElementById('containe_pagebtns')
const userUpdateForm = document.getElementById('userUpdateForm')

const closeBtn = document.getElementById('closeBtn')


const token = JSON.parse(localStorage.getItem('token')) || null;
if(!token){
    alert('Kindly Login First')
    location.href = '../Admin/login.html'
}

let pageNumber = 0
let totalPages = 1

let dataDB = []

const emptyPoputate = {
    name : "", 
    age : "",
    place : "",
    batch_name : "",
    profession : "",
    id : null
}



fetchAllData()

function fetchAllData() {

    fetch(`${baseUrl}/users`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data);
            dataDB = data
            renderData(data)
        })
        .catch(err => {
            console.log(err);
        })

}

function renderData(data) {
    containe_data.innerHTML = '';

    totalPages = Math.ceil(data.length / 5);
    console.log('totalPages:-', totalPages);

    console.log("page number : ",pageNumber);

    data = data.slice(pageNumber*5, (pageNumber*5)+5);

    const html = data.map((ele) => {
        return getCard(ele);
    }).join(' ')

    containe_data.innerHTML = html

    renderPageBtns()
}

function renderPageBtns(){
    containe_pagebtns.innerHTML = ''
    let html = ''
    for(let i=0; i<totalPages; i++){
        html += ` <button onclick="handleChangeBtn('${i}')"> ${i+1} </button> `
    }
    containe_pagebtns.innerHTML = html;
}

function handleChangeBtn(n){
    pageNumber = n
    renderData(dataDB)
}

function getCard({ name, age, place, batch_name, profession, id }) {
    return (
        `
            <div class="card_data">
                <div>
                    <img src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png" alt="">
                </div>
                <div>
                    <p>Name :- ${name}</p>
                    <p>Age :- ${age}</p>
                    <p>Place :- ${place}</p>
                </div>
                <div>
                    <p>Batchname :- ${batch_name}</p>
                    <p>Profession :- ${profession}</p>
                </div>
                <div>
                    <!-- Trigger the modal with a button -->
                    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" onclick="handleEditBtn('${id}')" >Edit</button>
                </div>
                <div>
                    <button onclick="handleDeleteBtn('${id}')">Delete</button>
                </div>
            </div>
        `
    )
}


function handleEditBtn(id) {
    fetch(`${baseUrl}/users/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            populateData(data)
        })
        .catch(err => {
            console.log(err);
        })
}



let editedUserId;

function populateData({ name, age, place, batch_name, profession, id }) {
    userUpdateForm.name.value = name
    userUpdateForm.age.value = age
    userUpdateForm.place.value = place
    userUpdateForm.batch_name.value = batch_name
    userUpdateForm.profession.value = profession

    editedUserId = id
}



function handleUpdateUser(event) {
    event.preventDefault();
    console.log('clcicked');

    const name = userUpdateForm.name.value
    const age = userUpdateForm.age.value
    const place = userUpdateForm.place.value
    const batch_name = userUpdateForm.batch_name.value
    const profession = userUpdateForm.profession.value

    const payload = {
        name, age, place, batch_name, profession
    }

    console.log(payload);

    fetch(`${baseUrl}/users/${editedUserId}`, {
        method : "PUT",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert('successfully updated')
        closeBtn.click()
        fetchAllData()
    })
    .catch(err => {
        console.log(err);
    }).finally(()=>{
        populateData(emptyPoputate)
    })


}


function handleDeleteBtn(id){
    fetch(`${baseUrl}/users/${id}`, {
        method : "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert('successfully deleted')
        fetchAllData()
    })
    .catch(err => {
        console.log(err);
    })
}



function handleSearchByName(event){
    const val = event.target.value;
    console.log(val);
    // dataDB
    let filterdData = dataDB
    if(val){
        filterdData = dataDB.filter((ele) => ele.name.toLowerCase().includes(val.toLowerCase()))
    }

    pageNumber=0
    renderData(filterdData)
}

function handleSortByAge(event){
    const val = event.target.value;
    console.log(val);
    let filterdData = dataDB
    if(val=='asc'){
        filterdData = dataDB.sort((a,b)=> a.age-b.age)
    }else if(val=='desc'){
        filterdData = dataDB.sort((a,b)=> b.age-a.age)
    }

    pageNumber=0
    renderData(filterdData)
}

function handleFilterByProfession(event){
    const val = event.target.value;
    console.log(val);
    let filterdData = dataDB
    if(val){
        filterdData = dataDB.filter((ele) => ele.profession===val)
    }
    
    pageNumber=0
    renderData(filterdData)
}
