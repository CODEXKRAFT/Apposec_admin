let tncDOM = document.getElementById('termsAndConditions')





let empty = {}
    axios.post('http://54.152.224.229:3000/termsAndConditions',empty)
    .then((res) => {
       let termsAndConditions=res.data.termsAndConditions
    //    let policy=privacyPolicy.value
       tncDOM.innerHTML=termsAndConditions.value.replace(/\\n/g,'\n')
    })
    .catch((error) => {
        console.error(error)
    })