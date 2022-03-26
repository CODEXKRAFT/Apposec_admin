let privacyDOM = document.getElementById('privacyPolicy')





let empty = {}
    axios.post('https://apposes.herokuapp.com/policy',empty)
    .then((res) => {
       let policy=res.data.privacyPolicy
       console.log(policy)
       privacyDOM.innerHTML=policy.value.replace(/\\n/g,'\n')
    })
    .catch((error) => {
        console.error(error)
    })