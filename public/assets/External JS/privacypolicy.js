let privacyDOM = document.getElementById('privacyPolicy')





let empty = {}
    axios.post('https://apposes.herokuapp.com/policy',empty)
    .then((res) => {
       let privacyPolicy=res.data.privacyPolicy
    //    let policy=privacyPolicy.value
       privacyDOM.innerHTML=privacyPolicy.value.replace(/\\n/g,'\n')
    })
    .catch((error) => {
        console.error(error)
    })