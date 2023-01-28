let privacyDOM = document.getElementById('privacyPolicy')





let empty = {}
    axios.post('http://54.152.224.229:3000/policy',empty)
    .then((res) => {
       let policy=res.data.privacyPolicy
       console.log(policy)
       privacyDOM.innerHTML=policy.value.replace(/\\n/g,'\n')
    })
    .catch((error) => {
        console.error(error)
    })