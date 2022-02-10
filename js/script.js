let objMessages = null;

/*      REQUESTS         */ 

let promiseParticipants = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants ")
promiseParticipants.then(logPersonagens);
promiseParticipants.catch(error);
function logPersonagens(pessoas){
    console.log(pessoas.data)
}

// let promiseStatus = axios.get("https://mock-api.driven.com.br/api/v4/uol/status")
// promiseStatus.then(logStatus)
// promiseStatus.catch(error)
// function logStatus(status){
//     console.log(status)
// }

let promiseMsg = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
promiseMsg.then(messages)
promiseMsg.catch(error)
function messages (response){
    objMessages = response.data
    console.log(objMessages)
    createMessages()
    // setInterval(createMessages, 3000)
}

function error(x){
    console.log(x.response.status)
}

/*----------------------------------------------------------*/
let teste123 = "";
function createMessages(){
    const mainPage = document.querySelector('main')
    mainPage.innerHTML = ""
    objMessages.forEach(i => {
        
        if(i.type === "status"){
        teste123 += `
        <article class=${i.type}>
            <time>(${i.time})</time>
            <strong>${i.from}</strong>
            <span>${i.text}</span>
        </article>
        `
        } else if (i.type === "message"){
            teste123 += `
        <article class=${i.type}>
            <time>(${i.time})</time>
            <strong>${i.from}</strong> para <strong>${i.to}</strong>:
            <span>${i.text}</span>
        </article>
        `
        } else if (i.type === "private_message"){
            teste123 += `
        <article class=${i.type}>
            <time>(${i.time})</time>
            <strong>${i.from}</strong> reservadamente para <strong>${i.to}</strong>:
            <span>${i.text}</span>
        </article>
        `
        }

        mainPage.innerHTML = teste123;
        const recentMessage = document.querySelector('main article:last-child');
        recentMessage.scrollIntoView();
});


}




// from: "nome"
// text: "entra na sala..."
// time: "02:14:37"
// to: "Todos"
// type: "status"