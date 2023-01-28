const TOKEN_KEY='com/apposec/user/manifest/token'
let usersListDOM= document.getElementById('usersList')



let previousTokenData=localStorage.getItem(TOKEN_KEY)
if(previousTokenData==='' || (previousTokenData===null)){
    window.location.href = "./login.html";
}

const init=()=>{
    const authToken=localStorage.getItem(TOKEN_KEY)

    let req={
        authToken:authToken
    }

    axios.post('http://54.152.224.229:3000/authUser',req)
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

    axios.post('http://54.152.224.229:3000/adminUsers',req)
     .then((res) => {
        const error=res.data.error
        console.log(res.data)
        
        if(error===0){
            showList(res.data.users)
        }else {
            
        }
         
        
    })
    .catch((error) => {
        console.error(error)
    })
}

const showList=(users)=>{

    console.log(users)
    
    const templateNode=(firstName,lastName, phone)=>{
        return `<tr>
        <td>${firstName+' '+lastName}</td>
        <td>${phone}</td>
        </tr> `
    }

    users.forEach((element) => {
        usersListDOM.insertAdjacentHTML("beforeend",templateNode(element.firstName, element.lastName, element.phone))
        
    });

}