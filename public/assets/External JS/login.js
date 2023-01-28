const TOKEN_KEY='com/apposec/user/manifest/token'


let username = document.getElementById('username')
let userpassword = document.getElementById('userpassword')


let previousTokenData=localStorage.getItem(TOKEN_KEY)
if(previousTokenData!=='' && (previousTokenData!==null)){
    window.location.href = "./index.html";
}




let signinevent=document.getElementById('signin')
signinevent.addEventListener('click',()=>{
    let user={
        username: username.value,
        password: userpassword.value
    }
    axios.post('http://54.152.224.229:3000/adminLogin',user)
     .then((res) => {
        const error=res.data.error
        if(error===0){
            const authToken = res.data.authToken
            localStorage.setItem(TOKEN_KEY,authToken)
            window.location.href = "./index.html";

        }else {
            const message=res.data.message
            alert(message)
        }
         
        
    })
    .catch((error) => {
        console.error(error)
    })

})

    

