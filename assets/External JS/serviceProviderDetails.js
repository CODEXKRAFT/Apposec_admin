const TOKEN_KEY='com/apposec/user/manifest/token'
const SERVICE_ITEM_KEY='com/apposec/user/manifest/token/service/item/detail'
const SERVICE_ITEM_TYPE_KEY='com/apposec/user/manifest/token/service/item/type/detail'

let serviceProviderNameDOM=document.getElementById('serviceProviderName')
let serviceTypeDOM=document.getElementById('serviceType')
let serviceAddressDOM=document.getElementById('serviceAddress')
let aboutServiceProviderDOM=document.getElementById('aboutServiceProvider')
let serviceFacilityDOM=document.getElementById('serviceFacility')
let serviceVisitingHoursDOM=document.getElementById('serviceVisitingHours')




let previousTokenData=localStorage.getItem(TOKEN_KEY)
if(previousTokenData==='' || (previousTokenData===null)){
    window.location.href = "./login.html";
}

const serviceProvider=JSON.parse(localStorage.getItem(SERVICE_ITEM_KEY))
console.log(serviceProvider)

let spn=serviceProvider.firstName+' '+serviceProvider.lastName
serviceProviderNameDOM.innerHTML=spn

let st=localStorage.getItem(SERVICE_ITEM_TYPE_KEY)
serviceTypeDOM.innerHTML=st

let sa=serviceProvider.building+', '+serviceProvider.colony+', '+serviceProvider.city+', '+serviceProvider.state+'-'+serviceProvider.pincode
serviceAddressDOM.innerHTML=sa

let asp=serviceProvider.about
aboutServiceProviderDOM.innerHTML=asp

let serviceFacility=JSON.parse(serviceProvider.facility)
let serviceVisitingHours=JSON.parse(serviceProvider.routine)

const showFacilityList=(serviceFacility)=>{

    console.log(serviceFacility)
    const templateNode=(facilityName,price, duration,description)=>{
        return `<tr>
        <td> ${facilityName} </td>
        <td> ${price} </td>
        <td> ${duration} </td>
        <td> ${description} </td>
        </tr>`
    }

    serviceFacility.forEach((element) => {
        serviceFacilityDOM.insertAdjacentHTML("beforeend",templateNode(element.Name, element.Price, element.Duration,element.Description))
        
    });


}


console.log(serviceVisitingHours)
const showVisitingHoursList=(serviceVisitingHours)=>{

    const templateNode=(day,time1,time2,time3,time4)=>{
        return `<tr>
        <td> ${day} </td>
        <td> ${time1 +' - '+ time2} </td>
        <td> ${time3 +' - '+ time4} </td>
        </tr>`
    }

    serviceVisitingHours.forEach((element) => {
        let currentKeys=Object.keys(element)
        currentKeys.forEach((day)=>{
            let slots=element[day]

            if(slots.length===1){
                serviceVisitingHoursDOM.insertAdjacentHTML("beforeend",templateNode(day,slots[0][0],slots[0][1],'',''))
            }
            else{
                serviceVisitingHoursDOM.insertAdjacentHTML("beforeend",templateNode(day,slots[0][0],slots[0][1],slots[1][0],slots[1][1]))
            }
        })
       
        
    });


}

showFacilityList(serviceFacility)
showVisitingHoursList(serviceVisitingHours)