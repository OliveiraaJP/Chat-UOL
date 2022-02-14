let user = [];
let objMessages = null;

/*      REQUESTS         */

let promiseParticipants = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants ")
promiseParticipants.then(logPersonagens);
promiseParticipants.catch(error);

function logPersonagens(pessoas) {
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

function messages(response) {
    objMessages = response.data
    console.log(objMessages)
    //createMessages()
    // setInterval(createMessages, 3000)
}

function error(x) {
    console.log(x.response.status)
}

function errorLogin(x) {
    console.log(x.response.status)
    let statusCode = x.response.status;
    if (statusCode === 400) {
        alert('Username já está em uso')
        window.location.reload();
    }
}

function sucessLogin(response) {
    let statusResponse = response.status;
    if (statusResponse === 200) {
        console.log("login sucess")
        createMessages();
        // reloadMessages();
        checkOnline();
    }
}

// function reloadMessages() {
//     setInterval(createMessages, 3000);
//     console.log("loading...");


    function checkOnline() {
        setInterval(function () {
            const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", user);
            promise.catch(errorUserOffline);
        }, 5000);
    }

    function errorUserOffline(error) {
        if (error.response.status === 400);
        console.log("errorCheckOnline");
        window.location.reload();
    }
    /*----------------------------------------------------------*/
    username()

    function username() {
        user = prompt('Qual seu nome?');
        user = {
            name: user
        }
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", user);
        promise.then(sucessLogin);
        promise.catch(errorLogin);
    }


    let frontPage = "";

    function createMessages() {
        const mainPage = document.querySelector('main')
        mainPage.innerHTML = ""
        objMessages.forEach(i => {

            if (i.type === "status") {
                frontPage += `
        <article class=${i.type}>
            <time>(${i.time})</time>
            <strong>${i.from}</strong>
            <span>${i.text}</span>
        </article>
        `
            } else if (i.type === "message") {
                frontPage += `
        <article class=${i.type}>
            <time>(${i.time})</time>
            <strong>${i.from}</strong> para <strong>${i.to}</strong>:
            <span>${i.text}</span>
        </article>
        `
            } else if (i.type === "private_message") {
                frontPage += `
        <article class=${i.type}>
            <time>(${i.time})</time>
            <strong>${i.from}</strong> reservadamente para <strong>${i.to}</strong>:
            <span>${i.text}</span>
        </article>
        `
            }

            mainPage.innerHTML = frontPage;
            const recentMessage = document.querySelector('main article:last-child');
            recentMessage.scrollIntoView();
        });
    }

    function sendMessage() {
        let messageSent = document.querySelector("textarea").value;
        console.log(messageSent);

        let newMessage = {
            from: "abcexgxd",
            to: "Todos",
            text: "test",
            type: "message"
        };

        const promise = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', newMessage);
        promise.then(sucess);
        promise.catch(error);
    }

    function sucess() {
        createMessages()
    }