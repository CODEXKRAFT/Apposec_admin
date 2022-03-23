let tncDOM = document.getElementById('termsAndConditions')





let empty = {}
    axios.post('https://apposes.herokuapp.com/termsAndConditions',empty)
    .then((res) => {
       let termsAndConditions=res.data.termsAndConditions
    //    let policy=privacyPolicy.value
       tncDOM.innerHTML=termsAndConditions.value.replace(/\\n/g,'\n')
    })
    .catch((error) => {
        console.error(error)
    })