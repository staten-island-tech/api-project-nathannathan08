import './style.css'
//get data
//promises
//show data

async function getData() {
    //returns a promise
    try {
        const response = await fetch('https://apilayer.com/marketplace/checkiday-api');
        //guard clause
        if (response.status !== 200) {
            throw new Error(response);
        } else {
            //convert promise to json
            const data = await response.json();
            console.log(data);
            //this is unique to THIS API 
            data.forEach(user => {
                document.querySelector("#app").insertAdjacentHTML(
                    "afterbegin", `<h1>${user.name}}</h1>`
                );
            });
        }
    } catch (error) {
        alert("Hey, I can't find it.");
    }
}

getData();