const TOKEN_KEY='com/apposec/user/manifest/token'
const SERVICE_ITEM_KEY='com/apposec/user/manifest/token/service/item/detail'

let serviceProviderNameDOM=document.getElementById('serviceProviderName')
let serviceTypeDOM=document.getElementById('serviceType')
let serviceAddressDOM=document.getElementById('serviceAddress')
let aboutServiceProviderDOM=document.getElementById('aboutServiceProvider')





let previousTokenData=localStorage.getItem(TOKEN_KEY)
if(previousTokenData==='' || (previousTokenData===null)){
    window.location.href = "./login.html";
}

const serviceProvider=JSON.parse(localStorage.getItem(SERVICE_ITEM_KEY))
console.log(serviceProvider)

let spn=serviceProvider.firstName+' '+serviceProvider.lastName
serviceProviderNameDOM.innerHTML=spn

let st=serviceProvider.typeOfService
serviceTypeDOM.innerHTML=st

let sa=serviceProvider.building+', '+serviceProvider.colony+', '+serviceProvider.city+', '+serviceProvider.state+'-'+serviceProvider.pincode
serviceAddressDOM.innerHTML=sa

let asp=serviceProvider.about
aboutServiceProviderDOM.innerHTML=asp