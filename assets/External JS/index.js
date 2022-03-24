const TOKEN_KEY='com/apposec/user/manifest/token'


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