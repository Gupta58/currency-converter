const base_URL = "https://api.frankfurter.dev/v2/rate/";

const dropdowns = document.querySelectorAll(".dropdown select");

let btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const result = document.querySelector(".result");
const loading = document.querySelector("#loading");




// const getFlagEmoji = (countryCode) => {
//     return countryCode
//         .toUpperCase()
//         .split("")
//         .map(char => String.fromCodePoint(127397 + char.charCodeAt()))
//         .join("");
// };






for(select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        
        // let countryCode = countryList[currCode];
        // newOption.innerText = `${getFlagEmoji(countryCode)} ${currCode}`;

        newOption.value=currCode;
        

        if(select.name==="from" && currCode==="USD"){
            newOption.selected = "Selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="Selected";
        }

        select.append(newOption);
    }
    select.addEventListener("change", (evt) =>{
        uptudateFlag(evt.target);

        uptudateExchangeRate();  ///1. i am changing 
    })
}

const uptudateExchangeRate = async () =>{
    try{
        let amount = document.querySelector(".amount input");
        let amtVal = amount.value;
        
        //console.log(fromCurr.value , toCurr.value);
        if(amtVal ==="" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
        }
        
        const URL = `${base_URL}${fromCurr.value}/${toCurr.value}`;
        loading.innerText = "Fetching exchange rate...";
        let response = await fetch(URL);

        if (!response.ok) {
           throw new Error("API request failed");
        }

        let data = await response.json();
        loading.innerText = "";
        //console.log(response);
        let rate = data.rate;  // or data["rate"]
        //console.log(rate);

        let date = data.date;  // for currency fetch date
        
        let finalAmount = amtVal * rate;
    
       msg.innerText = `1 ${fromCurr.value} = ${rate.toFixed(2)} ${toCurr.value}
       Rate Date : ${date}`;
    
        result.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;  //1USD = 95.6INR
    }
    catch(error){
        console.log("Error");
        result.innerText = "Unable to fetch exchange rate and date.";
        
    }
}

const uptudateFlag = ((element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
});

btn.addEventListener("click" ,  (evt) =>{
    evt.preventDefault();
     uptudateExchangeRate();
});

window.addEventListener("load", () => {
    uptudateExchangeRate();
})






