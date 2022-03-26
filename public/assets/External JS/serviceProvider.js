const TOKEN_KEY='com/apposec/user/manifest/token'
const SERVICE_ITEM_KEY='com/apposec/user/manifest/token/service/item/detail'

let serials=[];
let serviceProvidersDOM=document.getElementById('serviceProvidersList')


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

    axios.post('https://apposes.herokuapp.com/adminServiceProviders',req)
     .then((res) => {
        const error=res.data.error
        console.log(res.data)
        
        if(error===0){
            serials=res.data.serviceProvider
            showList(res.data.serviceProvider)
            
        }else {
            
        }
         
        
    })
    .catch((error) => {
        console.error(error)
    })
}



let onClickDetails=(event)=>{
    console.log(event)
    let targetIndex=-1

    const equateIndex=(element,index)=>{
        let result= element.id===event.target.id
        if(result){
            targetIndex=index
        }
        return result
    }

    serials.findIndex(equateIndex)

    const targetElement=JSON.stringify(serials[targetIndex])
    localStorage.setItem(SERVICE_ITEM_KEY,targetElement)
    window.location.href='./serviceproviderdetails.html'

}
let onClickAccept=(event)=>{
    console.log(event)

    const authToken=localStorage.getItem(TOKEN_KEY)
    let req={
        authToken:authToken,
        serviceID: event.target.id,
        modifiyAuth: 1
    }

    axios.post('https://apposes.herokuapp.com/modifyServiceProviderAuths',req)
     .then((res) => {
        window.location.reload()

    })
    .catch((error) => {
        console.error(error)
    })
    
}
let onClickBlock=(event)=>{
    console.log(event)

    const authToken=localStorage.getItem(TOKEN_KEY)
    let req={
        authToken:authToken,
        serviceID: event.target.id,
        modifiyAuth: 2
    }

    axios.post('https://apposes.herokuapp.com/modifyServiceProviderAuths',req)
     .then((res) => {
        window.location.reload()
        
    })
    .catch((error) => {
        console.error(error)
    })
}

const showList=(tickets)=>{

    console.log(tickets)

    


    const authElement=(auth, id)=>{
        switch(auth){
            
            case 0:{
                return '<td ><label class="badge badge-warning" style="width:100%;">Pending</label></td> <td> <label class="badge badge-dark" id="'+ id +'" onclick="onClickDetails(event)">Details</label></td> <td><label class="badge badge-success" style="width:100%;" id="'+ id +'" onclick="onClickAccept(event)" >Accept</label> </td>'
            }
            
            case 1:{
                return '<td ><label class="badge badge-success" style="width:100%;">Accepted</label></td> <td> <label class="badge badge-dark" id="'+ id +'" onclick="onClickDetails(event)">Details</label></td> <td><label class="badge badge-danger" style="width:100%;" id="'+ id +'" onclick="onClickBlock(event)">Block</label> </td>'
            }
            case 2:{
                return '<td ><label class="badge badge-danger" style="width:100%;">Blocked</label></td> <td> <label class="badge badge-dark" id="'+ id +'" onclick="onClickDetails(event)">Details</label></td> <td><label class="badge badge-success" style="width:100%;" id="'+ id +'" onclick="onClickAccept(event)">Accept</label> </td>'
            }
        }
    }
    const templateNode=(brandname, firstName,lastName, serviceType, status,id)=>{
        return `<tr>
        <td>${brandname}</td>
        <td>${firstName+' '+lastName}</td>
        <td>${serviceType}</td>
        ${authElement(status,id)}
        
      </tr>`
    }

    tickets.forEach((element) => {
        serviceProvidersDOM.insertAdjacentHTML("beforeend",templateNode(element.brandName, element.firstName,element.lastName,element.typeOfService,element.auth,element.id))
        
    });

}