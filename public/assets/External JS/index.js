const TOKEN_KEY='com/apposec/user/manifest/token'
let serviceProvidersDOM = document.getElementById('totalServiceProviders')
let appointmentsDOM = document.getElementById('totalAppointments')
let usersDOM = document.getElementById('totalUsers')
let recentAppointmentDOM=document.getElementById('recentAppointments')

let previousTokenData=localStorage.getItem(TOKEN_KEY)
if(previousTokenData==='' || (previousTokenData===null)){
    window.location.href = "./login.html";
}

const init=()=>{
    const authToken=localStorage.getItem(TOKEN_KEY)

    let req={
        authToken:authToken
    }

    axios.post('https://apposes.herokuapp.com/authUser',req)
     .then((res) => {
        const error=res.data.error
        // console.log(res.data)
        // console.log(error)
        if(error===0){
        //    console.log(res.data)
            createDash()
        }else {
            const message=res.data.message
            localStorage.removeItem(TOKEN_KEY)
            window.location.href='./login.html'
        }
         
        
    })
    .catch((error) => {
        console.error(error)
    })
}
init()



const createDash=()=>{

    const authToken=localStorage.getItem(TOKEN_KEY)

    let req={
        authToken:authToken
    }

    axios.post('https://apposes.herokuapp.com/adminDashboard',req)
     .then((res) => {
        const error=res.data.error
        console.log(res.data)
        
        if(error===0){
            let tsp=res.data.sizeService
            serviceProvidersDOM.innerHTML=tsp

            let ta=res.data.sizeRequests
            appointmentsDOM.innerHTML=ta

            let tu=res.data.sizeUser
            usersDOM.innerHTML=tu

            showList(res.data.tickets)


        }else {
            
        }
         
        
    })
    .catch((error) => {
        console.error(error)
    })
}

const showList=(tickets)=>{

    console.log(tickets)
    const statusElement=(status)=>{
        switch(status){
            case '1':{
                return '<td ><label class="badge badge-secondary" style="width:100%;">Waiting</label></td>'
            }
            case '2':{
                return '<td ><label class="badge badge-warning" style="width:100%;">Approved</label></td>'
            }
            case '3':{
                return '<td ><label class="badge badge-dark" style="width:100%;">Declined</label></td>'
            }
            case '4':{
                return '<td ><label class="badge badge-success" style="width:100%;">Visited</label></td>'
            }
            case '5':{
                return '<td ><label class="badge badge-danger" style="width:100%;">Not Visited</label></td>'
            }
        }
    }
    const templateNode=(name, brandname, status, date, receiptId, price)=>{
        return `<tr>
        <td>${name}</td>
        <td>${brandname}</td>
        ${statusElement(status)}
        <td>${date}</td>
        <td>${receiptId} </td>
        <td>${price}</td>
      </tr>`
    }

    tickets.forEach((element) => {
        recentAppointmentDOM.insertAdjacentHTML("beforeend",templateNode(element.customerName, element.serviceName, element.status, element.dateTime, element.recieptid, element.price))
        
    });

}